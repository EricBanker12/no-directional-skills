# No Directional Skills
**Note: By default, this disables ALL directional skills.**

**To re-enable directional casting, edit `config/config.js` to `false` for each skill.**

Removes directional input on some skills, so they always go toward camera target.

See preview: (http://i.imgur.com/nIWqQDZ.mp4)
## Commands
`/8 nds` - gives these command instructions

`/8 nds {on/off}` - turn on or off NDS
* example: `/8 nds off` - turn off NDS

`/8 nds {skillbase} {setting}` - turn on or off entire skill
* example: `/8 nds 12 true` - enable NDS for skill 12 of your character's class
* settings are `on` or `true` or `off` or `false`

`/8 nds {skillbase} {skillsub/backwards} {setting}` - turn on or off subskill or backwards flag
* example: `/8 nds 12 0 true` - enable NDS for skill 12 subskill 0 of your character's class
* example: `/8 nds 12 backwards true` - force backwards NDS for previously enabled skill 12 subskill 0

`/8 nds {skill} {setting}` turn on or off subskill
* example: `/8 nds 120100 true` - enable NDS for skill 12 subskill 0 of your character's class
## Known Issues
* Only works if using default directional keys: `WASD`
* Holding down all 4 movement keys will make directional skills cast North. This is a client bug, not proxy.