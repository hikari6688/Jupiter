import React, { useEffect, useState } from 'react';
import {
  CancelToken,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from 'axios';
import request from '../util/request';
interface ReuqestArgs extends AxiosRequestConfig {
  manual: boolean;
}
function useRequest({ url, method, data, manual }: ReuqestArgs) {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<AxiosError>(null);
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    !manual && run();
  }, [data]);
  const run = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await request({
        method,
        url,
        data,
      });
      setState(response.data);
      return Promise.resolve(response);
    } catch (error) {
      setErr(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, state, err, run };
}
export default useRequest;
