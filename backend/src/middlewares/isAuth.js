import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Ensure this matches your model filename

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Please login to access this resource" });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodedData.id);

        next(); // Move to the next step (the controller)
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};