---
title: Overview
order: 2
---

# Design Philosophy

Kaolin is designed with simplicity in mind. Once you get over the quirks that make it different from other mod loaders,
intuition is key; if it feels like it should work a certain way, it probably does. For this reason, Kaolin is broken
apart into the following components.

## Extensions:

Typically, pieces of software that alter or modify Minecraft have been called Mods. However, in Kaolin these components
are called Extensions. An Extension in an of itself has no compiled code that is runnable on the JVM. It is simply a
metadata rich document defining:

- Dependencies on other extensions (also called `parents`)
- And [Partitions](#partitions).

Kaolin will resolve Extensions and their parents for you--no need to manually go and find the dependencies that you
need. The goal of this mechanism is to simplify development, but also to encourage:

- the construction of a more diverse ecosystem of Extensions for developers. With this type of resolution it is easier
  for both the developer and end user to load Extensions.
- facilitate an easy and completely first-class solution to modpack development.

## Partitions

Partitions are where the code of your Extension lives. In gradle, a source set corresponds 1:1 to a partition. As you
learn Kaolin, you will find that there are many different types of Partitions (and that you can even define your own),
however the 2 most basic you will use are `main`, and `minecraft`.

In gradle, manage your partitions as follows:

```kotlin
// build.gradle.kts

plugins { ... }

extension {
  partitions {
    main {
      extensionClass = "define your extension class here"
      dependencies { }
    }
    minecraft("latest") {
      mappings = MojangNamespaces.deobfuscated
      dependencies {
        minecraft("1.21.4")
      }
    }
  }
}
```

As you can see, Partitions have their own metadata, and their own completely separate trees of dependencies. Additionally, partitions have relationships with each other.

When you define a partition, all metadata setup in your Gradle project is automatically serialized for you and bundled into your Extension. This means that all dependencies (both Extensions and regular Maven dependencies) are loaded at runtime, and so no shadowing needs to be done.

## Separation of concerns

The third core tenant of Minecraft development in Kaolin is built upon separation of `business` logic, and version specific Minecraft logic. What this boils down to, is that the `main` partition cannot access any class inside a `minecraft` partition, yet the `minecraft` partition can absolutely access classes in the `main` partition. 

This feature forces developers to maintain version agnostic code relevant to their Extension, and makes certain that it cannot accidentally reference a Minecraft API that has become deprecated, or removed due to a version change.

Additionally, as each Partition can only target 1 Minecraft version, this allows developers to easily provide first-class support for multiple different Minecraft versions. No need to set versions by git branch or do inline checks.

## Modularity

The fourth and final tenant of Kaolin is modularity. As Extensions are easily resolved, building small lightweight libraries is suddenly extremely advantageous. The end goal of Extensions such as the `mdk` and others is to provide small utility classes defined in a `main` partition, and implemented in many `minecraft` partitions (targeting separate versions) so that the consumer of the `mdk` does not have to ever set up a Minecraft partition, they can simply use the version agnostic APIs of the `MDKs` `main` partition and easily target every Minecraft version.

This is fundamentally different from a mod loader like Fabric in which it is hardly possible to do anything without dependence on Minecraft. Though do note that we are still building towards having the breadth of APIs available to make this a true possibility for Kaolin.

