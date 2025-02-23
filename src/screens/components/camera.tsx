import { Stack, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [faceDescriptor, setFaceDescriptor] = useState<Float32Array | null>(
    null
  );
  const [isCheckingFace, setIsCheckingFace] = useState<boolean>(false);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      setIsModelLoaded(true);
      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Lỗi mở webcam:", err));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isModelLoaded) return;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setIsCheckingFace(true);

      const img = await faceapi.bufferToImage(file);
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        setFaceDescriptor(detection.descriptor);
        console.log("🔍 Ảnh đã tải lên được quét xong.");
        detectLiveFace(detection.descriptor); // Bắt đầu quét từ camera ngay sau khi upload
      } else {
        console.log("❌ Không phát hiện khuôn mặt trong ảnh!");
        setIsCheckingFace(false);
      }
    }
  };

  const detectLiveFace = async (uploadedDescriptor: Float32Array) => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const detect = async () => {
      if (!videoRef.current) return;
      setIsCheckingFace(true);
      const detection = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();
      setIsCheckingFace(false);

      if (detection) {
        const distance = faceapi.euclideanDistance(
          uploadedDescriptor,
          detection.descriptor
        );
        console.log("Khoảng cách khuôn mặt:", distance);

        if (distance < 0.6) {
          console.log("✅ Khuôn mặt trùng khớp!");
        } else {
          console.log("❌ Không khớp! Vui lòng thử lại.");
        }

        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(
            canvas,
            faceapi.resizeResults(detection, displaySize)
          );
          context.fillStyle = "white";
          context.font = "20px Arial";
          context.fillText(`Similarity: ${(1 - distance).toFixed(2)}`, 10, 30);
        }
      }
    };

    await detect();
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
    >
      {/* <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={!isModelLoaded}
      />

      {image && (
        <Box
          sx={{
            width: 160,
            height: 160,
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded Face"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )} */}

      {/* {isCheckingFace ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="textSecondary">
            Đang kiểm tra khuôn mặt...
          </Typography>
        </Stack>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Vui lòng tải ảnh lên và nhìn vào camera
        </Typography>
      )} */}

      {/* Video và Canvas */}
      <Box sx={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></canvas>
      </Box>
    </Stack>
  );
};

export default Camera;
