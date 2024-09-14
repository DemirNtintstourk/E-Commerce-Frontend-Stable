const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

//Demir Dinçtürk E-ticaret sitesi.
//https://github.com/DemirNtintstourk

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

app.get('/api/check-email', async (req, res) => {
  try {
    const { email } = req.query;
    console.log('E-posta kontrol isteği:', email);

    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    const exists = users.some(user => user.email === email);
    
    console.log('E-posta mevcut mu:', exists);
    res.json({ exists });
  } catch (error) {
    console.error('E-posta kontrol hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    console.log('Kayıt isteği alındı:', req.body);

    const { name, email, password } = req.body;
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);

    if (users.some(user => user.email === email)) {
      console.log('E-posta zaten mevcut');
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    users.push({ name, email, password });
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    console.log('Yeni kullanıcı eklendi');
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});


app.get('/api/test', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});