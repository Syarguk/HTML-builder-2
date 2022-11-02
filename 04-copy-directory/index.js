const path = require('path');
const fs = require('fs')
const dirDest = path.join(__dirname, 'files-copy');
const dirSource = path.join(__dirname, 'files');

async function checkDir(dirSour, dirDes) {
    try { await fs.promises.access(dirDes); 
            let files = await fs.promises.readdir(dirDes);
            for (let i = 0; i < files.length; i++) {
                await fs.promises.unlink(path.join(dirDes, files[i]));
            }
            let filesSour = await fs.promises.readdir(dirSour);
            for (let i = 0; i < filesSour.length; i++) {
                await fs.promises.copyFile(path.join(dirSour, filesSour[i]), path.join(dirDes, filesSour[i]));
            } }
    catch { await fs.promises.mkdir(dirDes);
            let filesSour = await fs.promises.readdir(dirSour);
            for (let i = 0; i < filesSour.length; i++) {
                await fs.promises.copyFile(path.join(dirSour, filesSour[i]), path.join(dirDes, filesSour[i]));
            } }
}
checkDir(dirSource, dirDest);