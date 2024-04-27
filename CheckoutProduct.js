import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, title, price, image, quantity }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  // Additional function to change item quantity if needed
  const changeItemQuantity = (newQuantity) => {
    dispatch({
      type: 'CHANGE_ITEM_QUANTITY',
      id: id,
      quantity: newQuantity
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>RON</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__quantity">
          <p>Quantity: {quantity}</p>
          {/* Optional: Add a dropdown or buttons to change quantity */}
        </div>
        <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
