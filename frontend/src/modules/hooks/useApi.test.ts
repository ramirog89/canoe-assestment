import { getFund1, getFundRequest1 } from "../../test/entities";
import { renderHook, act } from "../../test/render";
import { useApi } from "./useApi";

const mockedRequest: jest.Mock = jest.fn();
jest.mock("./useFetch", () => ({
  useFetch: () => ({
    request: mockedRequest,
  }),
}));

describe("useApi", () => {
  it("should request getFunds", () => {
    const { result } = renderHook(() => useApi());
    act(() => {
      result.current.getFunds({ page: 1, size: 10, filter: 'all' });
    });

    expect(mockedRequest).toHaveBeenCalledWith("/fund?page=1&page_size=10&filter=all", {
      method: "GET",
    });
  });

  it("should request createFund", () => {
    const { result } = renderHook(() => useApi());
    act(() => {
      result.current.createFund(getFundRequest1());
    });

    expect(mockedRequest).toHaveBeenCalledWith("/fund", {
      method: "POST",
      body: {
        name: getFundRequest1().name,
        start_year: getFundRequest1().start_year,
        alias: getFundRequest1().alias,
        manager: getFundRequest1().manager
      },
    });
  });

  it("should request updateFund", () => {
    const { result } = renderHook(() => useApi());
    act(() => {
      result.current.updateFund(getFund1().id, getFundRequest1());
    });

    expect(mockedRequest).toHaveBeenCalledWith(`/fund/${getFund1().id}`, {
      method: "PUT",
      body: {
        name: getFundRequest1().name,
        start_year: getFundRequest1().start_year,
        alias: getFundRequest1().alias,
        manager: getFundRequest1().manager
      },
    });
  });

  it("should request deleteFund", () => {
    const { result } = renderHook(() => useApi());
    act(() => {
      result.current.deleteFund(getFund1().id);
    });

    expect(mockedRequest).toHaveBeenCalledWith(`/fund/${getFund1().id}`, {
      method: "DELETE",
    });
  });
});
