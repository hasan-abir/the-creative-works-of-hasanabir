import lineInMemory from "@/utils/lineInMemory";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

describe("lineInMemory: ", () => {
  beforeEach(() => {
    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
    });
  });

  it("gets the object", () => {
    const basePath = "/stories";
    const slug = "story-1";
    const objReturned = JSON.stringify({
      "1": 4,
    });

    localStorageMock.getItem.mockReturnValue(objReturned);

    const returnedValue = lineInMemory.get(basePath, slug);

    expect(returnedValue).toBeDefined();
    returnedValue &&
      expect(returnedValue["1"]).toBe(JSON.parse(objReturned)["1"]);
  });
  it("gets the null object", () => {
    const basePath = "/stories";
    const slug = "story-1";
    const objReturned = null;

    localStorageMock.getItem.mockReturnValue(objReturned);

    const returnedValue = lineInMemory.get(basePath, slug);

    expect(returnedValue).toBeDefined();
    returnedValue && expect(Object.keys(returnedValue).length).toBe(0);
  });

  it("gets nothing and clears localstorage", () => {
    const basePath = "/stories";
    const slug = "story-1";

    localStorageMock.getItem.mockReturnValue(new Error());

    const returnedValue = lineInMemory.get(basePath, slug);

    expect(returnedValue).toBeUndefined();

    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      `${basePath}/${slug}`
    );
  });

  it("sets the object", () => {
    const basePath = "/stories";
    const slug = "story-1";
    const page = "123";
    const index = 1;

    lineInMemory.set(basePath, slug, page, index);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      `${basePath}/${slug}`,
      JSON.stringify({ [page]: index })
    );
  });

  it("sets the object with old object", () => {
    const basePath = "/stories";
    const slug = "story-1";
    const page = "123";
    const index = 1;
    const oldObj = {
      "234": 1,
    };

    lineInMemory.set(basePath, slug, page, index, oldObj);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      `${basePath}/${slug}`,
      JSON.stringify({ ...oldObj, [page]: index })
    );
  });
});
