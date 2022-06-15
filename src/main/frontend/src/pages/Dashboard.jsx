import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { getStatistics } from '../api/dashboard-api';
import { useAuth } from '../auth/auth';
import { useAlert } from '../utils/AlertContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 0],
      backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
    },
  ],
};

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard | Bug Tracker';
  }, []);


  const initStats = {
    priorityData: {
      labels: ["LOW", "MEDIUM", "HIGH"],
      datasets: [
        {
          label: 'Priority',
          data: [0, 0, 0],
          backgroundColor: ['yellow', 'orange', 'red']
        },
      ]
    },

    statusData: {
      labels: ["OPEN", "CLOSED", "RESOLVED", "IN_PROGRESS"],
      datasets: [
        {
          label: 'Status',
          data: [0, 0, 0, 0],
          backgroundColor: ['blue', 'purple', 'yellow', 'orange'],
        },
      ],
    },

    typeData: {
      labels: ["BUG", "ISSUE", "FEATURE"],
      datasets: [
        {
          label: 'Type',
          data: [0, 0, 0],
          backgroundColor: ['yellow', 'orange', 'red']
        },
      ]
    },

    totalTickets: 0,
    totalProjects: 0
  }

  const [statistics, setStatistics] = useState(initStats);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const { auth: { accessToken } } = useAuth();

  const { setFeedback } = useAlert();

  const fetchStatistics = async () => {
    const response = await getStatistics(accessToken);
    if (response.success) {
      console.log(response.data);
      const data = response.data;

      const priorityData = {
        labels: data.priorityStats.map(stat => stat.name),
        datasets: [
          {
            label: 'Priority',
            data: data.priorityStats.map(stat => stat.totalCount),
            backgroundColor: ['red', 'orange', 'yellow'],
          },
        ],
      };

      const statusData = {
        labels: data.statusStats.map(stat => stat.name),
        datasets: [
          {
            label: 'Status',
            data: data.priorityStats.map(stat => stat.totalCount),
            backgroundColor: ['blue', 'purple', 'orange', 'green'],
          },
        ],
      };

      const typeData = {
        labels: data.typeStats.map(stat => stat.name),
        datasets: [
          {
            label: 'Type',
            data: data.priorityStats.map(stat => stat.totalCount),
            backgroundColor: ['red', 'orange', 'yellow'],
          },
        ],
      };

      setStatistics({ priorityData, statusData, typeData, totalProjects: data.totalProjects, totalTickets: data.totalTickets })
    } else {
      setFeedback({
        open: true,
        serverity: 'error',
        message: response?.data?.message && 'Failed to retreive stats. Please refresh page.'
      })
    }
  }

  return (
    <>
      <Grid container spacing={2} sx={{ p: 2 }} >
        <Grid item md={6}>
          <Card >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h6' >Total Projects</Typography>
              <Typography variant='h4' >{statistics.totalProjects}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h6' >Total Tickets</Typography>
              <Typography variant='h4' > {statistics.totalTickets} </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card >
            <CardContent>
              <Doughnut data={statistics.priorityData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card >
            <CardContent>
              <Doughnut data={statistics.statusData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card >
            <CardContent>
              <Doughnut data={statistics.typeData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard