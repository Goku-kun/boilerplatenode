#! /usr/bin/env node

const args = process.argv.slice(2);
const fs = require('fs');
const path = require('path');

(function() {
    if (args.includes('--help') || (args.includes('-h'))) {
        printHelp();
        process.exit(0);
    }
})();

let boilterPlateCode =
    `#! /usr/bin/env node

"use strict";

`;

// BASE_PATH = path.resolve(
//     process.env.BASE_PATH ||
//     __dirname
// );
// console.log(BASE_PATH);




// ***********************************


function printHelp() {
    console.log("Boiler Plate Node usage:");
    console.log("");
    console.log("        boilerplatenode --file=[NAME] [option1, option2,...] ");
    console.log("");
    console.log("Options:");
    console.log("-h, --help             to print this help");
    console.log("-f, --fs               to require the fs module in the index.js file");
    console.log("-p, --path             to require the path module in the index.js file");
    console.log("-o, --os               to require the os module in the index.js file");
    console.log("-u, --util             to require the util module in the index.js file");
    console.log("-z, --zlib             to require the zlib module in the index.js file");
    console.log("-u, --url              to require the url module in the index.js file");
    console.log("");
    console.log("");
    console.log("Defaults:");
    console.log("If the --file=[NAME] is not specified, the default name of the file created would be index.js");
    console.log("If no options are specified, just the shebang for execution will be written and strict mode will be enabled in the file.");
    console.log("");
    console.log("Example:");
    console.log("");
    console.log("$boilerplatenode --file=main --fs");
    console.log("");
    console.log("This command will create a file called main.js with required fs module.");
    console.log("");
    console.log("");
    // --os, --path, --fs, --util, --zlib, --url
}


(function main() {
    if (args.includes('-f') || args.includes('--fs')) {
        boilterPlateCode += "const fs = require('fs');\n";
    }
    if (args.includes('--path') || args.includes('-p')) {
        boilterPlateCode += "const path = require('path');\n";
    }
    if (args.includes('-o') || args.includes('--os')) {
        boilterPlateCode += "const os = require('os');\n";
    }
    if (args.includes('-u') || args.includes('--util')) {
        boilterPlateCode += "const util = require('util');\n";
    }
    if (args.includes('-z') || args.includes('--zlib')) {
        boilterPlateCode += "const zlib = require('zlib');\n";
    }
    if (args.includes('-u') || args.includes('--url')) {
        boilterPlateCode += "const url = require('url');\n";
    }
    fs.writeFileSync('./index.js', boilterPlateCode, { encoding: 'utf-8' });
})();