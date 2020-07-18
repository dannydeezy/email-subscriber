require('dotenv').config()
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path');
const https = require('https');
const port = process.env.PORT || 3000
app.use(express.urlencoded());

app.get('/subscribe/dannydiekroeger', (req, res) => {
    res.sendFile(path.join(__dirname, './client', 'signup.html'))
})

app.post('/subscribe/dannydiekroeger', async (req, res) => {
    await sleep(100)
    try {
        if (!req.body || !req.body.email || !validateEmail(req.body.email)) {
            throw new Error()
        }
        fs.writeFileSync(`./emails/${req.body.email}`)
        res.sendFile(path.join(__dirname, './client', 'success.html'))
    } catch (err) {
        return res.sendFile(path.join(__dirname, './client', 'failure.html'))
    }
})

app.get('/baby.gif', (req, res) => {
    res.sendFile(path.join(__dirname, './client', 'baby.gif'))
})

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, './client', 'styles.css'))
})

if (process.env.SECURE) {
    https.createServer({
        key: fs.readFileSync(process.env.CERT_KEY),
        cert: fs.readFileSync(process.env.CERT),
    }, app)
    .listen(port, () => console.log(`Listening at http://localhost:${port}`))
} else {
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}



function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   