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
var fs = require('fs')
const server = require('./src/app.js');
const { conn, Shoe, Color, Brand, AvaiableSizes,Role } = require('./src/db.js');

// Syncing all the models at once.
'use strict';

const createRoles = async function(){
  await Role.create()
  await Role.create({name:'admin'})
}

const peticionApi = async function (){

  if ((await Shoe.findAll()).length > 0 ){
    return (console.log('Shoes already in Database'))
  } else {
  try{ 
  // const Api = fetch('./allShoes.json').then(res=> res.json()).catch((e) => console.log(e))
    let allShoes = require('./allShoes.json')

  for (let x = 0; x < allShoes.length; x++){

    let {description,resellPrices, colorway, shoeName, retailPrice, thumbnail, brand, urlKey} = allShoes[x]
    await Brand.findOrCreate({where:{'name':brand || 'none'}})
    let brandeses = await Brand.findOne({where:{'name':brand}})


    
    let shoe = await Shoe.create({
      description: description || undefined,
       //colorWay: colorway || undefined,
       stock: Math.round(Math.random()*15),
       shoeName: shoeName,
       retailPrice: retailPrice || Math.round(Math.random()*400),
       thumbnail: thumbnail,
      //brand: brand,
      urlKey: urlKey
    })

    //console.log(shoe)
    
    for (color of (colorway.split('/'))){
    //console.log(color)
    await Color.findOrCreate({where:{'name':color}})
    let coloreses = await Color.findOne({where:{'name':color}})
    await shoe.addColor(coloreses)
    }

    //console.log(brandeses)
    await shoe.setBrand(brandeses)

    // 4, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5
    let talles = {
     '4':0,
     '5':0,
     '6':0,
     '6.5':0,
     '7':0,
     '7.5':0,
     '8':0,
     '8.5':0,
     '9':0,
     '9.5':0,
     '10':0,
     '10.5':0,
     '11':0,
     '11.5':0,
    }
    
    let sizes = resellPrices ? resellPrices.flightClub : talles
    for (siz in sizes){
      talles[siz] = Math.round(sizes[siz]/100)
    }

    let avaiableSize = await AvaiableSizes.create(talles)
    shoe.setAvaiableSize(avaiableSize)
    //avaiableSize.save()
  }

}

  catch(error){ //aca agarro el error si existe
    console.log(error)
  }
}
} 

//{ force: true }
conn.sync().then(() => {
// conn.sync().then(() => {
  server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  }).catch((e) => console.log(e))
   .then(()=>peticionApi()).catch(e => (console.log(e))).then(() => createRoles())
  
  