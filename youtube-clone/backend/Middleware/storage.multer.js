import multer from 'multer';

const storage = multer.memoryStorage();

// Function to create dynamic fields
const generateMulterFields = (fields) => {
  return fields.map(field => ({ name: field, maxCount: 1 }));
};

const fileUpload = multer({storage: storage});

export const uploadFields = (fields) => {
  return fileUpload.fields(generateMulterFields(fields));
};