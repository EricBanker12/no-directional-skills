const fs = require('fs'),
    path = require('path'),
    zlib = require("zlib"),
    filepath = path.join(__dirname, 'lib', 'bin', 'ahk.exe'),
    archivepath = filepath + '.gz',
    decompress = zlib.createGunzip()

// launch no-directional-skills
module.exports = function noDirectionalSkillsLauncher(dispatch) {

    if (dispatch.majorPatchVersion > 79) {
        console.log('no-directional-skills - KTera definitions unsupported')
        return
    }

    let extracting = false

    // check for ahk.exe
    function checkDependency() {
        try {
            // check if ahk.exe already extracted
            fs.accessSync(filepath, fs.constants.F_OK)
            // if so, load module
            let noDirectionalSkills = require('./lib/no-directional-skills.js')
            noDirectionalSkills(dispatch)
        }
        catch (err) {
            // if not, extract ahk.exe
            if (!extracting) {
                extracting = true
                let readstream = fs.createReadStream(archivepath),
                    writestream = fs.createWriteStream(filepath)
                readstream.pipe(decompress).pipe(writestream)
            }
            // recheck after 1s
            setTimeout(checkDependency, 1000)
        }
    }

    checkDependency()

}