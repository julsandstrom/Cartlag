import { Settings } from "lucide-react";
const Navbar = ({ handleSettingsClick }) => {
  const iconSize = window.innerWidth > 800 ? 70 : 44;
  return (
    <nav className="navbar">
      <div className="logotype">
        <img
          src="src\assets\logotype.svg"
          alt="Cartlag Logo"
          className="logo"
        />
      </div>

      <div className="settings-button" onClick={handleSettingsClick}>
        <Settings size={iconSize} />
      </div>
    </nav>
  );
};

export default Navbar;
