import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export function Main() {
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            height: "100vh", // Устанавливаем высоту контейнера на высоту экрана
            display: "flex", // Включаем Flexbox
            justifyContent: "center", // Выравнивание по горизонтали
            alignItems: "center", // Выравнивание по вертикали
          }}
        >
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "20vh",
              width: "100%",
              display: "flex", // Включаем Flexbox для выравнивания текста
              justifyContent: "center", // Выравниваем текст по горизонтали
              alignItems: "center", // Выравниваем текст по вертикали
            }}
          >
            <Typography variant="h4" component="div">
              Добро пожаловать!
            </Typography>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}
