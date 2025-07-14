---
title: Initial Setup 
order: 3
---

Kaolin separates your code into Partitions. A partition is 1:1 with a Gradle Source Set.

## Main Partition

In your main partition lives code that CANNOT access Minecraft classes (separation of concerns). You can only define one.

Register it in your `build.gralde.kts` with the following:

```kotlin
// build.gradle.kts
plugins { ... }

extension {
    partitions {
        main {
            extensionClass = "org.example.myextension.MyExtension"
            dependencies {
                // Each partition manages its own dependencies.
            }
        }
    }
}
```

minecraft("latest") {
mappings = MojangNamespaces.deobfuscated
dependencies {
minecraft("1.21.4")
}
}

Once you've defined your main partition in your Gradle Extension Metadata, create the directory:
```text
src/main/kotlin
or
src/main/java
```

Under this goes your package structure, eg: `org.example.myextension` and then your Entrypoint class. Your `Entrypoint` class should be named something like `MyExtension`.

In the `MyExtension` class, define the following:

```kotlin
// src/main/kotlin/org/example/myextension/MyExtension.kt
class MyExtension : Entrypoint() {
    override fun init() {
        // Initialization logic
    }
}
```

Fabric/Forge users: If you have experience in prior modding platforms, you might be surprised to note that the `init` function actually is called **before** Minecraft is started. For this reason, registering blocks, items, or anything else at this point will not work. Instead, you must hook into first `MDK` API, `init-hook`.

```kotlin
override fun init() {
    onInit {
        // Initialization logic
    }
}
```

## Minecraft Partition

Minecraft partitions can access specific Minecraft versions. You can register as many Minecraft partitions as you like to target different versions.


Register it in your `build.gralde.kts` with the following:

```kotlin
// build.gradle.kts
extension {
    partitions {
        // ... Other partitions
        
        minecraft("1.21.4") {
            mappings = MojangNamespaces.deobfuscated
            dependencies {
                minecraft("1.21.4")
            }
            
            // You can also *optionally* define an Entrypoint here:
            entrypoint = "com.example.myextension.V1_21_4"
        }
    }
}
```

Next, create the directory:
```text
src/1.21.4/kotlin (note that `1.21.4` is just the name of your partition)
or
src/1.21.4/java
```

Under this goes your package path (same as before, don't alter it for different partitions) and then your Minecraft based logic.

## Minecraft specific Features

As well as having _access to Minecraft_, Minecraft Partitions get to do the following:
- [Define Mixins](/docs/mixins)
- [Register things](/docs/register-block-example)
- [Implement Capabilities](/docs/capabilities)