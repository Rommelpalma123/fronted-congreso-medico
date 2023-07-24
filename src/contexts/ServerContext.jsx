import React, { createContext, useContext } from 'react';

import { postAxios, getAxios, putAxios, deleteAxios } from '@/helpers/axios';

import { storage } from '@/helpers/storage';

import { auth_token } from '@/helpers/constants';

export const ServerContext = createContext(null);

export const useServer = () => useContext(ServerContext);

const getToken = () => {
  const _token = storage.get(auth_token);
  return _token ? { Token: _token } : {};
};

class ServerApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API;
  }

  getCourses = () => {
    return new Promise((resolve, reject) => {
      getAxios(`${this.baseUrl}/api/course/get-courses`)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  registerParticipant = (data) => {
    return new Promise((resolve, reject) => {
      postAxios(`${this.baseUrl}/api/user/register-participant`, data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  registerVerifier = (data) => {
    return new Promise((resolve, reject) => {
      postAxios(`${this.baseUrl}/api/user/register-verifier`, data, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  login = (data) => {
    return new Promise((resolve, reject) => {
      postAxios(`${this.baseUrl}/api/user/login`, data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  createCourse = (data) => {
    return new Promise((resolve, reject) => {
      postAxios(`${this.baseUrl}/api/course/create-course`, data, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  getCourseById = (id) => {
    return new Promise((resolve, reject) => {
      getAxios(`${this.baseUrl}/api/course/get-course/${id}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  updateCourse = (id, data) => {
    return new Promise((resolve, reject) => {
      putAxios(`${this.baseUrl}/api/course/update-course/${id}`, data, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  getRegisterById = (id) => {
    return new Promise((resolve, reject) => {
      getAxios(`${this.baseUrl}/api/user/get-register-by-id/${id}`, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  registerAsistance = (data) => {
    return new Promise((resolve, reject) => {
      putAxios(`${this.baseUrl}/api/user/check-attendance`, data, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  getRegisters = () => {
    return new Promise((resolve, reject) => {
      getAxios(`${this.baseUrl}/api/user/get-all-registers`, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  UpdateStatus = (data) => {
    return new Promise((resolve, reject) => {
      putAxios(`${this.baseUrl}/api/user/update-status-register`, data, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  GetAllRegisterByUser = () => {
    return new Promise((resolve, reject) => {
      getAxios(`${this.baseUrl}/api/user/get-all-registers-by-participant`, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  getAllUser = () => {
    return new Promise((resolve, reject) => {
      getAxios(`${this.baseUrl}/api/user/get-all-users`, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  updatedUser = (data) => {
    return new Promise((resolve, reject) => {
      putAxios(`${this.baseUrl}/api/user/update-user`, data, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  recoveryPasswordSendCode = (data) => {
    return new Promise((resolve, reject) => {
      putAxios(`${this.baseUrl}/api/user/send-code-change-password`, data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  recoveryPassword = (data) => {
    return new Promise((resolve, reject) => {
      putAxios(`${this.baseUrl}/api/user/change-password`, data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  };

  deleleCourse = (id) => {
    return new Promise((resolve, reject) => {
      deleteAxios(`${this.baseUrl}/api/course/delete-course/${id}`, getToken())
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    })
  }
}

export const ServerProvider = ({ children }) => (
  <ServerContext.Provider value={new ServerApi()}>{children}</ServerContext.Provider>
);
