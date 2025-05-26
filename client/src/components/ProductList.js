import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cart, addToCart } = useCart();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter products based on price and stock
        const filteredProducts = data.filter(product =>
          product.price >= 150 && product.price <= 300 && product.stock <= 500
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div>
      <h2>Eggshell Powder Products</h2>
      <div>Shopping Cart: {cart.length} items</div>
      {products.length === 0 ? (
        <p>No products found matching your criteria.</p>
      ) : (
        <ul> {/* Added ul tag to wrap the list items */}
          {products.map(product => (
            <li key={product._id}>
              {product.name} - ₹{product.price.toFixed(2)}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}    </div>
  );
};

export default ProductList;