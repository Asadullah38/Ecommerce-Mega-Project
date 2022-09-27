require("dotenv").config({ path: "../config/config.env" });
const sendToken = async (user, statusCode, req, res) => {
  const token = user.getJwtToken();

  
  const options = {
    expires: new Date(Date.now() + 2589200000),
    httpOnly: true,
  };

  await res.cookie("jwtToken", token, options);
  const { jwtToken } = await req.cookies;
  res.status(statusCode).json({ success: true, user, token, jwtToken });
};

module.exports = sendToken;
