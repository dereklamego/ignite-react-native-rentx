declare namespace ReactNavigation {
  
  export interface RootParamList {
    Home: undefined
    CarDetails: undefined
    Scheduling: undefined
    SchedulingDetails: undefined
    SchedulingComplete: undefined
    SchedulingComplete: undefined
    SignIn: undefined
    SignUpFirstStep: undefined
    SignUpSecondStep: {
      user:{
        name: string;
        email:string;
        driverLicense: string
      }
    }
    Confirmation: {
      title: string;
      message: string;
      nextScreenRoute: string
    }
  }
}