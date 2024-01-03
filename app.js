const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users/signup/', (req, res) => {
    const { email, name, password } = req.body;

    const userData = { email, name, password };

    res.json({ success: true, data: userData });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
