import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';

interface FlightSearchForm {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate: string;
  currency: string;
  nonStop: boolean;
  numberOfAdults: number; // Added field
}

const SearchPage = () => {
  const [formData, setFormData] = useState<FlightSearchForm>({
    departureAirport: 'SFO',
    arrivalAirport: 'LAX',
    departureDate: '2022-01-01',
    returnDate: '2022-01-01',
    currency: 'USD',
    nonStop: false,
    numberOfAdults: 1, // Default value
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    // Here you would typically send the form data to your backend API
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Flight Search
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Departure Date"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Return Date"
              name="returnDate"
              type="date"
              value={formData.returnDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
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
              <MenuItem value="GBP">GBP</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
              value={formData.numberOfAdults}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SearchPage;