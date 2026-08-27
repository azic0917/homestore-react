import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Fab,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

/* 1. Scaled up image dimensions to match larger modal */
const ModalImg = styled.img`
  width: 45%;
  height: 380px; /* Increased from 280px */
  object-fit: cover;
  border-radius: 12px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  /* 2. Enhanced base modal container styling with HomeStore branding accents */
  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
    p: 4 /* Increased padding from p: 3 */,
    outline: "none",
  };

  return (
    <div>
      {/* SIGNUP MODAL */}
      <Modal
        aria-labelledby="signup-modal-title"
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={signupOpen}>
          {/* Increased width from 650px to 800px */}
          <Box sx={{ ...modalStyle, width: "800px" }}>
            <Stack direction="row" spacing={4} alignItems="center">
              <ModalImg src="/img/auth-banner.svg" alt="auth banner" />
              <Stack spacing={2.5} sx={{ flex: 1, alignItems: "center" }}>
                <h2 style={{ margin: 0, color: "#4A2E65", fontSize: "28px" }}>
                  Signup Form
                </h2>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  onChange={handleUsername}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  onChange={handlePhone}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                />
                <Fab
                  variant="extended"
                  onClick={handleSignupRequest}
                  sx={{
                    width: "160px",
                    mt: 1,
                    backgroundColor: "#4A2E65",
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#7A5299" },
                  }}
                >
                  <LoginIcon sx={{ mr: 1 }} />
                  Signup
                </Fab>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* LOGIN MODAL */}
      <Modal
        aria-labelledby="login-modal-title"
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={loginOpen}>
          {/* Increased width from 600px to 750px */}
          <Box sx={{ ...modalStyle, width: "750px" }}>
            <Stack direction="row" spacing={4} alignItems="center">
              <ModalImg src="/img/auth-banner.svg" alt="auth banner" />
              <Stack spacing={2.5} sx={{ flex: 1, alignItems: "center" }}>
                <h2 style={{ margin: 0, color: "#4A2E65", fontSize: "28px" }}>
                  Login Form
                </h2>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  onChange={handleUsername}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                />
                <Fab
                  variant="extended"
                  onClick={handleLoginRequest}
                  sx={{
                    width: "160px",
                    mt: 1,
                    backgroundColor: "#4A2E65",
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#7A5299" },
                  }}
                >
                  <LoginIcon sx={{ mr: 1 }} />
                  Login
                </Fab>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
