import { useGetProfileQuery } from "@/entities";
import { getAccessToken } from "@/shared/lib";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AuthCheckProps = {
    children: ReactNode;
}

export const AuthCheck = ({children}: AuthCheckProps) => {
  const token = getAccessToken();
  const {isLoading, isError} = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (!token) {
    return <Navigate to="/login" replace/>
  }

  if (isLoading) {
    return <div>Загрузка ...</div>;
  }

  if (isError) {
    return <Navigate to="/login" replace />
  }

  return children;
}
