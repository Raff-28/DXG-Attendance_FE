import { config } from "@/constants/environment";
import { sleep } from "@/lib/utils";
import { AppResponse } from "@/types/global";
import axios from "axios";

export type GetEmployeeResponseData = {
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
): Promise<AppResponse<GetEmployeeResponseData[]>> => {
  try {
    const response = await axios.get<AppResponse<GetEmployeeResponseData[]>>(
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

export const getEmployeeDetails = async (
  id: number,
  token: string
): Promise<AppResponse<GetEmployeeResponseData>> => {
  try {
    const response = await axios.get<AppResponse<GetEmployeeResponseData>>(
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

export type PutEmployeeRequestBody = {
  full_name: string;
  position: string;
  department: string;
  phone_number: string;
};

export const putEmployee = async (
  id: number,
  body: PutEmployeeRequestBody,
  token: string
): Promise<AppResponse<void>> => {
  await sleep(500);
  try {
    const response = await axios.put<AppResponse<void>>(
      `${config.EMPLOYEE_BASE_URL}/employees/${id}`,
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
