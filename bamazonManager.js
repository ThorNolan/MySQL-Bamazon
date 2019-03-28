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
        message: "Alright big shot, what's next on the managers' agenda? 📊 ",
        choices: [
          "View products for sale 👁‍",
          "View low inventory ⚠️",
          "Restock items ➕",
          "Add a new product 🆕"
        ]
    })
    .then(function(userChoice) {
        // ...and call further functions depending on their choice
        switch (userChoice.action) {
            case "View products for sale 👁‍":
            displayProducts();
            break;
    
            case "View low inventory ⚠️":
            viewLowStock();
            break;
    
            case "Restock items ➕":
            addStock();
            break;
    
            case "Add a new product 🆕":
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

    console.log("\nHere's our current inventory, manager. Everything looking good? 👌\n")

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
        console.log("\n==============💸================💸=================💸=================💸==========\n");
        // call my manager prompt function so user can choose another action
        managerPrompt();
    });
}

// function that allows manager to see all products with less than 5 in stock
function viewLowStock() {

    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", 
    function(err, data) {
        // account for potential errors
		if (err) throw err;

		console.log("⚠️  5 or less of these HOT items remaining, they're FLYING off the shelves ⚠️\n");

		var logString = "";
		for (var i = 0; i < data.length; i++) {
			logString = "";
			logString += "Item ID: " + data[i].item_id + "  ||  ";
			logString += "Product: " + data[i].product_name + "  ||  ";
			logString += "Department: " + data[i].department_name + "  ||  ";
            logString += "Price: $" + data[i].price + " || ";
            logString += "Stock: " + data[i].stock_quantity + " || ";

			console.log(logString);
		}

        console.log("\n==============💸================💸=================💸=================💸==========\n");

		// call managerPrompt function so that user can choose another option
		managerPrompt();
	})
}

// function to add stock to an existing item in the database and update database to reflect new stock
function addStock() {

    // begin with inquirer prompt to ask for an item ID and how many the manager would like to add to it
    inquirer.prompt([
		{
			type: "input",
			name: "itemID",
			message: "Enter the ID number of the item you'd like to restock:",
			// validate input to make sure user entered a number
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            },
            filter: Number
		},
		{
			type: "input",
			name: "number",
			message: "How many of that item would you like to add?",
			validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            },
            filter: Number
		}
	]).then(function(input) {

        var itemID = input.itemID;
        var number = input.number;

        connection.query(
            "SELECT * FROM products WHERE ?", 
            {item_id: itemID}, 
        function(err, data) {
            //account for potential errors or incorrect item ID's
			if (err) throw err;

            if (data.length === 0) {
                console.log("❌ Please enter a valid item ID! ❌ ");
                // reset if user entered an invalid item ID
				addStock();

			} else {

                // store relevant product data in a local variable
                var productInfo = data[0];

                console.log("Updating...\n")

                // connect to my database and update it to reflect new values
                connection.query(
                    "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity + number) + " WHERE item_id = " + itemID, 
                    {item_id: itemID}, 
                function(err, data) {
                    if (err) throw err;

                    // let the user know that they successfully restocked and show updated numbers
                    console.log("\nNicely done! The item with an ID of " + itemID + " now has " + (productInfo.stock_quantity + number) + " in stock ✔️\n")

                    managerPrompt();
                }) 
            }
        });       
    });     
};

// function to allow user to add a completely new product and update database to include it
function addNewProduct() {

    // prompt to get each part of the new item
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "Product name: "
        },
        {
            type: "input",
            name: "department_name",
            message: "Department: "
        },
        {
            type: "input",
            name: "price",
            message: "Price per unit: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            },
            filter: Number
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "Number in stock: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            },
            filter: Number
        }
    ]).then(function(input) {

        // update my database to reflect the addition of the new item
        connection.query(
           "INSERT INTO products SET ?",
           input,
        function (error, results) {
            if (error) throw error;

            console.log("\n🆕  NEW ITEM ADDED: 🆕\n")
            console.log("Product Name: " + input.product_name + "\n" + "Department: " + input.department_name + "\n" + "Price per unit: " + input.price + "\n" + "Number in stock: " + input.stock_quantity + "\n");

            // run managerPromp so user can choose another action
            managerPrompt();
        });
    });
}


// ============================= MAIN PROCESS =====================================

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the manager prompt function to ask user what they would like to do
    managerPrompt();
});