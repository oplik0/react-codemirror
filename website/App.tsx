import React, { useEffect, useState } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import Github from '@uiw/react-shields/esm/github';
import Npm from '@uiw/react-shields/esm/npm';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { python } from '@codemirror/lang-python';
import { markdown } from '@codemirror/lang-markdown';
import { xml } from '@codemirror/lang-xml';
import { sql, MySQL, PostgreSQL } from '@codemirror/lang-sql';
import { java } from '@codemirror/lang-java';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { lezer } from '@codemirror/lang-lezer';
import { php } from '@codemirror/lang-php';
import { StreamLanguage } from '@codemirror/stream-parser';
import { go } from '@codemirror/legacy-modes/mode/go';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { tcl } from '@codemirror/legacy-modes/mode/tcl';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { vb } from '@codemirror/legacy-modes/mode/vb';
import { powerShell } from '@codemirror/legacy-modes/mode/powershell';
import logo from './logo.png';
import styles from './App.module.less';
import DocumentStr from '../README.md';
import CodeMirror, { ReactCodeMirrorProps, Extension } from '..';
import { Select } from './Select';

const langs: Record<string, any> = {
  javascript,
  jsx: () => javascript({ jsx: true }),
  typescript: () => javascript({ typescript: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  json,
  html,
  css,
  python,
  markdown,
  xml,
  sql,
  mysql: () => sql({ dialect: MySQL }),
  pgsql: () => sql({ dialect: PostgreSQL }),
  java,
  rust,
  cpp,
  lezer,
  php,
  go: () => StreamLanguage.define(go),
  ruby: () => StreamLanguage.define(ruby),
  shell: () => StreamLanguage.define(shell),
  lua: () => StreamLanguage.define(lua),
  swift: () => StreamLanguage.define(swift),
  tcl: () => StreamLanguage.define(tcl),
  yaml: () => StreamLanguage.define(yaml),
  vb: () => StreamLanguage.define(vb),
  powershell: () => StreamLanguage.define(powerShell),
};

const hyperlink: {
  href: string;
  label: string;
  style?: React.CSSProperties;
}[] = [
  {
    href: 'https://www.npmjs.com/package/@uiw/react-codemirror',
    label: 'View on NPM',
  },
  {
    href: 'https://codemirror.net/6/docs/',
    label: 'CM Documentation',
  },
  {
    href: 'https://github.com/codemirror/codemirror.next/',
    label: 'CodeMirror GitHub',
  },
  {
    href: 'https://raw.githack.com/uiwjs/react-codemirror/doc3/index.html',
    label: 'V3 Doc',
    style: { color: 'red' },
  },
];

const themeOptions = ['dark', 'light'];
const heightOptions = ['auto', '200px', '300px', '500px'];

let count = 0;

export default function App() {
  const [mode, setMode] = useState('javascript');
  const [autofocus, setAutofocus] = useState(false);
  const [theme, setTheme] = useState<ReactCodeMirrorProps['theme']>('light');
  const [code, setCode] = useState('');
  const [extensions, setExtensions] = useState<Extension[]>();
  const [height, setHeight] = useState('500px');

  function handleLangChange(lang: string) {
    try {
      import(`code-example/txt/sample.${lang.toLocaleLowerCase()}.txt`)
        .then((data) => {
          setCode(data.default);
          if (langs[lang]) {
            setExtensions([langs[lang]()]);
          }
          setMode(lang);
        })
        .catch((err) => {
          setExtensions([]);
          setMode(lang);
          setCode('');
        });
      if (lang === 'html') {
      }
    } catch (error) {}
  }
  useEffect(() => {
    handleLangChange('javascript');
  }, []);

  // @ts-ignore
  const version = VERSION;
  return (
    <div className={styles.App}>
      <GitHubCorners fixed target="__blank" zIndex={10} href="https://github.com/uiwjs/react-codemirror" />
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <h1 className={styles.AppTitle}>
          React-CodeMirror <sup>v{version}</sup>
        </h1>
        <p className={styles.content}>CodeMirror component for React. </p>
        <div className={styles.button}>
          {hyperlink.map(({ href, label, style }, idx) => {
            return (
              <a key={idx} target="_blank" rel="noopener noreferrer" href={href} style={style}>
                {label}
              </a>
            );
          })}
        </div>
        <div className={styles.select}></div>
      </header>
      <CodeMirror
        value={code}
        height={height}
        theme={theme}
        extensions={extensions}
        autoFocus={autofocus}
        className={styles.codemirror}
        onChange={(value) => {
          // console.log('value:', value);
        }}
        style={{
          maxWidth: '995px',
          margin: '-18px auto 0 auto',
          position: 'relative',
          zIndex: 999,
        }}
      />
      <div className={styles.select}>
        <Select
          label="Lang"
          options={Object.keys(langs)}
          value={mode}
          onChange={(evn) => handleLangChange(evn.target.value)}
        />
        <Select
          label="Theme"
          options={themeOptions}
          value={theme}
          onChange={(evn) => setTheme(evn.target.value as ReactCodeMirrorProps['theme'])}
        />
        <Select label="Height" options={heightOptions} value={height} onChange={(evn) => setHeight(evn.target.value)} />
        <button
          onClick={() => {
            count++;
            setCode(`console.log("Hello World! ${count}")`);
          }}
        >
          change code
        </button>
        <label>
          <input type="checkbox" checked={autofocus} onChange={(evn) => setAutofocus(evn.target.checked)} />
          autoFocus
        </label>
      </div>
      <MarkdownPreview className={styles.markdown} source={DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
      <div className={styles.footer}>
        <Github user="uiwjs" repo="react-codemirror">
          <Github.Social type="forks" href="https://github.com/uiwjs/react-codemirror" />
          <Github.Social type="stars" href="https://github.com/uiwjs/react-codemirror/stargazers" />
          <Github.Social type="watchers" href="https://github.com/uiwjs/react-codemirror/watchers" />
          <a href="https://www.npmjs.com/package/@uiw/react-codemirror" target="__blank">
            <img src="https://img.shields.io/npm/dm/@uiw/react-codemirror.svg?style=flat" alt="NPM Downloads" />
          </a>
        </Github>
        <Npm.Version
          scope="@uiw"
          packageName="react-shields"
          href="https://www.npmjs.com/package/@uiw/react-codemirror"
        />
      </div>
    </div>
  );
}