import {Router} from "express";
import {getTopUsers} from "../controllers/get-top-users"
import {getTopPosts} from "../controllers/get-top-posts";

export const router = Router();

router.get("/top-users", getTopUsers)
router.get("/top-posts", getTopPosts)