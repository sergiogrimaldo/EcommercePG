const { Router } = require("express");
const ShoesRoutes = require("./shoes");
const SizesRoutes = require("./sizesAvailable");
const BrandRoutes = require("./brands");
const PricesRoutes = require("./prices");
const UserRoutes = require("./users");
const LoginRoutes = require("./login");
const mailRoutes = require("./mailRoutes");
const ordersRoutes = require("./orders");
const reviewsRoutes = require("./reviews");
const router = Router();

router.use("/shoes", ShoesRoutes);
router.use("/availableSizes", SizesRoutes);
router.use("/prices", PricesRoutes);
router.use("/brands", BrandRoutes);
router.use("/users", UserRoutes);
router.use("/login", LoginRoutes);
router.use("/sendmail", mailRoutes());
router.use("/orders", ordersRoutes);
router.use("/reviews", reviewsRoutes);

module.exports = router;
