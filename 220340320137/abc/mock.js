const express = require('express');
const app = express();
const mysql = require('mysql2');

app.listen(90, ()=>{
console.log("listening to port 90");
});
app.use(express.static("abc"));

let dbpara ={
    host: 'localhost',
    user: 'yogesh',
    password: 'cdac',
    database: 'navimumbai',
	port:3306
}

const conn = mysql.createConnection(dbpara);

app.get("/getdetails",(req,resp)=>{
    console.log("in get details ");
    let bookid = req.query.bookid;
    console.log(bookid);

    console.log("connection succesfull");

    let output = {status:false, bookdetails:{bookid: 0, boookname:"",price:0}}
    conn.query('select * from book where bookid =?',[bookid],

    (error, rows)=>{
        if(error){
            console.log("some error"+error);

        }
        else{
            if(rows.length>0){
                output.status = true;
                output.bookdetails = rows[0];
            }
            else{
                console.log("book not found");
            }
        }
        resp.send(output);
    });


});

//----------------------------------------------------------------------

app.get("/updatedetails",(req,resp)=>{
    console.log("in update function");
    let bookdetails = {
        bookid:req.query.bookid, bookname:req.query.bookname, price:req.query.price
    }

    let output = {status:false}
    conn.query('update book set bookid =?,bookname=?, price=?',
    [bookdetails.bookid, bookdetails.bookname, bookdetails.price],
(error,res)=>{
    console.log(error);

}
else{
    if(res.affectedrows>0){
        console.log("update succesfull");
        output.status = true;

    }
    else{
        console.log("update failed");
    }
}
resp.send(output);
    

});


