export const orderCoursesByType = (courses = []) => {
  if (courses.length <= 0) {
    return [];
  }

  courses.sort((a, b) => {
    if (a.type === 'congress') {
      return -1;
    } else if (b.type === 'congress') {
      return 1;
    } else {
      return 0;
    }
  });

  return courses;
};

export const cleanText = (text = '') => text.trim();

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]+$/;
  return regex.test(phone);
};

export const validateCedula = (cedula) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(cedula);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
};

export const upperFirstWord = (word) => {
  if (typeof word !== 'string' || word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const validateRecoveryCode = (code) => {
  const regex = /^[0-9]{6}$/;
  return regex.test(code);
};
