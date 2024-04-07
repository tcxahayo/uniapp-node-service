import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('request');

/**
 * 去掉前后 空格/空行/tab 的正则 预先定义 避免在函数中重复构造
 * @type {RegExp}
 */
const trimReg = /(^\s*)|(\s*$)/g;

/**
 * post请求
 */
export const postUrl = ({
    url,
    data,
    type = '',
    headers = {},
}): Promise<any> => {
    if (!url) {
        return Promise.reject('url为空');
    }
    const params: Record<string, any> = {
        url,
        method: 'POST',
        json: true,
        headers,
    };
    if (data) {
        if (type === 'formData') {
            params.formData = data;
        } else if (type === 'object') {
            params.body = data;
        } else {
            params.body =
                typeof data === 'object' ? JSON.stringify(data) : data;
        }
    }
    return new Promise((resolve, reject) => {
        request(params, (error, response, body) => {
            if (!error) {
                resolve(body);
            } else {
                resolve(error);
            }
        });
    });
};

/**
 * get请求
 */
export const getUrl = (url): any => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error) {
                resolve(body);
            } else {
                resolve(error);
            }
        });
    });
};

/**
 * 是否为空
 */
export const isEmpty = (key) => {
    if (key === undefined || key === '' || key === null) {
        return true;
    }
    if (typeof key === 'string') {
        key = key.replace(trimReg, '');
        if (
            key === '' ||
            key === null ||
            key === 'null' ||
            key === undefined ||
            key === 'undefined'
        ) {
            return true;
        }
        return false;
    } else if (typeof key === 'undefined') {
        return true;
    } else if (typeof key === 'object') {
        for (const index in key) {
            return false;
        }
        return true;
    } else if (typeof key === 'boolean') {
        return false;
    }
};
