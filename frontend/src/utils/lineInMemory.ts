export type LineInMemory = Record<number, number>;

const lineInMemory = {
  get: (basePath: string, slug: string): LineInMemory | undefined => {
    try {
      const objStored: LineInMemory = JSON.parse(
        localStorage.getItem(`${basePath}/${slug}`) || "{}"
      );

      return objStored;
    } catch (error) {
      localStorage.removeItem(`${basePath}/${slug}`);
    }
  },
  set: (
    basePath: string,
    slug: string,
    page: string,
    index: number,
    oldObj?: LineInMemory | undefined | null
  ) => {
    let updatedObj = {
      [page]: index,
    };
    if (oldObj) {
      updatedObj = {
        ...oldObj,
        ...updatedObj,
      };
    }
    localStorage.setItem(`${basePath}/${slug}`, JSON.stringify(updatedObj));
  },
};

export default lineInMemory;
