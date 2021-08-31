const fs = require('fs');
const faker = require('faker/locale/ru');
const { random } = require('faker');
const dir = 'db/';

const CITYS = "CITYS";

const randomNumber = (max) => Math.floor(Math.random() * max);

// MODELS
const city = (obj) => {
    const {cityName, citySuffix} = faker.address;
    const {name, regionId, id} = obj;
    return ({
        id: id ?? randomNumber(90),
        title: name ?? cityName(),
        regionId: regionId ?? randomNumber(90),
        cityClinicLevels: [
         { id: 1, title: '1' },
         { id: 2, title: '2' },
        ],
        regionClinicLevels: [
         { id: 1, title: '1' },
         { id: 2, title: '2' },
        ],
    });
};

// METHODS
const getRandomCitysArray = (count = 10) => {

    const arr = [];

    for (let i = 0; i < count; i++) {
        arr.push(city({id: i}));
    }

    return arr;
}

const json = getRandomCitysArray();

// DB METHODS
const updateCitys = () => fs.writeFileSync(dir + `${CITYS}.json`, JSON.stringify(json));

const getCitys = (name = "") => new Promise((res, rej) => {
    fs.readFile(dir + `${CITYS}.json`,{encoding: "utf-8"}, (err,data) => {
        if (!err) {
             const jsObj = JSON.parse(data);
             const reg = new RegExp("^" + name, "ig");
             const _data = !name ? jsObj : jsObj.find(({title}) => title.match(reg));

             res(_data ?? []) ;
        } else {
            rej(err)
        }
    });
});

module.exports = {
    updateCitys, 
    getCitys
} 