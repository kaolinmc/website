export const DISCORD_INVITE = "https://discord.gg/dpGxnEtnw3"

export const queryServer = async (server: string, query: string, page: number, pagination: number): Promise<WrappedExtension[]> => {
    const url = `${server}/search?query=${encodeURIComponent(query)}&page=${page}&pagination=${pagination}`;

    console.log(url)
    const result = (await (await fetch(url)).json()) as SearchResult;

    const managedMetadata = await Promise.all(result.result.map(async (identifier) => {
        const metadataQuery = `${server}/metadata/${identifier.group.replace('.', '/')}/${identifier.name}`;

        const it1 = await fetch(metadataQuery);
        const it2 = await it1.json();

        return {
            metadata: it2 as ManagedExtensionMetadata,
            id: identifier
        };
    }))

    const metadata = await Promise.all(managedMetadata.map(async (managed) => {
        const release = managed.metadata.latest.release ?? managed.metadata.latest.rc ?? managed.metadata.latest.beta
        if (!release) {
            throw new Error("No Release found!")
        }

        const metadataQuery = `${server}/registry/` +
            `${managed.id.group.replaceAll('.', '/')}/` +
            `${managed.id.name}/` +
            `${release}/${managed.id.name}-${release}-metadata.json`;

        const it1 = await fetch(metadataQuery);
        const it2 = await it1.json();
        return {
            metadata: it2 as ExtensionMetadata,
            pointer: {
                descriptor: managed.id.group + ":" + managed.id.name + ":" + release,
                repository: server + "/registry",
                repository_type: "REMOTE"
            } as ExtensionPointer,
            downloads: managed.metadata.downloads
        };
    }))

    return metadata
        .map((it) => {
            return {
                metadata: it.metadata,
                pointer: it.pointer,
                downloads: it.downloads
            } as WrappedExtension
        })
}

export type ExtensionMetadata={
    name: string;
    developers: string[];
    icon: string | null;
    description: string;
    tags: string[];
    app: string
}

export type ManagedExtensionMetadata = {
    downloads: number;
    latest: {
        release: string | null;
        beta: string | null;
        rc: string | null;
    };
    versions: Array<{
        version: string;
        release_type: string;
        metadata_path: string;
    }>;
};

export type WrappedExtension = {
    metadata: ExtensionMetadata,
    pointer: ExtensionPointer,
    downloads: number,
}

export type SearchResult = {
    result: [
        {
            group: string,
            name: string
        }
    ]
}

export type ExtensionPointer = {
    descriptor: string,
    repository: string,
    repository_type: string
}