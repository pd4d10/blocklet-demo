import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet?.prefix ?? '/';
    config.baseURL = prefix;
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

const en = {
  profile: 'Profile',
  username: 'Username',
  email: 'Email',
  phone: 'Phone',
  edit: 'Edit',
  save: 'Save',
  cancel: 'Cancel',
  saveSucceed: 'Save Succeed',
  noEmpty: 'Cannot be empty',
  invalidFormat: 'Invalid format',
};

const zh: typeof en = {
  profile: '个人信息',
  username: '用户名',
  email: '邮箱',
  phone: '电话',
  edit: '编辑',
  save: '保存',
  cancel: '取消',
  saveSucceed: '保存成功',
  noEmpty: '不能为空',
  invalidFormat: '格式错误',
};

const locales = { en, zh };

export { locales, axios };
