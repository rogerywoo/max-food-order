import React, { useContext, useEffect, useState } from "react";

import classes from './HeaderCartButton.module.css';
import CartIcon from "../cart/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);  // Provides access to the CartContext
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(() =>{
      setBtnIsHighlighted(false)
    }, 300);

    return () => {
      clearTimeout(timer);
    };

  }, [cartCtx.items]);

  const btnClasses = `${classes.button} ${btnIsHighlighted? classes.bump: ''}`;

  const numberOfItemsInCart = cartCtx.items
    .reduce((curNumber, item) => {
      return curNumber + item.amount;
    }, 0);

  // React will reevaluated when the cart context changes
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon></CartIcon></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItemsInCart}</span>
    </button>
  );
}

export default HeaderCartButton;
