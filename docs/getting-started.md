---
title: Getting Started
order: 1
---

# Welcome to Kaolin

Hi! Welcome! Thanks for checking this page out :). Since you are here as a very very early tester, a word of fair warning. This project has been my passion project for the past 4-5 years, and while it does some things **extremely** well, others it does not. It is lacking in basic APIs for Minecraft, and there are bound to be countless bugs. However, I'm really excited in the direction it is going, and so happy developing! 

Oh and lastly, as I have been working on this for a *long time*, remember that it is probable that these docs aren't entirely perfectly helpful for developers new to Kaolin. If you need help join the Discord! I love talking with people and am happy to help! (even if it seems trivial :) ) 

## Setting Up Your First Project

This guide will walk you through the initial setup of a new project using `Kaolin` with Gradle. 

### Prerequisites
 - A Java Development Kit (JDK). The launch configuration in the example uses Java 21. 
 - An understanding of basic Gradle project structure.

---

### Step 1: Configure Plugin Repositories

First, you need to tell Gradle where to find the `Kaolin` plugins. This is done in your `settings.gradle.kts` file.

Add the following repositories to the `pluginManagement` block.
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

The `extension.toml` file configures all the dependencies that your extension needs. Other extensions that your extension depends on are defined under `[parents]`, and repositories under `[repositories]`.

First we will define the MDK (Minecraft Development Kit) parent, this is a transitive extension adding support for resource loading, and other Kaolin APIs.  
```toml
[parents]
mdk = { group = "com.kaolinmc", version = "1.0.1-BETA", use = "central" }
```

### Step 4: Reload gradle

If you are using an IDE such as Intellij, click 'sync', otherwise run
```text
./gradlew
```
to sync Kaolin.

**THIS WILL THROW AN ERROR!**

Due to limitations in gradle, Kaolin Kiln requires 2 reloads when applying changes to the extension.toml file. It should say "Cache Invalidated", and then if you reload again everything will complete normally. This is a feature not a bug (no for real), and is a byproduct of Kaolin's modularity.

### Step 5: Set up your launch configuration

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