import { Box, Link, Stack } from "@mui/material";
import Logo from "@/assets/images/logo.png?url";

export const HomePage = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ width: "350px" }} component="img" src={Logo} />
        <Link
          href="/checkin"
          sx={{
            background: "#366AE2",
            color: "white",
            fontWeight: "normal",
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Bắt đầu checkin/checkout
        </Link>
      </Stack>
    </Stack>
  );
};
