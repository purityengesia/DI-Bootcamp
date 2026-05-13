import React, { Component } from 'react';
import data from './complexData.json';

class Example2 extends Component {
  render() {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <h3>Skills</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {data.Skills.map((skill, index) => (
            <span key={index} style={{ background: '#e9ecef', padding: '5px 10px', borderRadius: '5px' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Example2;