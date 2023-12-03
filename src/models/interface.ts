export interface FileObject {
  size: number;
  type: string;
}

 export interface FormInput {
  name: string;
  age: number;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean | undefined;
  image: FileList | undefined;
  countryId: string;
}

export interface FormState {
  formData: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: string;
  };
}

export interface ImageDisplayProps {
  base64Image: string;
}