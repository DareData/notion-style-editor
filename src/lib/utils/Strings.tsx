export const isString = (str: unknown): str is string =>
  typeof str === 'string';

export const Strings = <T extends string>(str: T | undefined) => {
  return {
    orElse: (mapFn: () => string) => {
      if (!isString(str)) {
        return Strings(mapFn() as T);
      }
      return Strings(str);
    },
    map: (mapFn: (str: string) => string) => {
      if (!isString(str)) {
        return Strings(str);
      }
      return Strings(mapFn(str));
    },
    getOrElse: (newStr: () => string) => {
      if (!isString(str)) {
        return newStr();
      }
      return str;
    },
    get: () => {
      return str as T;
    },
  };
};
