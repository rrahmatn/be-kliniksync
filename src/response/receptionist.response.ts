export const ReceptionistResponse = (status: number, data: {}, message: string) => {
    return {
      status,
      data,
      message,
    };
  };