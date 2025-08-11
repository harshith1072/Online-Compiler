// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/UserSchema");

// const signup = async (req, res) => {
//   try {
//     const { username, rollno, email, password } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 8);
//     const user = await User.create({
//       username: username,
//       rollno: rollno,
//       email: email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ user });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.sendStatus(401);
//     }

//     const passwordMatch = bcrypt.compareSync(password, user.password);

//     if (!passwordMatch) {
//       return res.sendStatus(401);
//     }

//     const expirationTime = Date.now() + 1000 * 60 * 60 * 24 * 30;
//     const token = jwt.sign(
//       { sub: user._id, expirationTime: expirationTime },
//       process.env.SECRETKEY
//     );

//     res.cookie("Authorization", token, {
//       expires: new Date(expirationTime),
//       httpOnly: true,
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const logout = (req, res) => {
//   try {
//     res.clearCookie("Authorization");
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const fetchUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId);
//     res.json({ gotUser: user });
//   } catch (error) {
//     console.error("Error during fetchItem:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const checkAuth = (req, res) => {
//   try {
//     console.log(req.user);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error during checkAuth:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = {
//   signup: signup,
//   fetchUser: fetchUser,
//   login: login,
//   logout: logout,
//   checkAuth: checkAuth,
// };




const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

// Handles user registration
const signup = async (req, res) => {
  try {
    const { username, rollno, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({
      username: username,
      rollno: rollno,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Handles user login and sets the JWT cookie
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    // Check if the password is correct
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create the JWT token
    const expirationTime = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
    const token = jwt.sign(
      { sub: user._id, expirationTime: expirationTime },
      process.env.SECRETKEY
    );

    // Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(expirationTime),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // ✅ Send a simple success status. Frontend will rely on the cookie for auth.
    res.sendStatus(200);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Handles user logout by clearing the cookie
const logout = (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetches a single user by ID
const fetchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json({ gotUser: user });
  } catch (error) {
    console.error("Error during fetchItem:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Checks if the user is authenticated
const checkAuth = (req, res) => {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error during checkAuth:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  signup,
  fetchUser,
  login,
  logout,
  checkAuth,
};
