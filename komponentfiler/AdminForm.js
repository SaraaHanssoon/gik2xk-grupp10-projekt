import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const AdminForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    // Add more fields as needed
  });

  const handleProductSubmit = () => {
    // Send product data to the backend for creation
  };

  return (
    <div>
      <TextField
        label="Product Name"
        value={productData.name}
        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
      />
      {/* Add more fields as needed */}
      <Button onClick={handleProductSubmit} color="primary">
        Add Product
      </Button>
    </div>
  );
};

export default AdminForm;
