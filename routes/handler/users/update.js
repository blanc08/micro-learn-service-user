const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|min:6',
    profession: 'string|optional',
    avatar: 'string|optional',
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const id = req.params.id;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail && checkEmail.id !== id) {
      return res.status(409).json({
        status: 'error',
        message: 'Email already exists',
      });
    }
  }

  const password = await bcrypt.hash(req.body.password, 10);

  await user.update({
    email: req.body.email,
    password,
    name: req.body.name,
    profession: req.body.profession,
    avatar: req.body.avatar,
  });

  return res.status(200).json({
    status: 'success',
    data: {
      id,
      name: user.name,
      email: user.email,
      profession: user.profession,
      avatar: user.avatar,
    },
  });
};
