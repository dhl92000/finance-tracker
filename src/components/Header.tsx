import logo from "../UI/price_check_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Switch from "../UI/Switch";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  return (
    <div className="header">
      <div className="headerLogo">
        <img src={logo} />
        <h1 className="tracking-wide">Finance Tracker</h1>
      </div>

      <Switch theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Header;
