import React from 'react';

export const CheckBox = ({ label = '', id = '', checked, onChange = () => {} }) => {
  const handleCheckboxChange = () => {
    onChange(id, !checked);
  };

  return (
    <div className='form-check p-1 d-flex align-items-center'>
      <div className='col-1 d-flex justify-content-start align-items-center'>
        <input
          className='form-check-input'
          type='checkbox'
          checked={checked}
          id={id}
          onChange={handleCheckboxChange}
        />
      </div>
      {label !== '' && (
        <div className='col-11'>
          <label className='form-check-label text-light text-start' htmlFor={id}>
            {label}
          </label>
        </div>
      )}
    </div>
  );
};
