import MarkdownPreview from '@uiw/react-markdown-preview';
import data from '@uiw/codemirror-themes-all/README.md';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import * as themes from '@uiw/codemirror-themes-all';
import { langs } from '@uiw/codemirror-extensions-langs';
import { PageWarpper } from '../';
import styled from 'styled-components';

const ToolsWapper = styled.div`
  padding: 0 0 23px 0;
`;

export const ThemesAllDoc = () => {
  const dark = document.documentElement.getAttribute('data-color-mode');
  const themesData: Record<string, Omit<ReactCodeMirrorProps['theme'], 'dark' | 'light'>> = {};
  Object.keys(themes)
    .filter((item) => typeof themes[item as keyof typeof themes] !== 'function')
    .forEach((item) => {
      themesData[item] = themes[item as keyof typeof themes];
    });
  const [selectTheme, setSelectTheme] = useState<keyof typeof themesData>();
  const [theme, setTheme] = useState<ReactCodeMirrorProps['theme']>(dark === 'dark' ? 'dark' : 'light');
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-color-mode') === 'dark' ? 'dark' : 'light');
    document.addEventListener('colorschemechange', (e) => {
      setTheme(e.detail.colorScheme as ReactCodeMirrorProps['theme']);
    });
  }, []);
  const themeCurrent = themesData[selectTheme!] ? themesData[selectTheme!] : theme;
  const changeHandle = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectTheme(ev.target.value as keyof typeof themesData);
  };
  return (
    <PageWarpper>
      <CodeMirror
        value={data.source}
        theme={themeCurrent as ReactCodeMirrorProps['theme']}
        height="300px"
        style={{ margin: '0 0 23px 0' }}
        extensions={[langs.markdown()]}
      />
      <ToolsWapper>
        Select Theme:
        <select value={selectTheme} onChange={changeHandle}>
          <option>Select Theme</option>
          {Object.keys(themesData).map((keyname, index) => {
            return <option key={index}>{keyname}</option>;
          })}
        </select>
      </ToolsWapper>
      <MarkdownPreview source={data.source} />
    </PageWarpper>
  );
};