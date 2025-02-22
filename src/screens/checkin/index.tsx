import { Card, Stack } from "@mui/material";
import Camera from "../components/camera";

const CheckInPage = () => {
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
        sx={{
          height: "400px",
          width: "1250px",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "25px",
        }}
      >
        <Stack
          sx={{ padding: "15px", background: "white", borderRadius: "12px" }}
        >
          <Camera />
        </Stack>
        <Stack
          sx={{ padding: "15px", background: "white", borderRadius: "12px" }}
        ></Stack>
      </Stack>
    </Stack>
  );
};

export default CheckInPage;
