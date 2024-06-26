import express from "express";
import {
  updateArtist,
  deleteArtist,
  getSingleArtist,
  getAllArtist,
  getArtistBySearch,
  getArtistProfile,
  getTotalArtist,
  getAllArtists,
  updateArtistStatus,
} from "../Controllers/artistController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRoute from "./review.js";

const router = express.Router();

//nested route
router.use("/:artistId/reviews", reviewRoute);
router.get("/", getAllArtist);
router.put("/:id", authenticate, restrict(["artist"]), updateArtist);
router.put("/:id/status", updateArtistStatus);
router.delete("/:id", authenticate, restrict(["artist"]), deleteArtist);
router.get("/profile/me", authenticate, restrict(["artist"]), getArtistProfile);
router.get("/total", getTotalArtist);
router.get("/all", getAllArtists);
router.get("/:id", getSingleArtist);

export default router;
