export const API_URL = "http://hrm.test/api";

export type DataType = {
  id: string;
  username: string;
  face_vector: never[];
  avartar: string;
  avartarBase64: string;
  employee: {
    id: string;
    first_name: string;
    last_name: string;
    personal_email: string;
    phone: string;
    current_address: string;
  };
};

export type ResponseCheckTime = {
  id: number;
  employee_id: string;
  work_date: string;
  check_in: string;
  check_out?: string;
  office_minutes: number;
  late_early_minutes: number;
  overtime_hours: number;
  created_at: string;
  updated_at: string;
};

export const TypeCheckedFace = [
  "START",
  "PENDING",
  "FACE_FAIL",
  "FACE_SUCCESS",
  "SUCCESS",
];

export const TypeCheckInOut = ["CHECK_IN", "CHECK_OUT"];

export const Loading = ["loading", "none"];
