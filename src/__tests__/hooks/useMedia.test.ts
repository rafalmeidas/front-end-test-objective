import { act, renderHook } from "@testing-library/react";
import useMedia from "../../hooks/useMedia";

describe("useMedia", () => {
  afterEach(() => jest.clearAllMocks());

  it("should initialize width with the current window width", () => {
    const { result } = renderHook(() => useMedia());
    expect(result.current.width).toBe(window.innerWidth);
  });

  it("should update width when the window is resized", () => {
    const { result } = renderHook(() => useMedia());

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(800);
  });

  it("should remove event listener when unmounted", () => {
    const { unmount } = renderHook(() => useMedia());
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
