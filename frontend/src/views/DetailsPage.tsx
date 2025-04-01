import { useLocation, useNavigate } from 'react-router-dom';
import { getAirlineName, getAirportName, formatTime, formatTravelTime } from '../utils/formatters';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flightDetails = location.state?.flightDetails;

  const handleBack = () => {
    navigate(-1);
  };
  
  if (!flightDetails) {
    return <Typography>No flight details available</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="left">
        <Button
          variant="outlined"
          onClick={handleBack}
          style={{ marginTop: '20px', marginBottom: '20px', width: '200px' }}
        >
          Return to Results
        </Button>
      </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Flight Details
              </Typography>
              <Typography variant="subtitle1">
                {getAirportName(flightDetails.segments[0].departureAirport)} →{' '}
                {getAirportName(flightDetails.segments[flightDetails.segments.length - 1].arrivalAirport)}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Duration: {formatTravelTime(flightDetails.totalDuration)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {flightDetails.segments.map((segment: any, index: number) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Segment {index + 1}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Departure</Typography>
                      <Typography>{formatTime(segment.departureTime)}</Typography>
                      <Typography>{getAirportName(segment.departureAirport)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Arrival</Typography>
                      <Typography>{formatTime(segment.arrivalTime)}</Typography>
                      <Typography>{getAirportName(segment.arrivalAirport)}</Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Operated by</Typography>
                    <Typography>
                      {getAirlineName(segment.carrierCode)}
                      {segment.operatingCarrierCode && segment.operatingCarrierCode !== segment.carrierCode && (
                        <Typography component="span" color="text.secondary">
                          {' '}(Operated by {getAirlineName(segment.operatingCarrierCode)})
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  {index < flightDetails.segments.length - 1 && flightDetails.layovers[index] && (
                    <Box sx={{ mt: 2, bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Layover in {getAirportName(flightDetails.layovers[index].airportCode)}
                      </Typography>
                      <Typography color="text.secondary">
                        Duration: {formatTravelTime(flightDetails.layovers[index].duration)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Price Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Total Price"
                    secondary={`${flightDetails.totalPrice} ${flightDetails.currency}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Price per Traveler"
                    secondary={`${flightDetails.pricePerTraveler} ${flightDetails.currency}`}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DetailsPage;