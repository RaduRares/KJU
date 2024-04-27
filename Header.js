import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import Logo_Danart from "./Imagini/Logo_kju.png"
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { products } from './productsData';
function Header() {
    const [{ basket }] = useStateValue();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const totalQuantity = basket.reduce((total, item) => total + item.quantity, 0);
    const searchRef = useRef(null);
    const handleSearchChange = event => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        if (value) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(value)
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
      };
      useEffect(() => {
        function handleClickOutside(event) {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchTerm(''); // Resetare termen de căutare
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
      const executeSearch = () => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    };
      const onSearchIconClick = () => {
        executeSearch();
    };

    return (
        <div className="header">
            <Link to="/">
            <img className="header_logo" src={Logo_Danart} alt="Logo"></img>
            </Link>
            <div className="header_search"  ref={searchRef}>
            <input
    className="header_searchInput"
    type="text"
    placeholder="Caută produse"
    value={searchTerm}
    onChange={handleSearchChange}
    onKeyPress={(event) => {
        if (event.key === 'Enter') {
           handleSearchChange();
        }
    }}
/>

                    
          

             {searchTerm && (
    <div className="search_results">
        {searchResults.length > 0 ? (
            searchResults.map(product => (
                <div key={product.id} className="search_result_item">
                    <Link to={`/product/${product.id}`}><SearchIcon className="header_searchIcon" Link to={`/product/${product.id}`} />
                        {product.title}
                    </Link>
                </div>
            ))
        ) : (
            <div className="search_result_item">Niciun produs găsit.</div>
        )}
    </div>
)}
            </div>
            <div className="header_nav">
                <Link to = '/login'>
                <div className="header_option">
                    <span
                    className="header_optionLine1">Bun venit
                    </span>
                    <span
                    className="header_optionLine2">Conectează-te
                    </span>
                </div></Link>
                <div className="header_option" >
                   <Link to="/User">
                    <span
                    className="header_optionLine1">User
                    </span>
                    <span
                    className="header_optionLine2">Istoric
                    </span>
                    </Link>
                </div>
                <Link to="/checkout">
                  <div className="header_optionBascket">
                    <LocalMallIcon />
                    <span className="header_optionLineTwoheader__backetCount">
                    <span className="header__basketCount">{totalQuantity}</span>
                        </span>    
                  </div>
                
                 </Link>
               
            </div>
        </div>
    );
}

export default Header;
