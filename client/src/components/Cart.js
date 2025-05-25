import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { removeFromCart, updateQuantity } = useCart();

  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, parseInt(quantity, 10));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  borderBottom: '1px solid #eee',
                  padding: '10px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  {item.name} - Price: ₹{item.price.toFixed(2)} - Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                    style={{ width: '50px', marginLeft: '10px', marginRight: '10px' }}
                  />
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '3px',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Remove the duplicate closing </ul> tag here */}
        {/* This section seems to have a structural issue in the original code */}
        {cart.length > 0 && ( // Added a closing parenthesis here that seemed to be missing
          <div>
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
      )}
    </div>
  );
};

export default Cart;