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
import { /* adminMenu, */ clientMenu, icons, MenuItem } from "./constants";
import { FC, useContext, useState } from "react";
import { UiContext } from "context";
import { useRouter } from "next/router";

interface Props {
  data: MenuItem[];
  navigateTo: (url: string) => void;
}

const ListItems: FC<Props> = ({ data, navigateTo }) => {
  const items = data.map(({ label, icon, properties, href }) => {
    const Icon = icons[icon];
    return (
      <ListItem
        button
        onClick={() => navigateTo(href)}
        key={label}
        {...properties}
      >
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
  const [searchTerm, setSearchTerm] = useState("");

  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const router = useRouter();

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    router.push(url);
    toggleSideMenu();
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && onSearchTerm()}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          <ListItems data={clientMenu} navigateTo={navigateTo} />
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>
          {/* <ListItems data={adminMenu} navigate={navigateTo} /> */}
        </List>
      </Box>
    </Drawer>
  );
};
