import { Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${160.35}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${26.1}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">${186.45}</Typography>
      </Grid>
    </Grid>
  );
};
