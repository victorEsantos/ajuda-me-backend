import exp from "express";
const router = exp.Router();
const { verifySignUp } = require("../../middleware");
import usuarioController from "../controllers/usuarioController";
const { authJwt } = require("../../middleware");

router.get("/", [authJwt.verifyToken, authJwt.isAdmin], usuarioController.get);
router.get("/:id", [authJwt.verifyToken, authJwt.isCurrentUserOrAdmin], usuarioController.getById);
router.post(
  "/register",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  usuarioController.postRegister
);
router.put("/:id",[authJwt.verifyToken, authJwt.isCurrentUserOrAdmin], usuarioController.put);

router.post("/login",[] ,usuarioController.signin);

export default router;
