import * as React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { TodosMetrics } from '../types';

interface Props {
  metrics: TodosMetrics;
}

const convertMinutes = (minutes: number) => {
  const years = Math.floor(minutes / 525600);
  minutes %= 525600;
  const months = Math.floor(minutes / 43800);
  minutes %= 43800;
  const days = Math.floor(minutes / 1440);
  minutes %= 1440;
  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  return { years, months, days, hours, minutes };
};

const Metrics: React.FC<Props> = ({ metrics }) => {
  const { avgTime, avgTimeLow, avgTimeMedium, avgTimeHigh } = metrics;

  const avgTimeConverted = convertMinutes(avgTime);
  const avgTimeLowConverted = convertMinutes(avgTimeLow);
  const avgTimeMediumConverted = convertMinutes(avgTimeMedium);
  const avgTimeHighConverted = convertMinutes(avgTimeHigh);

  const formatTime = ({ years, months, days, hours, minutes }: ReturnType<typeof convertMinutes>) => {
    const timeParts = [];
    if (years) timeParts.push(`${years} years`);
    if (months) timeParts.push(`${months} months`);
    if (days) timeParts.push(`${days} days`);
    if (hours) timeParts.push(`${hours} hours`);
    timeParts.push(`${minutes} minutes`); // Always include minutes
    return timeParts.join(', ');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
        <p>Average time to finish tasks:</p>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
          <p>{formatTime(avgTimeConverted)}</p>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
        <p>Average time to finish tasks by priority:</p>
        <List>
          <ListItem>Low: {formatTime(avgTimeLowConverted)}</ListItem>
          <ListItem>Medium: {formatTime(avgTimeMediumConverted)}</ListItem>
          <ListItem>High: {formatTime(avgTimeHighConverted)}</ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Metrics;