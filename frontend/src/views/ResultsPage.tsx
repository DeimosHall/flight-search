import { useLocation, useNavigate } from 'react-router-dom';
import { getAirlineName, getAirportName, formatTime, formatTravelTime } from '../utils/formatters';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
} from '@mui/material';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.data || [];

  const handleReturnToSearch = () => {
    navigate('/');
  };

  const handleFlightClick = (result: any) => {
    navigate('/flight-details', { state: { flightDetails: result } });
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="left">
        <Button
          variant="outlined"
          onClick={handleReturnToSearch}
          style={{ marginTop: '20px', marginBottom: '20px', width: '200px' }}
        >
          Return to Search
        </Button>
      </Box>

      {results.map((result, index) => (
        <Paper
          key={index}
          elevation={3}
          style={{ padding: '20px', marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => handleFlightClick(result)}
        >
          <Box display="flex" flexDirection="column" minWidth="540px" flexWrap="wrap" gap={2}>
            <Box display="flex" flexDirection="column" textAlign="left">
              <Typography variant="subtitle1">
                {formatTime(result.segments[0].departureTime)} - {formatTime(result.segments[result.segments.length - 1].arrivalTime)}
              </Typography>
              <Typography variant="body2">
                {getAirportName(result.segments[0].departureAirport)} → {getAirportName(result.segments[result.segments.length - 1].arrivalAirport)}
              </Typography>
              <Typography variant="body2">
                {formatTravelTime(result.totalDuration)} in total ({result.layovers.length > 0 ? `${result.layovers.length} stop${result.layovers.length > 1 ? 's' : ''}` : 'Nonstop'})
              </Typography>
              {result.layovers.length > 0 && (
                <Typography variant="body2">
                  {result.layovers.map((layover, index) => (
                    <span key={index} style={{ display: 'block' }}>
                      {formatTravelTime(layover.duration)} in {getAirportName(layover.airportCode)}
                    </span>
                  ))}
                </Typography>
              )}
            </Box>
            <Box flex="1 1 50%" display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                {getAirlineName(result.segments[0].carrierCode)}
              </Typography>
              <Box textAlign="right">
                <Typography variant="h6">
                  {result.totalPrice} {result.currency} total
                </Typography>
                <Typography variant="body2">
                  {result.pricePerTraveler} {result.currency} per traveler
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      ))}

      {results.length === 0 && (
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          No results found.
        </Typography>
      )}
    </Container>
  );
};

export default ResultsPage;