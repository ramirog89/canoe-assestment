import { ENV } from '../../constants';
import { FundModel, GeneralModel, ManagerModel } from "../../models";

export const useApi = () => {

  const getFunds = async ({ page, size }: any): Promise<GeneralModel.PaginatedResponse<FundModel.IFund>> => {
    return request(`/fund?page=${page}&page_size=${size}`, {
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

  const getManagers = async (): Promise<GeneralModel.PaginatedResponse<ManagerModel.IManager>> => {
    return request("/manager", {
      method: "GET",
    });
  };

  const request = async (
    url: string,
    options: { method: string; headers?: any; body?: any } = { method: 'GET', headers: {} },
  ) => {
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(
        `${ENV.API.BASE_URL}${url}`,
        {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options.headers,
          },
        }
      );

      const parseResponse = await response.json();

      if (parseResponse.error) {
        throw new Error(parseResponse.error);
      }

      if (parseResponse.detail) {
        throw new Error(parseResponse.detail);
      }

      return parseResponse;
    } catch (e: any) {
      throw e;
    }
  };

  return {
    getFunds,
    createFund,
    updateFund,
    deleteFund,
    getManagers,
  };
};
