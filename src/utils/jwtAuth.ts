import { SetMetadata } from '@nestjs/common';
// 不知道抽什么疯，import就是不行，非要require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

export const IS_JWT_KEY = 'JWT_KEY';

/**
 * jwt注解
 * 设置元数据
 */
export const JWT = () => SetMetadata(IS_JWT_KEY, true);

// 默认到期时间
export const EXPIRES_TIME = 60 * 60 * 24;

// 签发人
export const JWT_ISS = 'jwt_iss_mini_program';

// 加密条件
export const JWT_SECRET_KEY = 'secret_key@jwt_huajiaomiaomiao12!';

/**
 * 生成token
 */
export const createJwtToken = (args: { [key: string]: string }) => {
    // 用jwt去做校验
    const secretKey = JWT_SECRET_KEY;
    const payload = {
        iss: JWT_ISS, // 签发人
        iat: new Date().getTime() / 1000, // 签发时间
        ...args,
    };
    const options = {
        expiresIn: EXPIRES_TIME,
        algorithm: 'HS256', // 加密方式
    };
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

/**
 * 校验token
 */
export const verify = (
    args = { token: '', expiresIn: EXPIRES_TIME, secretKey: '' },
) => {
    const { token, expiresIn, secretKey } = args;
    const options = {
        expiresIn,
        algorithm: 'HS256', // 加密方式
    };
    try {
        return jwt.verify(token, secretKey, options);
    } catch (err) {
        return {};
    }
};
