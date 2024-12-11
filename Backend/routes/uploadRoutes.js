import express from "express";
import path from 'path';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {

        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
})


const fileFilter = (req, file, cb)  => {

    const fileTypes = /jpe?g|png|webp/
    const extname = path.extname(file.originalname).toLowerCase();

    const mimeTypes = /image\/jpe?g|image\/png|image\/webp/
    const mimeType = file.mimetype;

    if (fileTypes.test(extname) && mimeTypes.test(mimeType)) {
        cb(null, true)
    } else {
        cb(new Error("Images only"), false);        
    }
}
const upload = multer({storage, fileFilter})
const uploadSingleImage = upload.single('image')

router.post('/', uploadSingleImage, (req, res) => {
    console.log("File:", req.file); // Check the uploaded file
    if (req.file) {
        res.status(200).json({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`,
        });
    } else {
        res.status(400).json({ message: 'No image file uploaded' });
    }
});


export default router;