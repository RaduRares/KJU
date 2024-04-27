import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Example placeholder data
const dummyUserInfo = { name: 'Radu Rares', email: 'RaduRares@email.com' };
const dummyOrderHistory = [
  { id: 1, date: '2021-01-01', total: 29.99 },
  { id: 2, date: '2021-02-01', total: 19.99 },
  // ... other orders
];

const UserProfile = () => {
  const [user, setUser] = useState(dummyUserInfo);
  const [orderHistory, setOrderHistory] = useState(dummyOrderHistory);

  // Simulate fetching user info and order history
  useEffect(() => {
    // Replace this with your API calls
    setUser(dummyUserInfo);
    setOrderHistory(dummyOrderHistory);
  }, []);

  const handleUserInfoUpdate = (updatedUserInfo) => {
    // Logic to update user info goes here
    setUser(updatedUserInfo);
  };

  return (
    <div className="user-profile">
      <section className="user-info">
        <h2>User Information</h2>
        <UserInfo user={user} onUserInfoUpdate={handleUserInfoUpdate} />
      </section>
      <section className="order-history">
        <h2>Order History</h2>
        {orderHistory.map(order => (
          <OrderHistoryItem key={order.id} order={order} />
        ))}
      </section>
      {/* Add links that don't cause page refresh */}
      <Link to="/edit-profile">Edit Profile</Link>
      {/* ... other links */}
    </div>
  );
};

const UserInfo = ({ user, onUserInfoUpdate }) => {
  // Here you would implement the form or UI to edit user info
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add form or edit button */}
    </div>
  );
};

const OrderHistoryItem = ({ order }) => {
  return (
    <div>
      <p>Order ID: {order.id}</p>
      <p>Date: {order.date}</p>
      <p>Total: RON{order.total}</p>
      {/* Add details or link to order details */}
    </div>
  );
};

export default UserProfile;
