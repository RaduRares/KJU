import React, { useState } from 'react';
import './Product.css';
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';
function Product({ id, title, marime, descriere, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const addToBasket = () => {
    // Find the item in the basket
    const existingItemIndex = basket.findIndex((basketItem) => basketItem.id === id);
  
    // If item exists, dispatch an action to increment its quantity by selected amount
    if (existingItemIndex >= 0) {
      dispatch({
        type: 'INCREMENT_QUANTITY',
        id: id,
        quantity: quantity, // Use the selected quantity for increment
      });
    } else {
      // If item does not exist, dispatch an action to add it with the selected quantity
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          title: title,
          marime: marime,
          descriere: descriere,
          image: image,
          price: price,
          rating: rating,
          quantity: quantity, // Capture the selected quantity here
        },
      });
    }
  };

  return (
    <div className='product'>
      <div className='product__info'>
        <p className='product__title'>{title}</p>
        <p className='marime'>{marime}</p>
        <p className='descriere'>{descriere}</p>
        <p className='product__price'>
          <small>RON </small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}><StarIcon /></p>
            ))}
        </div>
      </div>
      
      <Link to={`/product/${id}` } className="product__image-link">
        <img src={image} alt={title} className="product__image"/>
      </Link>
      <div className='product__actions'>
        <Option quantity={quantity} setQuantity={setQuantity} />
        <div className='buton'>
        <button onClick={addToBasket}>Add to Basket</button></div>
      </div>
    </div>
  );
}

export default Product;

// Option component
const Option = ({ quantity, setQuantity }) => {
  return (
    <div className='add_remove_select'>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};
