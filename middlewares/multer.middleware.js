const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = [".jpg", ".png", ".jpeg"];
  if (!allowed.includes(ext)) {
    return cb(new Error("Images Only"));
  } else {
    cb(null, true);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const MB = 1024 * 1024

const upload = multer({ storage , fileFilter , limits:{fileSize: 5 * MB} });
module.exports = upload;
