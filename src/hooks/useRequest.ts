import React, { useEffect, useState, useRef } from 'react';
import axios, {
  CancelToken,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import request from '../util/request';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
interface ReuqestArgs extends AxiosRequestConfig {
  manual: boolean;
}
function useRequest<T>(config: ReuqestArgs) {
  const configRef = useRef<ReuqestArgs>(config);
  const { manual, data, url, method } = configRef.current;
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<AxiosError>(null);
  const [state, setState] = useState<T>(null);
  useEffect(() => {
    !manual && run();
  }, []);
  const run = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await request({
        method,
        url,
        data,
        cancelToken: source.token,
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
  const cancel = (message: any) => {
    source.cancel(message);
    setLoading(false);
  };
  return { loading, state, err, run, cancel };
}
export default useRequest;
