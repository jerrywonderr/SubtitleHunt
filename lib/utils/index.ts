export const parseId = (str: string) => {
  const lastIndex = str.length - 1;
  if (str[lastIndex] === '/') {
    str = str.slice(0, lastIndex);
    const lastIndexOfChar = str.lastIndexOf('/');
    return str.slice(lastIndexOfChar + 1);}
  return str;
}
