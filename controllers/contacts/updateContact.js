const contacts = require("../../model/contacts.json");

const update = (req, res) => {
  const { contactId } = req.params;

  const idx = contacts.findIndex(
    (contact) => contact.id.toString() === contactId
  );

  if (idx === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  const updateContact = { ...req.body, id: contactId };
  contacts[idx] = updateContact;
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updateContact,
    },
  });
};

module.exports = update;
