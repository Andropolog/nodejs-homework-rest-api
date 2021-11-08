const express = require("express");

const { auth: ctrl } = require("../../controllers");
const {
  validation,
  authentificate,
  uploadMiddleware,
} = require("../../middlewares");
const {
  user: { joiSchema },
} = require("../../models/schemas");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrl.signup);

router.post("/signin", ctrl.signin);

router.get("/current", authentificate, ctrl.getCurrentUser);

router.get("/logout", authentificate, ctrl.logout);

router.patch(
  '/avatars',
  authentificate,
  uploadMiddleware.single('avatar'),
  ctrl.uploadAvatar
); 

module.exports = router;