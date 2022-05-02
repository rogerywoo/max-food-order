import {useRef, useState} from 'react';
import Input from '../../ui/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)

  // // useRef returns a mutable ref object whose .current property 
  // // is initialized to the passed argument (initialValue). The returned 
  // // object will persist for the full lifetime of the component. The Input tag needs to contain ref.
  // // useRef doesn’t notify you when its content changes. 
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ){
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '10',
          step: '1',
          defaultValue: '1'
        }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valide amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm;