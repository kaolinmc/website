---
title: The Main Partition 
order: 3
---

Once you've defined your main partition in your Gradle Extension Metadata, create the directory:
```text
src/main/kotlin
or
src/main/java
```

Under this goes your package structure, eg: `org.example.myextension` and then your Entrypoint class. Typical, convention would have you call the name of your Extension, such as `MyExtension`.

In the `MyExtension` class, define the following:

```kotlin
// src/main/kotlin/org/example/myextension/MyExtension.kt
class MyExtension : Extension() {
    override fun init() {
        // Initialization logic
    }
}
```

If you have experience in a modding platform like Fabric, you might be surprised to note that the `init` function actually is called **before** Minecraft is started. For this reason, registering blocks, items, or anything else at this point will not work. Instead, you must hook into first `MDK` API, `init-hook`.

```kotlin
override fun init() {
    onInit {
        // Initialization logic
    }
}
```