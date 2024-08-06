import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TogglerModeButton = ({ isOn, toggleSwitch }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={isOn} onChange={toggleSwitch} />
            <span className="slider round">
                <span className="slider-text">
                    {isOn ? "As the crow flies" : "by Land Transport"}
                </span>
                <span className="icon">
                    <i className={isOn ? "fas fa-crow" : "fas fa-car"}></i>
                </span>
            </span>
        </label>
    );
};

export default TogglerModeButton;
