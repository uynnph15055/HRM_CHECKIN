import { Stack, Box, Typography, keyframes } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import CameraDefault from "@/assets/images/camera-default.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL, DataType, TypeCheckedFace } from "@/types/type";

interface CameraProps {
  staff: DataType | undefined;
  setStaff: React.Dispatch<React.SetStateAction<DataType | undefined>>;
}

const Camera: React.FC<CameraProps> = ({ staff, setStaff }) => {
  const [isChecked, setIsChecked] = useState(TypeCheckedFace[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timeNow, setTimeNow] = useState("");
  const [image, setImage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setTimeNow(String(hours) + ":" + String(minutes));
  };

  useEffect(() => {
    if (staff) {
      const loadModels = async () => {
        const MODEL_URL = "/models";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        startVideo();
      };

      loadModels();
    } else {
      setImage("");
    }
  }, [staff]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          username: staff?.username,
          employeeId: staff?.employee.id,
          time: "08:30:20",
          attendances: true,
        };
        const response = await fetch(API_URL + "/external/find/vector", {
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
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    if (isChecked === TypeCheckedFace[2] && timeNow) fetchData();
  }, [isChecked, timeNow]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadeddata = () => {
            detectLiveFace();
          };
        }
      })
      .catch((err) => console.error("Lỗi mở webcam:", err));
  };

  const base64ToImage = (base64: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  const getDescriptorFromBase64 = async (base64: string) => {
    const img = await base64ToImage(base64);
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      console.error("Không tìm thấy khuôn mặt trong ảnh Base64!");
      return null;
    }

    return detection.descriptor;
  };

  const detectLiveFace = async () => {
    if (!videoRef.current || !canvasRef.current || !staff) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("Kích thước video không hợp lệ!");
      return;
    }

    faceapi.matchDimensions(canvas, {
      width: video.videoWidth,
      height: video.videoHeight,
    });

    const uploadedDescriptor = await getDescriptorFromBase64(
      staff.avartarBase64
    );
    if (!uploadedDescriptor) return;

    const detect = async () => {
      if (!videoRef.current) return;
      const detection = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const distance = faceapi.euclideanDistance(
          uploadedDescriptor,
          detection.descriptor
        );

        if (distance < 0.4) {
          setIsChecked(TypeCheckedFace[2]);
        } else {
          setIsChecked(TypeCheckedFace[1]);
        }

        captureImage(video);

        getCurrentTime();
        stopVideo();
      } else {
        requestAnimationFrame(detect); // Tiếp tục detect nếu chưa thấy khuôn mặt
      }
    };

    detect();
  };

  const captureImage = (video: HTMLVideoElement) => {
    const capturedCanvas = document.createElement("canvas");
    capturedCanvas.width = video.videoWidth;
    capturedCanvas.height = video.videoHeight;
    const capturedCtx = capturedCanvas.getContext("2d");

    if (capturedCtx) {
      capturedCtx.drawImage(
        video,
        0,
        0,
        capturedCanvas.width,
        capturedCanvas.height
      );
      const imageData = capturedCanvas.toDataURL("image/png");
      setImage(imageData);
      console.log("Ảnh đã chụp:", imageData);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const blink = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0.3; }
`;

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
    >
      <Stack sx={{ display: "flex", justifyContent: "start" }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: "red",
            borderRadius: "50%",
            animation: `${blink} 1s infinite alternate`,
          }}
        />
      </Stack>
      {staff && typeof staff.avartarBase64 === "string" ? (
        image ? (
          <Box>
            <img
              style={{
                objectFit: "cover",
                height: "200px",
              }}
              width="100%"
              src={image}
            />
          </Box>
        ) : (
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
        )
      ) : (
        <Box>
          <img
            style={{
              objectFit: "cover",
              height: "200px",
            }}
            width="100%"
            src={CameraDefault}
          />
        </Box>
      )}
      {staff && typeof staff.avartarBase64 === "string" ? (
        image ? (
          <>
            <Typography variant="body2" color="success">
              Bạn đã check in thành công !
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginTop: "5px",
              }}
              color="info"
            >
              {timeNow}
            </Typography>
          </>
        ) : (
          <>
            <CircularProgress size={20} />
            <Typography variant="body2" color="textSecondary">
              Vui lòng nhìn thẳng vào camera
            </Typography>
          </>
        )
      ) : (
        <Typography
          variant="caption"
          sx={{ fontStyle: "italic" }}
          color="textSecondary"
        >
          Không có thông tin !
        </Typography>
      )}
    </Stack>
  );
};

export default Camera;
