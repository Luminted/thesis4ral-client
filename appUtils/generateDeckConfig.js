const fs = require("fs");



async function main(){
    const folderPath = process.argv[2];
    const type = process.argv[3];
    const outputPath = process.argv[4];

   const config = await parseFilesIntoConfig(folderPath, type);
   const alphabeticallySorted = config.sort((a, b) => {
       console.log(a.name, b.name)
       if(a.name > b.name) return 1;
       if(a.name < b.name) return -1;
       return 0;
   })
   console.log(alphabeticallySorted)
   await writeConfigToFile(outputPath, alphabeticallySorted);
}

main().catch(err => console.log(err));



async function parseFilesIntoConfig(path, type) {
    config = [];
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
        const name = dirent.name.split(".")[0];
        config.push({
          name,
          type
      })
    }
    return config;
  }

async function writeConfigToFile(outputPath, config) {
    await fs.writeFile(outputPath, JSON.stringify(config), err => {
        if (err) throw err;
        console.log('Config generated');
    });
}