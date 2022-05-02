import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/CartContext';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  // const price = `$${props.price.toFixed(2)}`;

  const price = (value) => {return `$${value.toFixed(2)}`};

  const addItemToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (

    <li className={classes.meal} key={props.id}>
      <div><h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price(props.price)}</div>
      </div>
      <div>
      <MealItemForm id={props.id} onAddToCart={addItemToCartHandler} add></MealItemForm>
      {/* <MealItemForm></MealItemForm> */}
      </div>
    </li>
  );
};

export default MealItem;