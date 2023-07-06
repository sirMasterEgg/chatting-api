import { Router } from "express";
import { loginWrapper, logoutWrapper, refreshTokenWrapper, registerWrapper } from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post('/login', loginWrapper);
authRouter.post('/register', registerWrapper);
authRouter.get('/logout', logoutWrapper);
authRouter.get('/refresh-token', refreshTokenWrapper);

export default authRouter;