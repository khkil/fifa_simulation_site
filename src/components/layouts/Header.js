import { SportsSoccer } from "@mui/icons-material";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";

const pages = [
  {
    title: "선수 조회",
    link: "/players",
  },
  {
    title: "유저 조회",
    link: "/users",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsSoccer sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FIFA
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map(({ title, link }, index) => (
              <Button
                key={index}
                onClick={() => {
                  router.push(link);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
