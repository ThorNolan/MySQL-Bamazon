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


// function to retrieve and display all products in the bamazon products table
function displayProducts() {

    console.log("Welcome to Bamazon 👋. Here's everything we have on sale: \n")

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
            logString += "Stock: " + data[i].stock_quantity + " || ";

            // log the string once it's been completed
            console.log(logString);
        }
        console.log("\n==============💸================💸=================💸=================💸==========\n")
        // call my prompt function to begin asking user which item they would like to buy
        promptUser();
    });
}

// function to prompt my user and ask which item they would like to purchase from the products list and how many they want
function promptUser() {

    // begin my inquirer prompt
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What's the ID number of the item you'd like to purchase?",
            // validate input to make sure user entered a number
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like?",
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        }
    ]).then(function(input) {

        // store user choices in local variables
        var itemID = input.item_id;
        var quantity = input.quantity;
        
        connection.query(
            // select the product that matches the ID number the user entered
            "SELECT * FROM products WHERE ?", 
            {item_id: itemID}, 

        function(err, data) {
            // account for potential errors
            if (err) throw err;

            // if user fails to enter a number, ask them to try again and reset
            if (data.length === 0) {
				console.log("❌ Please enter a valid item ID! ❌ ");
				displayProducts();
			} else {
                // store relevant product data in a local variable
                var productInfo = data[0];

                // if user's quantity input is equal to or less than the stock of the item
                if (quantity <= productInfo.stock_quantity) {
                    // query and update my database to adjust stock
                    connection.query(
                        "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE ?", 
                        {item_id: itemID},

                    function(err, data) {
						if (err) throw err;

                        // display order information to my user in the console
                        console.log("Order placed for (" + quantity + ") " + productInfo.product_name + " ✔️");
                        console.log("Your total: 💲 " + productInfo.price * quantity);
                        console.log("\n==============💸================💸=================💸=================💸==========\n")

						// end connection to my database
						connection.end();
					})

                } else {
                    console.log("\n⚠️  Sorry, we don't have enough of that item in stock to complete your order. Try a different amount! ⚠️");
                    console.log("\n=============================================================\n");

                    // run my prompt again from the beginning so user can enter a different amount
					promptUser();
                }   
            }    
        });    
    });    
}


// ============================= MAIN PROCESS =====================================

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to begin displaying products
    displayProducts();
});
  