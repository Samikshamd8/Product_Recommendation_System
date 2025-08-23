require("dotenv").config();
let mysql= require("mysql2");
let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"ProductRecomDB;",
});
conn.connect((err)=>{
    if(err)
    {
            console.log("Database not connected");
    }
    else 
    {
            console.log("Database Connect");
    }
});