import app from './src/app.js';
import connectToDatabase from './src/db/db.js';

connectToDatabase();

// Use Render's port, or 3000 if running locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});