import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TVMazeMovie } from '../types';

interface MovieItemProps {
  item: TVMazeMovie;
}

export const MovieItem = ({ item }: MovieItemProps) => {
  const { id, name, image, rating } = item?.show || {};

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" image={image?.medium} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link to={`/${id}`}>{name}</Link>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Rating: {rating.average || 'Not Applicable'}
        </Typography>
      </CardContent>
    </Card>
  );
};
