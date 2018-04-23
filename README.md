# No Directional Skills
**WARNING: This module is still experimental. All skills are currently disabled and must be set `true` per skill in `config/config.js` via text editor for this module to do anything.**

Removes directional input on some skills, so they always go toward camera target.

See preview: (http://i.imgur.com/nIWqQDZ.mp4)

## Known Issues
* Only works if using default directional keys: `WASD`
* Holding down all 4 movement keys will make directional skills cast North.
* Does not *currently* work for skills that do not use the `cStartSkill` packet (ie: Teleport Jaunt)