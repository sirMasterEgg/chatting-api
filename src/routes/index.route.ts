import { Router } from "express";
import authRouter from "./auth.route";
import chatRouter from "./chat.route";
import friendRouter from "./friend.route";

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/friend', friendRouter);
router.use('/chat', chatRouter);

export default router;