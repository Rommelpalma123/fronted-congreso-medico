export const paymentOptions = [
  {
    _id: '',
    name: 'Tipo de Pago',
  },
  {
    _id: 'transfer',
    name: 'Transferencia/Deposito',
  },
  {
    _id: 'efective',
    name: 'Efectivo',
  },
];

export const participantTypeOptions = [
  {
    _id: '',
    name: 'Tipo de Participante',
  },
  {
    _id: 'medico_especialista',
    name: 'Médico Especialista',
  },
  {
    _id: 'medico_general',
    name: 'Médico General',
  },
  {
    _id: 'medico_rural',
    name: 'Médico Rural',
  },
  {
    _id: 'profesional_salud',
    name: 'Profesional de la Salud',
  },
  {
    _id: 'estudiante',
    name: 'Estudiante',
  },
  {
    _id: 'ponencia_congreso_memorias',
    name: 'Ponencia + Congreso + Memorias',
  },
  {
    _id: 'laboratorio',
    name: 'Laboratorios',
  },
];

export const initFormRegister = {
  name: '',
  lastname: '',
  email: '',
  cedula: '',
  phone: '',
  address: '',
  company: '',
  password: '',
  inscriptions: [],
  typePayment: '',
  voucherBase64: '',
  participantType: '',
};

export const initFormLogin = {
  email: '',
  password: '',
};

export const createCourse = {
  title: '',
  description: '',
  photoBase64: '',
  price: '',
  type: '',
  startDate: '',
  endDate: '',
  certificateTemplateBase64: '',
};

export const auth_token = 'auth_token';
export const auth_user = 'auth_user';
export const auth_role = 'auth_role';
export const app_title = 'app_title';

export const updateCourse = {
  title: '',
  description: '',
  photoURL: '',
  price: '',
  type: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  certificateTemplateURL: '',
};

export const createVerified = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
  cedula: '',
  company: '',
};

export const initFormRecoveryPassword = {
  email: '',
  codeChangePassword: '',
  newPassword: '',
};
