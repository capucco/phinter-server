export const sanitizeEtherValue = (value?: string) => {
  if (!value) return value;
  return value.replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
};
