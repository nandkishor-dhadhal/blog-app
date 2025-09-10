import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#121212",
        color: "#E0E0E0",
        textAlign: "center",
        py: 2,
        mt: 4,
        boxShadow: "0 -4px 12px rgba(0,0,0,0.7)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
        <IconButton
          component="a"
          href="https://github.com"
          target="_blank"
          rel="noopener"
          sx={{
            color: "#E0E0E0",
            "&:hover": { color: "#BB86FC" },
          }}
        >
          <GitHubIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener"
          sx={{
            color: "#E0E0E0",
            "&:hover": { color: "#BB86FC" },
          }}
        >
          <TwitterIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://linkedin.com"
          target="_blank"
          rel="noopener"
          sx={{
            color: "#E0E0E0",
            "&:hover": { color: "#BB86FC" },
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
        © {new Date().getFullYear()} Thread of Truth. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
