import { useReducer } from 'react';

import CartContext from "./CartContext"
import CartReducer from './CartReducer';



// // Outside of Container.   Does not execute everytim the control is rendered.
// const cartReducer = (state, action) => {
//   if (action.type === 'ADD') {
//     const existingCartItemIndex = state.items.findIndex((item) => {
//       return item.id === action.item.id;
//     });

//     const existingCartItem = state.items[existingCartItemIndex];

//     let updatedItems;

//     if (existingCartItem){
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + action.item.amount
//       };

//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//         updatedItems = state.items.concat(action.item); 
//     }

//     // const updatedItems = state.items.concat(action.item);  // Concat returns a new array.  The array need to be unmutable in order for React to know what changes.

//     const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
//     return { items: updatedItems, totalAmount: updatedTotalAmount };
//   }
//   return defaultCartState;
// };

/***
 * Every Context object comes with a Provider React component that allows 
 * consuming components to subscribe to context changes.
 * 
 * The Provider component accepts a value prop to be passed to consuming components that are 
 * descendants of this Provider. One Provider can be connected to many consumers. Providers can 
 * be nested to override values deeper within the tree.
 * 
 * All consumers that are descendants of a Provider will re-render whenever the Provider’s value 
 * prop changes. The propagation from Provider to its descendant consumers (including .contextType 
 * and useContext) is not subject to the shouldComponentUpdate method, so the consumer is 
 * updated even when an ancestor component skips an update.
 */

 const defaultCartState = {
  items: [],
  totalAmount: 0
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(CartReducer, defaultCartState);

  /**
   * Pass object to reducer.
   * @param {*} item 
   */
  const addItemToCartHandler = item => {
    dispatchCartAction(
      {
        type: 'ADD',
        item: item
      });
  };

  const removeItemToCartHandler = id => {
    dispatchCartAction(
      {
        type: 'REMOVE',
        id: id
      });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  }

  // Passing default cartContext;
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;