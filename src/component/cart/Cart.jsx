import { useContext, useState } from 'react';

import classes from './Cart.module.css';
import Modal from '../ui/Modal';
import CartContext from '../../store/CartContext'
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const orderHandler = (event) => {
    event.preventDefault();
    setIsCheckout(true);
  }

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
    cartCtx.addItem({ ...item, amount: 1 });
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

  const modalAction =
    !isCheckout &&
    (<div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      {hasItems && (<button className={classes.button} onClick={orderHandler}>Order</button>)}
    </div>)

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <div>Total Amount</div>
        <div>{totalAmount}</div>T
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart}/>}
      {modalAction}
    </Modal>
  )
}

export default Cart;
