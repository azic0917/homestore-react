import React from "react";
import {
  Box,
  Container,
  Stack,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className={"active-users-frame"}>
      <Container sx={{ py: 6 }}>
        <Stack className={"main"}>
          <Box className={"category-title"}>Top Customers</Box>

          {topUsers.length !== 0 ? (
            <Grid container spacing={3} sx={{ mt: 3, width: "100%" }}>
              {topUsers.slice(0, 4).map((member: Member) => {
                const imagePath = member.memberImage
                  ? `${serverApi}/${member.memberImage}`
                  : "/icons/default-user.svg";

                return (
                  <Grid item key={member._id} xs={12} sm={6} md={3}>
                    <Card className={"card"}>
                      <CardContent className="card-body">
                        {/* Avatar Container with Subtle Glow */}
                        <Box className="avatar-wrapper">
                          <Avatar
                            src={imagePath}
                            alt={member.memberNick}
                            className="member-avatar"
                          >
                            <PersonOutlineIcon
                              sx={{ fontSize: 40, color: "#7A5299" }}
                            />
                          </Avatar>
                        </Box>

                        {/* Member Details */}
                        <Typography className={"member-nickname"}>
                          {member.memberNick}
                        </Typography>
                        <Typography className={"member-type"}>
                          Customer
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box className="no-data">No Active Users Yet!</Box>
          )}
        </Stack>
      </Container>
    </div>
  );
}
