import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num">10k+</Box>
            <Box className="static-text">Products Available</Box>
          </Stack>
          <Divider height="64" width="2" bg="#7A5299" />
          <Stack className="static-box">
            <Box className="static-num">24/7</Box>
            <Box className="static-text">Customer Support</Box>
          </Stack>
          <Divider height="64" width="2" bg="#7A5299" />
          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Home Brands</Box>
          </Stack>
          <Divider height="64" width="2" bg="#7A5299" />
          <Stack className="static-box">
            <Box className="static-num">99%</Box>
            <Box className="static-text">Satisfied Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
