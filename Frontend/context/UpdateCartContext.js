import { createContext } from "react";

export const UpdateCartContext = createContext({
    updateCart: {cartCount: 0},
    setUpdateCart : () =>{}
});