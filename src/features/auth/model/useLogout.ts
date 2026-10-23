import { removeAccessToken } from "@/shared/lib";
import { useLogoutMutation } from "../api/authApi"
import { baseApi } from "@/shared/api/baseApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (err) {
            console.log(err)
        } finally {
            removeAccessToken(); /* удаляем токен */
            navigate('/login', {replace: true}); /* редирект, replace: true - кнопка назад не вернет на профиль */
            dispatch(baseApi.util.resetApiState()); /* сброс кеша RTK Query */
            
        }
    }
  return {handleLogout}
}


