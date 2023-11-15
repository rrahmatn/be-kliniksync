export const PatientResponse = (
  status: number,
  data: {},
  clinic : {},
  patient : string , 
  doctor: {},
  receptionist: string,
  service : {},
  message: string,
) => {
  return {
    status,
    data: {
      ...data,
      clinic,
      patient,
      service,
      doctor,
      receptionist,
    },
    message
  };
};
