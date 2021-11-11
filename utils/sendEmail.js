const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(
  "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"
);

const sendEmail = async ({ to, subject, html }) => {
  const email = {
    from: "andropolog@gmail.com",
    to,
    subject,
    html,
  };
  const result = await sgMail.send(email);
  return result;
};

module.exports = sendEmail;
