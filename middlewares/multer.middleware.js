const multer = require("multer");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = [".jpg", ".png", ".jpeg", ".webp"];

  if (!allowed.includes(ext)) {
    return cb(new Error("Images Only"));
  }

  cb(null, true);
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const MB = 1024 * 1024;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * MB },
});

module.exports = upload;