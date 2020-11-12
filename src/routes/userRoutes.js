import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import {
  registerUser,
  getUserProfile,
  getUserById,
  authUser,
  getUsers,
  updateUserProfile,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

//PATH: {{BASE_URL}}/api/v1/users
const router = express.Router();

// 8888888b.       888     888      888888b.        888           8888888       .d8888b.
// 888   Y88b      888     888      888  "88b       888             888        d88P  Y88b
// 888    888      888     888      888  .88P       888             888        888    888
// 888   d88P      888     888      8888888K.       888             888        888
// 8888888P"       888     888      888  "Y88b      888             888        888
// 888             888     888      888    888      888             888        888    888
// 888             Y88b. .d88P      888   d88P      888             888        Y88b  d88P
// 888              "Y88888P"       8888888P"       88888888      8888888       "Y8888P"

router.route('/').post(registerUser);
router.route('/login').post(authUser);

// 8888888b.       8888888b.        .d88888b.       88888888888      8888888888       .d8888b.       88888888888
// 888   Y88b      888   Y88b      d88P" "Y88b          888          888             d88P  Y88b          888
// 888    888      888    888      888     888          888          888             888    888          888
// 888   d88P      888   d88P      888     888          888          8888888         888                 888
// 8888888P"       8888888P"       888     888          888          888             888                 888
// 888             888 T88b        888     888          888          888             888    888          888
// 888             888  T88b       Y88b. .d88P          888          888             Y88b  d88P          888
// 888             888   T88b       "Y88888P"           888          8888888888       "Y8888P"           888

router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

//        d8888      8888888b.       888b     d888      8888888      888b    888
//       d88888      888  "Y88b      8888b   d8888        888        8888b   888
//      d88P888      888    888      88888b.d88888        888        88888b  888
//     d88P 888      888    888      888Y88888P888        888        888Y88b 888
//    d88P  888      888    888      888 Y888P 888        888        888 Y88b888
//   d88P   888      888    888      888  Y8P  888        888        888  Y88888
//  d8888888888      888  .d88P      888   "   888        888        888   Y8888
// d88P     888      8888888P"       888       888      8888888      888    Y888

router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById);
router.route('/:id').put(protect, admin, updateUser);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
