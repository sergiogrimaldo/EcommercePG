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
const fetch =require
const server = require('./src/app.js');
const { conn, Shoes } = require('./src/db.js');

// Syncing all the models at once.
'use strict';

const peticionApi = async function (){
  try{ 
  const Api = fetch('./allShoes.json')
  
  //Recorro el archivo AllShoes y dejo solo las propiedades que me interesan
  const datosBd = Api.map(el =>{ 
    return {
      description: el.description || undefined,
      colorWay: el.colorway || undefined,
      stock: Math.random()*15,
      shoeName: el.shoeName,
      retailPrice: el.retailPrice || undefined,
      thumbnail: el.thumbnail,
      brand: el.brand,
      urlKey: el.urlKey
    }})
    

    // guardando en la base de datos
    await Shoes.bulkCreate(datosBd) 
    
  }
  catch(error){ //aca agarro el error si existe
    console.log(error)
  }
} 

conn.sync({ force: true }).then(() => {
// conn.sync().then(() => {
  server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  }).then(()=>peticionApi())
  
  