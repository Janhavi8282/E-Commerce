const Product = require("../models/Products");
const Cart = require("../models/Cart");

module.exports = {
  addtoCart: async (req, res) => {
    const userId = req.user.id;
    const { cartItem, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      //if item already exist then increment the cart item by 1 and dont need to add it again
      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ cartItem, quantity });
        }
        await cart.save();
        res.status(200).json("Item added to cart");
      }
      //if a user has not added anything yet
      else {
        const newCart = new Cart({
          userId,
          products: [{ cartItem: cartItem, quantity: quantity }],
        });

        await newCart.save();
        res.status(200).json("Item added to cart");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCart: async (req, res) => {
    const userId = req.params.id;
    try {
      const cart = await Cart.find({ userId: req.user.id }).populate(
        "products.cartItem",
        " _id title supplier price imageUrl"
      );
      res.status(200).json(cart);
      console.log(cart);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItemId;
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json("Cart Item not found");
      }
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json("Cart not found");
      }
      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );

      if (!existingProduct) {
        res.status(404).json("Item not found");
      }
      if (existingProduct === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem
        );
      } else {
        existingProduct.quantity -= 1;
      }
      await cart.save();
      if (existingProduct.quantity === 0) {
        await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
      }
      res.status(200).json("Item updated");
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
