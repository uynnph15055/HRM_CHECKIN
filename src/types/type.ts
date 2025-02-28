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

export const TypeCheckedFace = ["PENDING", "FAIL", "SUCCESS"];

export const Loading = ["loading", "none"];
