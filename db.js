const fs = require('fs');
const faker = require('faker/locale/ru');
const { random } = require('faker');
const dir = 'db/';

const CITIES = "CITIES";
const CALCSTUFF = "CALCSTUFF";
  
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
const getRandomCitiesArray = (count = 10) => {

    const arr = [];

    for (let i = 0; i < count; i++) {
        arr.push(city({id: i}));
    }

    return arr;
}

const json = getRandomCitiesArray();

// DB METHODS
const updateCities = () => fs.writeFileSync(dir + `${CITIES}.json`, JSON.stringify(json));

const getCities = (name = "") => new Promise((res, rej) => {
    fs.readFile(dir + `${CITIES}.json`,{encoding: "utf-8"}, (err,data) => {
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
const getCalc = (name = "") => new Promise((res, rej) => {
    fs.readFile(dir + `${CALCSTUFF}.json`,{encoding: "utf-8"}, (err,data) => {
        if (!err) {
             const jsObj = JSON.parse(data);
             res(jsObj ?? []) ;
        } else {
            rej(err)
        }
    });
});

module.exports = {
    updateCities, 
    getCities, 
    getCalc
} 