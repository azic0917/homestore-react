import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";

// Import Swiper styles if not already imported globally
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Container maxWidth="lg">
        <Stack className={"events-main"}>
          <Box className={"events-text"}>
            <Typography className={"category-title"}>Weekly Events</Typography>
          </Box>

          <Swiper
            className={"events-info swiper-wrapper"}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          >
            {plans.map((value, number) => {
              return (
                <SwiperSlide key={number} className={"events-info-frame"}>
                  <div className={"events-img-wrapper"}>
                    <img
                      src={value.img}
                      alt={value.title}
                      className={"events-img"}
                    />
                  </div>
                  <Box className={"events-desc"}>
                    <Box className={"events-bott"}>
                      <Box className={"bott-left"}>
                        <div className={"event-title-speaker"}>
                          <Typography
                            component="strong"
                            className="event-title"
                          >
                            {value.title}
                          </Typography>
                          <div className={"event-organizator"}>
                            <img src={"/icons/speaker.svg"} alt="Speaker" />
                            <p className={"spec-text-author"}>{value.author}</p>
                          </div>
                        </div>

                        <p className={"text-desc"}>{value.desc}</p>

                        <div className={"bott-info"}>
                          <div className={"bott-info-main"}>
                            <img src={"/icons/calendar.svg"} alt="Calendar" />
                            {value.date}
                          </div>
                          <div className={"bott-info-main"}>
                            <img src={"/icons/location.svg"} alt="Location" />
                            {value.location}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Controls */}
          <Box className={"prev-next-frame"}>
            <div className={"swiper-button-prev custom-arrow"}>
              <img src={"/icons/arrow-right.svg"} alt="Previous" />
            </div>
            <div className={"dot-frame-pagination swiper-pagination"}></div>
            <div className={"swiper-button-next custom-arrow"}>
              <img src={"/icons/arrow-right.svg"} alt="Next" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
