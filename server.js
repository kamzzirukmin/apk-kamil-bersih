const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Server Kamil jalan! Ini server bersih, bukan bug.');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login berhasil, selamat datang ' + user.username });
  } else {
    res.json({ success: false, message: 'Username / password salah' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Jalan di port ' + PORT));
