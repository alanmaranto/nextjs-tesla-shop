import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import { AuthLayout } from "components/layouts";
import React from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "utils";
import { tesloApi } from "api";

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

  const onLogin = async ({ email, password }: FormData) => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
    } catch (error) {
      console.log("Credentials error");
    }
  };

  return (
    <AuthLayout title="Sign in">
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Log In
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Field required",
                  validate: validations.isEmail,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Field required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
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
