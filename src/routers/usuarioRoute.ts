import exp from 'express';
const router = exp.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

import usuarioController from '../controllers/usuarioController';


router.get("/", urlencodedParser, usuarioController.get)
router.get("/:id", urlencodedParser, usuarioController.getById)
router.post("/register", jsonParser, usuarioController.postRegister)
router.put("/", jsonParser, usuarioController.put)

export default router