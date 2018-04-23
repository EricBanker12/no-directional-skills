/*	Notes:
    true to *disable directional input* away from camera direction
    false to *re-enable directional input* away from camera direction
*/

module.exports = {
	0: { // Warrior
		1: false, // Combo Attack
		2: false, // Evasive Roll
		41: false, // Aerial Scythe
 	},
	1: { // Lancer
		1: false, // Combo Attack
		26: false, // Backstep
	},
	2: { // Slayer
		1: false, // Combo Attack
		4: false, // Evasive Roll
	},
	3: { // Berserker
		1: false, // Combo Attack
		//24: false, // Evasive Smash // only roll is multi directional?
		29: false, // Evasive Roll
	},
	4: { // Sorcerer
		7: false, // Backstep
		18: false, // Glacial Retreat
		26: false, // Teleport Jaunt
	},
	5: { // Archer
		6: false, // Backstep
		16: false, // Breakaway Bolt
	},
	6: { // Priest
		26: false, // Fiery Escape
		38: false, // Backstep
		},
	7: { // Mystic
        17: false, // Teleport Jaunt
        44: false, // Mass Teleport
	},
	8: { // Reaper
		1: false, // Spiral Barrage
		40: false, // Shadow Step
	},
	9: { // Gunner
		11: false, // Rocket Jump
		40: false, // Rolling Reload
	},
	10: { // Brawler
		1: false, // Punch
		40: false, // Quick Dash
		22: false, // Flying Kick
	},
	11: { // Ninja
		1: false, // Combo Attack
		2: false, // Shadow Jump
	},
	12: { // Valkyrie
		1: false, // Slash
		14: false, // Evasion
	}
}
