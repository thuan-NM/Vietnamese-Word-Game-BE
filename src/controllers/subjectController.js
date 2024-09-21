const Subjects = require("../models/subjectSchema"); // Import schema User từ tệp models/User

const getAll = async (req, res) => {
  try {
    const subjects = await Subjects.find();
    res
      .status(201)
      .json({
        message: "Get subjects successfully !",
        data: subjects,
        isSuccess: 1,
      });
  } catch (error) {
    console.error("Error during getting:", error);
    res.status(500).json({ message: "Failed to getting", isSuccess: 0 });
  }
};

const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const existingSubjects = await Subjects.findOne({ name: name });
    if (existingSubjects) {
      return res
        .status(409)
        .json({ message: "Subject already exists", isSuccess: 0 });
    }
    const newSubject = new Subjects({
      name: name,
    });
    await newSubject.save();
    res
      .status(201)
      .json({
        message: "Create subject successfully !",
        data: newSubject,
        isSuccess: 1,
      });
  } catch (error) {
    console.error("Error during createion:", error);
    res.status(500).json({ message: "Failed to create", isSuccess: 0 });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subjects.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ message: "Subject not found", isSuccess: 0 });
    }
    await Subjects.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Delete subject successfully !", isSuccess: 1 });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ message: "Failed to delete", isSuccess: 0 });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const subject = await Subjects.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ message: "Subject not found", isSuccess: 0 });
    }
    subject.name = name;
    await subject.save();
    res
      .status(200)
      .json({
        message: "Update subject successfully !",
        data: subject,
        isSuccess: 1,
      });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).json({ message: "Failed to update", isSuccess: 0 });
  }
};

module.exports = { getAll, createSubject, deleteSubject, updateSubject };
