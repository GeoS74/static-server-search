import { readdir, readFile } from 'fs/promises';
import path from 'path';

import { Converter } from 'md-conv';
import config from './config';
import { logger } from './libs/logger';

const converter: Converter = new Converter();

(async () => {
  const flist: string[] = await _getFileList(config.repository.path);
  for (const fname of flist) {
    const data = await _makeData(path.join(__dirname, '..', config.repository.path, fname));
    console.log(data);
    break;
  }
})();

async function _makeData(fname: string): Promise<{}> {
  const md: string = await readFile(fname, { encoding: 'utf8' });
  const html: string = converter.markdownToHTML(md);

  return {
    title: _getTitle(html),
  };
}

function _getTitle(html: string): string {
  const title: RegExpMatchArray | null = html.match(/<h1>.+<\/h1>/g);
  if (title) {
    return title[0];
  }
  return '';
}

async function _getFileList(fpath: string): Promise<string[]> {
  return readdir(fpath)
    .then((res) => res.filter((fname) => /.+\.md$/.test(fname)));
}
