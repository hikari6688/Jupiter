import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { lan as Tlan } from './lang.type';

const LangContext = createContext(null);
const lan = navigator.language.toLowerCase();
function parseLang(lang: string) {
  try {
    if (lang.includes('-')) return lang.split('-')[0];
    return lang;
  } catch (error) {
    return 'en';
  }
}

const LangProvider = (props: any) => {
  const _lang = parseLang(lan) as Tlan;
  const [lang, setLang] = useState<Tlan>(_lang);
  const [json, setJson] = useState<{}>();
  useEffect(() => {
    axios.get(`/locales/${lang}.json`).then((r) => {
      const { data } = r;
      setJson(data);
    });
  }, [lang]);

  const langMaker = (key: string, template?: {}) => {
    /*
     hello: '{msg} world {call}'
     <p>{{ $t('message.hello', { msg: 'hello' ,call:'xxxx'}) }}</p>
    */
    if (!json) return;
    const item = json[key];
    if (template) {
      const keys = Object.keys(template);
      keys.forEach((i) => {
        const reg = new RegExp(`\{${i}\}?`, 'x');
        const remake = item.replace(reg, template[i]);
        return remake;
      });
    }
    return item;
  };
  return (
    <LangContext.Provider value={{ t: langMaker, setLang, lang }}>
      {props.children}
    </LangContext.Provider>
  );
};
export { LangProvider, LangContext };
