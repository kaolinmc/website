---
title: Wrapping Up
order: 11
---

You did it! Thanks for reading and I hope you really enjoy using this tool. I love writing software and I think Minecraft is an amazing tool/game. My goal with this project is not so much to fight existing mod loaders, but provide tools on which developers can scaffold their abilities. As it is Kaolin is a great platform just to *run* Fabric or Forge if nothing else. 

However, you made it this far, and for that reason if you would like to help get Kaolin to where I want it to be I would really appreciate it! Here is a list of the things I want to work on (I'll try my best to keep this updated):

 - MDK Development:
   - Block/Item Registration API
   - Fluids API
   - Rendering API
     - Possibly bring back old graphics API?
   - General design discussion: How do we want mocked types such as an API Block to interop with concrete types such as Minecraft Block?
 - Launcher Profile: Currently Kaolin cannot launch from the Minecraft Launcher
   - Discussion: How should the user define mods? Mods folder? UI on startup? Only allow reloadable mods (ie no Fabric?)?
 - Webservices:
   - Kaolin Account system
   - Central Extension Repository allow 3rd party developers to push content to it (through the Account System + developer keys)
   - Online Forums
 - Legacy/Neo Forge integration: This has not even been started yet
 - Rewrite of all archive-mapper libraries to support local variable names, parameter names, and to be asynchronous.
 - General bug finding
 - Access-Tweaks integration into MDK + more granular remapping for conflicting methods when creating overloads (now public private overriding)
 - Mixin API:
   - Possible incremental compilation of Mixins as you are writing them + injection into Minecraft sources.
   - BUG: Remapping `this` references to target class
   - Better method names for generated `uber` methods
   - Injecting interfaces
 - New partitions:
   - Implementing a general `client` partition for all Minecraft client side code (could just be unaware partitions?)
   - Support for server side, redefine partitions as `client` or `server` side + common code for each
   - Easy networking through the Capabilities API (implement callUnsafe to become a network request)
 - Optimizations:
   - Archives / Boot archive loading check for memory leaks
   - Possible performance improvement possible on large tree auditing.
   - Possible performance improvement when loading many archives of different ype
   - Decide how to handle closing long-living ArchiveReferences.
 - Documentation:
   - Document all Kaolin built extensions
   - Just in general improve docs, eg. Mixin doc is bad right now

If you would like to work on any of this please let me know! I can help figure out what the best way to implement features is, etc.