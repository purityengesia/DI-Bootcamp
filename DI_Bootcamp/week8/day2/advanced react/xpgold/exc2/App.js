import React from 'react';
import PostFormFetch from './PostFormFetch';
import PostFormAxios from './PostFormAxios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Keep this for styling

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <PostFormFetch />
          <hr />
          <PostFormAxios />
        </div>
      </div>
    </div>
  );
}

export default App;