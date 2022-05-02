
/***
 * This will accept the cart state and dispatch action and then update the state based on the action.
 */
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // const updatedItems = state.items.concat(action.item);  // Concat returns a new array.  The array need to be unmutable in order for React to know what changes.

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } 
  else if (action.type === 'REMOVE') {

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };

      if (updatedItem.amount < 1) {
        updatedItems = state.items.filter((item) => {
          return item.id !== action.id;
        })
      } 
      else {
        updatedItems = state.items.map((item) => {
          if (item.id !== action.id) {
            return item
          }
          else {
            return {...item, amount: existingCartItem.amount - 1}
          }
        })
      }
    }
    // const updatedItems = state.items.concat(action.item);  // Concat returns a new array.  The array need to be unmutable in order for React to know what changes.

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return state;
};

export default cartReducer;