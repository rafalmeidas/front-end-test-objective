import md5 from "md5";
import {
  generateThumbnail,
  handleResponse,
  getTimeStamp,
  getHash,
} from "../../utils/functions";

describe("getHash function", () => {
  it("should generate a hash correctly", () => {
    const timeStamp = "timestamp";
    const privateKey = "privateKey";
    const publicKey = "publicKey";
    const expectedHash = md5(timeStamp + privateKey + publicKey);

    const hash = getHash(timeStamp, privateKey, publicKey);

    expect(hash).toEqual(expectedHash);
  });
});

describe("getTimeStamp function", () => {
  it("should return a valid timestamp", () => {
    const timeStamp = getTimeStamp();
    const parsedTimeStamp = parseInt(timeStamp, 10);

    expect(timeStamp).toBeDefined();
    expect(parsedTimeStamp).toBeGreaterThan(0);
  });
});

describe("handleResponse function", () => {
  it("should throw an error if the response is not OK", async () => {
    const mockResponse = {
      ok: false,
      statusText: "Test Error",
    } as Response;
    const mockFetchPromise = Promise.resolve(mockResponse);

    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(handleResponse(mockResponse)).rejects.toThrow("Test Error");

    global.fetch = originalFetch;
  });

  it("should return the response data if the response is OK", async () => {
    const responseData = { data: "test data" };
    const mockResponse = new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

    const mockFetchPromise = Promise.resolve(mockResponse);

    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const data = await handleResponse(mockResponse);

    expect(data).toEqual(responseData.data);

    global.fetch = originalFetch;
  });
});

describe("generateThumbnail function", () => {
  it("should generate the thumbnail URL correctly", () => {
    const thumb = {
      path: "path/to/image",
      extension: "jpg",
    };
    const expectedThumbnailURL = "path/to/image.jpg";

    const thumbnailURL = generateThumbnail(thumb);

    expect(thumbnailURL).toEqual(expectedThumbnailURL);
  });

  it("should return an empty string if thumbnail is not provided", () => {
    const thumbnailURL = generateThumbnail(null);

    expect(thumbnailURL).toEqual("");
  });
});
