import exp from "express";
const { authJwt } = require("../../middleware");
const router = exp.Router();

import enderecoController from "../controllers/enderecoController";

router.get("/", [authJwt.verifyToken], enderecoController.get);
router.get("/:id", [authJwt.verifyToken], enderecoController.getById);
router.post("/", [authJwt.verifyToken], enderecoController.post);
router.put("/:id", [authJwt.verifyToken], enderecoController.put);

export default router;
