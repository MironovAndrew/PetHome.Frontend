import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export function PageFooter() {
  return (
    <Box
      sx={{
        backgroundColor: "#3a3a3a",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "20px",
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Typography variant="body2" color="#a9a8a8" align="center">
          {"Андрей © "}
          <Link color="inherit" href="https://vk.com/">
            Copyright
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}
