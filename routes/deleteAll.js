require("dotenv").config();
const { user } = require("../models");

const deleteAllRouter = async (req, res) => {
  try {
    await user.destroy({
      where: {},
      truncate: true,
    });
  } catch (error) {
    console.log(error);
  }

  res.json({ message: "Successfully deleted all user records" });
};

module.exports = deleteAllRouter;
