const User = require('../models/user');
const ToDoList = require('../models/toDoList');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split('@')[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

exports.addComplete = async (req, res) => {
  const { toDoListId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { complete: toDoListId } }
  ).exec();
  res.json({ ok: true });
};

exports.complete = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select('complete')
    .populate('complete')
    .exec();

  res.json(list);
};

exports.removeFromComplete = async (req, res) => {
  const { toDoListId } = req.params;
  // const _id = req.params.toDoListId;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { complete: toDoListId } }
  ).exec();

  // await ToDoList.findByIdAndUpdate(
  //   _id,
  //   { isCompleted: 0 }
  // );

  res.json({ ok: true });
};
