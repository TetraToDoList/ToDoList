const ToDoList = require('../models/toDoList');
const slugify = require('../slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new ToDoList({ name, slug: slugify(name) }).save());
  } catch (err) {
    res.status(400).send('Create ToDoList failed');
  }
};

exports.list = async (req, res) =>
  res.json(
    await ToDoList.find({ isCompleted: 0 }).sort({ createdAt: -1 }).exec()
  );

exports.read = async (req, res) => {
  let toDoList = await ToDoList.findOne(
    { slug: req.params.slug },
    { isCompleted: 0 }
  ).exec();

  res.json(toDoList);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await ToDoList.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('ToDoList update failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ToDoList.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('ToDoList delete failed');
  }
};

exports.removeFromHome = async (req, res) => {
  try {
    const isCompleted = 1;
    const _id = req.params.toDoListId;
    console.log(_id);
    const toDoList = await ToDoList.findByIdAndUpdate(
      _id,
      { isCompleted: isCompleted },
      {
        new: true,
      }
    );

    res.json(toDoList);
  } catch (error) {
    console.log(error);
  }
};
