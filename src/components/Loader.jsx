import React from "react";
import { Box, LinearProgress, Typography, Skeleton } from "@mui/material";

const Loader = () => {
  return (
    <Box>
      <Skeleton variant="h1" />
      <Box sx={{ marginTop: 2, display: "flex" }}>
        <Skeleton variant="h1" width={100} sx={{ marginRight: 1 }} />
        <Skeleton variant="h1" width={100} sx={{ marginRight: 1 }} />
        <Skeleton variant="h1" width={100} sx={{ marginRight: 1 }} />
      </Box>
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", marginTop: 2 }}
        height={200}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Skeleton variant="h1" sx={{ width: "80%" }} />
      </Box>
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", marginTop: 2 }}
        height={118}
      />
    </Box>
  );
};

export default Loader;
