const exp = require('express')
const router = exp.Router();

import usuarioController from '../controllers/usuarioController';


router.get("/", usuarioController.get)
router.get("/:id", usuarioController.getById)
router.post("/", usuarioController.post)
router.put("/", usuarioController.put)

export default router