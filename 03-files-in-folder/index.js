const path = require('path');
const fs = require('fs')
readDir();
async function readDir() {
    try {
        const files = await fs.promises.readdir(path.join(__dirname, 'secret-folder/'));
        for (const file of files) {
          let fileStat = await fs.promises.stat(path.join(__dirname, 'secret-folder/', file));
          if (fileStat.isFile()) {
            console.log(path.parse(file).name + " - " + path.parse(file).ext.replace('.', '') + " - " + (fileStat.size / 1024).toFixed(3) + "kb");
            }
        }
      } catch (err) {
        console.error(err);
      }
}