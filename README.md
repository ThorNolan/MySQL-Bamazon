MySQL-Bamazon
====================================================
A command line interface storefront app I made for my full-stack coding bootcamp. It uses a MySQL database on the back-end to store its product information, and relies on the npm [inquirer](https://www.npmjs.com/package/inquirer) package to display prompts and track user choices as well as the [mysql](https://www.npmjs.com/package/mysql) package to establish database connectivity. I also utilized the [cli_table2 package](https://www.npmjs.com/package/cli-table2) to organize the inventory into more readable tables within the command line. 

## How to Deploy the App:

This app requires a functional MySQL database to connect to in order to run. If you do not have MySQL already downloaded, you will need to download it before proceeding ([download can be found here](https://dev.mysql.com/doc/refman/5.6/en/installing.html)). Once you have a database and have established a connection to it, you can run the code found in [schema.sql](schema.sql) in your MySQL workbench to populate your database with products. The app also relies on Node.js for it's server environment, which can be downloaded [here](https://nodejs.org/en/). Now you're ready to move on to the next steps:

1. Clone this repository down to your machine: https://github.com/ThorNolan/MySQL-Bamazon.git
   
2. Run `npm install` in your command line to download the required packages
   
3. Run either the customer or manager JavaScript file ⤵️


## Two options: Customer and Manager Views

**_Customer view:_** 

1. At the command prompt, enter `node bamazonCustomer.js`, which will bring up the prompt asking you what you would like to do.

2. Customers can view all available products, and choose which one they would like to buy. To do this, they will be prompted to enter the ID number of the item and the quantity.

3. If they enter a number higher than the remaining stock of the product, they will be prompted to enter a different amount.

![customer demo gif](/customer-demo.gif "Customer view demo GIF")

**_Manager view:_** 

1. At the command prompt, enter `node bamazonManager.js`, which will give you a selection of four _managerial_ tasks to choose from.
   
2. Managers can view all products currently for sale, view low stock items (anything with less than 5 units remaining in the database), add stock to any existing item, and add an entirely new product into the database.
   
3. The database will be updated dynamically based on which choice the user has made, so product stock will be adjusted based on previous actions. 

![manager demo gif](/manager-demo.gif "Manager view demo GIF")
   

## Technologies Used:

+ Logic for the app was written with **JavaScript**.
  
+ **MySQL** for database storage and manipulation. 
  
+ **Node.JS** for the app's server environment.
  
+ **NPM** for installation of the packages required by the app, **inquirer**, **mysql**, and **cli_table2**.

## Author

Thor Nolan
