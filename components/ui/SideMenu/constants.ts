import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";

export interface MenuItem {
  label: string;
  icon: keyof typeof icons;
  properties?: Object;
  href: string;
}

export const icons = {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
};

export const categoriesMenu: MenuItem[] = [
  /*   {
    label: "Profile",
    icon: "AccountCircleOutlined",
  },
  {
    label: "My Orders",
    icon: "ConfirmationNumberOutlined",
  }, */
  {
    label: "Men",
    icon: "MaleOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
    href: "/category/men",
  },
  {
    label: "Women",
    icon: "FemaleOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
    href: "/category/women",
  },
  {
    label: "Kids",
    icon: "EscalatorWarningOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
    href: "/category/kids",
  },
  /*   {
    label: "Sign In",
    icon: "VpnKeyOutlined",
  },
  {
    label: "Log Out",
    icon: "LoginOutlined",
  }, */
];

export const adminMenu: MenuItem[] = [
  {
    label: "Products",
    icon: "CategoryOutlined",
    href: "/category/kids",
  },
  {
    label: "Orders",
    icon: "ConfirmationNumberOutlined",
    href: "/category/kids",
  },
  {
    label: "Users",
    icon: "AdminPanelSettings",
    href: "/category/kids",
  },
];
