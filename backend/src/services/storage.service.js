import multer from 'multer';
import ImageKit from 'imagekit';
import config from '../config/config.js';

// 1. Initialize ImageKit connection
const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
});

// 2. Use Memory Storage instead of Disk Storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// 3. Helper function to upload the memory buffer to ImageKit
export const uploadFile = (fileBuffer, fileName, folderName = 'apple-music') => {
  return new Promise((resolve, reject) => {
    imagekit.upload({
      file: fileBuffer,             // The file buffer from memoryStorage
      fileName: fileName,           // Original file name
      folder: `/${folderName}`      // Organizes files in your ImageKit dashboard
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};