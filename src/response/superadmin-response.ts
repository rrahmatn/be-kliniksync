export const SuperAdminResponse = (status: number, data: {}, message: string) => {
  return {
    status,
    data,
    message,
  };
};
export const SuperAdminLoginResponse = (status: number, data: {}, message: string , role : string) => {
  return {
    status,
    data,
    message,
    role,
  };
};

export const NewData = (status: number, data: {}, message: string , role : string) => {
  return {
    status,
    data,
    message,
    role,
  };
};
