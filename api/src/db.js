require("dotenv").config();
const {sendMail} = require('./services/mailerService')
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

/* const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}); */
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
console.log(capsEntries);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Order, Brand, Shoe, Reviews, User, User_Order, Role, Color, AvailableSizes, Price } = sequelize.models;

// One user can have many orders
User.belongsToMany(Order, { through: User_Order });

// An order only belongs to one user
Order.belongsTo(User);

//user has one and only one role
User.belongsTo(Role);
Role.hasMany(User);

User.hasMany(Reviews);
Reviews.belongsTo(User);

Reviews.belongsTo(Shoe);
Shoe.hasMany(Reviews);

// Order can contain many shoe, and the same shoe can be in many different orders
const Order_Shoes = sequelize.define("Order_Shoes", { orderId: DataTypes.INTEGER, shoeId: DataTypes.INTEGER, cuantity:DataTypes.INTEGER,color:DataTypes.STRING,subtotal:DataTypes.INTEGER }, { timestamps: false });
Order.belongsToMany(Shoe, { through: Order_Shoes });
Shoe.belongsToMany(Order, { through: Order_Shoes });

/////// Shoe can have many colors, one color can be on many shoe

// defino el modelo para poder sacarle timestamps
const Shoe_Colors = sequelize.define("Shoe_Colors", { colorId: DataTypes.INTEGER, shoeId: DataTypes.INTEGER, size:DataTypes.STRING }, { timestamps: false });
Color.belongsToMany(Shoe, { through: "Shoe_Colors" });
Shoe.belongsToMany(Color, { through: "Shoe_Colors" });

Shoe.belongsTo(AvailableSizes);
AvailableSizes.hasOne(Shoe);

Brand.hasMany(Shoe);
Shoe.belongsTo(Brand);


Shoe.belongsTo(Price);
Price.hasOne(Shoe);

////// HOOKS

// este hook actualiza el stock como el total de las cantidades individuales disponibles por tamaño
/* 
try {
    Shoe.addHook("afterSave", async (shoe) => {
        let shoes = await Shoe.findOne({ where: { id: shoe.id } });
        if (shoes.avaiableSizeId != null) {
            let sizes = await AvailableSizes.findAll({ where: { id: shoes.avaiableSizeId }, attributes: { exclude: ["id"] }, raw: true });
            let acc = 0;
            Object.keys(sizes[0]).forEach((key) => (acc = acc + sizes[0][key]));
        }
    });
} catch (error) {
    console.log(error);
}
 */

try {
    Order.addHook("afterSave", async (order) => {
      console.log(order.id,"locoooooooooooooooo");
      //let orden = await Order.findByPk(order.id, {include: [{model: Order_Shoes}]})
      setTimeout(async () => {
      let orden = await Order_Shoes.findAll({where:{orderId: order.id}})
      orden && console.log("orrrrrrrrrrdddddddddddddd",orden, "doneeeeeeee")
      console.log('--------')
      console.log(order.id,order.status,order.total,order.updatedAt) /// order: id, status, total, createdAt, updatedAt, userId
      let itemsComprados=[]
      let cart = []
        for (shoe of orden){
            let id = shoe.shoeId
            let zapatilla = await Shoe.findByPk(id, {include:[{model:Price}]})
            let nombreZapatilla = zapatilla.shoeName
            let cuantity = shoe.cuantity
            let price = zapatilla.price.retailPrice
            itemsComprados.push({id,name:nombreZapatilla,cuantity,subtotal: price*cuantity})
           // console.log(`${nombreZapatilla}, precio:${precio}, cantidad: ${cantidad}, subtotal: ${cantidad*precio} `)
        }
        //console.log(cart)
        console.log(itemsComprados)
        console.log(order.adress, order.email, order.name)
        await sendMail({cart: itemsComprados, name:order.name,adress: order.adress, email:order.email, status:order.status, template:'purchase', orderId:(order.id).split('-')[0]})
        console.log(`Total: ${order.total}`)

        //{id:1,name:"Jordan 11 Retro Cool Grey (2021)",size:4,cuantity:1 , subtotal:225}]
    //    console.log(await order.getShoes()) /// zapatillas relacionadas en Order_Shoes
    //  for (shoe of orden.shoes){
    //      console.log(shoe.shoeName,shoe.cuantity,shoe.subtotal)
    //  }
}, 600);
    });
} catch (error) {
    console.log(error);
}

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
