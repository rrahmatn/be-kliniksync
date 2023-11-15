export const ClinicResponse = (status: number, data: {}, message: string) => {
  return {
    status,
    data,
    message,
  };
};

export const getAllEmployes = (
  status: number,
  clinic: {},
  employes: {},
  message: string,
) => {
  return {
    status,
    data: {
      clinic,
      employes: [employes],
    },
    message,
  };
};

export const getAllTransaction = (
  status: number,
  data: {},
  message: string,
) => {
  return {
    status,
    transaction: [data],
    message,
  };
};

export const getTransactionById = (
  status: number,
  transaction: {},
  patient: {},
  receptionist: {},
  doctor: {},
  pharmacy: {},
  cashier: {},
  service: any[],
  message: string,
) => {
  return {
    status,
    data: {
      ...transaction,
      patient,
      doctor,
      receptionist,
      pharmacy,
      cashier,
      service: [...service],
    },

    message,
  };
};
