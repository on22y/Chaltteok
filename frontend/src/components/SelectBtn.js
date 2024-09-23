import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { RxTriangleDown } from 'react-icons/rx';

function SelectBtn() {
  const yearOptions = Array.from({ length: 41 }, (_, i) => ({
    value: 1980 + i,
    label: `${1980 + i}`,
  }));

  const [year, setYear] = useState(null);

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption ? selectedOption.value : null);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fffbe6',
      border: '3px solid #2F2F2F',
      borderRadius: '30px',
      fontFamily: 'Jua, sans-serif',
      padding: '5px',
      fontSize: '18px',
      width: '107px',
      height: '48px',
      boxShadow: 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#2F2F2F',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#2F2F2F',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#2F2F2F',
      padding: '0 5px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fffbe6',
      borderRadius: '10px',
      border: '3px solid #2F2F2F',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#6EC207' : state.isFocused ? '#C0EBA6' : '#fffbe6',
      color: state.isSelected ? '#2F2F2F' : '#929292',
      fontFamily: 'Jua, sans-serif',
      fontSize: '18px',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  // dropdown icon 설정
  const customComponents = {
    DropdownIndicator: (props) => {
      return (
        <div {...props.innerProps} style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
          <RxTriangleDown style={{ width: '30px', height: '30px', color: '#2F2F2F' }} />
        </div>
      );
    },
  };

  return (
    <div className="selectBtnContainer">
      <Select
        className="Year"
        options={yearOptions}
        value={yearOptions.find((option) => option.value === year)}
        onChange={handleYearChange}
        placeholder="년도"
        styles={customStyles}
        components={customComponents}
        isClearable={false}
      />
    </div>
  );
}

export default SelectBtn;
