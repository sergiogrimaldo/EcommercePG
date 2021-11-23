const fetch =require
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Shoes } = require('./src/db.js');

// Syncing all the models at once.
'use strict';

const peticionApi = async function (){
  try{ //si no le ponía try and catch la promesa quedaba como unhandled
  const Api = fetch('./allShoes.json')
  
  const datosBd = Api.map(el =>{ //llamo una sola vez a la API y dejo toda la info en mi DB
    return {
      _id: el._id,
      description: el.description,
      colorWay: el.colorway || null,
      stock: el.stock || null,
      shoeName: el.shoeName,
      retailPrice: el.retailPrice || null,
      thumbnail: el.thumbnail,
      brand: el.brand,
      urlKey: el.urlKey
    }})
    //console.log(datosBd, 'hola2')
    const aux = await Shoes.bulkCreate(datosBd[1]) //guardando en la base de datos
    console.log(datosBd, 'hola2')
  }
  catch(error){ //aca agarro el error si existe
    console.log(error)
  }
} 

conn.sync({ force: false }).then(() => {
  //peticionApi()

  server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  }).then(()=>peticionApi())
  
  