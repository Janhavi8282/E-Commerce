const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/find", verifyToken, cartController.getCart);
router.get("/cartCount", verifyToken, cartController.getCartCount);
router.post("/", verifyToken, cartController.addtoCart);
router.delete(":/id", verifyToken, cartController.deleteCartItem);
router.put("/quantity/:cartItemId", cartController.decrementCartItem);
router.delete("/:cartItemId", verifyToken, cartController.resetCart);

module.exports = router;
