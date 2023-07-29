import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import { AuthLayout } from "components/layouts";
import React from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLogin = (data: FormData) => {};

  return (
    <AuthLayout title="Sign in">
      <form onSubmit={handleSubmit(onLogin)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Log In
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="email"
                variant="filled"
                fullWidth
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="password"
                type="password"
                variant="filled"
                fullWidth
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
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
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
