import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayout } from "components/layouts";
import { GetServerSideProps } from "next";
import React from "react";
import { jwt } from "utils";

const AddressPage = () => {
  return (
    <ShopLayout title={""} pageDescription={""}>
      <Typography variant="h1" component="h1">
        Address
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Lastname" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address 2" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Postal code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select variant="filled" label="country" value={1}>
              <MenuItem value={1}>Germany</MenuItem>
              <MenuItem value={1}>Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Button color="secondary" className="circular-btn" size="large">
          Checkout
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = "" } = req.cookies; // or headers
  let isValidToken = false;

  try {
    await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/auth/login?p=/checkout/address",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
