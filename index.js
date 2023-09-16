const express = require('express');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const secretKey = process.env.SECRETKEY
app.use(express.json());

const Service = require('./service')

function authorizeToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(403).json({ message: 'Tidak ada token tersedia' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid' });
        }
        req.user = user;
        next();
    });
}

app.post('/login', (req, res) => {
    const { username } = req.body;

    if (username === process.env.USER) {
        const token = jwt.sign({ username }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Gagal login' });
    }
});

app.get('/account', authorizeToken, async (req, res) => {
    const AccountInformation = await Service.Account();
    console.log(AccountInformation)
    res.json({ message: AccountInformation });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
