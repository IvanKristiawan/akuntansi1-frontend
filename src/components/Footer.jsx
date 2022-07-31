import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";

function Footer() {
  const { screenSize } = useStateContext();
  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: screenSize >= 650 && "space-between",
          alignItems: screenSize <= 650 && "center",
          flexDirection: screenSize >= 650 ? "row" : "column",
          pt: 4,
          pl: screenSize >= 650 ? 6 : 2,
          pr: screenSize >= 650 ? 6 : 2,
          pb: 1,
          mt: screenSize >= 1000 ? 5 : 2
        }}
      >
        <Typography>Hak Cipta dimiliki oleh Ivan Kristiawan</Typography>
        <Typography>2022</Typography>
      </Paper>
    </Box>
  );
}

export default Footer;
