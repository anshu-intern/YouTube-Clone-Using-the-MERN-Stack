import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = './uploads';

        // Set the folder based on the fieldname (thumbnail or video)
        if (file.fieldname === 'thumbnail') {
            folder = './uploads/thumbnails';
        } else if (file.fieldname === 'video') {
            folder = './uploads/videos';
        }
        
        // Ensure the folder exists or create it if it doesn't
        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

// Function to create dynamic fields
const generateMulterFields = (fields) => {
  return fields.map(field => ({ name: field, maxCount: 1 }));
};

const videoUpload = multer({storage: storage});

export const uploadFields = (fields) => {
  return videoUpload.fields(generateMulterFields(fields));
};
