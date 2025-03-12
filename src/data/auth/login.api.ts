import { AppResponse } from "@/types/global";
import { config } from "@/utils/constants";
import axios from "axios";
import { getCredentials, GetCredentialsResponseData } from "./credentials.api";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginResponseData = {
  token: string;
};

const postLogin = async (
  body: LoginRequestBody
): Promise<AppResponse<LoginResponseData>> => {
  try {
    const response = await axios.post<AppResponse<LoginResponseData>>(
      `${config.AUTH_BASE_URL}/login`,
      body
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError<AppResponse<void>>(e) && e.response) {
      return { message: e.response.data.message! };
    }
    return { message: "An error occurred" };
  }
};

export const postLoginAndGetCredentials = async (
  body: LoginRequestBody
): Promise<AppResponse<LoginResponseData & GetCredentialsResponseData>> => {
  try {
    const loginResponse = await postLogin(body);
    const credentialsResponse = await getCredentials(loginResponse.data!.token);
    return {
      data: {
        id: credentialsResponse.data!.id,
        role: credentialsResponse.data!.role,
        token: loginResponse.data!.token,
      },
    };
  } catch (e) {
    if (axios.isAxiosError<AppResponse<void>>(e) && e.response) {
      return { message: e.response.data.message! };
    }
    return { message: "An error occurred" };
  }
};
