/* Notes:
    true to *disable* directional input away from camera direction
    false to *re-enable* directional input away from camera direction
*/

module.exports = {
    0: {	// Warrior
        1: true,	// Combo Attack
        2: true,	// Evasive Roll
        41: true,	// Aerial Scythe
     },
    1: {	// Lancer
        1: true,	// Combo Attack
        26: {		// Backstep
            0: true,
            backwards: true,
        },
    },
    2: {	// Slayer
        1: true,	// Combo Attack
        4: true,	// Evasive Roll
    },
    3: {	// Berserker
        1: true,	// Combo Attack
        24: {		// Evasive Smash 
            0: true 	// only roll is multi directional
        },
        29: true,	// Evasive Roll
    },
    4: {	// Sorcerer
        7: {		// Backstep
            0: true,
            backwards: true,
        },
        18: {		// Glacial Retreat
            0: true,
            backwards: true,
        },
        26: true,	// Teleport Jaunt
    },
    5: {	// Archer
        6: {		// Backstep
            0: true,
            backwards: true,
        },
        16: {		// Breakaway Bolt
            0: true,
            backwards: true,
        },
    },
    6: {	// Priest
        26: {		// Fiery Escape
            0: true,
            backwards: true,
        },
        38: {		// Backstep
            0: true,
            backwards: true,
        },
    },
    7: {	// Mystic
        17: true,	// Teleport Jaunt
        44: true,	// Mass Teleport
    },
    8: {	// Reaper
        1: true,	// Spiral Barrage
        40: true,	// Shadow Step
    },
    9: {	// Gunner
        11: true,	// Rocket Jump
        40: true,	// Rolling Reload
    },
    10: {	// Brawler
        1: true,	// Punch
        40: true,	// Quick Dash
        22: true,	// Flying Kick
    },
    11: {	// Ninja
        1: true,	// Combo Attack
        2: true,	// Shadow Jump
    },
    12: {	// Valkyrie
        1: true,	// Slash
        14: true,	// Evasion
    },
}
