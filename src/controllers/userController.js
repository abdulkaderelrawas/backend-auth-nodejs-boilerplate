import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// 8888888b.       888     888      888888b.        888           8888888       .d8888b.
// 888   Y88b      888     888      888  "88b       888             888        d88P  Y88b
// 888    888      888     888      888  .88P       888             888        888    888
// 888   d88P      888     888      8888888K.       888             888        888
// 8888888P"       888     888      888  "Y88b      888             888        888
// 888             888     888      888    888      888             888        888    888
// 888             Y88b. .d88P      888   d88P      888             888        Y88b  d88P
// 888              "Y88888P"       8888888P"       88888888      8888888       "Y8888P"

/**
 * @description   Register a new user
 * @route         POST /api/v1/users
 * @access        Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @description   Auth user & get token
 * @route         POST /api/v1/users/login
 * @access        Public
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// 8888888b.       8888888b.        .d88888b.       88888888888      8888888888       .d8888b.       88888888888
// 888   Y88b      888   Y88b      d88P" "Y88b          888          888             d88P  Y88b          888
// 888    888      888    888      888     888          888          888             888    888          888
// 888   d88P      888   d88P      888     888          888          8888888         888                 888
// 8888888P"       8888888P"       888     888          888          888             888                 888
// 888             888 T88b        888     888          888          888             888    888          888
// 888             888  T88b       Y88b. .d88P          888          888             Y88b  d88P          888
// 888             888   T88b       "Y88888P"           888          8888888888       "Y8888P"           888

/**
 * @description   Get user profile
 * @route         GET /api/v1/users/profile
 * @access        Protect
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @description   Update user profile
 * @route         PUT /api/v1/users/profile
 * @access        Protect
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//        d8888      8888888b.       888b     d888      8888888      888b    888
//       d88888      888  "Y88b      8888b   d8888        888        8888b   888
//      d88P888      888    888      88888b.d88888        888        88888b  888
//     d88P 888      888    888      888Y88888P888        888        888Y88b 888
//    d88P  888      888    888      888 Y888P 888        888        888 Y88b888
//   d88P   888      888    888      888  Y8P  888        888        888  Y88888
//  d8888888888      888  .d88P      888   "   888        888        888   Y8888
// d88P     888      8888888P"       888       888      8888888      888    Y888

/**
 * @description   Get all users
 * @route         GET /api/v1/users
 * @access        Protect, Admin
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

/**
 * @description   Delete a user
 * @route         DELETE /api/v1/users/:id
 * @access        Protect, Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @description   Get user by ID
 * @route         GET /api/v1/users/:id
 * @access        Protect, Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @description   Update user
 * @route         PUT /api/v1/users/:id
 * @access        Protect, Admin
 */
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
