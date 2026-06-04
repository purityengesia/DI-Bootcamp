import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './userSlice';

// Step 4: Create React Component for Displaying User Data
const UserData = () => {
  const dispatch = useDispatch();

  // Step 5: Connect Component to Redux Store
  const { data, loading, error } = useSelector((state) => state.user);

  // Trigger the API call when the component mounts
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Conditional Rendering based on state
  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  // Display User Data
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h2>User Profile</h2>
      {data ? (
        <div>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Website:</strong> {data.website}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default UserData;