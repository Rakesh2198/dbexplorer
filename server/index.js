const express = require('express')
const app  = express();
const mysql = require('mysql');
const bodyParser = require('body-parser') 
const cors = require('cors');

const db = mysql.createConnection({
    host: "localhost",
    user:"raki",
    password: "root",
    database : "demo1"
});

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}))

app.get('/api/get',(req, res) => {
    const sqldisplay= "show tables;";
    db.query(sqldisplay,(err,result)=> {
        res.send(result);
    });
});
    
app.get('/api/get/:TableName',(req, res) => {
    let name = req.params.TableName
       const sqldisplay= "SELECT * FROM  " + name + ";";
        db.query(sqldisplay,(err,result)=> { 
           let data = {tableData:result}
           const discomment = "select substring_index(table_comment,\';\',1) from information_schema.tables where table_name='" + name + "';";
            db.query(discomment,(err,result) => {
              data["comments"]= result
              res.send(data);
            });
           });    
        });

// app.get('/api/get/:TableName',(req, res1) => {
//     let name = req.params.TableName
//          const discomment = "select substring_index(table_comment,\';\',1) from information_schema.tables where table_name='" + name + "';";
//           db.query(discomment,(err,result1) => {
//               console.log(result);
//            // res1.send(result1);
           
//        });
// });      

app.listen(3001,() => {
    console.log('running on port 3001');
}); 