import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        {/* Add more details as needed */}
        <Button variant="outlined" color="primary">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
