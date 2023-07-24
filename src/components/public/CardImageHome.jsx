import React from 'react';

export const CardImageHome = ({ course = null }) => {
  return (
    <div
      className='card mb-5 border border-dark animate__animated animate__jackInTheBox animate__slow'
      style={{
        boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.9)',
      }}>
      <div className='p-2 d-flex justify-content-center'>
        <h4 className='card-title text-center'>{course?.title ?? ''}</h4>
      </div>
      <div style={{ width: '100%', height: '600px' }}>
        <img
          src={course.photoURL ?? ''}
          className='card-img-top  rounded rounded-3'
          alt={course?.title ?? ''}
          height={'100%'}
          width={'100%'}
        />
      </div>
      {course?.description !== '' && (
        <div className='card-body d-flex justify-content-center p-2'>
          <p className='card-text text-center'>{course?.description ?? ''}</p>
        </div>
      )}
    </div>
  );
};
