---
title: Fabric Integration
order: 9
---

Through Kaolin's powerful design, integration with other Mod loaders is completely possible. Currently, Fabric is supported through the following extension.

To your `extension.toml` file, add the following:
```toml
fabric-ext = { group = "com.kaolinmc.integrations", version = "1.0.8-BETA" }
```

After invalidating and reloading, you should be able to consume fabric mods off Modrinth in your `build.gradle.kts` file like the following:

```kotlin
// build.gradle.kts
extension {
    partitions {
        minecraft("1.21.4") {
            mappings = MojangNamespaces.deobfuscated
            useModrinth()
            dependencies {
                minecraft("1.21.4")
                fabric(
                    "fabric-api", // The project ID on Modrinth
                    "sVqpGIb1" // The version ID on Modrinth
                )
            }
        }
    }
}
```

When selecting a Version ID on Modrinth make sure it is appropriate for the Minecraft version you are targeting. Also note that you do not need to explicitly declare transitive Mods, the Fabric integration extension will pick this up automatically from Modrinth's metadata.

Now reload your Gradle project once more (this will take longer as it is remapping the Fabric mods), and then in the partition you defined them in, you can access and use APIs from Fabric mods.

## Usage

Kaolin does not provide as extensive an API as Fabric does, and so often it can be helpful to use the `fabric-api` mod or others to supplement where you need more structure. However, including another mod loader will significantly slow down startup times--and we are also working towards building out Kaolin APIs / the MDK--so in general if you can avoid it you should steer away from importing fabric mods. 