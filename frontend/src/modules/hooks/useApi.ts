import { ENV } from '../../constants';
import { FundModel, ManagerModel, CompanyModel } from "../../models";

export const useApi = () => {

  const getFunds = async (): Promise<FundModel.IFund[]> => {
    return request("/fund", {
      method: "GET",
    });
  };

  const getManagers = async (): Promise<ManagerModel.IManager[]> => {
    return request("/manager", {
      method: "GET",
    });
  };

  const getCompanies = async (): Promise<CompanyModel.ICompany[]> => {
    return request("/company", {
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
    getManagers,
    getCompanies
  };
};
