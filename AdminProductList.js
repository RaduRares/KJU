import React, { useState } from 'react';
import { products as initialProducts } from './productsData'; // Make sure to import your product data correctly
import './AdminProductList.css'
function AdminProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [editProductId, setEditProductId] = useState(null);
  const [draftProduct, setDraftProduct] = useState({});

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setDraftProduct({ ...draftProduct, [name]: value });
  };

  const handleEdit = (product) => {
    setEditProductId(product.id);
    setDraftProduct({ ...product });
  };

  const saveEdit = () => {
    setProducts(products.map((product) => (product.id === draftProduct.id ? draftProduct : product)));
    setEditProductId(null);
    setDraftProduct({});
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setDraftProduct({});
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="admin-products">
      {products.map((product) => (
        <div key={product.id} className="admin-product-item">
          {editProductId === product.id ? (
            <div>
              {/* Editable fields */}
              <input
                type="text"
                name="title"
                value={draftProduct.title}
                onChange={handleEditChange}
              />
              {/* ...other fields like 'marime', 'descriere', etc. */}
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              {/* Non-editable fields */}
              <p>{product.title}</p>
             
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminProductList;
