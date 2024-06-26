import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getMyAppointments,
  getUserProfile,
  getTotalUser,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// router.get("/", authenticate, restrict(["admin"]), getAllUser);

router.get(
  "/profile/me",
  authenticate,
  restrict(["customers"]),
  getUserProfile
);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["customer"]),
  getMyAppointments
);
router.get("/total", getTotalUser);
router.get("/", getAllUser);
router.get("/:id", authenticate, restrict(["customer"]), getSingleUser);
router.put("/:id", authenticate, restrict(["customer"]), updateUser);
router.delete("/:id", authenticate, restrict(["customer"]), deleteUser);

export default router;
