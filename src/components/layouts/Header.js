import { SportsSoccer } from "@mui/icons-material";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";

const pages = [
  {
    title: "선수 조회",
    link: "/players",
  },
  {
    title: "거래내역",
    link: "/user/trades",
  },
  {
    title: "경기기록",
    link: "/user/matches",
  },
  {
    title: "스쿼드 조회",
    link: "/user/squad",
  },
];

function Header() {
  const { push, pathname } = useRouter();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Image
            src="/logo.jpg"
            width={100}
            height={100}
            alt="Picture of the author"
            onClick={() => {
              push("/");
            }}
            style={{ cursor: "pointer" }}
          /> */}
          <SportsSoccer sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FC-ON
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map(({ title, link }, index) => (
              <Button
                key={index}
                color="error"
                onClick={() => {
                  push(link);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
                style={{ background: pathname === link && "#6e6d7a" }}
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
