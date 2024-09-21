const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/userSchema");
const { db } = require("../../until/connectDb"); // Import schema User từ tệp models/User

const register = async (req, res) => {
  const { fullName, email, password, avatar, gender, dob, totalpoint, phone } =
    req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists", isSuccess: 0 });
    }

    // Hash mật khẩu
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new Users({
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      gender: gender,
      dob: dob,
      avatar: avatar,
      totalpoint: totalpoint,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).json({
      message: "Register Successfully !",
      data: newUser,
      isSuccess: 1,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Failed to register", isSuccess: 0 });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", isSuccess: 0 });
    }

    // Trả về thông tin người dùng
    res.json({ message: "User found", user: user, isSuccess: 1 });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ message: "Failed to get user by ID", isSuccess: 0 });
  }
};

const getUserPoint = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        isSuccess: 0,
      });
    }
    let yourPoint = user.totalpoint;
    console.log(yourPoint);
    return res.status(200).json({
      msg: "Get your point successful ",
      data: yourPoint,
      isSuccess: 1,
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
      isSuccess: 0,
    });
  }
};
const updateTotalPoint = async (req, res) => {
  const { userId, totalPoint } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", isSuccess: 0 });
    }

    // Cập nhật totalPoint cho người dùng
    user.totalpoint += totalPoint;
    await user.save();

    res.json({ message: "Total point updated successfully", isSuccess: 1 });
  } catch (error) {
    console.error("Error updating total point:", error);
    res
      .status(500)
      .json({ message: "Failed to update total point", isSuccess: 0 });
  }
};

const getUsersList = async (req, res) => {
  try {
    const users = await Users.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersTopRank = async (req, res) => {
  try {
    // Sử dụng phương thức sort để sắp xếp kết quả theo totalpoint giảm dần
    const users = await Users.find({}).sort({ totalpoint: -1 }).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", isSuccess: 0 });
    }

    // So sánh mật khẩu
    // const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (password != user.password) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", isSuccess: 0 });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({
      message: "Login successful",
      token: token,
      user: user,
      isSuccess: 1,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to log in", isSuccess: 0 });
  }
};

const changeInfo = async (req, res) => {
  const userId = req.params.id;
  const { fullName, email, password, gender, dob, phone } = req.body;
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", isSuccess: 0 });
    }

    // Kiểm tra xem email mới có đang được sử dụng bởi một người dùng khác hay không
    if (email && email !== user.email) {
      const emailExists = await Users.findOne({ email });

      if (emailExists) {
        return res
          .status(400)
          .json({ message: "Email already exists", isSuccess: 0 });
      }
    }

    // Cập nhật thông tin người dùng
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (phone) user.phone = phone;

    // Nếu mật khẩu được cung cấp, hash nó trước khi lưu
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    console.log(user);
    res.json({ message: "User info updated successfully", isSuccess: 1 });
  } catch (error) {
    console.error("Error updating user info:", error);
    res
      .status(500)
      .json({ message: "Failed to update user info", isSuccess: 0 });
  }
};
const deleteUserById = async function (req, res) {
  const { id } = req.params;
  try {
    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  login,
  register,
  changeInfo,
  getUsersList,
  getUsersTopRank,
  updateTotalPoint,
  getUserById,
  deleteUserById,
  getUserPoint,
};
