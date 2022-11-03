const path = require('path');
const fs = require('fs')
const projDist = path.join(__dirname, 'project-dist');
async function createPage(pathDist) {
    await fs.promises.mkdir(pathDist, { recursive: true });
    createIndex(path.join(__dirname, 'template.html'), path.join(__dirname, 'components'), pathDist);
    createCss(path.join(__dirname, 'styles'), pathDist);
    copyDir(path.join(__dirname, 'assets'), path.join(pathDist, 'assets'));
}
async function createIndex(template, components, target) {
    let index = fs.createWriteStream(path.join(target, 'index.html'));
    let indexCont = await fs.promises.readFile(template, 'utf-8');
    let comp = await fs.promises.readdir(components);
    for (let file of comp) {
        let contFile = await fs.promises.readFile(path.join(components, file), 'utf-8');
        indexCont = indexCont.replace(`{{${path.parse(file).name}}}`, contFile);
    }
    index.write(indexCont);
}
async function createCss(source, target) {
    const pathCssBundle = fs.createWriteStream(path.join(target, 'style.css'));
    let files = await fs.promises.readdir(source);
    for (let file of files) {
        let content = await fs.promises.readFile(path.join(source, file));
        pathCssBundle.write(content);
    }
}
async function copyDir(source, target) {
    let objStat = await fs.promises.stat(source);
    if (objStat.isFile()) {
        await fs.promises.copyFile(source, target);
        return;
    } else {
        await fs.promises.mkdir(target, { recursive: true });
        let files = await fs.promises.readdir(source);
        for (let file of files) {
            copyDir(path.join(source, file), path.join(target, file));
        }
    }
}
createPage(projDist);