import { config } from "@/constants/environment";
import { AppResponse } from "@/types/global";
import axios from "axios";

export type GetEmployeesResponseData = {
  id: number;
  user_id: number;
  full_name: string;
  position: string;
  department: string;
  phone_number: string;
  email: string;
};

export const getEmployees = async (
  token: string
): Promise<AppResponse<GetEmployeesResponseData[]>> => {
  try {
    const response = await axios.get<AppResponse<GetEmployeesResponseData[]>>(
      `${config.EMPLOYEE_BASE_URL}/employees`,
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

export const deleteEmployee = async (
  id: number,
  token: string
): Promise<AppResponse<void>> => {
  try {
    const response = await axios.delete<AppResponse<void>>(
      `${config.EMPLOYEE_BASE_URL}/employees/${id}`,
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
