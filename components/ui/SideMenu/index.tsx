import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { adminMenu, clientMenu, icons, MenuItem } from "./constants";
import { FC } from "react";

interface Props {
  data: MenuItem[];
}

const ListItems: FC<Props> = ({ data }) => {
  const items = data.map(({ label, icon, properties }) => {
    const Icon = icons[icon];
    return (
      <ListItem button key={label} {...properties}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    );
  });

  return <>{items}</>;
};

export const SideMenu = () => {
  return (
    <Drawer
      open={false}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          <ListItems data={clientMenu} />
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>
          <ListItems data={adminMenu} />
        </List>
      </Box>
    </Drawer>
  );
};
