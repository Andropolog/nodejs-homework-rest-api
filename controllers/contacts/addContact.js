const contacts = require("../../model/contacts.json");
const { v4 } = require("uuid");

const addContact = (req, res) => {
  const newContact = { ...req.body, id: v4() };
  contacts.push(newContact);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

module.exports = addContact;
