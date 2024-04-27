import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from './productsData';
import { useStateValue } from './StateProvider';
import StarIcon from '@mui/icons-material/Star'; // Asigură-te că acest import există
import './ProductDetail.css'; // Asigură-te că importi fișierul CSS corespunzător

export const useAddToBasket = () => {
    const [{ basket }, dispatch] = useStateValue();
  
    const addToBasket = (product, quantity) => {
      const existingItemIndex = basket.findIndex((basketItem) => basketItem.id === product.id);
    
      if (existingItemIndex >= 0) {
        dispatch({
          type: 'INCREMENT_QUANTITY',
          id: product.id,
          quantity: quantity,
        });
      } else {
        dispatch({
          type: 'ADD_TO_BASKET',
          item: {
            ...product,
            quantity: quantity,
          },
        });
      }
    };
  
    return addToBasket;
  };
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  const addToBasket = useAddToBasket();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  useEffect(() => {
    const foundProduct = products.find(item => item.id.toString() === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Produsul nu a fost găsit!</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <p>Marime: {product.marime}</p>
      <p>Descriere: {product.descriere}</p>
      <img src={product.image} alt={product.title} className="product-detail-image" />
      <div className="product-rating">
        {Array(product.rating)
          .fill()
          .map((_, index) => (
            <StarIcon key={index} className="star" />
          ))}
      </div>
      <p>Pret: RON {product.price}</p>
      <button onClick={() => addToBasket(product, selectedQuantity)} className="add-to-basket-button">Adaugă în coș</button>

    </div>
  );
}

export default ProductDetail;
