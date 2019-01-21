var mysql = require("mysql");
var inquirer = require("inquirer")
var express = require("express");

var app = express();

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Sterling1983",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");


});


function startUp() {
    inquirer.prompt([{
            type: "list",
            message: "Which product would you like to purchase from the list above? ",
            name: "product_name",
            choices: ["bananas", "oranges", "milk", "bread", "toothpaste", "dog food", "frozen pizza", "tampons", "ice cream", "popcorn"]

        },

        {
            type: "input",
            message: "How many would you like to purchase from stock?",
            name: "stock_quantity",
            filter: Number
        }
    ]).then(function (input) {
        var query = "SELECT stock_quantity, price, product_name FROM BAMAZON.PRODUCTS ";
        query += "WHERE product_name = ?";
        connection.query(
            query,
            input.product_name,
            function (err, res) {
                
                if (err) throw err;
                var requestedQTY = parseInt(input.stock_quantity);
                var currentStock = parseInt(res[0].stock_quantity);
                var selectedItem = res[0].product_name;
                var itemPrice = res[0].price
                if (requestedQTY > currentStock) {
                    if (currentStock > 0) {
                        console.log("Sorry! You requested " + (requestedQTY) + " of the " + (selectedItem) + "(s), but there is only " + (currentStock) + " available.");
                    } 
                    else{
                
                            console.log("The query is working...")
                            var newQTY = currentStock - requestedQTY;
                           
                            updateQuantity(newQTY,selectedItem);
                            console.log("───────────────────────────────────────");
                            console.log(requestedQTY + " - " + selectedItem + ": $" + itemPrice.toFixed(2));
                            console.log("---------------------------------------")
                            console.log("Your total purchase price is: $" + totalCost(requestedQTY, parseFloat(itemPrice)));
                            console.log("───────────────────────────────────────");
                        
                    }
                }

            })
    })
}


function updateQuantity(newQTY, selectedItem) {
    var query  = "UPDATE bamazon.products ";
        query += "SET stock_quantity = ? ";
        query += "WHERE product_name = ?";
    connection.query(
      query,
      [newQTY,selectedItem],
      function (err, res) {
        if (err) throw err;
      }
    );
}




function showall() {
    var query = "SELECT * FROM BAMAZON.PRODUCTS";
    connection.query(query, function (err, res) {
        if (err) {
            console.log(err)
        };
        for (i = 0; i < res.length; i++) {
            console.log("This is the result:" + "\n" +
                "ID: ", res[i].item_id + "\n",
                "Product: ", res[i].product_name + "\n",
                "Department: ", res[i].department_name + "\n",
                "Price: ", res[i].price + "\n",
                "Quantity in stock: ", res[i].stock_quantity + "\n",

                "_____________________________"
            );
        }
        startUp();
    });

}




showall();
// startUp();