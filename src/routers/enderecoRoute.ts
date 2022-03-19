const exp = require('express')
const router = exp.Router();

import enderecoController from '../controllers/enderecoController';


router.get("/", enderecoController.get)
router.get("/:id", enderecoController.getById)
router.post("/", enderecoController.post)
router.put("/", enderecoController.put)

export default router