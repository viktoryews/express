const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

let countHome = 0;
let countAbout = 0;

const pathHome = path.join(__dirname, 'countHomeJson.json');
const pathAbout = path.join(__dirname, 'countAboutJson.json');

const loadDataFronJsonFile = () => {
    try{
    const loadCountHome = fs.readFileSync(pathHome, 'utf-8');
    const loadCountAbout = fs.readFileSync(pathAbout, 'utf-8');

    countHome = JSON.parse(loadCountHome).value || 0;
    countAbout = JSON.parse(loadCountAbout).value || 0;
    } catch(error) {
        console.error(error.message);
    }
};

loadDataFronJsonFile();

app.get('/', (req, res) => {
    countHome++;
  const  countHomeJson = {
        key: '/',
        value: countHome
    };
    fs.writeFileSync(pathHome, JSON.stringify(countHomeJson, null, 2));
    res.send(`
    <h1>Корневая страница</h1>
    <br/>
    <p>Просмотров: ${countHome}</p>
    <br/>
    <a href='/about'>Ссылка на страницу /about</a>
    `);
});

app.get('/about', (req, res) => {
    countAbout++;
   const countAboutJson = {
        key: '/about',
        value: countAbout
    };
    fs.writeFileSync(pathAbout, JSON.stringify(countAboutJson, null, 2));
    res.send(`
    <h1>Страница about</h1>
    <br/>
    <p>Просмотров: ${countAbout}</p>
    <br/>
    <a href='/'>Ссылка на страницу /</a>
    `);
});

app.listen(3000);