const ahk = require('./ahk.js')

module.exports = function NoDirectionalSkills(dispatch) {
    const skills = require('../config/config.js')
    const command = dispatch.command || dispatch.require.command
    
    let job = -1,
        keys = {}

    command.add(['nd', 'nds', 'nodir', 'nodirection', 'nodirectionalskills'], (skill, sub, set) => {
        if (skill) {
            skill = Number(skill)
            if (sub === undefined) {
                command.message('[no-directional-skills] NDS command paramater missing. Use command "/8 nds" for instructions.')
                return
            }
            sub = sub.toLowerCase()
            if (set === undefined) {
                set = sub
                sub = null
            }
            if (skill > 10000) {
                sub = skillsub(skill)
                skill = skillbase(skill)
            }
            if (set == 'on') set = 'true'
            if (set == 'off') set = 'false'
            try {
                set = eval(set)
            }
            catch (err) {
                command.message(`[no-directional-skills] Setting must be "on" or "true" or "off" or "false". Received setting "${set}". Use command "/8 nds" for instructions.`)
                return
            }
            if (!skills[job]) skills[job] = {}
            if (sub || sub === 0) {
                if (typeof skills[job][skill] != 'object') skills[job][skill] = {}
                skills[job][skill][sub] = set
                command.message(`[no-directional-skills] Skill ${skill}-${sub} set to ${set?'true':'false'}.`)
                return
            }
            else {
                skills[job][skill] = set
                command.message(`[no-directional-skills] Skill ${skill} set to ${set?'true':'false'}.`)
                return
            }
        }
        command.message('[no-directional-skills] How to use NDS commands:\n'
            + '"/8 nds {skillbase} {setting}" example: "/8 nds 12 true"\n'
            + '"/8 nds {skillbase} {skillsub/backwards} {setting}" example: "/8 nds 12 backwards true"\n'
            + '"/8 nds {skill} {setting}" example: "/8 nds 120100 true"'
        )
    })

    // get WASD
    for (let hotkey of ['w', 'a', 's', 'd']) {
        keys[hotkey] = false
        ahk.hook(`~$*${hotkey}`, keyHandler, 'ahk_exe TERA.exe')
        ahk.hook(`~$*${hotkey} UP`, keyHandler, 'ahk_exe TERA.exe')
    }

    // toggle WASD status
    function keyHandler(key) {
        for (let hotkey of ['w', 'a', 's', 'd']) {
            if (key.includes(hotkey)) {
                if (key.includes('UP')) {
                    keys[hotkey] = false
                }
                else {
                    keys[hotkey] = true
                }
            }
        }
    }

    // get skill base
    function skillbase(skill) {
        return Math.floor(skill / 10000)
    }

    // get skill sub
    function skillsub(skill) {
        return skill % 100
    }
    
    // correct angle to camera target
    function fixAngle(w, backwards) {
        if (keys.a && !keys.d && keys.w == keys.s) w += Math.PI / 2 // A
        if (!keys.a && keys.d && keys.w == keys.s) w -= Math.PI / 2 // D
        if (!keys.w && keys.s && keys.a == keys.d) w += Math.PI     // S
        if (keys.w && keys.a && !keys.s && !keys.d) w += Math.PI / 4 // W+A
        if (keys.w && !keys.a && !keys.s && keys.d) w -= Math.PI / 4 // W+D
        if (!keys.w && keys.a && keys.s && !keys.d) w += Math.PI * 3 / 4 // S+A
        if (!keys.w && !keys.a && keys.s && keys.d) w -= Math.PI * 3 / 4 // S+D
        if (backwards) w += Math.PI
        w = w % (Math.PI * 2)
        if (w > Math.PI) w -= Math.PI * 2
        if (w < -Math.PI) w += Math.PI * 2
        return w
    }

    // get class
    dispatch.hook('S_LOGIN', 10, (event) => {
        job = (event.templateId - 10101) % 100
    })

    // change direction to camera
    dispatch.hook('C_START_SKILL', 7, {order: -9999}, (event) => {
        let skillBase = skillbase(event.skill.id),
            skillSub = skillsub(event.skill.id)
        // if skill is in config and you're moving
        if(skills && skills[job] && skills[job][skillBase] && (skills[job][skillBase] === true || skills[job][skillBase][skillSub]) && event.moving) {
            let backwards = false
            if (skills[job][skillBase]['backwards']) backwards = true
            event.w = fixAngle(event.w, backwards)
            return true
        }
    })
}
