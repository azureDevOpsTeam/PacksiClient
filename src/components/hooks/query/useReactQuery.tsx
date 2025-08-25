import { useEffect } from "react";
import Api from "../../../services/api/CallApi";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useQueryClient } from "react-query";
import { useQuery, useMutation } from "react-query";
import useStore from "../../../store/zustand/store";
import { GetUserToken } from "../../../services/api/ApiToken";

export const AuthApiHeader = new Headers();
AuthApiHeader.append("Content-Type", "application/json");

const token = GetUserToken();
if (token) {
  AuthApiHeader.append("Authorization", `${token}`);
}

export const useReactQuery = (apiDetails: any, options: any = {}) => {
  const setUserData = useStore((state) => state.setUserData);

  // useEffect(() => {
  //   if (!token) {
  //     window.location.reload();
  //   } else {
  //     try {
  //       const decodedToken = jwtDecode<{ username: string; role: string }>(
  //         token
  //       );
  //       setUserData(decodedToken);
  //     } catch (error) {
  //       console.error("خطا در دیکد کردن توکن:", error);
  //     }
  //   }
  // }, [token, setUserData]);

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["nodeData", apiDetails],
    () =>
      Api<any>(
        apiDetails.url,
        apiDetails.body || {},
        AuthApiHeader,
        apiDetails.method
      ),
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 1 * 60 * 1000,
      refetchOnMount: false,
      ...options, // ✅ merge options from outside
    }
  );

  return { data, isLoading, isError, error, refetch };
};


export const useReactMutation = (
  apiDetails: any,
  onSuccess?: Function,
  onError?: Function
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: any) => Api(apiDetails.url, data, AuthApiHeader, apiDetails.method),
    {
      onSuccess: (response) => {
        if (onSuccess) onSuccess(response);
      },
      onError: (error) => {
        if (onError) onError(error);
      },
    }
  );

  // تابع refetch دستی مثل useQuery
  const refetch = () => {
    queryClient.invalidateQueries(["nodeData", apiDetails]);
  };

  return {
    ...mutation,
    refetch, // حالا اینو بیرون صدا می‌زنی
  };
};