const gravatar = require("gravatar");
const { users: service } = require("../../services");
const { sendEmail } = require("../../utils");
const { nanoid } = require("nanoid");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already registered",
      });
    }
    req.body.avatarURL = gravatar.url(email);

    const verifyToken = nanoid();
    const userData = await service.add({ ...req.body, verifyToken });
    const { URL } = process.env;
    const emailToSend = {
      to: userData.email,
      subject: "Verify email",
      html: `<a href="${URL}/api/v1/auth/verify/${verifyToken}" target="_blank">Please verify your email<a/>`,
    };

    await sendEmail(emailToSend);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfully registered. Please verify your email!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
