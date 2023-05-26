import React, { useEffect, useState } from 'react'
import {Box,Grid,Avatar,Typography,InputLabel,MenuItem,FormControl,Select,Accordion,AccordionSummary,AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setRepositoryData } from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import ActivityChart from './ActivityChart';

const Home = () => {
  const today = new Date();
  const currentDate = moment(today).format('YYYY-MM-DD');
  const requiredDate = moment(currentDate).subtract(30, "days").format("YYYY-MM-DD");

  const [page, setPage] = useState(1);
  const [date, setDate] = useState(requiredDate);
  const [showDate, setShowDate] = useState('7')
  const [isOpen, setIsOpen] = useState({ index: false, flag: false });
  const dispatch = useDispatch();
  const { repositoryData } = useSelector((state) => state.allRepository);

  useEffect(() => {
    dispatch(setRepositoryData({ page, date: date }));
  }, [])

  const handleActivity = (index, flag) => {
    setIsOpen({
      index: index,
      flag: flag
    });
  }

  const getMoreRepository = () => {
    setPage(page + 1);
    dispatch(setRepositoryData({ page: page + 1, date: date }));
  };

  const handleChange = (e) => {
    setShowDate(e.target.value)
    let days = e.target.value;
    setDate(moment(currentDate).subtract(days, "days").format("YYYY-MM-DD"))
    dispatch(setRepositoryData({ page: 1, date: date }));
  };

  return (
    <>
      <Box padding={4}>
        <Typography variant="h3" component="h2" alignItems='center' justifyContent='center' display='flex'>
          Github Repository
        </Typography>
        <Box mt={2} mb={2} sx={{}}>
          <FormControl sx={{ float: 'right', }} >
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={showDate}
              label="Date"
              onChange={handleChange}
            >
              <MenuItem value='7'>1 Week</MenuItem>
              <MenuItem value='14'>2 Weeks</MenuItem>
              <MenuItem value='30'>1 Month</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={10}>
          <InfiniteScroll
            dataLength={repositoryData?.length}
            next={getMoreRepository}
            hasMore={true}
          >

            {repositoryData?.length > 0 && repositoryData.map((item, index) => {
              return (
                <Accordion sx={{ minHeight: '100px' }} key={item.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar sx={{ width: 50, height: 50 }}><img style={{ objectFit: 'cover' }} src={item.owner.avatar_url} alt='' /></Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant='h5' >{item.full_name}</Typography>
                        <Typography>{item.description}</Typography>
                        <Typography>Stars : {item.stargazers_count}</Typography>
                        <Typography>Issues : {item.open_issues_count}</Typography>
                        <Typography>Last Pushed : {moment(item.pushed_at, "YYYYMMDD").fromNow()} by {item.name}</Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ gap: 2, display: 'flex' }} >
                      <Typography sx={{ cursor: 'pointer' }} onClick={() => handleActivity(index, 'Commit')}>Commits</Typography>
                      <Typography sx={{ cursor: 'pointer' }} onClick={() => handleActivity(index, 'Addition')}>Additions</Typography>
                      <Typography sx={{ cursor: 'pointer' }} onClick={() => handleActivity(index, 'Deletion')}>Deletions</Typography>
                    </Box>
                    <Typography>

                      {(isOpen.index !== false || isOpen.flag !== false) && 
                      <ActivityChart isOpen={isOpen} setIsOpen={setIsOpen} index={index} owner={item.full_name} repo={item.name} />}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  )
}

export default Home;