const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user_id,
      iat: timestamp,
    },
    config.secret
  );
};
exports.signin = async (req, res, next) => {
  const user = req.user;
  res.send({ token: tokenForUser(user), user_id: user._id });
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please provide your email and password" });
    }

    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return findUser;
    }
    if (findUser) {
      return res.status(422).json({ error: "Email already in use" });
    }

    const user = new User({
      email: email,
      password: password,
    });

    user
      .save()
      .then(res.json({ user_id: user._id, token: tokenForUser(user) }));
  } catch (error) {}
};
