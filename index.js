const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const secretKey = 'your-secret-key';

app.use(express.json());

function authorizeToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
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
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ username }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Gagal login' });
    }
});

app.get('/protected', authorizeToken, (req, res) => {
    res.json({ message: 'Anda memiliki akses ke halaman yang dilindungi' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
