import React from "react";
import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import NextLink from "next/link";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Tesla |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/category/men" passHref legacyBehavior>
            <Link>
              <Button>Men</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref legacyBehavior>
            <Link>
              <Button>Women</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kids" passHref legacyBehavior>
            <Link>
              <Button>Kids</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <NextLink href="/" passHref legacyBehavior>
          <Link>
            <Button>Menú</Button>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
