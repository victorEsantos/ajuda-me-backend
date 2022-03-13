const exp = require('express')
const router = exp.Router();

import produtoController from '../controllers/produtoController';


router.get("/", produtoController.get)
router.post("/", produtoController.post)
router.put("/", produtoController.put)

export default router