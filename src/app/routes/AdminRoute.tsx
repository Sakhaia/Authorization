import { useGetProfileQuery } from "@/entities"
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const {data: user, isLoading} = useGetProfileQuery();

  if (isLoading) {
    return <div>Проверка прав доступа</div>
  }

  const isAdmin = user?.userRoles.some(role => role.name.toLowerCase() === 'admin')

  if (!isAdmin) {
    return <Navigate to='/' replace/>
  }

  return <Outlet/>
}
