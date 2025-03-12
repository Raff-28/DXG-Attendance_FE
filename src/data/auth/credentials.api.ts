import { AppResponse, Role } from "@/types/global";
import { config } from "@/utils/constants";
import axios from "axios";

export type GetCredentialsResponseData = {
  id: number;
  role: Role;
};

export const getCredentials = async (
  token: string
): Promise<AppResponse<GetCredentialsResponseData>> => {
  try {
    const response = await axios.get<AppResponse<GetCredentialsResponseData>>(
      `${config.AUTH_BASE_URL}/credentials`,
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
