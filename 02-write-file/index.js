const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
stdout.write('Write something to write to the file or write "exit" to exit the program.\n');
stdin.on('data', data => {
    const input = data.toString();  
    process.on('SIGINT', () => process.exit());
    if( input.trim() === 'exit'){
        process.exit();
    } else {
        output.write(data);
    }
});
process.on('exit', () => stdout.write('Goodby!\n'));