export default (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                status: "Fail",
                message: "Admin access only"
            });
        }
        next();
    } catch (error) {
        return res.status(403).json({
            status: "Fail",
            message: "Admin authorization failed"
        });
    }
};
