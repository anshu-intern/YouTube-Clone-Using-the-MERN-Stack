import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = './uploads';

        // Set the folder based on the fieldname (banner or pic)
        if (file.fieldname === 'channelBanner') {
            folder = './uploads/channelBanner';
        } else if (file.fieldname === 'channelImage') {
            folder = './uploads/channelImage';
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

const channelUpload = multer({storage: storage});

export const uploadFields = (fields) => {
  return channelUpload.fields(generateMulterFields(fields));
};
