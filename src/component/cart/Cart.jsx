import { useContext } from 'react';

import classes from './Cart.module.css';
import Modal from '../ui/Modal';
import CartContext from '../../store/CartContext'
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);


  // const cartItems = <ul className={classes['cart-items']}>{[
  //   { id: 'm1', name: 'Sushi', amount: 2, price: 22.99 },
  //   { id: 'm2', name: 'Schnitzel', amount: 2, price: 16.5 }
  // ].map((item) => <li key={item.id}> {item.name}</li>)}
  // </ul>

  // const cartItems = <ul className={classes['cart-items']}>{
  //   cartCtx.items.map((item) => <li key={item.id}> {item.name}</li>)}
  // </ul>

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
    
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  }

  const cartItems = <ul className={classes['cart-items']}>{
    cartCtx.items.map((item) =>
      <CartItem 
      key={item.id} 
      name={item.name} 
      price={item.price} 
      amount={item.amount}
      onRemove={cartItemRemoveHandler.bind(null, item.id)} // Preconfigure argument.  Ensure id is passed
      onAdd={cartItemAddHandler.bind(null, item)}// Preconfigure argument.  Ensure id is passed
      ></CartItem>)}
  </ul>

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;


  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <div>Total Amount</div>
        <div>{totalAmount}</div>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart;
