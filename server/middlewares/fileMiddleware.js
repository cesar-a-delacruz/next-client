import { Buffer } from "buffer";
import { cloudinaryV2 as cloudinary, upload } from "../utils/fileParser.js";

export default async function (req, res, next) {
  try {
    await ((req, res, fn) => {
      return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
          if (result instanceof Error) {
            return reject(result);
          }
          return resolve(result);
        });
      });
    })(req, res, upload.single("file"));
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const file = await cloudinary.uploader.upload(dataURI, {
      folder: `next-client/${req.user.businessId}/service`,
      public_id: req.body.name,
    });
    req.public_id = file.public_id;
    next();
  } catch (error) {
    console.error(error);
  }
}
