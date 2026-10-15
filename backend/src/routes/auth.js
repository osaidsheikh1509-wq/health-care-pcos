import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { validateBody } from '../middleware/validate.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { db } from '../db/prisma.js';
import { config } from '../config/env.js';

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required').max(80),
  languagePreference: z.enum(['en', 'hi', 'kn']).default('en')
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

// Helper to generate JWT token and cookie options
const createToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, languagePreference: user.languagePreference },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
};

const cookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv === 'production',
  sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// POST /api/auth/register
router.post('/register', validateBody(registerSchema), async (req, res) => {
  try {
    const { email, password, name, languagePreference } = req.validatedBody;

    const existing = await db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.createUser({
      email,
      passwordHash,
      name,
      languagePreference
    });

    const token = createToken(newUser);
    res.cookie('token', token, cookieOptions);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        languagePreference: newUser.languagePreference,
        token
      }
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, error: 'Registration failed. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', validateBody(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.validatedBody;

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = createToken(user);
    res.cookie('token', token, cookieOptions);

    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        languagePreference: user.languagePreference,
        token
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, error: 'Login failed. Please try again.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET /api/auth/me
router.get('/me', optionalAuth, async (req, res) => {
  if (!req.user) {
    return res.json({ success: true, authenticated: false, user: null });
  }

  const user = await db.findUserById(req.user.id);
  if (!user) {
    return res.json({ success: true, authenticated: false, user: null });
  }

  res.json({
    success: true,
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      languagePreference: user.languagePreference
    }
  });
});

export default router;
