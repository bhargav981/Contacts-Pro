const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./db');

const app = express();
const port = process.env.PORT || 5000;
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());

app.post('/newCon', (req, res) =>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let pnum = req.body.pnum;
    let sql = "INSERT INTO contacts(fname,lname,pnum) VALUES (?,?,?)";
    connection.query(sql, [fname,lname,pnum], (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("added rows:", results.affectedRows);
    });

});

app.put('/cedit/:id', (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let pnum = req.body.pnum;
    let sql = `UPDATE contacts SET fname = ?, lname = ?, pnum = ? WHERE id = '${req.params.id}'`;

    connection.query(sql, [fname, lname, pnum], (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("updated rows:", results.affectedRows);
    });
    
});

app.delete('/del/:id', (req, res) => {
    let sql = `DELETE FROM contacts WHERE id = '${req.params.id}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("deleted rows", results.affectedRows);
    });
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

module.exports = app;