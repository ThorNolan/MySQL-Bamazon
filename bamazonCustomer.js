// require my dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// establish connection to my mySQL database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "Bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to begin displaying products
  displayProducts();
});

function displayProducts() {

    console.log("Here's what we got: \n")

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        var  logObject = "";
		for (var i = 0; i < results.length; i++) {
			logObject = "";
			logObject += "Item ID: " + results[i].item_id + "  //  ";
			logObject += "Product Name: " + results[i].product_name + "  //  ";
			logObject += "Department: " + results[i].department_name + "  //  ";
			logObject += "Price: $" + results[i].price + "\n";

			console.log(logObject);
		}
    });
}
