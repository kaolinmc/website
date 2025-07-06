---
title: Mixins
order: 5
---

## Overview

All currently available Mod Loaders use a mixin framework inheriting
from [SpongePowered/Mixin](https://github.com/SpongePowered/Mixin). While robust, well-documented, and tested, it needs
some competition.

Kaolin defines the second-ever Mixin API, and the first ever fully reloadable Mixin API. NOTE: If you don't know what a
Mixin is, it might be helpful to read up on that before continuing.

## Defining your own Mixin

Similar to Sponge Mixins, a Mixin class begins with the @Mixin annotation.

```kotlin
// src/latest/kotlin/com/example/myextension/CustomMixin.kt
@Mixin(AbstractClientPlayer::class)
abstract class CustomMixin(
    level: Level,
    pos: BlockPos,
    f: Float,
    profile: GameProfile
) : Player(
    level, pos, f, profile
) 
```

In this mixin we will be modifying the AbstractClientPlayer to remove all walk speed based FOV effects. It is common
convention (and useful later on) to inherit from the type that the class we are targeting inherits from (in this case
`Player`). Unfortunately that means a bit of a messy constructor.

Next, we are going to define a chunk of code that we want injected into a target method. This begins with the
`InjectCode` annotation.

Before we do this, lets look at the code we want to inject into (Taken directly from
`net.minecraft.client.player.AbstractClientPlayer`).

```java
public float getFieldOfViewModifier(boolean $$0, float $$1) {
    float $$2 = 1.0F;
    if (this.getAbilities().flying) {
        $$2 *= 1.1F;
    }

    float $$3 = this.getAbilities().getWalkingSpeed();
    if ($$3 != 0.0F) {
        float $$4 = (float) this.getAttributeValue(Attributes.MOVEMENT_SPEED) / $$3;
        $$2 *= ($$4 + 1.0F) / 2.0F;
    }

    if (this.isUsingItem()) {
        if (this.getUseItem().is(Items.BOW)) {
            float $$5 = Math.min((float) this.getTicksUsingItem() / 20.0F, 1.0F);
            $$2 *= 1.0F - Mth.square($$5) * 0.15F;
        } else if ($$0 && this.isScoping()) {
            return 0.1F;
        }
    }

    return Mth.lerp($$1, 1.0F, $$2);
}
```

Looking at this code, we can see that based on the value of `this.getAttributeValue(Attributes.MOVEMENT_SPEED)`, `$$2`
is modified. As $$2 is later on used as a bound to `lerp`, it makes sense that increasing this value could increase the
players FOV.

For that reason we are going to target the value returned by `this.getAttributeValue(Attributes.MOVEMENT_SPEED)`, and
change it to whatever `this.getAbilities().getWalkingSpeed()` equals.

First lets setup our `@InjectCode` annotation:

```kotlin
@InjectCode(
    // You can optionally define the target method as the `value` parameter
    // here if desired.
    point = Select(
        invoke = Invoke(
            AbstractClientPlayer::class,
            "getAttributeValue(Lnet/minecraft/core/Holder;)D"
        )
    ),
    type = InjectionType.AFTER
)
abstract fun getFieldOfViewModifier(
    stack: Stack
) {
    TODO()
}
```

- `point` : Point defines a singular point to match a selector to, it always accepts the type of `@Select`. Select
  defines many different selectors, one of which being:
- `invoke`: An invocation selector matches a given method invocation in the target method. It first accepts the owner of
  the method being invoked (in this case also being `AbstractClientPlayer`), and the internal name of the method.
- `type`: Type defines if the injection should be placed before or after the given selection point. In this case since
  we will be replacing the return value, we want to do so after the method has been called.
- `Stack`: There are currently 3 different dependency injectable types that can be included in a Mixin, one of which is
  Stack which will capture and allow the operand stack to be mutated.

Next, we simply want to replace the top value on the stack with `this.getAbilities().getWalkingSpeed()`.

```kotlin
// ...
fun getFieldOfViewModifier(
    stack: Stack
) {
    stack.replaceLast(super.getAbilities().getWalkingSpeed().toDouble())
}
```

And we are done! If you launch you can see that all walk speed based effects are gone! Note that the types in `Stack` are not validated, and so it is very important that they are the exact same type as when captured. In this case we have to convert from a Float to a Double otherwise an exception will be raised.

There are many more features of `Mixin`, and will be documented later...