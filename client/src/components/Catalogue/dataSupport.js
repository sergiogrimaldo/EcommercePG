/* eslint-disable no-loop-func */


export const compileData = (dataShoes, dataSizes, dataPrices) => {
    const data = [];
    let index = 0;
    while (index < dataShoes.length) {
        let foundShoes = dataShoes.find((item) => item.id === index + 1);
        let foundSizes = dataSizes.find((item) => item.id === index + 1);
        let foundPrices = dataPrices.find((item) => item.id === index + 1);
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
        index++;
    }
    return data;
}