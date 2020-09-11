const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new customer
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email cannot be empty!",
    });
    return;
  }
  var customer = {};
  const getcustomer = await Customer.findOne({
    where: { Email_id: req.body.email },
  });
  console.log(getcustomer);
  if (getcustomer === null) {
    customer = {
      Email_Id: req.body.email,
    };
  } else {
    customer = {
      Email_Id: req.body.email,
      Chat:
        getcustomer.Chat === null
          ? req.body.chat
          : getcustomer.Chat + "\n" + req.body.chat,
    };
    Customer.destroy({
      where: {
        Email_Id: req.body.email,
      },
    });
  }
  // Save customer in the database
  Customer.create(customer)
    .then((data) => {
      res.redirect("/home");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};
