const fs = require('fs'),
    path = require('path'),
    zlib = require("zlib"),
    filepath = path.join(__dirname, 'lib', 'bin', 'ahk.exe'),
    archivepath = filepath + '.gz',
    decompress = zlib.createGunzip()

try {
    // check if ahk.exe already extracted
    fs.accessSync(filepath, fs.constants.F_OK)
}
catch (err) {
    // if not, extract ahk.exe
    if (err) {
        let readstream = fs.createReadStream(archivepath),
            writestream = fs.createWriteStream(filepath)
        readstream.pipe(decompress).pipe(writestream)
    }
}

// launch no-directional-skills
module.exports = function noDirectionalSkillsLauncher(dispatch) {    
    let noDirectionalSkills = require('./lib/no-directional-skills.js')
    noDirectionalSkills(dispatch)
}