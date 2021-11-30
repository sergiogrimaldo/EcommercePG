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
const { conn, Shoe, Color, Brand, AvaiableSizes, Role } = require("./src/db.js");

// Syncing all the models at once.
("use strict");

const createRoles = async function () {
    await Role.create();
    await Role.create({ name: "admin" });
};

const peticionApi = async function () {
    try {
        // const Api = fetch('./allShoes.json').then(res=> res.json()).catch((e) => console.log(e))
        let allShoes = require("./data.json");

        for (let x = 0; x < allShoes.length; x++) {
            let { description, resellPrices, colorway, lowestResellPrice, silhoutte, shoeName, retailPrice, thumbnail, brand, urlKey } = allShoes[x];
            await Brand.findOrCreate({ where: { name: brand || "none" } });
            let brandeses = await Brand.findOne({ where: { name: brand } });

            let talles = {
                3.5: 5,
                4: 5,
                4.5: 5,
                5: 5,
                5.5: 5,
                6: 5,
                6.5: 5,
                7: 5,
                7.5: 5,
                8: 5,
                8.5: 5,
                9: 5,
                9.5: 5,
                10: 5,
                10.5: 5,
                11.5: 5,
                12.5: 5,
            };

            let sizes = resellPrices ? resellPrices.flightClub : talles;
            for (siz in sizes) {
                talles[siz] = Math.round(sizes[siz] / 100);
            }

            let avaiableSize = await AvaiableSizes.create(talles);

            let shoe = await Shoe.create({
                description: description || undefined,
                colorway: colorway || undefined,
                stock: Math.round(Math.random() * 15),
                shoeName: shoeName,
                retailPrice: retailPrice || undefined,
                thumbnail: thumbnail,
                silhoutte: silhoutte || undefined,
                lowestResellPrice: lowestResellPrice || undefined,
                resellPrices: resellPrices || undefined,
                avaiableSizes: avaiableSize || undefined,
                //brand: brand,
                urlKey: urlKey,
            });

            //console.log(shoe)

            for (color of colorway.split("/")) {
                //console.log(color)
                await Color.findOrCreate({ where: { name: color } });
                let coloreses = await Color.findOne({ where: { name: color } });
                await shoe.addColor(coloreses);
            }

            //console.log(brandeses)
            await shoe.setBrand(brandeses);

            // 4, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5

            await shoe.setAvaiableSize(avaiableSize);
            //avaiableSize.save()
        }
    } catch (error) {
        //aca agarro el error si existe
        console.log(error);
    }
};
{
    force: true;
}
conn.sync()
    .then(() => {
        // conn.sync().then(() => {
        server.listen(3001, () => {
            console.log("%s listening at 3001"); // eslint-disable-line no-console
        });
    })
    .catch((e) => console.log(e))
    .then(() => peticionApi())
    .catch((e) => console.log(e))
    .then(() => createRoles());
