import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
import passport from "passport";
import bcrypt from "bcrypt";
import db from "../database.js";
import jwt from "jsonwebtoken";

// Jwt strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  const user = db.getUserByEmail(payload.email);
  return done(null, user || false);
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", {
  session: false,
});

// Login
export function login(req, res) {
  // Find user in database
  const user = db.getUserByEmail(req.body.email);
  // Check if user exists and if the password is correct
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
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
    });
  } else {
    // If user doesn't exist or password is incorrect
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export function register(req, res) {
  const { email, password, role } = req.body;
  const user = db.registerUser({ email, password, role });
  const { password: pass, ...rest } = user;

  res.json(rest);
}
