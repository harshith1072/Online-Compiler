// const jwt = require("jsonwebtoken");
// const User = require("../models/UserSchema");

// const requireAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.Authorization;
//     const decodedToken = jwt.verify(token, process.env.SECRETKEY);
//     if (Date.now() > decodedToken.expirationTime) {
//       return res.status(401).send("Token expired");
//     }
//     const user = await User.findById(decodedToken.sub);
//     if (!user) {
//       return res.status(401).send("User not found");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in requireAuth middleware:", error);
//     return res.status(401).send("Unauthorized");
//   }
// };

// module.exports = requireAuth;

 


// const jwt = require("jsonwebtoken");
// const User = require("../models/UserSchema");

// const requireAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.Authorization;

//     // 1. ✅ Check if a token exists before verifying it
//     if (!token) {
//       return res.status(401).send("No token provided");
//     }

//     // 2. ✅ jwt.verify handles expiration automatically
//     const decodedToken = jwt.verify(token, process.env.SECRETKEY);

//     // 3. ✅ Find the user
//     const user = await User.findById(decodedToken.sub);

//     if (!user) {
//       return res.status(401).send("User not found");
//     }

//     // Attach the user to the request and proceed
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in requireAuth middleware:", error.message);

//     // 4. ✅ Specific error handling for better debugging
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).send("Token expired");
//     }
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).send("Invalid token");
//     }

//     return res.status(401).send("Unauthorized");
//   }
// };

// module.exports = requireAuth;



const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;

    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.SECRETKEY);

    const user = await User.findById(decodedToken.sub);

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in requireAuth middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    }

    return res.status(401).send("Unauthorized");
  }
};

module.exports = requireAuth;
