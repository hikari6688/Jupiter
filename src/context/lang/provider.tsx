import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { lan } from '../../../types/lang';

const LangContext = createContext(null);
const nl = navigator.language.toLowerCase();
function parseLang(lang: string) {
  try {
    if (lang.includes('-')) return lang.split('-')[0];
    return lang;
  } catch (error) {
    return 'zh';
  }
}

const LangProvider = (props: any) => {
  const _lang: lan = parseLang(nl) as lan;
  const [lang, setLang] = useState<lan>(_lang);
  const [t, setT] = useState<{}>();
  useEffect(() => {
    axios.get(`/locales/${lang}.json`).then((r) => {
      const { data } = r;
      setT(data);
    });
  }, [lang]);
  return (
    <LangContext.Provider value={{ t, setLang }}>
      {props.children}
    </LangContext.Provider>
  );
};
export { LangProvider, LangContext };