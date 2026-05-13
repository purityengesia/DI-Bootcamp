import React from 'react';
import data from './data.json';

const PostList = () => {
  return (
    <div className="container">
      {data.map((post) => (
        <div key={post.id} className="mb-4">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;