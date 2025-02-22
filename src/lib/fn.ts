/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject } from '@/types';

/**
 *
 * @param ms Milliseconds
 * @returns
 */
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const removeFunctionsFromObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeFunctionsFromObject);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];

      // Check for functions and React-specific $$typeof Symbol values
      if (typeof value !== 'function' && !(typeof value === 'object' && value?.$$typeof)) {
        acc[key] = removeFunctionsFromObject(value);
      }

      return acc;
    }, {} as any);
  }

  return obj;
};

export const convertFileBase64 = (file: AnyObject): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = error => {
      reject(error);
    };
  });
};

export const byteToMbStr = (size: number) => {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
};

export function stringToFilterString(title: string) {
  let slug;
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase().trim();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');

  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/\s\s+/g, ' ');

  return slug;
}

export function filterSelectOptions(input: string, option: { label: string }) {
  return (
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    stringToFilterString(option.label.toLowerCase()).indexOf(stringToFilterString(input).toLowerCase()) >= 0
  );
}
