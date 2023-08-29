const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'website_hotel'
});

connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối tới MySQL:', err);
    } else {
        console.log('Đã kết nối tới MySQL');
    }
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi');
})

//room
app.get('/api/room', (req, res) => {
    const query = 'SELECT * FROM room';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        } else {
            res.json(results);
        }
    })
})

app.post('/api/room', (req, res) => {
    const { roomname, type_id, people, size, image } = req.body;
    const query = 'INSERT INTO room(roomname,type_id, people, size, image) values(?,?,?,?,?)';
    connection.query(query, [roomname, type_id, people, size, image], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        } else {
            const insertedId = result.insertId;
            res.json({ message: 'Dữ liệu đã được thêm thành công', insertedId });
        }
    });
})

//typeroom
app.get('/api/typeroom', (req, res) => {
    const query = 'SELECT * FROM typeroom';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        } else {
            res.json(results);
        }
    })
})

//booking
app.get('/api/booking', (req, res) => {
    const query = 'SELECT * FROM booking';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        } else {
            res.json(results);
        }
    })
})

//customer
app.get('/api/customer', (req, res) => {
    const query = 'SELECT * FROM customer';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        } else {
            res.json(results);
        }
    })
})

app.post('/api/customer', (req, res) => {
    const { firstname, lastname, email, phone, city, request } = req.body;
    const query = 'INSERT INTO customer(firstname, lastname, email, phone, city, request) values(?,?,?,?,?,?)';
    connection.query(query, [firstname, lastname, email, phone, city, request], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        } else {
            const insertedId = result.insertId;
            res.json({ message: 'Dữ liệu đã được thêm thành công', insertedId });
        }
    });
})

app.listen(port, () => {
    console.log(`API đang chạy tại http://localhost:${port}`);
});