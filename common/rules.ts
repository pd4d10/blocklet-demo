import { Profile } from './types';

const rules: Partial<Record<keyof Profile, RegExp>> = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // https://regexr.com/3e48o
  phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, // https://regexr.com/3c53v
};

export default rules;
