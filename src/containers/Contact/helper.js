import { ValidationType } from 'src/constants/enum.constants';

const validation = (type, value) => {
  if (type == ValidationType.NAME) return /^[A-Za-z]*$/.test(value) && value.length > 0;
  if (type == ValidationType.EMAIL)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 0;
  if (type == ValidationType.MESSAGE) return value.length > 0;
};
export default validation;
