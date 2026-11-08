import { useGetProfileQuery } from "@/entities";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Navigate, Outlet } from "react-router-dom";

export const AuthCheck = () => {
  const {isLoading, isError, error, refetch} = useGetProfileQuery(undefined);

  if (isLoading) {
    return <div>Загрузка ...</div>;
  }

  if (isError) {
    const status = (error as FetchBaseQueryError)?.status;

    if (status === 401 || status === 403) {
      return <Navigate to="/login" replace />
    }

    return (
    <div>
      <h2>Сервер временно недоступен</h2>
      <p>Попробуйте позже</p>
      <button onClick={() => refetch()}>Повторить запрос</button>
    </div>
  )
  }

  return <Outlet/>;
}
