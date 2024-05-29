import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TVMazeMovie } from '../types';

interface MovieItemProps extends Pick<TVMazeMovie['show'], 'id' | 'name' | 'image' | 'rating'> {
  onRemoveMovie?: (id: string) => void;
}

export const MovieItem = ({ id, name, image, rating, onRemoveMovie }: MovieItemProps) => {
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
      <CardActions>
        <Button size="small" color="primary" onClick={() => onRemoveMovie?.(String(id))}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
