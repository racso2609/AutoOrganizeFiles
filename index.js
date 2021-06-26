const fs = require("fs");
const path = require("path");
const baseString = "/home/racso/";
const trashFolder = "Downloads";

const imageFormats = [".jpg", ".jpeg", ".png"];
const DocumentFormats = [".pdf", ".xlsx", ".docx"];
const AudioFormats = [".mp3"];
const VideoFormats = [".mp4", '.mkv', '.wav'];




const date = new Date();
const fullDate = {
  day: date.getDate(),
  year: date.getFullYear(),
  month: date.getMonth() + 1,
};
const newFolderName = `${fullDate.day}-${fullDate.month}-${fullDate.year}`;

const createFolder = async(exist, route) => {
  if (!exist) {
    await fs.mkdirSync(path.join(baseString, route, newFolderName));
    folderExist = true;
  }
};
const moveFile = async(route, file) => {
  await fs.copyFileSync(
    path.join(baseString, trashFolder, file),
    path.join(
      baseString,
      route,
      newFolderName,
      `${path.basename(file)}`
    )
  );
  await fs.unlinkSync(path.join(baseString, trashFolder, file));
};

const organizeFiles = async(file, formats, route) => {
  const pictures = await fs.readdirSync(path.join(baseString, route));
  let index = pictures.length;
  
  if (formats.includes(path.extname(file))) {
    let imageName = `IMG-${index}`;

    await createFolder(pictures.includes(newFolderName), route);
    await moveFile(route, file, imageName);

    index += 1;
  }
};



const main = async () => {
  try {
    const downloadsFiles = await fs.readdirSync(
      path.join(baseString, "Downloads")
    );

    for (const file of downloadsFiles) {
      await organizeFiles(file, imageFormats,'Pictures');
      await organizeFiles(file, DocumentFormats,'Documents');
      await organizeFiles(file, AudioFormats,'Music');
      await organizeFiles(file, VideoFormats,'Videos');
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
};
setInterval(() => {
  main();
}, 3000);
