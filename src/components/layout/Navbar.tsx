import React from "react";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../../index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface MenuItemData {
  label: string;
  action: () => void;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout, user } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/blogs") {
      return location.pathname === "/blogs";
    }

    return location.pathname.startsWith(path);
  };

  const menuItems: MenuItemData[] = [
    {
      label: `My Blogs (${user?.username || "User"})`,
      action: () => navigate("/blogs/my-blogs"),
    },
    { label: "Logout", action: handleLogout },
  ];

  const navItems = [
    { label: "Home", path: "/blogs" },
    { label: "Add Blog", path: "/blogs/add-blog" },
  ];

  const mobileMenuItems: MenuItemData[] = [
    ...navItems.map((item) => ({
      label: item.label,
      action: () => navigate(item.path),
    })),
    ...menuItems,
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#121212",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          py: 1,
          minHeight: 56,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 35 }}>
          <div
            className="nine cursor-pointer"
            onClick={() => navigate("/blogs")}
          >
            <h1>Blogs</h1>
          </div>

          {!isMobile && (
            <>
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className={`nav-button ${
                    isActive(item.path) ? "active" : ""
                  }`}
                  role="button"
                  onClick={() => navigate(item.path)}
                  style={{
                    backgroundColor: isActive(item.path)
                      ? "#BB86FC"
                      : "transparent",
                    color: isActive(item.path) ? "#121212" : "#E0E0E0",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(187, 134, 252, 0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {!isMobile && user && (
            <span
              style={{
                color: "#E0E0E0",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Welcome,{" "}
              <h1 className="text-yellow-500 text-transform: uppercase">
                {user.username}
              </h1>
            </span>
          )}

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="navigation-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{
              color: "#E0E0E0",
              "&:hover": { backgroundColor: "rgba(187, 134, 252, 0.15)" },
              transition: "background-color 0.3s ease",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="navigation-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 180,
                boxShadow: "0 8px 24px rgba(0,0,0,0.9)",
                borderRadius: 2,
                bgcolor: "#1E1E1E",
                color: "#E0E0E0",
              },
            }}
          >
            {(isMobile ? mobileMenuItems : menuItems).map((item, index) => (
              <MenuItem
                key={`${item.label}-${index}`}
                onClick={() => {
                  handleMenuClose();
                  item.action();
                }}
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  py: 1.5,
                  "&:hover": { backgroundColor: "#BB86FC", color: "#121212" },
                  transition: "background-color 0.3s ease, color 0.3s ease",

                  ...(isMobile &&
                    navItems.some(
                      (navItem) =>
                        navItem.label === item.label && isActive(navItem.path)
                    ) && {
                      backgroundColor: "rgba(187, 134, 252, 0.2)",
                    }),
                  ...(item.label === "Logout" && {
                    borderTop: "1px solid rgba(224, 224, 224, 0.1)",
                    color: "#FF6B6B",
                    "&:hover": {
                      backgroundColor: "#FF6B6B",
                      color: "#FFFFFF",
                    },
                  }),
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
