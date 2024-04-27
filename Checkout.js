import React from "react";
import './Checkout.css';
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
function Checkout() {
    const [{ basket }, dispatch] = useStateValue();
  
    // Aggregating items with their quantities
    const basketWithQuantities = basket.reduce((accumulator, item) => {
      // Check if the item is already in the accumulator
      const existingItem = accumulator.find((i) => i.id === item.id);
      if (existingItem) {
        // If it exists, increment the quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add the new item with a quantity of 1
        accumulator.push({ ...item, quantity: 1 });
      }
      return accumulator;
    }, []);
  
    return (
      <div className="checkout">
        <section className="checkout__left">
          <h1 className="checkout__title">Coșul meu</h1>
          {basket.map((item) => (
  <CheckoutProduct
    id={item.id}
    title={item.title}
    price={item.price}
    image={item.image}
    quantity={item.quantity} // Ensure this prop is passed
  />
))}

        </section>
        <aside className="checkout__right">
          <Subtotal />
        </aside>
      </div>
    );
  }
  export default Checkout;
