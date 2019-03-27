// ============================== VARIABLES ===================================

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

// ============================== FUNCTIONS =======================================

// function to ask user which managerial task they would like to do...
function managerPrompt() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "Ok big shot, what'll it be now that you're the manager? 📊 ",
        choices: [
          "View products for sale $",
          "View low inventory -",
          "Restock items +",
          "Add a new product ^"
        ]
    })
    .then(function(userChoice) {
        // ...and call further functions depending on their choice
        switch (userChoice.action) {
            case "View products for sale $":
            displayProducts();
            break;
    
            case "View low inventory -":
            viewLowStock();
            break;
    
            case "Restock items +":
            addStock();
            break;
    
            case "Add a new product ^":
            addNewProduct();
            break;

            // default to running the prompt again if user fails to choose
            default:
            managerPrompt();
            break;
        }
    });
}


// function to retrieve and display all products in the bamazon products table
function displayProducts() {

    console.log("Here's our current inventory, manager. Everything looking good? \n")

    connection.query(
        "SELECT * FROM products", 
    function(err, data) {
        // account for potential errors
        if (err) throw err;

        var logString = "";

        // concatenate the string I'm going to print to the console for each product...
		for (var i = 0; i < data.length; i++) {
			logString = "";
			logString += "Item ID: " + data[i].item_id + "  ||  ";
			logString += "Product: " + data[i].product_name + "  ||  ";
			logString += "Department: " + data[i].department_name + "  ||  ";
            logString += "Price: $" + data[i].price + " || ";
            logString += "Stock: " + data[i].stock_quantity + "\n";

            // log the string once it's been completed
            console.log(logString);
        }
        console.log("==============================================================================\n")
        // call my manager prompt function so user can choose another action
        managerPrompt();
    });
}

// function that allows manager to see all products with less than 5 in stock
function viewLowStock() {

}


// ============================= MAIN PROCESS =====================================

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the manager prompt function to ask user what they would like to do
    managerPrompt();
});