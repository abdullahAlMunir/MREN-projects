import { DecodeToken } from "../utility/TokenHelper.js";

export default (req, res, next) => {
    try {
        // 1️⃣ Get token from headers or cookies
        const token = req.headers['token'] || req.headers['authorization']?.split(" ")[1] || req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                status: "Fail",
                message: "Unauthorized. No token provided."
            });
        }

        // 2️⃣ Decode & verify token
        const decoded = DecodeToken(token);
        if (!decoded) {
            return res.status(401).json({
                status: "Fail",
                message: "Unauthorized. Invalid token."
            });
        }

        // 3️⃣ Attach authenticated user (STANDARD WAY)
        req.user = {
            user_id: decoded.user_id,
            email: decoded.email,
            role: decoded.role
        };

        /* ------------------------------------------------
           4️⃣ Backward compatibility (OPTIONAL)
           Remove later after refactor
        ------------------------------------------------ */
        req.headers.user_id = decoded.user_id;
        req.headers.email = decoded.email;
        req.headers.role = decoded.role;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({status: "fail", message: "Authentication failed"});
    }
}