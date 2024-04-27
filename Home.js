import React from "react";
import "./Home.css"
import Product from "./Product";
import { Link } from 'react-router-dom';
import  { useState,useEffect,useRef } from 'react';
import { products as staticProducts } from './productsData';
import { products } from './productsData';  


function Home()
{const searchContainerRef = useRef(null);
  const resetSearch = () => {
    setSearchTerm("");
    // Aici poți adăuga și alte acțiuni de resetare, dacă e nevoie
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('popular'); // popular, price_asc, price_desc, alphabetic
  const [products, setProducts] = useState(staticProducts);
  const searchRef = useRef(null);
  useEffect(() => {
    sortProducts(sortType);
  }, [sortType]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm(''); // Resetare termen de căutare
      }
    }

    // Adaugă listener atunci când componenta este montată
    document.addEventListener('mousedown', handleClickOutside);

    // Îndepărtează listener-ul atunci când componenta este demontată
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);
  // Funcția pentru actualizarea termenului de căutare
  const sortProducts = (sortType) => {
    let sortedProducts;
    switch (sortType) {
      case 'price_asc':
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'alphabetic':
        sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Implicit, lasă produsele în ordinea lor originală
        sortedProducts = staticProducts;
        break;
    }
    setProducts(sortedProducts);
  };

  // Handler pentru selectarea tipului de sortare
  const handleSortChange = (e) => {
    const newSortType = e.target.value;
    setSortType(newSortType);
    sortProducts(newSortType);
  };


  const handleOutsideClick = (event) => {
    // Asigură-te că event.target nu este null și că id-ul este corect
    if (searchTerm && event.target.id !== "search-container") {
      resetSearch();
    }
  };
  
  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  
    return(
        
      <div className="home" ref={searchRef}>
        
      <div className="home_container"  >
      <div className="home_sorting">
          <label htmlFor="sort">Ordonează: </label>
          <select id="sort" value={sortType} onChange={handleSortChange}>
         { /* <option value="popular">Cele mai populare</option>*/}
            <option value="price_asc">Preț crescător</option>
            <option value="price_desc">Preț descrescător</option>
            <option value="alphabetic">Alfabetic</option>
          </select>
        </div>
        <div className="home__row" >
          {products.map((product) => (
            <Product 
              key={product.id}
              id={product.id}
              title={product.title}
              marime={product.marime}
              descriere={product.descriere}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          ))}
          </div>
        </div>
      </div>
   
    )
}
export default Home;