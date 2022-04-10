const config = require('./config.json');

const fs = require('fs');
const path = require('path');

const baseString = config.baseString;
const trashesFolder = config.foldersToOrganize;
const extensions = Object.keys(config.extension);
const prefixes = config.outPutPrefix;
const getFolderName = () => {
  const date = new Date();

  const fullDate = {
    day: date.getDate(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
  return `${fullDate.day}-${fullDate.month}-${fullDate.year}`;
};

const createFolder = ({ destination }) => {
  fs.mkdirSync(path.join(baseString, destination));
};
const moveFile = async ({ destination, fileName, file, origin }) => {
  fs.copyFileSync(
    path.join(baseString, origin, file),
    path.join(baseString, destination, getFolderName(), `${fileName}`)
  );
  fs.unlinkSync(path.join(baseString, origin, file));
};

const organizeFiles = async ({
  file,
  formats,
  destination,
  origin,
  extension,
}) => {
  const files = fs.readdirSync(path.join(baseString, destination));

  if (formats.includes(path.extname(file))) {
    const fileName = `${prefixes[extension]}${path.basename(file)}`;
    const folderName = getFolderName();
    if (!files.includes(folderName))
      createFolder({ destination: path.join(destination, folderName) });
    await moveFile({ destination, file, fileName, origin });
  }
};

const main = async () => {
  console.log(`inicio`);
  try {
    trashesFolder.forEach(async (folder) => {
      const downloadsFiles = fs.readdirSync(path.join(baseString, folder));

      downloadsFiles.forEach(async (file) => {
        extensions.forEach(async (extension) => {
          if (
            !fs.existsSync(path.join(baseString, config.destination[extension]))
          )
            createFolder({ destination: config.destination[extension] });

          await organizeFiles({
            file,
            formats: config.extension[extension],
            destination: config.destination[extension],
            origin: folder,
            extension,
          });
        });
      });
    });
  } catch (error) {
    console.log('error :>> ', error);
  }
};
main();
