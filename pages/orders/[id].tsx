import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "components/cart";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import NextLink from "next/link";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout title="Orden summary 238992" pageDescription="Order summary">
      <Typography variant="h1" component="h1">
        Order:238992
      </Typography>
      {/*       <Chip
        sx={{ my: 2 }}
        label="Pending payment"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label="Paid"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary (3 products) </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping address</Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <Typography>Alan Maranto</Typography>
              <Typography>453 Always Blue</Typography>
              <Typography>London 283</Typography>
              <Typography>England</Typography>
              <Typography>+52 558193930</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                TODO:
                <h1>Pay</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Paid"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
