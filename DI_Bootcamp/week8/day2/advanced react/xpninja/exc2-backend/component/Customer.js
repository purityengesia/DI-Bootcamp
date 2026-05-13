import React, { Component } from 'react';

class Customers extends Component {
  state = {
    customers: []
  };

  componentDidMount() {
    // Fetching from the specific port where server.js is running
    fetch('http://localhost:3002/api/customers/')
      .then(res => res.json())
      .then(customers => {
        this.setState({ customers });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="customers-container">
        <h2>Customers List</h2>
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px' }}>ID</th>
              <th style={{ padding: '8px' }}>First Name</th>
              <th style={{ padding: '8px' }}>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map(customer => (
              <tr key={customer.id}>
                <td style={{ padding: '8px' }}>{customer.id}</td>
                <td style={{ padding: '8px' }}>{customer.firstName}</td>
                <td style={{ padding: '8px' }}>{customer.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Customers;