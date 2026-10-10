# Project Wingman support for Vortex — community continuation

This extension adds support for Project Wingman mods to the [Vortex mod manager](https://www.nexusmods.com/about/vortex/).

> **This is a community continuation** of [agc93's original WingVortex](https://github.com/agc93/wingvortex),
> which has not been updated since September 2021 — before Project Wingman 2.0 and
> the Frontline-59 DLC existed. Original work © 2020 Alistair Chapman, MIT-licensed.
> All credit for the initial extension goes to them.

## What is it?

A Vortex extension that adds support for Project Wingman mods so you can install,
manage, track and uninstall them like any other Vortex-supported game.

## Status

The original extension still handles 2021-era content well, but the modding scene
moved on: Project Wingman 2.0 (and the F59 DLC) changed how skins work and the
Project Sicario merger that extensions built on was last updated in September 2021.
This continuation modernizes the extension for the current game and tooling:

- **Modern build** — the extension builds on current Node/CI again (the 2021
  toolchain had stopped working).
- **modman integration** *(in progress)* — the [modman](https://github.com/emberglazee/project-modman)
  merger replaces the dead PSM hook: merged mods are built and deployed as
  managed mods, entirely inside Vortex.
- **2.0-era features** *(planned)* — managing the PNG skin system, translation
  (`.locres`) mod tooling, and conflict detection for the no-metadata mods that
  now dominate the scene.

## How to use it?

Install the extension from the CI builds on GitHub (or Vortex's Extensions pane
once published), restart Vortex, and use the Manage button on Project Wingman.

### Automatic merging (modman)

Enable *Automatic mod merging* in Vortex's Interface settings (Settings → Interface).
When you deploy your mods, Vortex then runs [modman](https://github.com/emberglazee/project-modman)
to rebuild your merged mod from every enabled mod and preset, and deploys it as a
managed mod — no manual PSM runs, no separate merger install. The merger binary
ships inside the extension.

The merge-data mod keeps the historic name *PSM Merge Data* so existing setups
carry over unchanged.

Please report any bugs or issues you find.

## Building

```bash
npm install --legacy-peer-deps   # the lockfile predates npm 7
npm run build                    # produces dist/ (index.js + info.json + assets)
```

`dist/` is the extension folder — drop it into `%APPDATA%/Vortex/plugins/game-projectwingman`,
or package it as a zip for Vortex's Extensions pane.

## Credits

- Original extension: [agc93 / Alistair Chapman](https://github.com/agc93) (MIT).
- Continuation & modman: [emberglazee](https://github.com/emberglazee).
- Project Wingman is a game by Sector D2. This is an unofficial community project,
  not affiliated with Nexus Mods, Vortex or Sector D2.
