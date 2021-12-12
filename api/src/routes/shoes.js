const { Router } = require('express');
const axios = require('axios');
const { Shoe, User, Price, Brand, AvailableSizes, Color, Reviews } = require('../db');
const { Op } = require('sequelize');
const { cloudinary } = require('../../utils/cloudinary')

const router = Router();

router.get('/', async (req, res, next) => {
	let Name = req.query.shoeName;
	if (Name) {
		try {
			let paQuery = await Shoe.findAll({
				include: [{ model: Brand }, { model: AvailableSizes }, { model: Color }, { model: Price }, { model: Reviews }],
				where: {
					shoeName: {
						[Op.iLike]: '%' + Name + '%',
					},
				},
			});
			if (!paQuery.length) {
				return res.status(404).json('Error, recall');
			} else {
				console.log(paQuery.getAvaiableSizes());
				return res.json(paQuery);
			}
		} catch (errro) {
			next(error);
		}
	}
	try {
		const shoesBD = await Shoe.findAll({
			include: [{ model: Brand }, { model: AvailableSizes }, { model: Color }, { model: Price }, { model: Reviews }],
		});
		return res.json(shoesBD);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		let ap = await Shoe.findByPk(id, {
			include: [{ model: Brand }, { model: AvailableSizes }, { model: Color }, { model: Price }, { model: Reviews }],
		});
		return res.send(ap);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	let id = req.query.shoeId;
	const { description, brandId, silhoutte, resellPrices, lowestResellPrice, colorway, shoeName, retailPrice, thumbnail, urlKey, avaiableSizes, brand } = req.body;

	if (description && shoeName && retailPrice) {
		try {
			await Brand.findOrCreate({ where: { name: brand || 'none' } });
			const nuBrand = await Brand.findOne({ where: { name: brand } });
			//console.log(nuBrand)
			const sizes = await AvailableSizes.create({
				'3,5': avaiableSizes[0] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'4': avaiableSizes[1] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'4,5': avaiableSizes[2] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'5': avaiableSizes[3] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'5,5': avaiableSizes[4] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'6': avaiableSizes[5] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'6,5': avaiableSizes[6] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'7': avaiableSizes[7] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'7,5': avaiableSizes[8] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'8': avaiableSizes[9] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'8,5': avaiableSizes[10] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'9': avaiableSizes[11] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'9,5': avaiableSizes[12] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'10': avaiableSizes[13] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'10,5': avaiableSizes[14] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'11,5': avaiableSizes[15] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'12,5': avaiableSizes[16] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'13': avaiableSizes[17] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'14': avaiableSizes[18] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'15': avaiableSizes[19] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'16': avaiableSizes[20] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'17': avaiableSizes[21] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
				'18': avaiableSizes[22] > 0 ? Math.floor(Math.random() * 15) + 1 : 0,
			});

			const prices = await Price.create({
				retailPrice: retailPrice,
				'3,5': avaiableSizes[0] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'4': avaiableSizes[1] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'4,5': avaiableSizes[2] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'5': avaiableSizes[3] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'5,5': avaiableSizes[4] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'6': avaiableSizes[5] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'6,5': avaiableSizes[6] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'7': avaiableSizes[7] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'7,5': avaiableSizes[8] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'8': avaiableSizes[9] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'8,5': avaiableSizes[10] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'9': avaiableSizes[11] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'9,5': avaiableSizes[12] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'10': avaiableSizes[13] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'10,5': avaiableSizes[14] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'11,5': avaiableSizes[15] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'12,5': avaiableSizes[16] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'13': avaiableSizes[17] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'14': avaiableSizes[18] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'15': avaiableSizes[19] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'16': avaiableSizes[20] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'17': avaiableSizes[21] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
				'18': avaiableSizes[22] > 0 ? Math.floor(Math.random() * 500) + 1 : 0,
			});

			let allSizes = await AvailableSizes.findAll();

			var stock = 0;
			if (sizes) {
				for (var i = allSizes.length - 1; i < allSizes.length; i++) {
					for (j in allSizes[i].dataValues) {
						if (j !== 'id') {
							stock = stock + parseInt(allSizes[i].dataValues[j], 10);
						}
					}
				}
			}

			let newShoe = await Shoe.findOrCreate({
				include: [{ model: Brand }, { model: AvailableSizes }, { model: Color }, { model: Price }, { model: Reviews }],
				where: {
					shoeName: shoeName,
				},

				defaults: {
					description: description,
					stock: stock,
					shoeName: shoeName,
					silhoutte: silhoutte,
					thumbnail: thumbnail,
					//resellPrices: resellPrices,
					//lowestResellPrice: lowestResellPrice,
					colorway: colorway,
					urlKey: urlKey,
					//brand: brand,
					//brand: nuBrand.name
				},
			});

			//await newShoe[0].setBrand(nuBrand[0]);
			await newShoe[0].setAvailableSize(sizes);
			await newShoe[0].setPrice(prices);

			//res.send(newShoe);
			//console.log(newShoe)
			if (newShoe[1] === true) {
				return res.send(newShoe[0]);
			} else {
				// const Zapato = await Brand.find({
				//const noEncuentroLaBrand = await Brand.findOne({ where: { name: brand } });
				// 	where:{
				// 		name:name,
				// 	}
				// }),
				if (description) {
					newShoe[0].description = description;
				}
				if (stock) {
					newShoe[0].stock = stock;
				}
				if (shoeName) {
					newShoe[0].shoeName = shoeName;
				}
				if (silhoutte) {
					newShoe[0].silhoutte = silhoutte;
				}
				if (thumbnail) {
					newShoe[0].thumbnail = thumbnail;
				}
				if (resellPrices) {
					newShoe[0].resellPrices = resellPrices;
				}
				if (lowestResellPrice) {
					newShoe[0].lowestResellPrice = lowestResellPrice;
				}
				if (colorway) {
					newShoe[0].colorway = colorway;
				}
				if (urlKey) {
					newShoe[0].urlKey = urlKey;
				}
				if (nuBrand) {
					await newShoe[0].setBrand(nuBrand);
					console.log(nuBrand, 'jsajajajaj');
				}
				if (brand) {
					newShoe[0].brand = brand;
				}
				// if(noEncuentroLaBrand){
				// 	//newShoe.noEncuentroLaBrand=noEncuentroLaBrand
				// 	await newShoe[0].setBrand(noEncuentroLaBrand)

				// }
				await newShoe[0].setBrand(nuBrand[0]);
				await newShoe[0].save();
				//console.log(newShoe[0].save(), "quesesto")
			}
			await newShoe[0].setBrand(nuBrand[0]);
			//console.log(nuBrand, "jsajajajaj")
			//console.log(newShoe[0])
			return res.send(newShoe[0]);
		} catch (error) {
			next(error);
		}
	} else {
		return res.status(404).send({ msg: 'Faltan los valores basicos' });
	}
});

router.put('/:id', async (req, res, next) => {
	let { id } = req.params;
	const { brand } = req.body;
	console.log(id, 'jajajjaa');
	console.log(brand, 'jajajaja');
	// const jane = await User.create({ name: "Jane" });
	// jane.favoriteColor = "blue"
	// await jane.update({ name: "Ada" })
	// // The database now has "Ada" for name, but still has the default "green" for favorite color
	// await jane.save()

	if (brand) {
		try {
			let changedShoe = await Shoe.findOne({
				where: {
					id: id,
				},
			});

			let nuBrand = await Brand.findOrCreate({ where: { name: brand }, defaults: { name: brand } });
			console.log(nuBrand);
			await changedShoe.setBrand(nuBrand[0]);
			//await changedShoe.update({brandId:nuBrand[0].id})

			await changedShoe.save();

			//await changedShoe[0].setBrand(nuBrand);

			return res.send(await Shoe.findOne({ where: { id }, include: [{ model: Brand }] }));
		} catch (error) {
			next(error);
		}
	} else {
		return res.status(404).send({ msg: 'Faltan los valores basicos' });
	}
});

router.delete('/:id', async function (req, res, next) {
	const { id } = req.params;
	try {
		let existsInDB = await Shoe.findOne({
			where: {
				id,
			},
		});
		if (existsInDB) {
			Shoe.destroy({
				where: {
					id,
				},
			});
			return res.status(200).send('Shoe has been deleted from database successfully'); // lo mismo que updateRecipe, ver si me devuelve en algun lado la receta borrada,
		} // sino invocar createRecipe() o devolver el id
		else throw new Error('ERROR 500: Shoe with given name does not exist in database');
	} catch (err) {
		next(err);
	}
});

router.post('/uploadShoeImage', async(req, res) => {
	try {
		
		const fileStr = req.body.data;
		// console.log(fileStr)
		
		const uploadedRes = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'pg_images'
		})
		console.log(uploadedRes.url)
		res.json(uploadedRes.url)
	} catch (error) {
		console.log(error)
		res.status(500).json({err: 'Oh no'})
	}
})

module.exports = router;
