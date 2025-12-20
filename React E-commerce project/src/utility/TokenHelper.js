import jwt from "jsonwebtoken";

// Make these non-async since jwt.sign and jwt.verify are synchronous
export function EncodeToken(email, user_id) {
    let KEY = "123-ABC-987-XYZ";
    let EXPIRE = {expiresIn: "24h"};
    let PAYLOAD = {
        email: email,
        user_id: user_id.toString(), // Ensure user_id is always a string
        role: role
    }
    return jwt.sign(PAYLOAD, KEY, EXPIRE);
}

export function DecodeToken(token) {
    try {
        let KEY = "123-ABC-987-XYZ";
        const decoded = jwt.verify(token, KEY);
        return {
            ...decoded,
            user_id: decoded.user_id.toString(), // Ensure consistent format
            role: decoded.role
        };
    } catch (error) {
        console.error("Token decode error:", error);
        return null;
    }
}