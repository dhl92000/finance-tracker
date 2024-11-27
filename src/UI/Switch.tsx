// import { toggle } from '@nextui-org/theme'
import moon from '../UI/dark_mode_30dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
 import sun from '../UI/light_mode_30dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
// import ThemeContext from '../store/ThemeContext'
// import { useContext } from 'react'
interface SwitchProps {
    toggleTheme: () => void,
    theme: string
}

const Switch = ({theme, toggleTheme}: SwitchProps) => {
    // const themeCtx = useContext(ThemeContext)

    const darkmodeIcon = theme === 'light' ? sun : moon
    
    return (
        <div className="themeSwitch">
            <img src={darkmodeIcon}/>

            <label className="switch">
                <input type="checkbox" onChange={toggleTheme}/>
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default Switch