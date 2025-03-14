import { config } from "@/constants/environment";
import { sleep } from "@/lib/utils";
import { AppResponse } from "@/types/global";
import axios from "axios";

export type RegisterRequestBody = {
  email: string;
  password: string;
  name: string;
  position: string;
  department: string;
  phone_number: string;
};

export type RegisterResponseData = RegisterRequestBody & {
  id: string;
};

export const postRegister = async (
  body: RegisterRequestBody,
  token: string
): Promise<AppResponse<RegisterResponseData>> => {
  await sleep(500);
  try {
    const response = await axios.post<AppResponse<RegisterResponseData>>(
      `${config.AUTH_BASE_URL}/register`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError<AppResponse<void>>(e) && e.response) {
      return { message: e.response.data.message! };
    }
    return { message: "An error occurred" };
  }
};
