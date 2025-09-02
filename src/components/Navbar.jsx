import { Settings } from "lucide-react";
import logotype from "../assets/logotype.svg";
const Navbar = ({ handleSettingsClick, nameValue }) => {
  return (
    <nav className="flex justify-between w-full my-6 px-3 sm:px-10 lg:px-16 lg:my-12  2xl:px-20  ">
      {" "}
      <img
        src={logotype}
        alt="Cartlag Logo"
        className=" h-10 sm:h-16 lg:h-24 2xl:h-32"
      />
      <Settings
        onClick={handleSettingsClick}
        className="h-10 w-10 text-[#F5F5F5] sm:h-12 sm:w-12 lg:h-16 lg:w-16 2xl:h-20 2xl:w-20"
      />
    </nav>
  );
};

export default Navbar;
