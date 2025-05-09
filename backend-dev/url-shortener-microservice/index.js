require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(express.urlencoded({extended: true}));

const dns = require('dns');
const urls = [];
let counter = 1;

app.post('/api/shorturl', (req, res) => {
  let url = req.body.url;
  
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return res.json({"error": "invalid url"})
  }

  dns.lookup(hostname, (err) => {
    if (err) return res.json({"error": "invalid url"});
    
    // if visited before
    const found = urls.find(entry => entry.original_url == url);
    if (found) return res.json(found);

    const short_url = counter++;
    const newEntry = {"original_url": url, "short_url": short_url}
    urls.push(newEntry);
    res.json(newEntry);
  })
})

app.get('/api/shorturl/:shorturl', (req, res) => {
  const short_url = req.params.shorturl;
  const entry = urls.find(item => item.short_url == short_url);
  
  if (entry) {
    res.redirect(entry.original_url);
  } else {
    res.json({ error: 'No short URL found for given input' });
  }
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
