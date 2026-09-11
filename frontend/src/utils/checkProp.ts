export default (obj: object, prop: string) => {
  return Object.keys(obj).includes(prop);
};
