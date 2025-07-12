---
title: Capabilities
order: 7
---

Now, we've learned about separation of concerns in terms of partitioning, but there are some cases where you do need to call Minecraft logic from your `main`/business logic. In this case we use Capabilities.

Capabilities are a general Kaolin registry that allow us to register functions to be called from `main`. 

To start, make a capability declaration statically in your Entrypoint class (or somewhere in `main`). In this example, since Minecraft captures the actual stdout, we will make a capability to make println calls for us.

```kotlin
// src/main/kotlin/org/example/myextension/MyExtension.kt
class MyExtension : Entrypoint() {
    companion object {
        val println by TargetCapabilities.defining<Capability1<String, Unit>>()
    }
    
    override fun init() {}
}
```

Let's break down what this is doing

 - TargetCapabilities is a capability registry that holds capabilities relating to Minecraft
 - `defining` is a Kotlin delegate method that will create a CapabilityReference for you.
 - `Capability1` is a functional interface, this represents a function call that takes 1 parameter and returns 1 type, in this case Unit (or nothing). You can create your own functional interfaces or use the predefined ones by Kaolin (Capability0-4, 0 taking 0 parameters, 4 taking 4).

Once this capability is registered, we can implement it in a Minecraft partition (note that if we tried to call it right now it would throw an exception).

```kotlin
// src/latest/kotlin/com/example/myextension/Latest
override fun init() {
    MyExtension.println += { string ->
        Bootstrap.realStdoutPrintln(string)
    }
}
```

Done! It's that simple! Now in our Extension entrypoint class in `main` we can call this capability.

```kotlin
// src/main/kotlin/org/example/myextension/MyExtension.kt
class MyExtension : Entrypoint() {
    companion object {
        val println by TargetCapabilities.defining<Capability1<String, Unit>>()
    }
    
    override fun init() {
        println.call("Hey, is this thing on?")
    }
}
```

## Usage:

More often than not, `main` partition code will be called from Minecraft partition code. In these scenarios it often may just be easier to have that function call accept a functional interface type/lambda that does the call back for you. However, when you have many instances where the same call needs to be made (for example println), it's often simpler, and more concise to simply create one capability declaration + implementation. 