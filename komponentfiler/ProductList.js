import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Grid } from '@material-ui/core';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend and setProducts
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
