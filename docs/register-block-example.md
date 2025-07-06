---
title: Register a Block
order: 6
---

To begin, first define your Entrypoint class in your Minecraft partition.

```kotlin
// src/latest/kotlin/com/example/myextension/Latest

class Latest : Entrypoint() {
    override fun init() {

    }
}
```

Next we are going to want to hook into the initialization phase of Minecraft, we do this with the `onInit` event hook.

```kotlin
// src/latest/kotlin/com/example/myextension/Latest
override fun init() {
    onInit {

    }
}
```

Now we are ready to start registering blocks with the game. First lets create our Block. All registrations begin with a
ResourceKey, lets make our Item ResourceKey like as follows:

```kotlin
val location = ResourceLocation.fromNamespaceAndPath(
    "myextension", // Our namespace, this must be the name of your gradle project.
    "myblock" // The name of the block we want to register, can be anything
)

val blockKey: ResourceKey<Block> = ResourceKey.create(Registries.BLOCK, location)
```

Next lets instantiate a Block instance:

```kotlin
val exampleBlock = Block(
    BlockBehaviour.Properties.of().setId(blockKey)
)
```

And lastly register it with its registry:

```kotlin
Registry.register(BuiltInRegistries.BLOCK, blockKey, exampleBlock)
```

Now, lets create our block item, this is the item that will be in your inventory and allow you to place your block.

```kotlin
val blockItemKey: ResourceKey<Item> = ResourceKey.create(Registries.ITEM, location)
```

With our key done, we can go ahead and create our block + register it.

```kotlin
val blockItem = BlockItem(exampleBlock, Item.Properties().setId(blockItemKey))

Registry.register(
    BuiltInRegistries.ITEM,
    blockItemKey,
    blockItem
)
```

Perfect! Now open Minecraft and give yourself your newly created block.
```text
./give @a myextension:myblock
```

![Image](/static/untextured_block_demo.webp)

Finally, we need to texture this image. We can do so by creating the following folders: `src/main/resources/assets/myextension`.

Note how It's totally fine to have assets under the `main` partition because assets are version independent. However, in the case that the directory layout, or your assets are version specific, you can also put them under a Minecraft partition's resource folder.

Now add the following files under your newly created directory tree:

`blockstates/myblock.json`:
```json
{
  "variants": {
    "": {
      "model": "myextension:block/myblock"
    }
  }
}
```

`items/myblock.json`:
```json
{
  "model": {
    "type": "minecraft:model",
    "model": "myextension:block/myblock"
  }
}
```

`models/block/myblock.json`:
```json
{
  "parent": "minecraft:block/cube_all",
  "textures": {
    "all": "myextension:block/myblock"
  }
}
```

And finally add a texture for your block, here is one we've used:

`textures/block/myblock.png`: ![Image](/static/myblock_texture.png)

Now, launch again, and you should see that your block is textured.

![Image](/static/textured_block_demo.webp)