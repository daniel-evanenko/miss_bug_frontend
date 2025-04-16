import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

export function MultiSelectDropdown({ options, selectedValues, onChange, name }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    function handleSelect(option) {
        const newValues = selectedValues.includes(option)
            ? selectedValues.filter(value => value !== option)
            : [...selectedValues, option];

        onChange({ target: { name, value: newValues } });
    }

    return (

        <div className="multi-select" ref={dropdownRef}>
            <label htmlFor="byLabels">Filter by labels:</label>
            <button type="button" onClick={handleToggle} className="dropdown-btn">
                {selectedValues.length > 0 ? selectedValues.join(", ") : "Select options"}
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map(option => (
                        <li key={option}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(option)}
                                    onChange={() => handleSelect(option)}
                                />{" "}
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

MultiSelectDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
