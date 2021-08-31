const express = require('express')
const app = express()
const port = 3001
const {updateCities, getCities, getCalc} = require('./db.js')
const log = console.log;
 
// updateCities();

app.get('/cities', async (req, res) => {
  const {title} = req.query;
  const cities = await getCities(title ?? false);
  res.send(cities);
});

app.get('/calc', async (req, res) => {
  const calc = await getCalc();
  res.send(calc);
});
 

app.listen(port, () => {
    log('\t\t\t')
    log('\x1b[33m%s\x1b[0m',`API HERE 👉 http://localhost:${port}`)
    log('\x1b[32m%s\x1b[0m','[GET]',`👉 http://localhost:${port}/cities`)
    log('\x1b[32m%s\x1b[0m','[GET]',`👉 http://localhost:${port}/cities?title='Тв'`)
    log('\x1b[32m%s\x1b[0m','[GET]',`👉 http://localhost:${port}/calc`)
})