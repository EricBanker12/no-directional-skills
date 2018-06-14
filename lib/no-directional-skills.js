const ahk = require('./ahk.js')

module.exports = function NoDirectionalSkills(dispatch) {
    const skills = require('../config/config.js')
    
    let job = -1,
        keys = {}

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
        return Math.floor((skill - 0x4000000) / 10000)
    }

    // get skill sub
    function skillsub(skill) {
        return (skill - 0x4000000) % 100
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
    dispatch.hook('C_START_SKILL', 5, {order: -9999}, (event) => {
        let skillBase = skillbase(event.skill),
            skillSub = skillsub(event.skill)
        // if skill is in config and you're moving
        if(skills && skills[job] && skills[job][skillBase] && (skills[job][skillBase] === true || skills[job][skillBase][skillSub]) && event.moving) {
            let backwards = false
            if (skills[job][skillBase]['backwards']) backwards = true
            event.w = fixAngle(event.w, backwards)
            return true
        }
    })
}
