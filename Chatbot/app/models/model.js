module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    Email_Id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Chat: {
      type: Sequelize.STRING,
    },
  });
  return Customer;
};
