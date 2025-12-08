const adminService = require("../services/admin.service");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await adminService.register(name, email, password);
  return res.status(result.status).json(result.data);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const result = await adminService.login(email, password);
  return res.status(result.status).json(result.data);
};

exports.profile = async (req, res) => {
  return res.json({ admin: req.admin });
};
