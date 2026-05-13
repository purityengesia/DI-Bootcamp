import React from 'react';
import PostList from './PostList';
import UsersList from './UsersList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center mb-4">API Data Fetching</h1>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <PostList />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <UsersList />
        </div>
      </div>
    </div>
  );
}

export default App;