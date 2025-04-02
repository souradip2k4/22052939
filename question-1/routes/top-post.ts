import {Router} from "express";
import {getTopPost} from "../controllers/get-top-posts"

export const router = Router();

router.get("/top-users", getTopPost)