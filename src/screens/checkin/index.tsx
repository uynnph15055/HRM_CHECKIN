import { Typography, Stack, Box } from "@mui/material";
import Camera from "../components/camera";
import Logo from "@/assets/images/logo.png?url";

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
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Box sx={{ width: "150px" }} component="img" src={Logo} />
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          Hệ thống phân tích khuân mặt
        </Typography>
      </Box>
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
        >
          <Typography
            style={{
              paddingBottom: "10px",
              borderBottom: "1px solid #ccc",
            }}
            variant="h6"
            fontWeight="bold"
          >
            Thông tin cá nhân
          </Typography>
          <Stack>
            <Box
              style={{
                marginTop: "10px",
                gap: "15px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1">
                <strong>Họ và tên:</strong> Nguyễn Văn A
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> nguyenvana@example.com
              </Typography>
              <Typography variant="body1">
                <strong>Số điện thoại:</strong> 0123 456 789
              </Typography>
              <Typography variant="body1">
                <strong>Địa chỉ:</strong> 123 Đường ABC, TP. Hồ Chí Minh
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckInPage;
