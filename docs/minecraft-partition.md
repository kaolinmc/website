---
title: The Minecraft Partition
order: 4
---

**NOTICE**: Make sure you have defined the `minecraft` partition in your `build.gradle.kts` file, find out how to do that [here](/docs/overview). 

Once you've defined your `minecraft` partition in your Gradle Extension Metadata, create the directory:
```text
src/latest/kotlin (note that `latest` is just the name of your partition)
or
src/latest/java
```

Under this goes your package path (same as before, don't alter it for different partitions) and then your Minecraft based logic.

For example, we can define another Entrypoint, but first make sure to define that entrypoint in our `build.gradle.kts`

```kotlin
extension {
  partitions {
    minecraft("latest") {
      mappings = MojangNamespaces.deobfuscated
      entrypoint = "com.example.myextension.Latest"
      dependencies {
        minecraft("1.21.4")
      }
    }
  }
}
```

**Typically, Entrypoints in your Minecraft Partitions should be named after the partition. The convention for this may change as partitions named after specific versions can get ugly entrypoint names (such as `org.example.myextension.Mc1_8_9` or equivalent)

## Minecraft specific Features

As well as having _access to Minecraft_, Minecraft Partitions get to do the following:
 - [Define Mixins](/docs/mixins)
 - [Register things](/docs/register-block-example)
 - [Implement Capabilities](/docs/capabilities)