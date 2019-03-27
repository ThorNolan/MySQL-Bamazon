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
        message: "Ok big shot, what would you like to do now that you're the manager?",
        choices: [
          "View products for sale",
          "View low inventory",
          "Restock items",
          "Add a new product"
        ]
    })
    .then(function(userChoice) {
        // ...and call further functions depending on their choice
        switch (userChoice.action) {
            case "View products for sale":
            displayProducts();
            break;
    
            case "View low inventory":
            viewLowStock();
            break;
    
            case "Restock items":
            addStock();
            break;
    
            case "Add a new product":
            addNewProduct();
            break;
        }
    });
}

// ============================= MAIN PROCESS =====================================

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the manager prompt function to ask user what they would like to do
    managerPrompt();
});