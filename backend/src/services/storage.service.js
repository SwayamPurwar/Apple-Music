import ImageKit from "imagekit";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

dotenv.config();

// --- CONFIGURATION: UPDATED FOLDER NAME ---
const LOCAL_STORAGE_FOLDER = 'uploads/';
const CLOUD_STORAGE_FOLDER = '/Apple-Music/'; // Changed to 'AppleMusic'
// ------------------------------------------

// Ensure the local uploads directory exists
if (!fs.existsSync(LOCAL_STORAGE_FOLDER)) {
    fs.mkdirSync(LOCAL_STORAGE_FOLDER, { recursive: true });
}

console.log(process.env.IMAGEKIT_PUBLIC_KEY);

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

// Export multer middleware
export const upload = multer({ dest: LOCAL_STORAGE_FOLDER });

// Make sure you have: import fs from "fs"; at the top

export function uploadFile(file, fileName) {
    return new Promise((resolve, reject) => {
        // FIX: Read the file stream so ImageKit gets the actual audio data
        const fileStream = fs.createReadStream(file);

        imagekit.upload({
            file: fileStream, // <--- CHANGED: Sending the actual file stream
            fileName: fileName || "audio-file-" + Date.now() + ".mp3",
            folder: CLOUD_STORAGE_FOLDER
        }, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}