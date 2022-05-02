import React  from "react";

/**
  A context object encapsulates the references/pointers to services and 
  configuration information used/needed by other objects. It allows the 
  objects living within a context to see the outside world. Objects living 
  in a different context see a different view of the outside world.
 */
const CartContext = React.createContext({
  items:[],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id ) => {}
});

export default CartContext;

