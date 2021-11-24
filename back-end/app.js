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

app.get('/contacts', (req, res) => {
    let sql = "SELECT * FROM contacts";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/contacts/:id', (req, res) => {
    let sql = `SELECT * FROM contacts WHERE id = '${req.params.id}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/groups', (req, res) => {
    let sql = "SELECT * FROM grps";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/grp_contacts/:id_grp', (req, res) => {
    let sql = `SELECT contacts.* FROM contacts
    JOIN grp_cons ON contacts.id = grp_cons.contact
    WHERE grp_cons.id_grp = '${req.params.id_grp}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/contacts', (req, res) =>{
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

app.post('/groups', (req, res) =>{
    let grp_name = req.body.grp_name;
    let sql = "INSERT INTO grps(grp_name) VALUES (?)";
    connection.query(sql, [grp_name], (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("added rows:", results.affectedRows);
    });
});

app.put('/contacts/:id', (req, res) => {
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

app.put('/groups/:id', (req, res) =>{
    let grp_name = req.body.grp_name;
    let sql = `UPDATE grps SET grp_name = ? WHERE id_grp = '${req.params.id}'`;

    connection.query(sql, [grp_name], (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("updated rows:", results.affectedRows);
    });
});

app.delete('/contacts/:id', (req, res) => {
    let sql = `DELETE FROM contacts WHERE id = '${req.params.id}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("deleted rows", results.affectedRows);
    });
});

app.delete('/groups/:id', (req, res) => {
    let sql = `DELETE FROM grps WHERE id_grp = '${req.params.id}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("deleted rows", results.affectedRows);
    });
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

module.exports = app;