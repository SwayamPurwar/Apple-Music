// CRITICAL: Check your file structure. 
// If your model file is named 'user.model.js', keep this line.
// If it is named 'User.js', change it to "../models/User.js"
import User from "../models/user.model.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 1. Register
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 2. Login (THIS IS REQUIRED TO FIX THE CRASH)
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Send Cookie
        res.cookie("token", token, {
           httpOnly: true,
    secure: true,        // CHANGED: Must be true for cross-domain HTTPS
    sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ 
            message: "Login successful", 
            user: { id: user._id, username: user.username, email: user.email } 
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 3. Me (Get Profile)
export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// 4. Logout
export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};
// 5. Follow / Unfollow User
export const toggleFollow = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        if (currentUserId === targetUserId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) return res.status(404).json({ message: "User not found" });

        // Check if already following
        const isFollowing = currentUser.following.includes(targetUserId);

        if (isFollowing) {
            // Unfollow
            currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
            targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId);
            await currentUser.save();
            await targetUser.save();
            return res.status(200).json({ message: "Unfollowed user", isFollowing: false });
        } else {
            // Follow
            currentUser.following.push(targetUserId);
            targetUser.followers.push(currentUserId);
            await currentUser.save();
            await targetUser.save();
            return res.status(200).json({ message: "Followed user", isFollowing: true });
        }
    } catch (error) {
        res.status(500).json({ message: "Error toggling follow", error: error.message });
    }
};
// 6. Get Public User Profile (by ID)
export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find user but exclude password
        const user = await User.findById(id).select("-password");
        
        if (!user) return res.status(404).json({ message: "User not found" });

        // Optional: Fetch their public playlists if you have a Playlist model
        // const playlists = await Playlist.find({ user: id, public: true }); 

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};
// 7. Search Users
export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(200).json({ users: [] });

        const users = await User.find({
            username: { $regex: query, $options: "i" }
        }).select("-password"); // Security: Don't send passwords!

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error searching users", error: error.message });
    }
};
// 8. Update Profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username } = req.body;

        // Check if username is taken (if it's different from current)
        if (username) {
            const existingUser = await User.findOne({ username });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ message: "Username already taken" });
            }
        }

        const user = await User.findByIdAndUpdate(
            userId, 
            { $set: { username } }, 
            { new: true } // Return the updated document
        ).select("-password");

        res.status(200).json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};