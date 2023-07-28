import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import { AuthLayout } from "components/layouts";
import React from "react";
import NextLink from "next/link";

const LoginPage = () => {
  return (
    <AuthLayout title="Sign in">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Log In
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="password"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Sign in
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/register" passHref legacyBehavior>
              <Link underline="always">Dont have an account? Sign up</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
