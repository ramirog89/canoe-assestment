import { ENV } from '../../constants';
import { FundModel, GeneralModel } from "../../models";

export const useApi = () => {

  const getFunds = async (): Promise<GeneralModel.PaginatedResponse<FundModel.IFund>> => {
    return request("/fund", {
      method: "GET",
    });
  };

  const createFund = async (payload: FundModel.IFundRequest): Promise<FundModel.IFund> => {
    return request('fund', {
      method: "POST",
      body: payload
    });
  };

  const updateFund = async (id: number, payload: FundModel.IFundRequest): Promise<FundModel.IFund> => {
    return request(`/fund/${id}`, {
      method: "GET",
      body: payload
    });
  };

  const deleteFund = async (id: number): Promise<void> => {
    return request(`/fund/${id}`, {
      method: "DELETE",
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
  };
};
