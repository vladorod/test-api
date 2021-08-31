const express = require('express')
const app = express()
const port = 3001
const {updateCitys, getCitys} = require('./db.js')
const log = console.log;
 
app.get('/citys', async (req, res) => {
  const {title} = req.query;
  const citys = await getCitys(title ?? false);
  res.send(citys);
});
 

app.listen(port, () => {
    log('\t\t\t')
    log('\x1b[33m%s\x1b[0m',`API HERE 👉 http://localhost:${port}`)
    log('\x1b[32m%s\x1b[0m','[GET]',`👉 http://localhost:${port}/citys`)
    log('\x1b[32m%s\x1b[0m','[GET]',`👉 http://localhost:${port}/citys?title='Тв'`)
})