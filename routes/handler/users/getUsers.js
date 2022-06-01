const { User } = require('../../../models');

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];

  const sqlOptions = {
    attributes: ['id', 'name', 'email', 'profession', 'avatar', 'role'],
  };

  if (userIds.length > 0) {
    sqlOptions.where = { id: userIds };
  }

  const user = await User.findAll(sqlOptions);

  return res.status(200).json({
    status: 'success',
    data: user,
  });
};
