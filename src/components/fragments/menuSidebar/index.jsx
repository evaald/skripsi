import { Link } from "react-router-dom";
import Button from "../../elements/button/index"
import { useLocation } from "react-router-dom";
import IconButtonSidebarDashboard from "../../imageAndVector/icons8-home-96.png";
import IconButtonSidebarMorbiditas from "../../imageAndVector/icons8-health-graph-96.png";
import IconButtonSidebatPenyakitTerbanyak from "../../imageAndVector/icons8-ranking-96.png";

function MenuSidebar() {
  const location = useLocation();
  return (
    <div className="w-full">
       {location.pathname === "/dashboard" && (
        <div className="flex flex-col items-center justify-start w-full">
          <div className="w-full">
            <Link to="/">
              <Button
                className={"flex flex-row items-center mb-2 px-3 py-4 w-full rounded-full bg-white shadow-md hover:shadow-md"}
                label={"Dashboard"}
                src={IconButtonSidebarDashboard}
                alt={"Dashboard Icon"}
                classNameImg={"h-8 w-8 mx-2"}
              />

            </Link>
          </div>
        
          <div className="w-full">
            <Link to="/morbiditas">
              <Button
                className={"flex flex-row items-center mb-2 px-3 py-4 w-full rounded-full hover:bg-white hover:shadow-md"}
                label={"Morbiditas"}
                src={IconButtonSidebarMorbiditas}
                alt={"Dashboard Icon"}
                classNameImg={"h-8 w-8 mx-2"}
              />  
            </Link>
          </div>

          <div className="w-full">
            <Link to="/10penyakitterbanyak">
              <Button
                className={"flex flex-row lg:justify-center lg:items-center text-left px-2 p-4 w-full rounded-full hover:bg-white"}
                label={"Penyakit Terbanyak"}
                src={IconButtonSidebatPenyakitTerbanyak}
                alt={"Dashboard Icon"}
                classNameImg={"h-8 w-8 mx-2"}
              />
            </Link>
          </div>
      </div>
      )}

      {location.pathname === "/morbiditas" && (
      <div className="flex flex-col items-center justify-start w-full">
        <div className="w-full">
          <Link to="/dashboard">
            <Button
              className={"flex flex-row items-center mb-2 px-3 py-4 w-full rounded-full hover:bg-white hover:shadow-md"}
              label={"Dashboard"}
              src={IconButtonSidebarDashboard}
              alt={"Dashboard Icon"}
              classNameImg={"h-8 w-8 mx-2"}
            />
          </Link>
        </div>

        <div className="w-full">
          <Link to="/morbiditas">
            <Button
              className={"flex flex-row items-center mb-2 px-3 py-4 w-full rounded-full bg-white shadow-md hover:shadow-md"}
              label={"Morbiditas"}
              src={IconButtonSidebarMorbiditas}
              alt={"Dashboard Icon"}
              classNameImg={"h-8 w-8 mx-2"}
            />  
          </Link>
        </div>

        <div className="w-full">
          <Link to="/10penyakitterbanyak">
            <Button
              className={"flex flex-row lg:justify-center lg:items-center text-left px-2 p-4 w-full rounded-full hover:bg-white"}
              label={"Penyakit Terbanyak"}
              src={IconButtonSidebatPenyakitTerbanyak}
              alt={"Dashboard Icon"}
              classNameImg={"h-8 w-8 mx-2"}
            />
          </Link>
        </div>
      </div>
      )}

    {location.pathname === "/10penyakitterbanyak" && (
      <div className="flex flex-col items-center justify-start w-full">
        <div className="w-full">
          <Link to="/dashboard">
            <Button
              className={"flex flex-row items-center mb-2 px-3 py-4 w-full rounded-full hover:bg-white hover:shadow-md"}
              label={"Dashboard"}
              src={IconButtonSidebarDashboard}
              alt={"Dashboard Icon"}
              classNameImg={"h-8 w-8 mx-2"}
            />
          </Link>
        </div>

        <div className="w-full">
          <Link to="/morbiditas">
            <Button
              className={"flex flex-row items-center mb-2 px-3 py-4 w-full rounded-full hover:bg-white hover:shadow-md"}
              label={"Morbiditas"}
              src={IconButtonSidebarMorbiditas}
              alt={"Dashboard Icon"}
              classNameImg={"h-8 w-8 mx-2"}
            />  
          </Link>
        </div>

        <div className="w-full">
          <Link to="/10penyakitterbanyak">
            <Button
              className={"flex flex-row lg:justify-center lg:items-center text-left px-2 p-4 w-full rounded-full bg-white shadow-md"}
              label={"Penyakit Terbanyak"}
              src={IconButtonSidebatPenyakitTerbanyak}
              alt={"Dashboard Icon"}
              classNameImg={"h-8 w-8 mx-2"}
            />
          </Link>
        </div>
      </div>
      )}
      
    </div>
  );
}

export default MenuSidebar;