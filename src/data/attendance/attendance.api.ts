import { config } from "@/constants/environment";
import { AppResponse } from "@/types/global";
import axios from "axios";

export type GetAttendancesRequestParam = {
  page_number: number;
  page_size: number;
};

export type GetAttendancesResponseData = {
  attendances: GetAttendanceResponseData[];
  pagination_info: PaginationInfo;
};

export type GetAttendanceResponseData = {
  id: number;
  employee_id: number;
  photo_url: Date;
  timestamp: string;
  work_description: string;
  reason_for_wfh: string;
};

export type PaginationInfo = {
  page_number: number;
  page_size: number;
  total_pages: number;
};

export const getAttendances = async (
  id: number,
  token: string,
  params: GetAttendancesRequestParam
): Promise<AppResponse<GetAttendancesResponseData>> => {
  try {
    const response = await axios.get<AppResponse<GetAttendancesResponseData>>(
      `${config.ATTENDANCE_BASE_URL}/attendances/by-user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
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
