const contacts = require("../../model/contacts.json");

const getContactById = (req, res) => {
  console.log(req.params)
  const { contactId } = req.params;
  const result = contacts.find((contact) => contact.id.toString() === contactId);
  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;