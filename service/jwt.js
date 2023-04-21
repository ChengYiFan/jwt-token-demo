/**
 * 支持JWT授权的服务：主要用于发布和验证JWT令牌
 * 使用现有的库 jsonwebtoken 是对JWT令牌的实现，来生成jwt和进行jwt令牌的验证，类似的库还有 jwt-simple
 * jsonwebtoken 依赖了另外两个库 jws jwa
 * jws 是对 JSON Web签名的实现
 * jwa 是对 JSON Web 加密算法的实现（目前支持所有JWS算法）
 * 依赖 nodejs的内置加密模块 crypto
 */
const jwt = require('jsonwebtoken');
const secret = 'mysecret';    // 设置一个用于签名加密的密钥，硬编码仅用于演示


// 发布jwt 可以传入载荷、设置令牌过期时间（s)、指定签名算法
module.exports.publish = (payload, maxAge = 60, alg = 'HS256') => {
  const token = jwt.sign(payload, secret, {
    expiresIn: maxAge,
    algorithm: alg,
  });
  return token;
};

// 验证jwt
module.exports.verify = (req) => {
  let token = req.headers.authorization;
  if (!token) {
    return null;
  }
  token = token.replace('Bearer ', '').split(' ');
  token = token.length === 1 ? token[0] : token[1];
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (e) {
    return null;
  }
};