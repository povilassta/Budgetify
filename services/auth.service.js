import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

// Jwt strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  const user = await User.findOne({ email: payload.email }).populate("role");
  return done(null, user || false);
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", {
  session: false,
});

// Login
export function login(req, res) {
  // Find user in database
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) res.status(500).json({ message: "Something went wrong." });
    else if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      // Sign the token with payload provided above
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // Send token back
      res.status(200).json({
        token: `Bearer ${token}`,
        expiresIn: process.env.JWT_EXPIRES_IN,
        name: `${user.firstName} ${user.lastName}`,
      });
    } else {
      // If user doesn't exist or password is incorrect
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
}
