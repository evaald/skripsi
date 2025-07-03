import Logo from "../../elements/logo";
import MenuSidebar from "../../fragments/menuSidebar/index";
import Profile from "../../../components/imageAndVector/icons8-circled-user-female-skin-type-7-96.webp";
import LogoRSUD from "../../../components/imageAndVector/download.webp";
import Button from "../../elements/button/index";
import { Link } from "react-router-dom";
import IconLogout from "../../../components/imageAndVector/icons8-logout-90.png";


function Sidebar() {
  return (
    <div
      className="h-screen fixed w-3/6 lg:w-72 lg:pl-4 lg:pr-12 lg:py-6 p-4 bg-[#C0EBA6] flex flex-col items-center"
    >
        <Logo 
            src={Profile}
            alt="Profile"
            className2="lg:hidden flex flex-col items-center justify-center mb-12"
            className="p-2 rounded-full h-30 w-30"
        />
        <Logo 
          src={LogoRSUD}
          alt="Logo RSUD"
          className="p-4 rounded-full h-24 w-24"
          className2="hidden lg:flex justify-center mb-8"
          classNameLabel="mt-2 text-center text-sm font-semibold text-gray-800"
          label="RSUD KANJURUHAN KEPANJEN"
        />
        <MenuSidebar />
        <div className="w-full">
            <Link to="/">
              <Button
                className={"flex flex-row justify-start mt-16 items-center text-left px-2 p-4 w-full rounded-full bg-yellow-300 shadow-sm font-black hover:bg-yellow-400 hover:shadow-md"}
                label={"Logout"}
                src={IconLogout}
                alt={"Dashboard Icon"}
                classNameImg={"h-8 w-8 mx-2"}
              />
            </Link>
          </div>

    </div>
  );
}
export default Sidebar;