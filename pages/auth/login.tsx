import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
  Divider,
} from "@mui/material";
import { AuthLayout } from "components/layouts";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "utils";
import { ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onLogin = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn("credentials", { email, password });
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
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">Dont have an account? Sign up</Link>
              </NextLink>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end"
            >
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers).map((prov: any) => {
                if (prov.id === "credentials")
                  return <div key="credentials"></div>;
                return (
                  <Button
                    key={prov.id}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ mb: 1 }}
                    onClick={() => signIn(prov.id)}
                  >
                    {prov.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
