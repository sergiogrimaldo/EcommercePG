require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT,
} = process.env;

//const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/zapapp`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
console.log(capsEntries)
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Order, Brand, Shoe, User, User_Order, Role, Color,AvaiableSizes } = sequelize.models;

// One user can have many orders
User.belongsToMany(Order,{through:User_Order})

// An order only belongs to one user
Order.belongsTo(User)

//user has one and only one role
User.belongsTo(Role)
Role.hasMany(User)


// Order can contain many shoe, and the same shoe can be in many different orders
Order.belongsToMany(Shoe,{through:'Order_Shoes'})
Shoe.belongsToMany(Order,{through:'Order_Shoes'})

/////// Shoe can have many colors, one color can be on many shoe

// defino el modelo para poder sacarle timestamps
const Shoe_Colors = sequelize.define('Shoe_Colors',{colorId: DataTypes.INTEGER, shoeId:DataTypes.INTEGER},{timestamps:false})
Color.belongsToMany(Shoe,{through:Shoe_Colors})
Shoe.belongsToMany(Color,{through:Shoe_Colors})

Shoe.belongsTo(AvaiableSizes)
AvaiableSizes.hasOne(Shoe)

Brand.hasMany(Shoe)
Shoe.belongsTo(Brand)

////// HOOKS

// este hook actualiza el stock como el total de las cantidades individuales disponibles por tamaño
 try{Shoe.addHook('afterSave', async (shoe) => {
  let shoes = await Shoe.findOne({where:{id:shoe.id}}) 
  if (shoes.avaiableSizeId != null){
  let sizes = await AvaiableSizes.findAll({where:{id:shoes.avaiableSizeId},attributes:{exclude:['id']},raw:true})
  let acc = 0
  Object.keys(sizes[0]).forEach((key) => acc = acc + sizes[0][key])
} 
    
 })}catch(error) { console.log(error)}


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
