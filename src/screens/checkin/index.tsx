import { Typography, Stack, Box, Button } from "@mui/material";
import Camera from "../components/camera";
import Logo from "@/assets/images/logo.png";
import UserDefault from "@/assets/images/user-default.jpg";
import { useState } from "react";
import { FakeData } from "@/types/face-data";
import { API_URL, DataType } from "@/types/type";
import moment from "moment";

const CheckInPage = () => {
  const [keyword, setKeyword] = useState("");
  const [staff, setStaff] = useState<DataType | undefined>();
  const [error, setError] = useState("");

  const handelReset = () => {
    setError("");
    setKeyword("");
    setStaff(undefined);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setError("");
    }
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        username: keyword.trim(),
      };
      const response = await fetch(API_URL + "/external/find/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const postData = await response.json();
      if (postData) {
        setStaff(postData.data);
      }
    } catch (error) {
      setError("Mã nhân viên không chính xác");
    }
  };

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
          marginTop: "-100px",
          textAlign: "center",
        }}
      >
        <Box sx={{ width: "150px" }} component="img" src={Logo} />
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          HỆ THỐNG CHẤM CÔNG
        </Typography>
      </Box>
      <Stack
        sx={{
          width: "1250px",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "25px",
        }}
      >
        <Stack
          sx={{ padding: "15px", background: "white", borderRadius: "12px" }}
        >
          <Camera staff={staff} setStaff={setStaff} />
        </Stack>
        <Stack
          sx={{
            padding: "20px",
            background: "white",
            borderRadius: "12px",
          }}
        >
          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
              paddingBottom: "15px",
              borderBottom: "1px solid #F0F0F0",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Thông tin cá nhân
            </Typography>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" onClick={() => handelReset()}>
                Reset
              </Button>
            </Box>
          </Stack>
          <Stack
            style={{
              display: "grid",
              gridTemplateColumns: "200px auto",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Box
              style={{
                width: "100%",
              }}
            >
              {staff && typeof staff.avartarBase64 === "string" ? (
                <img
                  style={{
                    objectFit: "cover",
                    height: "250px",
                  }}
                  width="100%"
                  src={staff.avartarBase64}
                />
              ) : (
                <img
                  style={{
                    objectFit: "cover",
                    height: "250px",
                  }}
                  width="100%"
                  src={UserDefault}
                />
              )}
            </Box>

            <Box>
              <div style={{ display: "flex", gap: "15px" }}>
                <Box className="">
                  <input
                    onChange={(e) => handleSearch(e)}
                    placeholder="Mã nhân viên"
                    value={keyword}
                    style={{
                      outline: "none",
                      height: "30px",
                      paddingLeft: "10px",
                      border: "1px solid #448fe6",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
                <Button
                  onClick={handleSubmit}
                  disabled={!keyword || staff !== undefined}
                  variant="contained"
                >
                  Tìm kiếm
                </Button>
              </div>
              {error && !staff && (
                <Typography
                  variant="caption"
                  color="#ec0729"
                  sx={{ marginTop: "4px" }}
                >
                  {error}
                </Typography>
              )}

              <Box
                sx={{
                  gap: "15px",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <strong>Họ và tên:</strong>{" "}
                  {staff ? staff.first_name + " " + staff.last_name : ""}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <strong>Ngày sinh:</strong>{" "}
                  {staff ? moment(staff.birthday).format("DD/MM/YYYY") : ""}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <strong>Giới tính:</strong>{" "}
                  {staff && staff.gender == "2"
                    ? "Nam"
                    : staff && staff.gender == "1"
                    ? "Nữ"
                    : ""}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <strong>Email:</strong> {staff ? staff.personal_email : ""}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <strong>Số điện thoại:</strong> {staff ? staff.phone : ""}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckInPage;
