import React, { Component } from 'react';
import data from './complexData.json';

class Example1 extends Component {
  render() {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <h3>Social Medias</h3>
        <ul>
          {data.SocialMedias.map((media, index) => (
            <li key={index}>{media}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;