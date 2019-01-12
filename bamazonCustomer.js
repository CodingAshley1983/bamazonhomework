var mysql = require("mysql");
var inquirer =require("inquirer")

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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");


});

function startUp(){
    inquirer.prompt([
        {
        type: "list",
        message: "Choose which product you'd like",
        name: "command",
        choices: ["bananas", "oranges", "milk","bread", "toothpaste", "dog food", "frozen pizza", "tampons", "ice cream","popcorn"]
    },
    {
        type: "input",
        message: "How many would you like?",
        name: "quantity"

    }
    ]).then(function(answers){
        console.log(answers)
        switch(answers.command){
        case "bananas":
        bananas();
        break;
        case "oranges":
        oranges();
        break;
        case "milk":
        milk();
        break;
        case "bread":
        bread();
        break;
        case "toothpaste":
        toothpaste();
        break;
        case "dog food":
        dogfood();
        break;
        case "frozen pizza":
        frozenpizza();
        break;
        case "tampons":
        tampons();
        break;
        case "ice cream":
        icecream();
        break;
        case "popcorn":
        popcorn();
        break;



        }
    
    });
}

function showall(){
    var query= "SELECT * FROM BAMAZON.PRODUCTS";
        connection.query(query, function(err, res, fields){
            if(err) throw err;
            console.log("This is the result: ",res,"\n","\n"," this is the end of the result");
            
                // console.log("ID: ", res.item_id +"\n",
                // "Product: ", res.product_name+"\n",
                // "Department: ", res.department_name+"\n",
                // "Price: ", res.price+"\n",
                // "Quantity in stock: ", res.stock_quantity+"\n",
                
                // "_____________________________"
                // )
            // }
             
        });
    }
 


// function reduce(){
    //create a function that will decrease "--"the available stock_quantity of any item by the number indicated 
    //in the second inquirer prompt ("How many would you like to purchase"). this will need to actually remove 
    //the item from the stock in the database.
// }


// function groceryCheck(){
//     //this will be a catch-all checking feature to read the stock_quantity of the item supplied
//     //it needs to take in the selected search term and search for it and needs to 
//     //swap out based on the item chosen by the buyer


// }
showall();

