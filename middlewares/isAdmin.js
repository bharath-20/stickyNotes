function isAdmin(req, res, next) {
    const userRole = req.user.role;
  
    if (userRole === "ADMIN") {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not an admin, return a 403 Forbidden response
      res
        .status(403)
        .json({ error: "Unauthorized access. Admin rights required." });
    }
}

module.exports = { isAdmin };
