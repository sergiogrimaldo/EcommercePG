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
const { conn, Shoes, Color, Brand } = require('./src/db.js');

// Syncing all the models at once.
'use strict';

const peticionApi = async function (){
  try{ 
  const Api = fetch('./allShoes.json')
  
  //Recorro el archivo AllShoes y dejo solo las propiedades que me interesan
  const datosBd = Api.map(async (el) =>{ 
    
    const {description, colorway, shoeName, retailPrice, thumbnail, brand, urlKey} = el
    for (color of Array.from(new Set(colorway.split('/')))){
      await Color.findOrCreate({where:{'name':color}})
    }
    //console.log(brand)

    console.log(await Brand.findAll({where:{name:brand}}) )
    if ((await Brand.findAll({where:{name:brand}}).length == 0) ) {
      await Brand.create({name:brand}) 
    } 

    return {
      description: description || undefined,
      colorWay: colorway || undefined,
      stock: Math.random()*15,
      shoeName: shoeName,
      retailPrice: retailPrice || undefined,
      thumbnail: thumbnail,
//      brand: brand,
      urlKey: urlKey
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
  }).catch((e) => console.log(e))
   .then(()=>peticionApi()).catch(e => (console.log(e)))
  
  