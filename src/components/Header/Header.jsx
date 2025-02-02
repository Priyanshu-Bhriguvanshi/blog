import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn"; // Fixed capitalization

const Header = () => {
  const authuser = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const listItem = [
    {
      Name: "Home",
      path: "/",
      active: true,
    },
    {
      Name: "Login",
      path: "/login",
      active: !authuser,
    },
    {
      Name: "SignUp",
      path: "/signup",
      active: !authuser,
    },
    {
      Name: "All Post",
      path: "/all-post",
      active: authuser,
    },
    {
      Name: "Add Post",
      path: "/edit-post",
      active: authuser,
    },
  ];

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 
          className="text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyBlog
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          {listItem.map(
            (item) =>
              item.active && (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-gray-700 hover:text-blue-500 font-medium transition duration-200"
                  >
                    {item.Name}
                  </button>
                </li>
              )
          )}
          {authuser && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
