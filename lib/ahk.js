const exec = require('child_process').spawn,
	path = require('path')
	
const ahk = exec(path.join(__dirname, 'bin', 'ahk.exe'))

const hotkeys = {}

// get AHK hook output
ahk.stdout.on('data', hotkeyHandler)

// format AHK hook output and call hook callback
function hotkeyHandler(data) {
	let inputs = data.toString()
	// bug fix: if node freezes and multiple outputs concatenated, split by <;>
	inputs = inputs.slice(0,-3)
	inputs = inputs.split("<;>")
	// do callback for each function
	for (let input of inputs) {
		hotkeys[input](input)
	}
}

// new AHK hotkey, optional only active if AHK winTitle is active window
function hook(input, callback, winTitle = "") {
	hotkeys[input] = callback
	ahk.stdin.write(`hook<,> ${input}<,> ${winTitle}<;>`)
}

const AHK = {
	hook: hook
}

module.exports = AHK