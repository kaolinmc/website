---
title: Utilities
order: 10
---

## Hotswapping

Out of the box Kaolin comes with full extension hot swapping during runtime. Unlike other hot-swapping systems that only allow you to hotswap code inside of methods, in Kaolin full methods, classes, class signatures, method signatures, code, and mixins, are hot swappable.

This powerful capability comes from Kaolin's built in loading + unloading of extensions at runtime and powerful mixin library. 

### How to

To hot swap in your own project, launch Minecraft and then run the following Gradle commands.

```text
./gradlew publishToMavenLocal
```

```test
./gradlew reload
```

Note: As of right now, you MUST run these two commands on separate lines otherwise the changes will not immediately propagate.

Also note: Dynamic reloading of Minecraft registries is not fully supported and is a goal in the MDK.

---

## Access Tweaking (Widening)

Often there are private or final methods / fields that we want to access, override, or overwrite. In Kaolin this is easy, simply apply the following extension to automatically open the access of all methods, fields, and classes. 

```text
access-tweaks = { group = "com.kaolinmc.extension", version = "1.0.6-BETA", use = "central" }
```

