import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";

const RootLayout = () => {
    return (
        <div className="looking-glass">
            <NavBar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
