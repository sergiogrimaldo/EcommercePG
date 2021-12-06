export const compileData = (dataShoes, dataSizes, dataPrices) => {
	//[id 45, id 22, id 1]
	let data = [];
	let index = 0;
	while (index <= dataShoes.length) {
		let num = 0;
		for (let i in dataShoes[index]) {
			if (i === 'id') {
				num = dataShoes[index][i];
			}
		}
		let foundShoes = dataShoes.find(item => item.id === num);
		let foundSizes = dataSizes.find(item => item.id === num);
		let foundPrices = dataPrices.find(item => item.id === num);
		if (foundShoes) {
			data.push({
				resellPrices: {
					flightClub: foundPrices,
				},
				id: foundShoes.id,
				_id: foundShoes._id,
				shoeName: foundShoes.shoeName,
				brand: foundShoes.brand,
				silhoutte: foundShoes.silhoutte,
				colorway: foundShoes.colorway,
				retailPrice: foundPrices.retailPrice,
				thumbnail: foundShoes.thumbnail,
				urlKey: foundShoes.urlKey,
				AvailableSizes: foundSizes,
			});
		}
		index++;
	}
	data.sort(function (a, b) {
		return a.id - b.id;
	});
	return data;
};
