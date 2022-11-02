const path = require('path');
const fs = require('fs')
const catalog = path.join(__dirname, 'styles');
const pathBundle = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));
async function readCat(cat) {
    let files = await fs.promises.readdir(cat);
    for (let file of files) {
        if (path.parse(file).ext == '.css') {
            const contents = await fs.promises.readFile(path.join(cat, file));
            pathBundle.write(contents);
        }
    }
}
readCat(catalog);