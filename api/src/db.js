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
const { Order, Brand, Shoe, Reviews, User, User_Order, Role, Color, AvailableSizes, Price, Wishlist,Size, Order_Shoes } = sequelize.models;

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

User.belongsToMany(Shoe, {through: Wishlist}) /// un usuario desea muchas zapatillas
Shoe.belongsToMany(User, {through: Wishlist}) /// muchas zapatillas son deseadas por muchos usuarios



// Order can contain many shoe, and the same shoe can be in many different orders
//const Order_Shoes = sequelize.define("Order_Shoes", { orderId: DataTypes.INTEGER, shoeId: DataTypes.INTEGER, cuantity:DataTypes.INTEGER,color:DataTypes.STRING,subtotal:DataTypes.INTEGER }, { timestamps: false });
Order.belongsToMany(Shoe, { through: Order_Shoes });
Shoe.belongsToMany(Order, { through: Order_Shoes });

Order_Shoes.hasMany(Shoe)
// Order_Shoes.hasMany(Size)

// Shoe.belongsToMany(Size,{through:Order_Shoes})
// Size.belongsToMany(Shoe,{through:Order_Shoes})

/////// Shoe can have many colors, one color can be on many shoe

// defino el modelo para poder sacarle timestamps
//const Shoe_Colors = sequelize.define("Shoe_Colors", { colorId: DataTypes.INTEGER, shoeId: DataTypes.INTEGER }, { timestamps: false });
Color.belongsToMany(Shoe, { through: "Shoe_Colors" });
Shoe.belongsToMany(Color, { through: "Shoe_Colors" });


Shoe.belongsTo(AvailableSizes);
AvailableSizes.hasOne(Shoe);

Brand.hasMany(Shoe);
Shoe.belongsTo(Brand);

Shoe.belongsTo(Price);
Price.hasOne(Shoe);

////// HOOKS

try {
    Order.addHook("afterUpdate", async (order) => {

      setTimeout(async () => {
      let orden = Order_Shoes && await Order_Shoes.findAll({where:{orderId: order.id}})

      let itemsComprados=[]
      let cart = []
        for (shoe of orden){
            let id = shoe.shoeId
            let zapatilla = await Shoe.findByPk(id, {include:[{model:Price}]})
            let nombreZapatilla = zapatilla.shoeName
            let cuantity = shoe.cuantity
            let price = zapatilla.price.retailPrice
            itemsComprados.push({id,name:nombreZapatilla,cuantity,subtotal: price*cuantity})
        }

        orden &&  orden.length > 0 && await sendMail({cart: itemsComprados, name:order.name,adress: order.adress, email:order.email, status:order.status, template:'purchase', orderId:(order.id).split('-')[0]})

}, 600);
    });
} catch (error) {
    console.log(error);
}

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
