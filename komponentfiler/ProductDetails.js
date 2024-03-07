import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import Rating from './Rating';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details by id from the backend and setProduct
  }, [id]);

  return (
    <div>
      {product && (
        <>
          <Typography variant="h4">{product.name}</Typography>
          <Rating productId={product.id} />
          {/* Add more details as needed */}
          <Button variant="outlined" color="primary">
            Add to Cart
          </Button>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
