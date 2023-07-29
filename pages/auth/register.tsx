import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import { AuthLayout } from "components/layouts";
import React, { useState } from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { tesloApi } from "api";
import { ErrorOutline } from "@mui/icons-material";
import { validations } from "utils";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegister = async ({ email, password, name }: FormData) => {
    setShowError(false);
    try {
      const { data } = await tesloApi.post("/user/register", {
        email,
        password,
        name,
      });
      const { token, user } = data;
    } catch (error) {
      console.log("Credentials error");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };
  return (
    <AuthLayout title="Sign in">
      <form onSubmit={handleSubmit(onRegister)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create account
              </Typography>
              <Chip
                label="User or password no recognised"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Fullname"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Field required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
              />
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
              <NextLink href="/auth/login" passHref legacyBehavior>
                <Link underline="always">Already have an account? Sign in</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
