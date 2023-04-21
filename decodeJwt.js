const crypto = require('crypto');

// 经由 base64 编码的头部 和 载荷
const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const payload = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9';
const signature = 'dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao';

// 用 base64 去解码可以得到原始内容
Buffer.from(header, 'base64').toString('utf-8');
// 解码后的头部： {"alg":"HS256","typ":"JWT"}

Buffer.from(payload, 'base64').toString('utf-8');
// 解码后的载荷： {"sub":"1234567890","name":"John Doe","admin":true}

// Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 
function fromBase64(base64) {
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// 用 JWT 的方式，把 header 跟 payload 连起來，合成要加密的数据
const data = `${header}.${payload}`;
const secret = 'your-256-bit-secret';  // 密钥
const hash = fromBase64(crypto.createHmac('sha256', secret).update(data).digest('base64'));
// 使用node hmacsha256 加密后的签名 dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao
// signature === hash 表示 token 没有被动过，校验成功 