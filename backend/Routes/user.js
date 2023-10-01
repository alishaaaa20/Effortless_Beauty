import express from "express";
import { updateUser, deleteUser, getSingleUser, getAllUser } from "../Controllers/userController";

const router = express.Router();

router.get('/:id', getSingleUser)
router.get('/', getAllUser)
router.get('/:id', updateUser)
router.get('/:id', deleteUser)

export default router;