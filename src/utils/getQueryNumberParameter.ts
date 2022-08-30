export const extractQueryParam = (
  param: string,
  defaultValue?: number
): number => {
  return param ? parseInt(param, 10) : (defaultValue as number);
};
