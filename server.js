const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_management2'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// API routes
app.get('/students', (req, res) => {
    let sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/students', (req, res) => {
    let student = req.body;
    let sql = 'INSERT INTO students SET ?';
    db.query(sql, student, (err, result) => {
        if (err) throw err;
        res.send({message: 'Student added', id: result.insertId});
    });
});

app.put('/students/:id', (req, res) => {
    let student = req.body;
    let sql = `UPDATE students SET ? WHERE id = ${req.params.id}`;
    db.query(sql, student, (err, result) => {
        if (err) throw err;
        res.send({message: 'Student updated'});
    });
});

app.delete('/students/:id', (req, res) => {
    let sql = `DELETE FROM students WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({message: 'Student deleted'});
    });
});
// API for classes
app.get('/classes', (req, res) => {
    let sql = 'SELECT * FROM classes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/classes', (req, res) => {
    let newClass = req.body;
    let sql = 'INSERT INTO classes SET ?';
    db.query(sql, newClass, (err, result) => {
        if (err) throw err;
        res.send({ message: 'Class added', id: result.insertId });
    });
});

app.get('/teachers', (req, res) => {
    let sql = 'SELECT * FROM teachers';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/teachers', (req, res) => {
    let newTeacher = req.body;
    let sql = 'INSERT INTO teachers SET ?';
    db.query(sql, newTeacher, (err, result) => {
        if (err) throw err;
        res.send({ message: 'Teacher added', id: result.insertId });
    });
});
// Repeat similar API endpoints for departments, teachers, and subjects
app.get('/departments', (req, res) => {
    let sql = 'SELECT * FROM departments';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/departments', (req, res) => {
    let newDepartment = req.body;
    let sql = 'INSERT INTO departments SET ?';
    db.query(sql, newDepartment, (err, result) => {
        if (err) throw err;
        res.send({ message: 'Department added', id: result.insertId });
    });
});

app.get('/subjects', (req, res) => {
    let sql = 'SELECT * FROM subjects';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/subjects', (req, res) => {
    let newSubject = req.body;
    let sql = 'INSERT INTO subjects SET ?';
    db.query(sql, newSubject, (err, result) => {
        if (err) throw err;
        res.send({ message: 'Subject added', id: result.insertId });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
