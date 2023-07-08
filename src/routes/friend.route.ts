import { Router } from "express";
import { addFriendWrapper } from "../controllers/friend.controller";
import { isAuthorized } from "../middleware/auth.middleware";

const friendRouter: Router = Router();

friendRouter.use(isAuthorized);
friendRouter.post('/add', addFriendWrapper);

export default friendRouter;