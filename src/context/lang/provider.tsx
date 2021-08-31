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
  const [json, setJson] = useState<{}>();
  useEffect(() => {
    axios.get(`/locales/${lang}.json`).then((r) => {
      const { data } = r;
      setJson(data);
    });
  }, [lang]);

  const langMaker = (key: string, template?: {}) => {
    if (!json) return;
    const item = json[key];
    if (template) {
      const keys = Object.keys(template);
      keys.forEach(item=>{
        // item.replace()
      })
    }
    return item;
    // 支持如下写法
    //  message: {
    //   hello: '{msg} world {call}'
    // }
    // <p>{{ $t('message.hello', { msg: 'hello' ,call:'bitxh'}) }}</p>
  };
  return (
    <LangContext.Provider value={{ t: langMaker, setLang }}>
      {props.children}
    </LangContext.Provider>
  );
};
export { LangProvider, LangContext };
