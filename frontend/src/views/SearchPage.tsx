import React, { useState } from 'react';
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
  const [formData, setFormData] = useState<FlightSearchForm>({
    departureAirport: 'SFO',
    arrivalAirport: 'LAX',
    departureDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    currency: 'USD',
    nonStop: false,
    adults: 1,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await flights.getAll(formData);
      console.log('Flight search results:', response);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Flight Search
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 20, sm: 10 }}>
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
          <Grid2 size={{ xs: 20, sm: 10 }}>
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
          <Grid2 size={{ xs: 20, sm: 10 }}>
            <TextField
              fullWidth
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
              value={formData.adults}
              onChange={handleChange}
              inputProps={{
                min: 1
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 20, sm: 10 }}>
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
          <Grid2 size={{ xs: 20, sm: 10 }}>
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
          <Grid2 size={{ xs: 20, sm: 10 }}>
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
          <Grid2 size={{ xs: 20, sm: 10 }}>
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
          <Grid2 size={{ xs: 20, sm: 10 }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Search
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};

export default SearchPage;