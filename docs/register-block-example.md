---
title: Register a Block
order: 6
---

To begin, first define your Entrypoint class in your Minecraft partition.

```kotlin
// src/1.21.4/kotlin/com/example/myextension/V1_21_4

class V1_21_4 : Entrypoint() {
    override fun init() {
        onInit {

        }
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

// Next lets instantiate a Block instance:
val exampleBlock = Block(
    BlockBehaviour.Properties.of().setId(blockKey)
)

// And lastly register it with its registry:
Registry.register(BuiltInRegistries.BLOCK, blockKey, exampleBlock)

// Now, lets create our block item, this is the item that
// will be in your inventory and allow you to place your block.
val blockItemKey: ResourceKey<Item> = ResourceKey.create(Registries.ITEM, location)

// With our key done, we can go ahead and create our block + register it.
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

`src/main/resources/assets/myextension/blockstates/myblock.json`:
```json
{
  "variants": {
    "": {
      "model": "myextension:block/myblock"
    }
  }
}
```

`src/main/resources/assets/myextension/items/myblock.json`:
```json
{
  "model": {
    "type": "minecraft:model",
    "model": "myextension:block/myblock"
  }
}
```

`src/main/resources/assets/myextension/models/block/myblock.json`:
```json
{
  "parent": "minecraft:block/cube_all",
  "textures": {
    "all": "myextension:block/myblock"
  }
}
```

And finally add a texture for your block, here is one we've used:

`src/main/resources/assets/myextension/textures/block/myblock.png`: ![Image](/static/myblock_texture.png)

Now, launch again, and you should see that your block is textured.

![Image](/static/textured_block_demo.webp)