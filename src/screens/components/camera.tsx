import { Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Gán luồng video vào thẻ <video>
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    };

    startCamera();

    return () => {
      if (
        videoRef.current &&
        videoRef.current.srcObject instanceof MediaStream
      ) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <Stack sx={{ textAlign: "center" }}>
      {/* <video ref={videoRef} autoPlay playsInline width="100%" /> */}
      <Typography variant="body2">Vui lòng nhìn vào khung hình</Typography>
    </Stack>
  );
};

export default Camera;
