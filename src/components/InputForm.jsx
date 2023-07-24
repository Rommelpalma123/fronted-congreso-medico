import React, { useState } from 'react';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';

export const InputForm = ({
  value = '',
  placeholder = '',
  onChangeText = () => {},
  type = 'text',
  disabled = false,
  readonly = false,
  autoComplete = 'off',
  secure = false,
  required = false,
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const [secureText, setSecureText] = useState(true);

  const handleText = (text) => onChangeText(text);

  const handleSecure = () => {
    secureText ? setTypeInput('text') : setTypeInput('password');
    setSecureText(!secureText);
  };

  return (
    <div className='mb-3' style={{ position: 'relative' }}>
      <input
        autoComplete={autoComplete}
        readOnly={readonly}
        disabled={disabled}
        required={required}
        value={value}
        type={typeInput}
        className='form-control p-2 px-3'
        placeholder={placeholder}
        onChange={(e) => handleText(e.target.value)}
      />
      {secure && (
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 7,
          }}
          onClick={handleSecure}>
          {secureText ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
        </div>
      )}
    </div>
  );
};
