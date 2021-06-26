const fs = require("fs");
const path = require("path");
const baseString = "/home/racso/";

const date = new Date();
const fullDate = {
  day: date.getDate(),
  year: date.getFullYear(),
  month: date.getMonth()+1,
};
const newFolderName = `${fullDate.day}-${fullDate.month}-${fullDate.year}`;


const main = async () => {
  try {
    const downloadsFiles = await fs.readdirSync(path.join(baseString, "Downloads"));
    const pictures = await fs.readdirSync(path.join(baseString, "Pictures"));

    let index = pictures.length;
    let folderExist = pictures.includes(newFolderName);
    for (const file of downloadsFiles) {
      if (
        path.extname(file) === ".jpg" ||
        path.extname(file) === ".jpeg" ||
        path.extname(file) === ".png"
      ) {
        

        let imageName = `IMG-${index}`;

        if (!folderExist) {
          await fs.mkdirSync(path.join(baseString, "Pictures", newFolderName));
          folderExist = true;
        }
        await fs.copyFileSync(
          path.join(baseString, "Downloads", file),
          path.join(baseString, "Pictures", newFolderName, `${imageName}${path.extname(file)}`)
        );
        index += 1;

        await fs.unlinkSync(path.join(baseString, 'Downloads/', file));
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
  console.log(`get`, )
};
setInterval(()=>{

    main();
}, 3000)
