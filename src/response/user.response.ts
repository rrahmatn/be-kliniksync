export const UserResponse = (status: number, data: {}, clinic_id : number | null , message: string) => {
    return {
      status,
      data,
      clinic_id,
      message,
    };
  };
export const QueueResponse = (status: number, data: {} , message: string) => {
    return {
      status,
      queue : data,
      message,
    };
  };
export const ServiceResponse = (status: number, data: {} , message: string) => {
    return {
      status,
      service : data,
      message,
    };
  };

export const GetPatient = (status : number , patient : {} , data : {} , message : string ) =>{
  return {
    status , 
    data : {
      patient , 
      medical_history : data
    },
    message
  }
}

export const CashierResponse = (status : number, data : {} ,clinic :{}, patient : {} , doctor : {} , pharmacy : {} , services : {} ,total : number , message : string )=>{
  return{
    status , 
    data : {
      data,
      patient,
      clinic,
      doctor ,
      pharmacy ,
      services,
      total,
    },
    message
  }
}