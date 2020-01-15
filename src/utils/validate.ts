export const validateEmail = (mail: string) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

export const validateName = (name:string) => {
  if (name.length > 1) {
    return true;
  }
  return false;
};

export const validatePhone = (phone:string) => {
  // eslint-disable-next-line no-restricted-globals
  if (phone.length > 10 && phone.length < 13 && !isNaN(parseInt(phone, 10))) {
    return true;
  }
  return false;
};
