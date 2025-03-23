import { Settings } from "lucide-react";
import logotype from "../assets/logotype.svg";

const Navbar = ({ handleSettingsClick }) => {
  const iconSize = window.innerWidth > 800 ? 70 : 44;
  return (
    <nav className="navbar">
      <div className="logotype">
        <img src={logotype} alt="Cartlag Logo" className="logo" />
      </div>

      <div className="settings-button" onClick={handleSettingsClick}>
        <Settings size={iconSize} />
      </div>
    </nav>
  );
};

export default Navbar;
