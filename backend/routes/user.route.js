import express from "express";
import {
  updateProfile,
  login,
  register,
  logout,
} from "../controllers/user.controller.js";
import { singleUpload } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

//router.route("/register").post(register);
router.post("/register", singleUpload, register);
router.route("/login").post(login);
router
  .route("/profile/update")
  .post(singleUpload, isAuthenticated, updateProfile);
router.route("/logout").get(logout);
export default router;
