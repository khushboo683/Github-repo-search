import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import RepoCard from './RepoCard';
import SortField from './SortField';
import { Container, Typography, CircularProgress, Box, Pagination } from '@mui/material';
import gitHubImage from "./assets/github-2.png";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [sortField, setSortField] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isSortFieldDisabled, setIsSortFieldDisabled] = useState(true);

  const buildUrl=(baseUrl)=>{
   if(sortField!==''){
    baseUrl+=`&sort=${sortField}&page=${page}&per_page=10`
   }else {
    baseUrl+=`&page=${page}&per_page=10`;
   }
   return baseUrl;
  }
  const fetchRepos = (query, page = 1) => {
    setLoading(true);
    setCurrentQuery(query);
    const url=buildUrl(`https://api.github.com/search/repositories?q=${query}`);
    axios.get(url)
      .then(response => {
        setRepos(response.data.items);
        setIsSortFieldDisabled(false);
        setTotalCount(response.data.total_count);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching the repositories: ", error);
        setLoading(false);
        setIsSortFieldDisabled(true);
      });
  };

  const handleSortChange = (field) => {
    setSortField(field);
    if (repos.length > 0) {
      fetchRepos(currentQuery, page); // Using currentQuery and page for fetching data
    }
  };
useEffect(()=>{
fetchRepos(currentQuery,page);
},[sortField])

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchRepos(currentQuery, value);
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ mb: 4, mt: 4 }}>
        GitHub Repo Search
      </Typography>
      <Search onSearch={fetchRepos} />
      <SortField onSortChange={handleSortChange} sortField={sortField} isSortFieldDisabled={isSortFieldDisabled} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          
          { repos.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Box
                component="img"
                src={gitHubImage}
                alt="No repositories"
                sx={{
                  maxWidth: { xs: '80%', sm: '60%', md: '40%' },
                  height: 'auto',
                }}
              />
            </Box>
          ) : (
            <>
              {repos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
              {totalCount > 10 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                  <Pagination
                    count={Math.ceil(totalCount / 10)}
                    page={page}
                    onChange={handlePageChange}
                  />
                </Box>
              )}
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default App;
