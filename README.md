MySQL-Bamazon
====================================================
A command line interface storefront app I made for my full-stack coding bootcamp. It uses a MySQL database on the back-end to store its product information, and relies on the npm [inquirer](https://www.npmjs.com/package/inquirer) package to display prompts and track user choices as well as the [mysql](https://www.npmjs.com/package/mysql) package to establish database connectivity. 

## How to Deploy the App:

This app requires MySQL database in order to run. If you do not have MySQL already downloaded, you will need to download it before proceeding ([download can be found here](https://dev.mysql.com/doc/refman/5.6/en/installing.html)). Once you have a database and have established a connection to it, you can run the code found in [schema.sql](schema.sql) in your MySQL workbench to populate your database with products. Now you can move on to the next steps:

1. Clone this repository down to your machine: https://github.com/ThorNolan/MySQL-Bamazon.git
   
2. Run `npm install` in your command line to download the required packages
   
3. At the command prompt, enter `node bamazonCustomer.js`, which will bring up the prompt asking you what you would like to do.
   

## Technologies Used:

+ Logic for the app was written with **JavaScript**.
  
+ **MySQL** for database storage and management. 
  
+ **Node.JS** for the app's server environment.
  
+ **NPM** for installation of the packages required by the app, **inquirer** and **mysql**.

## Bamazon in action: 

![demo gif](/LIRI-Bot-demo.gif "Demo GIF")

## Author

Thor Nolan
