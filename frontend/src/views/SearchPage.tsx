import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid2,
  MenuItem,
  Switch,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';
import { flights } from '../api/flights';

interface FlightSearchForm {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate: string;
  currency: string;
  nonStop: boolean;
  adults: number;
}

const SearchPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FlightSearchForm>({
    departureAirport: 'SFO',
    arrivalAirport: 'LAX',
    departureDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    currency: 'USD',
    nonStop: false,
    adults: 1,
  });

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateFormData = (data: FlightSearchForm) => {
    const { departureAirport, arrivalAirport, departureDate, returnDate, adults } = data;

    if (!departureAirport || !arrivalAirport || !departureDate || !adults) {
      setErrorMessage('Please fill in all required fields.');
      return false;
    }

    if (adults < 1 || adults > 9) {
      setErrorMessage('Number of adults must be between 1 and 9.');
      return false;
    }

    if (new Date(departureDate) < new Date()) {
      setErrorMessage('Departure date cannot be in the past.');
      return false;
    }

    if (returnDate && new Date(returnDate) <= new Date(departureDate)) {
      setErrorMessage('Return date must be after departure date.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    if (!validateFormData(formData)) {
      console.error('Invalid form data');
      return;
    }

    setLoading(true);

    try {
      const response = await flights.getAll(formData);
      console.log('Flight search results:', response);
      navigate('/results', { state: { data: response } });
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setErrorMessage('Failed to fetch flight data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Flight Search
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '120%' }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <TextField
              fullWidth
              label="Departure Airport"
              name="departureAirport"
              value={formData.departureAirport}
              onChange={handleChange}
              select
            >
              <MenuItem value="SFO">SFO</MenuItem>
              <MenuItem value="JFK">JFK</MenuItem>
              <MenuItem value="LHR">LHR</MenuItem>
            </TextField>
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <TextField
              fullWidth
              label="Arrival Airport"
              name="arrivalAirport"
              value={formData.arrivalAirport}
              onChange={handleChange}
              select
            >
              <MenuItem value="LAX">LAX</MenuItem>
              <MenuItem value="ORD">ORD</MenuItem>
              <MenuItem value="CDG">CDG</MenuItem>
            </TextField>
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <TextField
              fullWidth
              label="Number of Adults"
              name="adults"
              type="number"
              value={formData.adults}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 1,
                  max: 9
                },
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <TextField
              fullWidth
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              select
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="MXN">MXN</MenuItem>
            </TextField>
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <TextField
              fullWidth
              label="Departure Date"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!!formData.returnDate}
                  onChange={(event) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      returnDate: event.target.checked
                        ? new Date(Date.now() + 86400000).toISOString().split('T')[0]
                        : '',
                    }));
                  }}
                  name="returnDateSwitch"
                  color="primary"
                />
              }
              label="Return Date"
            />
            {formData.returnDate && (
              <TextField
                fullWidth
                label="Return Date"
                name="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.nonStop}
                  onChange={handleChange}
                  name="nonStop"
                  color="primary"
                />
              }
              label="Non-stop"
            />
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
              >
                Search
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 4, sm: 10 }}>
            {errorMessage && <Alert severity="error" style={{ marginBottom: '16px', width: "94%" }}>{errorMessage}</Alert>}
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};

export default SearchPage;