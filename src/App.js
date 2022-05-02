import { Fragment, useEffect, useState, useContext } from "react";
import Header from "./component/layout/Header";
import Meals from "./component/meals/Meals";
import Cart from "./component/cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () =>{
    setShowCart(true);
  }

  const hideCartHandler = () =>{
    setShowCart(false);
  }

  // useEffect(() => {
  //   setShowCart(false);
  // }, [showCart])

  return (
    <CartProvider>
      {showCart && <Cart  onHideCart={hideCartHandler} ></Cart>}
      <Header onShowCart={showCartHandler} ></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
