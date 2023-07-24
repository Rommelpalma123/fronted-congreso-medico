import React from 'react';

export const InputFileForm = ({ onChangeText = () => {}, acceptFile = '' }) => {
  const handleText = (text) => {
    if (text) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
        onChangeText(fileData);
      };
      reader.readAsDataURL(text);
    }
  };

  return (
    <div className='mb-3'>
      <input
        className='form-control p-2 px-3'
        type='file'
        accept={acceptFile}
        onChange={(e) => handleText(e.target.files[0])}
      />
    </div>
  );
};
