import cors from 'cors';
import exp from 'express';
const router = exp.Router();

import usuarioController from '../controllers/usuarioController';

router.get("/", usuarioController.get)
router.get("/:id", usuarioController.getById)
router.post("/register", usuarioController.postRegister)
router.put("/:id", usuarioController.put)

export default router