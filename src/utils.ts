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
  connect: 'Connnect Wallet',
  connectInfo: 'You need to connect the DID Wallet to access the website.',
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
  connect: '连接钱包',
  connectInfo: '您需要连接 DID 钱包才能访问网站',
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
