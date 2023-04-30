export type EventFormData = {
  name: string;
  description: string;
  time: number;
  link: string;
  country: string;
  city: string;
  street: string;
  number: string;
  categoryId: string;
};

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export enum EditDataType {
  name = 'name',
  email = 'email',
  password = 'password',
  role = 'role',
}

export interface AuthActionData {
  success: boolean;
  message: string;
  errors?: string[];
}
