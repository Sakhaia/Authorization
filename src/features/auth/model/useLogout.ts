import { endSession } from "@/shared/lib";
import { useLogoutMutation } from "../api/authApi"
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
            endSession(dispatch, navigate)
        }
    }
  return {handleLogout}
}


