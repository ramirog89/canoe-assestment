import { FundModel, GeneralModel, ManagerModel } from "../../models";
import { useFetch } from "./useFetch";

export const useApi = () => {
  const { request } = useFetch();

  const getFunds = async ({ page, size, filter }: any): Promise<GeneralModel.PaginatedResponse<FundModel.IFund>> => {
    return request(`/fund?page=${page}&page_size=${size}&filter=${filter}`, {
      method: "GET",
    });
  };

  const createFund = async (payload: FundModel.IFundRequest): Promise<FundModel.IFund> => {
    return request('/fund', {
      method: "POST",
      body: payload
    });
  };

  const updateFund = async (id: number, payload: FundModel.IFundRequest): Promise<FundModel.IFund> => {
    return request(`/fund/${id}`, {
      method: "PUT",
      body: payload
    });
  };

  const deleteFund = async (id: number): Promise<void> => {
    return request(`/fund/${id}`, {
      method: "DELETE",
    });
  };

  const getManagers = async (): Promise<ManagerModel.IManager[]> => {
    return request("/manager", {
      method: "GET",
    });
  };

  return {
    getFunds,
    createFund,
    updateFund,
    deleteFund,
    getManagers,
  };
};
