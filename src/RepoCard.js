import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const RepoCard = ({ repo }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={repo.owner.avatar_url}
        alt={repo.owner.login}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {repo.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {repo.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Stars: {repo.stargazers_count}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Language: {repo.language}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RepoCard;
