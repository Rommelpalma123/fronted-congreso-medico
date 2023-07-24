import React, { useState } from 'react';

export const SelectForm = ({
  value = '',
  options = [], //array of objetcs { _id:'', name:''}
  onChangeValue = () => {},
  disabled = false,
  required = false,
  disableFirstOption = false,
}) => {
  const [field, setField] = useState(value);

  const handleChange = (text) => {
    setField(text);
    onChangeValue(text);
  };

  return (
    <div className='mb-3'>
      <select
        className='form-select p-2 px-3'
        disabled={disabled}
        required={required}
        value={field}
        onChange={(e) => handleChange(e.target.value)}>
        {options.map((item, index) => (
          <option disabled={disableFirstOption && index === 0} key={index} value={item?._id}>
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
