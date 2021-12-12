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
var fs = require("fs");
const server = require("./src/app.js");
const { conn, Shoe, Color, Brand, AvailableSizes, Role, Price, User } = require("./src/db.js");

// Syncing all the models at once.
("use strict");


const createRoles = async function () {
    if ((await Role.findAll()).length == 0){
    await Role.create();
    let admin = await Role.create({ name: "admin" });
    await admin.addUser(await User.create({name:'admin',email:'admin@admin.com',password:'admin',activated:true}))
    return console.log('roles created succesfully')
    } else {
        return(console.log('Roles already in database'))
    }
};

const peticionApi = async function () {
    if ((await Shoe.findAll()).length > 0) {
        return console.log("Shoes already in Database");
    } else {
        try {
            // const Api = fetch('./allShoes.json').then(res=> res.json()).catch((e) => console.log(e))
            let allShoes = require("./data.json");

            for (let x = 0; x < allShoes.length; x++) {
                let { description, resellPrices, colorway, _id, lowestResellPrice, silhoutte, shoeName, retailPrice, thumbnail, brand, urlKey } =
                    allShoes[x];
                await Brand.findOrCreate({ where: { name: brand || "none" } });
                let brandeses = await Brand.findOne({ where: { name: brand } });

                const talles = await AvailableSizes.create({
                    retailPrice: retailPrice,
                    3.5: resellPrices.flightClub[3.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    4: resellPrices.flightClub[4] ? Math.floor(Math.random() * 15) + 1 : 0,
                    4.5: resellPrices.flightClub[4.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    5: resellPrices.flightClub[5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    5.5: resellPrices.flightClub[5.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    6: resellPrices.flightClub[6] ? Math.floor(Math.random() * 15) + 1 : 0,
                    6.5: resellPrices.flightClub[6.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    7: resellPrices.flightClub[7] ? Math.floor(Math.random() * 15) + 1 : 0,
                    7.5: resellPrices.flightClub[7.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    8: resellPrices.flightClub[8] ? Math.floor(Math.random() * 15) + 1 : 0,
                    8.5: resellPrices.flightClub[8.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    9: resellPrices.flightClub[9] ? Math.floor(Math.random() * 15) + 1 : 0,
                    9.5: resellPrices.flightClub[9.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    10: resellPrices.flightClub[10] ? Math.floor(Math.random() * 15) + 1 : 0,
                    10.5: resellPrices.flightClub[10.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    11.5: resellPrices.flightClub[11.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    12.5: resellPrices.flightClub[12.5] ? Math.floor(Math.random() * 15) + 1 : 0,
                    13: resellPrices.flightClub[13] ? Math.floor(Math.random() * 15) + 1 : 0,
                    14: resellPrices.flightClub[14] ? Math.floor(Math.random() * 15) + 1 : 0,
                    15: resellPrices.flightClub[15] ? Math.floor(Math.random() * 15) + 1 : 0,
                    16: resellPrices.flightClub[16] ? Math.floor(Math.random() * 15) + 1 : 0,
                    17: resellPrices.flightClub[17] ? Math.floor(Math.random() * 15) + 1 : 0,
                    18: resellPrices.flightClub[18] ? Math.floor(Math.random() * 15) + 1 : 0,
                });
                const prices = await Price.create({
                    retailPrice: retailPrice,
                    3.5: resellPrices.flightClub[3.5],
                    4: resellPrices.flightClub[4],
                    4.5: resellPrices.flightClub[4.5],
                    5: resellPrices.flightClub[5],
                    5.5: resellPrices.flightClub[5.5],
                    6: resellPrices.flightClub[6],
                    6.5: resellPrices.flightClub[6.5],
                    7: resellPrices.flightClub[7],
                    7.5: resellPrices.flightClub[7.5],
                    8: resellPrices.flightClub[8],
                    8.5: resellPrices.flightClub[8.5],
                    9: resellPrices.flightClub[9],
                    9.5: resellPrices.flightClub[9.5],
                    10: resellPrices.flightClub[10],
                    10.5: resellPrices.flightClub[10.5],
                    11.5: resellPrices.flightClub[11.5],
                    12.5: resellPrices.flightClub[12.5],
                    13: resellPrices.flightClub[13],
                    14: resellPrices.flightClub[14],
                    15: resellPrices.flightClub[15],
                    16: resellPrices.flightClub[16],
                    17: resellPrices.flightClub[17],
                    18: resellPrices.flightClub[18],
                });

                let stock = 0;
                let todosLosTalles = await AvailableSizes.findAll();
                if (todosLosTalles) {
                    for (let i = 0; i < todosLosTalles.length; i++) {
                        stock = 0;
                        for (talle in todosLosTalles[i].dataValues) {
                            if (talle !== "id") {
                                stock = stock + parseInt(todosLosTalles[i].dataValues[talle], 10);
                            }
                        }
                    }
                }
                /*  if (avaiableSize.length< 300) {
                    
                    await AvaiableSizes.create(talles);
                    
                    // console.log(avaiableSize)
                    // shoe.addAvaiableSizes(avaiableSize);
                    
                } */
                // console.log(avaiableSize);
                //shoe.setAvaiableSizes(avaiableSize);
                //console.log(shoe)

                let shoe = {};
                if (!(await Shoe.findOne({ where: { _id: _id } }))) {
                    shoe = await Shoe.create({
                        description: description || undefined,
                        colorway: colorway || undefined,
                        shoeName: shoeName,
                        stock: stock || 0,
                        thumbnail: thumbnail,
                        silhoutte: silhoutte || undefined,
                        _id: _id || undefined,
                        urlKey: urlKey,
                    });
                }

                for (color of colorway.split("/")) {
                    //console.log(color)
                    await Color.findOrCreate({ where: { name: color } });
                    let coloreses = await Color.findOne({ where: { name: color } });
                    await shoe.addColor(coloreses);
                }

                //console.log(brandeses)
                await shoe.setBrand(brandeses);
                await shoe.setAvailableSize(talles)   /// ESTA LINEA ESTABA COMENTADA, LA DESCOMENTE PARA PODER CREAR ORDENES
                await shoe.setPrice(prices) /// ESTA LINEA ESTABA COMENTADA, LA DESCOMENTE PARA PODER CREAR ORDENES

                // 4, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5
                //avaiableSize.save()
            }
        } catch (error) {
            //aca agarro el error si existe
            console.log(error);
        }
    }
};
//{ force: true }
conn.sync({ force: false})
    .then(() => {
        // conn.sync().then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
        });
    })
    .catch((e) => console.log(e))
    .then(() => peticionApi())
    .catch((e) => console.log(e))
    .then(() => createRoles())
    .catch((e) => console.log(e))
    .then(() => console.log('base de datos creada exitosamente'))
    
