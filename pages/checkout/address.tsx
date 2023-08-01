import {
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayout } from "components/layouts";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { jwt } from "utils";
import { countries } from "utils/countries";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = ():FormData => {
  return {
    firstName: Cookies.get('firstName')|| "",
    lastName: Cookies.get('lastName')|| "",
    address: Cookies.get('address')|| "",
    address2: Cookies.get('address2')|| "",
    zip: Cookies.get('zip')|| "",
    city: Cookies.get('city')|| "",
    country: Cookies.get('country')|| "",
    phone: Cookies.get('phone')|| "",
  }
}

const AddressPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  });

  const saveAddressInCookie = (data: FormData) => {
    Object.entries(data).forEach(([key, value]) => {
      const cookieValue = value || "";
      Cookies.set(key, cookieValue);
    });
  };

  const onSubmit = (data: FormData) => {
    saveAddressInCookie(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout title={""} pageDescription={""}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" component="h1">
          Address
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register("firstName", {
                required: "Field required",
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lastname"
              variant="filled"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register("lastName", {
                required: "Field required",
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register("address", {
                required: "Field required",
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2"
              variant="filled"
              fullWidth
              error={!!errors.address2}
              helperText={errors.address2?.message}
              {...register("address2")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal code"
              variant="filled"
              fullWidth
              error={!!errors.zip}
              helperText={errors.zip?.message}
              {...register("zip", {
                required: "Field required",
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
              {...register("city", {
                required: "Field required",
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Country"
                defaultValue={countries[0].code}
                error={!!errors.country}
                helperText={errors.country?.message}
                {...register("country", {
                  required: "Field required",
                })}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register("phone", {
                required: "Field required",
              })}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            type="submit"
          >
            Checkout
          </Button>
        </Box>
      </form>
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
