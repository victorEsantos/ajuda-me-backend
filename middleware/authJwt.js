const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Usuario = require("../models").Usuario;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isCurrentUserOrAdmin = (req, res, next) => {
  let isAdmin = false;
  Usuario.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "admin") {
          console.log("tal de is adm", isAdmin);
          isAdmin = true;
          next();
          return;
        }
      }
      
      if (req.userId != req.params.id && !isAdmin) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      next();
    });
  });
};

isModerator = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};
isModeratorOrAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "moderator") {
          next();
          return;
        }
        if (roles[i].nome === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isCurrentUserOrAdmin: isCurrentUserOrAdmin,
};
module.exports = authJwt;
