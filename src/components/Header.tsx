import logo from '../UI/price_check_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'
import Switch from '../UI/Switch';

const Header = ({toggleTheme}) => {
  return (
    <div className='flex'>
      <img src={logo}/>
      <h1 className="text-3xl tracking-wide">Finance Tracker</h1>
      <Switch toggleTheme={toggleTheme}/>
    </div>
  );
};

export default Header;
