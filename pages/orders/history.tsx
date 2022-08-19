import { Chip, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Fullname", width: 300 },
  {
    field: "paid",
    headerName: "Paid",
    description: "Show if the order is paid or not",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Pending payment" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "See order",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink
          href={`/orders/[id]`}
          as={`/orders/${params.row.id}`}
          passHref
        >
          <Link underline="always">See order</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Alan Maranto" },
  { id: 2, paid: false, fullname: "John Doe" },
  { id: 3, paid: false, fullname: "Jane Doe" },
  { id: 4, paid: true, fullname: "John Doe" },
  { id: 5, paid: false, fullname: "Jane Doe" },
  { id: 6, paid: true, fullname: "John Doe" },
  { id: 7, paid: true, fullname: "Jane Doe" },
  { id: 8, paid: true, fullname: "John Doe" },
];

const HistoryPage = () => {
  return (
    <ShopLayout title="ORder history" pageDescription="orders history">
      <Typography variant="h1" component="h1">
        Order history
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
