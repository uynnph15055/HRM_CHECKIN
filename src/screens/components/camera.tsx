import { Stack, Box, Typography, keyframes, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import CameraDefault from "@/assets/images/camera-default.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import {
  API_URL,
  DataType,
  ResponseCheckTime,
  TypeCheckedFace,
  TypeCheckInOut,
} from "@/types/type";

interface CameraProps {
  staff: DataType | undefined;
  setStaff: React.Dispatch<React.SetStateAction<DataType | undefined>>;
}

const Camera: React.FC<CameraProps> = ({ staff, setStaff }) => {
  const [isChecked, setIsChecked] = useState<(typeof TypeCheckedFace)[number]>(
    TypeCheckedFace[0]
  );
  const [typeChecking, setTypeChecking] = useState<
    (typeof TypeCheckInOut)[number]
  >(TypeCheckInOut[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timeNow, setTimeNow] = useState("");
  const [image, setImage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    setTimeNow(String(hours) + ":" + String(minutes) + ":" + String(seconds));
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      startVideo();
    };

    if (staff) {
      if (isChecked === TypeCheckedFace[0]) {
        loadModels();
      }
    } else {
      setImage("");
      setIsChecked(TypeCheckedFace[0]);
    }
  }, [staff, isChecked]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          username: staff?.username,
          employeeId: staff?.employee.id,
          time: timeNow,
          attendances: true,
        };
        const response = await fetch(API_URL + "/external/attendances", {
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
        const data: ResponseCheckTime = postData.data;
        if (data) {
          if (data.check_out) setTypeChecking(TypeCheckInOut[1]);
          setIsChecked(TypeCheckedFace[4]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    if (isChecked === TypeCheckedFace[3] && timeNow) fetchData();
  }, [isChecked, timeNow]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadeddata = () => {
            setIsChecked(TypeCheckedFace[1]);
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

    return detection && detection.descriptor;
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

    let elapsedTime = 0;
    let checkFace = TypeCheckedFace[1];
    const interval = setInterval(async () => {
      if (!videoRef.current) {
        clearInterval(interval);
        return;
      }

      const detection = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const distance = faceapi.euclideanDistance(
          uploadedDescriptor,
          detection.descriptor
        );

        if (distance < 0.5) {
          checkFace = TypeCheckedFace[3];
        } else {
          checkFace = TypeCheckedFace[2];
        }

        if (checkFace !== TypeCheckedFace[0]) {
          setIsChecked(checkFace);
          captureImage(video);
          getCurrentTime();
          stopVideo();
          return;
        }
      }

      elapsedTime += 500;

      if (elapsedTime >= 10000) {
        if (checkFace !== TypeCheckedFace[3]) {
          setIsChecked(TypeCheckedFace[2]);
          captureImage(video);
          clearInterval(interval);
          stopVideo();
        }
      }
    }, 500);
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
        image &&
        isChecked !== TypeCheckedFace[0] &&
        isChecked !== TypeCheckedFace[1] ? (
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
                height: videoRef ? "200px" : "100%",
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
        image && isChecked === TypeCheckedFace[4] ? (
          <>
            <Typography variant="body1" color="success">
              Bạn đã{" "}
              {typeChecking === TypeCheckInOut[0] ? "check in" : "checkout"}{" "}
              thành công !
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
        ) : image && isChecked === TypeCheckedFace[2] ? (
          <>
            <Typography variant="body1" color="error">
              Khuôn mặt không chính xác !
            </Typography>
            <Button
              onClick={() => setIsChecked(TypeCheckedFace[0])}
              variant="contained"
              sx={{
                textTransform: "capitalize",
              }}
            >
              Thử lại
            </Button>
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
