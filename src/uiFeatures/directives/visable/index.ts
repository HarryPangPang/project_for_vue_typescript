/* eslint-disable no-param-reassign */
const visibility = {
  bind: (el:any, binding:any, vnode:any) => {
    if (!binding.value) {
      el.style.visibility = 'hidden';
    } else {
      el.style.visibility = 'visable';
    }
  },
};

export default visibility;
