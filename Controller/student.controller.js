const { Student } = require("../models");

// Create
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();

    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By Id
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student)
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student)
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });

    await student.update(req.body);

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student)
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });

    await student.destroy();

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStudentsWithRedis = async (req, res) => {
  try {
    const cacheKey = "students";

    const cachedStudents = await redisClient.get(cacheKey);

    if (cachedStudents) {
      return res.json({
        success: true,
        source: "redis",
        data: JSON.parse(cachedStudents),
      });
    }

    const students = await Student.findAll();

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(students));

    res.json({
      success: true,
      source: "database",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
