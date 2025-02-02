import authservice from "../../appwrite/auth.js"
import { useDispatch } from "react-redux"
import { logout } from "../../store/authslice.js";
export const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logOutHandler=()=>{
        authservice.logout()
        .then((userLogout)=>{
            if(userLogout){
                dispatch(logout());
            }
        })

    }
   
  return (
    <button onClick={logOutHandler}>LogOut</button>
  )
}
export default LogoutBtn;