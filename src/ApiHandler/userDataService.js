import axios from "axios";
import { toast } from "react-toastify";

import {
  convertIscToUtc,
  convertIstToUtc,
  convertUtcToIst,
} from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserList = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      let subjectData = response.data.data.subject_data;

      if (subjectData && Array.isArray(subjectData)) {
        subjectData = subjectData.map((item) => {
          if (item.createdAt) {
            item.createdAt = convertUtcToIst(item.createdAt);
          }
          if (item.updatedAt) {
            item.updatedAt = convertUtcToIst(item.updatedAt);
          }
          if (item.dob) {
            item.dob = convertUtcToIst(item.dob);
          }
          return item;
        });
      }
      // console.log("Updated subjectData data with IST:", subjectData);

      return {
        success: true,
        dataList: subjectData,
      };
    } else {
      throw new Error(`Error fetching user list: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching user list:", err.message);
    throw new Error(err.message);
  }
};

export const editUseData = async (accessToken, userData) => {
  try {
    if (userData) {
      if (userData.createdAt) {
        userData.createdAt = convertIscToUtc(userData.createdAt);
      }
      if (userData.updatedAt) {
        userData.updatedAt = convertIscToUtc(userData.updatedAt);
      }
      if (userData.dob) {
        userData.dob = convertIscToUtc(userData.dob);
      }
    }
    console.log("Updated userData data with UTC:", userData);

    const data = JSON.stringify(userData);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/edit`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return {
        success: true,
        dataList: response.data.data,
      };
    } else {
      toast.success(response.data.message);
      throw new Error(`Error fetching user list: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching user list:", err.message);
    throw new Error(err.message);
  }
};
