---
title: Getting Started
order: 1
---

# Welcome to Kaolin

## Quick start

### Step 1: Configure Plugin Repositories

Put the following into your `settings.gradle.kts`

```kotlin
// settings.gradle.kts
pluginManagement {
    repositories {
        maven {
            url = uri("https://maven.kaolinmc.com/snapshots")
        }
        maven {
            url = uri("https://maven.kaolinmc.com/releases")
        }
        gradlePluginPortal()
    }
}
```

### Step 2: Add the Kiln Plugin

Next add the Kaolin Kiln Gradle plugin to your project.

```kotlin
// build.gradle.kts
plugins {
    id("maven-publish")
    id("kaolin.kiln") version "0.1"
}
```

### Step 3: Create your extension.toml

Kaolin relies on extra metadata in the `extension.toml` file in the root directory of your project. Create and paste the following:

```toml
# extension.toml
[parents]
mdk = { group = "com.kaolinmc", version = "1.0.1-BETA", use = "central" }
```

### Step 4: Reload gradle

If you are using an IDE such as Intellij, click 'sync', otherwise run the following to sync Kaolin.
```text
./gradlew
```


**THIS WILL THROW AN ERROR!**

Due to limitations in gradle, Kaolin Kiln requires 2 reloads when applying changes to the extension.toml file. On the first reload, "Cache Invalidated" will be thrown. This is a feature not a bug (no for real), and is a byproduct of Kaolin's modularity.

### Step 5: Register the Launch Task

To now launch Minecraft, register the 'Launch' task with gradle.

```kotlin
val launch by tasks.registering(LaunchMinecraft::class) {
    dependsOn(tasks.named("publishToMavenLocal"))
    targetNamespace = MojangNamespaces.deobfuscated.identifier
    javaLauncher.set(javaToolchains.launcherFor {
        languageVersion.set(JavaLanguageVersion.of(21))
    })
    mcVersion = "1.21.4"
}
```

### Step 6: And finally, Launch!
```text
./gradlew launch
```

Minecraft should launch shortly, and you are ready to begin writing your first extension!