/**
 * 支持用户登录和获取用户信息的服务
 */
module.exports = {
  // 登录验证服务
  apilogin: async (name, pwd) => {
    let result;
    // create a buffer
    const buffname = Buffer.from(name, 'base64').toString('utf-8');
    const bufferpwd = Buffer.from(pwd, 'base64').toString('utf-8');
    if (buffname === 'admin' && bufferpwd === '123456') {
      result = {
        status: 0,
        msg: '登录成功',
        data: {
          id: '168666112'
        }
      }
    } else {
      result = {
        status: -1,
        msg: '用户名或密码错误'
      }
    }
    return result;
  },
  // 获取用户信息的服务
  getuserinfo: async () => {
    return {
      status: 0,
      msg: '获取用户信息成功',
      data: {
        id: '168666112',
        nickname: 'cici',
        email: 'cicic@gmail.com',
      }
    }
  }
}