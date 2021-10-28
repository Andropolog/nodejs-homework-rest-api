const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const {
  validateContact,
  validateUpdateContact,
} = require("../../middlewares/validateContact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateContact, ctrl.addContact);

router.patch("/:contactId", validateUpdateContact, ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;