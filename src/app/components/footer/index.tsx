import React from "react";
import { Box, Container, Stack, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobals } from "../../hooks/useGlobals";

const Footers = styled.footer`
  width: 100%;
  background-color: #2d183e; /* Dark Plum tone derived from primary palette */
  color: #ffffff;
  padding: 60px 0 30px;
`;

const StyledLink = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

export default function Footer() {
  const { authMember } = useGlobals();

  return (
    <Footers>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={4}
        >
          {/* BRAND & DESCRIPTION SECTION */}
          <Stack spacing={2} sx={{ maxWidth: "340px" }}>
            <Box>
              <img
                height="40px"
                src="/icons/homestore.svg"
                alt="HomeStore Logo"
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "#E0E0E0", lineHeight: 1.6 }}
            >
              Your destination for modern home essentials and kitchenware.
              Crafted for comfort, styled for everyday living.
            </Typography>
            <Stack direction="row" spacing={2} className="sns-context">
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              <img
                src="/icons/twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
              <img
                src="/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
              <img
                src="/icons/youtube.svg"
                alt="YouTube"
                width={24}
                height={24}
              />
            </Stack>
          </Stack>

          {/* NAVIGATION LINKS & CONTACT */}
          <Stack direction="row" spacing={{ xs: 4, sm: 8 }}>
            {/* SECTIONS */}
            <Stack spacing={1.5}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#FFFFFF" }}
              >
                Sections
              </Typography>
              <Stack spacing={1}>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/products">Products</StyledLink>
                {authMember && <StyledLink to="/orders">Orders</StyledLink>}
                <StyledLink to="/help">Help</StyledLink>
              </Stack>
            </Stack>

            {/* FIND US */}
            <Stack spacing={1.5}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#FFFFFF" }}
              >
                Find Us
              </Typography>
              <Stack spacing={1} sx={{ color: "#E0E0E0", fontSize: "14px" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    component="span"
                    fontWeight={700}
                    color="primary.light"
                  >
                    L.
                  </Typography>
                  <span>123 Gangnam-ro, Gangnam-gu, Seoul</span>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    component="span"
                    fontWeight={700}
                    color="primary.light"
                  >
                    P.
                  </Typography>
                  <span>+1 (800) 555-0199</span>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    component="span"
                    fontWeight={700}
                    color="primary.light"
                  >
                    E.
                  </Typography>
                  <span>support@homestore.com</span>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    component="span"
                    fontWeight={700}
                    color="primary.light"
                  >
                    H.
                  </Typography>
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* DIVIDER & COPYRIGHT */}
        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.12)" }} />

        <Typography variant="body2" align="center" sx={{ color: "#A0A0A0" }}>
          © {new Date().getFullYear()} HomeStore. All rights reserved.
        </Typography>
      </Container>
    </Footers>
  );
}
