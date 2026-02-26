import multer from "multer";

const storage = multer.memoryStorage();
// file RAM me store hoga (not disk, not cloud)

const upload = multer({ storage });

export const singleUpload = multer({ storage }).single("file");
