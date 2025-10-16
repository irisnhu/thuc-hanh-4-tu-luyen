const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Lỗi khi lấy users:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Lỗi khi lưu user:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User không tồn tại' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Lỗi khi cập nhật user:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User không tồn tại' });
    res.status(200).json({ message: 'Xóa user thành công' });
  } catch (err) {
    console.error('Lỗi khi xóa user:', err);
    res.status(400).json({ message: err.message });
  }
};