const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const dir = "./assets/images/";

(function () {
  // list all files in the directory
  fs.readdir(dir, (err, files) => {
    if (err) {
      throw err;
    }

    // files object contains all files names
    // log them on console
    files.forEach((file) => {
      const formats = ["webp", "avif"];
      formats.forEach((format) => {
        const newFile = file.replace(".jpg", `.${format}`);
        sharp(`assets/images/${file}`)
          .resize(512)
          .toFile(`public/images/${newFile}`)
          .then(() => {
            console.log("Successfully resized an image!");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  });
})();
