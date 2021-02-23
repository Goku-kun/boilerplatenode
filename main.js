#! /usr/bin/env node

const args = process.argv.slice(2);
const fs = require('fs');
const Readable = require('stream').Readable;

(function printHelpAndTerminate() {
    if (args.includes('--help') || (args.includes('-h'))) {
        Help();
        process.exit(0);
    }
})();



function Help() {
    console.log("Boiler Plate Node usage:");
    console.log("");
    console.log("        boilerplatenode --file [NAME] [option1, option2,...] ");
    console.log("");
    console.log("Options:");
    console.log("-h, --help             to print this help");
    console.log("  , --out              to print the contents to the console if the file was created");
    console.log("  , --shebang          to include the shebang line as the first line in the created file");
    console.log("-f, --fs               to require the fs module in the created file");
    console.log("-p, --path             to require the path module in the created file");
    console.log("-o, --os               to require the os module in the created file");
    console.log("-u, --util             to require the util module in the created file");
    console.log("-z, --zlib             to require the zlib module in the created file");
    console.log("-u, --url              to require the url module in the created file");
    console.log("");
    console.log("");
    console.log("Defaults:");
    console.log("If the --file [NAME] is not specified, the default name of the file created would be index.js");
    console.log("If no options are specified, strict mode will be enabled in the file with the 'use strict'; directive.");
    console.log("");
    console.log("Example:");
    console.log("");
    console.log("$boilerplatenode --file gkun --fs");
    console.log("");
    console.log("This command will create a file called 'gkun.js' with required fs module. The contents of that file are printed below:");
    console.log("");
    console.log(`"use strict";\nconst fs = require('fs');`);
    console.log("");

}

function generateBoilerPlateCodeForFlags() {

    let boilterPlateCode = "";
    if (args.includes('--shebang')) {
        boilterPlateCode += '#! /usr/bin/env node\n';
    }
    boilterPlateCode += '"use strict";\n\n';

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
    return boilterPlateCode;
}

function outStreamGenerator(boilerPlateCode) {
    let targetStream;
    let readableStream = new Readable;
    readableStream.push(boilerPlateCode);
    readableStream.push(null);
    if (args.includes('--out') || args.includes('-o')) {
        targetStream = process.stdout;
    } else if (args.includes('--file')) {
        const indexFileName = args.findIndex(function findFileFlag(arrayElement) {
            return arrayElement == '--file';
        }) + 1;
        const fileName = args[indexFileName];
        if (fileName.includes('-') || fileName.includes('.')) {
            Help();
            console.error('**** Enter filename in Camel Casing and without extension ****');
            process.exit(0);
        }
        targetStream = fs.createWriteStream(`${fileName}.js`);
    } else {
        targetStream = fs.createWriteStream('index.js');
    }
    readableStream.pipe(targetStream);
}


(function main() {
    const boilerPlateCode = generateBoilerPlateCodeForFlags();
    outStreamGenerator(boilerPlateCode);
})();