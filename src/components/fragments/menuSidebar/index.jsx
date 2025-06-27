import { Link } from "react-router-dom";
import Button from "../../elements/button/index"

 function MenuSidebar() {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="w-full">
        <Link to="/">
        
        <Button
          className={"p-4 w-full rounded-full hover:bg-white hover:shadow-md"}
          label={"Dashboard"}
        />
      </Link>
      </div>

      <div className="w-full">
        <Link to="/morbiditas">
          <Button
            className={"p-4 w-full rounded-full hover:bg-white"}
            label={"Morbiditas"}
          />  
        </Link>
      </div>
      
      <div className="w-full">
      <Link to="/10penyakitterbanyak">
        <Button
          className={"p-4 w-full rounded-full hover:bg-white"}
          label={"Penyakit Terbanyak"}
        />
      </Link>
      </div>

    </div>
  );
}

export default MenuSidebar;