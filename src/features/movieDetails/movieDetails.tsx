import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse, { HTMLReactParserOptions, Element, DOMNode, domToReact } from 'html-react-parser';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeMovie } from './movieDetailsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if ((domNode as Element).name === 'p') {
      return <span>{domToReact((domNode as Element).children as DOMNode[], options)}</span>;
    }
  },
};

const Img = styled('img')({
  display: 'block',
  width: '100%',
  height: '100%',
  margin: 'auto',
});

export const MovieDetails = () => {
  const { id } = useParams();
  const movie = useAppSelector((state) =>
    state.movies.moviesList.find(({ show }) => String(show.id) === id)
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { name, image, rating, summary } = movie?.show || {};

  const handleRemoveMovie = (): void => {
    dispatch(removeMovie(id as string));
    navigate('/');
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: '100%',
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 300 }}>
            <Img alt="complex" src={image?.medium} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {summary && parse(summary, options)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {rating?.average || 'Not Applicable'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              <IconButton onClick={handleRemoveMovie}>
                <DeleteIcon aria-label="delete" />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
