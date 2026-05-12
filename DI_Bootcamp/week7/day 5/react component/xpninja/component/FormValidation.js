import React, { useState } from 'react';

// Sub-Component: Input
function Input({ label, name, type, value, onChange, error }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{label}:</label>
      <br />
      {/* We use type="text" for everything to avoid HTML5 validation UI */}
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        style={{ border: error ? '1px solid red' : '1px solid #ccc', padding: '5px' }}
      />
      {/* Display error message if it exists */}
      {error && <p style={{ color: 'red', fontSize: '12px', margin: '2px 0' }}>{error}</p>}
    </div>
  );
}

// Main Component: Form
function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation Logic
  const validate = () => {
    let tempErrors = {};

    // 1. Check if empty
    if (!formData.firstName.trim()) tempErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last Name is required";
    if (!formData.phone.trim()) tempErrors.phone = "Phone is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";

    // 2. Regex Validation (Only if not empty)
    
    // Phone Regex: Accepts 10 digits (you can adjust this regex for specific formats)
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Invalid phone number (10 digits required)";
    }

    // Email Regex: Standard format check
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }

    setErrors(tempErrors);

    // Return true if no errors
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form Submitted Successfully!");
      console.log("Submitted Data:", formData);
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '400px' }}>
      <h3>Exercise 2: Form Validation</h3>
      <form onSubmit={handleSubmit}>
        <Input 
          label="First Name" 
          name="firstName" 
          type="text" 
          value={formData.firstName} 
          onChange={handleChange} 
          error={errors.firstName}
        />
        
        <Input 
          label="Last Name" 
          name="lastName" 
          type="text" 
          value={formData.lastName} 
          onChange={handleChange} 
          error={errors.lastName}
        />
        
        <Input 
          label="Phone" 
          name="phone" 
          type="text" 
          value={formData.phone} 
          onChange={handleChange} 
          error={errors.phone}
        />
        
        <Input 
          label="Email" 
          name="email" 
          type="text" 
          value={formData.email} 
          onChange={handleChange} 
          error={errors.email}
        />

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;