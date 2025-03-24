import { Settings } from "lucide-react";
import logotype from "../assets/logotype.svg";
import NameContainer from "./NameContainer";
const Navbar = ({ handleSettingsClick, nameValue }) => {
  const iconSize = window.innerWidth > 800 ? 70 : 44;
  return (
    <nav className="navbar">
      <div className="logotype">
        <img src={logotype} alt="Cartlag Logo" className="logo" />
      </div>
      <NameContainer nameValue={nameValue} />

      <Settings
        size={iconSize}
        onClick={handleSettingsClick}
        className="settings-btn"
      />
    </nav>
  );
};

export default Navbar;
