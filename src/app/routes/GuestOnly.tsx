import { useGetProfileQuery } from "@/entities";
import { getAccessToken } from "@/shared/lib";
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom";

type GuestOnlyProps = {
    children: ReactNode;
}

export const GuestOnly = ({children}: GuestOnlyProps) => {
    const token = getAccessToken();
    const {data, isLoading} = useGetProfileQuery(undefined, {
        skip: !token,
    });

    if (!token) {
        return children;
    }

    if (isLoading) {
        return <div>Загрузка ...</div>
    }

    if (data) {
        return <Navigate to="/" replace/>
    }

    return children;
  
}

