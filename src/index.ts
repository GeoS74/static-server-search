import { readdir, readFile } from 'fs/promises';
import { createHash } from 'crypto';
import path from 'path';
import fetch from 'node-fetch';
import { Client } from '@elastic/elasticsearch';
import { Server, IncomingMessage, ServerResponse } from 'http';
import url from 'url';

import { note } from './types/note';
import config from './config';
import { logger } from './libs/logger';

const server: Server = new Server();
const client = new Client({ node: `${config.db.host}:${config.db.port}` });

server.listen(config.server.port, (): void => logger.info(`server run at ${config.server.port} port`));

server.on('request', async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  response.setHeader('content-type', 'text/html');
  try {
    if (request.method !== 'GET') {
      response.statusCode = 400;
      throw new Error('method not supported');
    }

    if (request?.url) {
      const query: string | null = _getQuery(request.url);
      if (!query) {
        response.statusCode = 404;
        throw new Error('page not found');
      }

      logger.info(query);
      response.end(query);
      return;
    }
    throw new Error('bad request');
  } catch (error) {
    response.setHeader('content-type', 'application/json');

    if (_isNodeError(error)) {
      logger.error(error.message);

      if (response.statusCode !== 200) {
        response.end(_errorToJSON(error.message));
        return;
      }

      response.statusCode = 404;
      response.end(_errorToJSON('not found'));
      return;
    }

    response.statusCode = 500;
    response.end(_errorToJSON('internal server error'));
  }
});
logger.info('start');
console.log(config);
updateDataBase()
async function updateDataBase(): Promise<void> {
  try {
    const flist: string[] = await _getFileList(path.join(__dirname, '..', config.repository.path));
    console.log('flist:');
    console.log(flist);
    console.log(path.join(__dirname, config.repository.path));
    for (const fname of flist) {
      const fpath: string = path.join(__dirname, '..', config.repository.path, fname);

      const data: note = await _makeData(fpath, fname);
      await _addNote(data);
    }

    logger.info('Update Elasticsearch index "notes"');
  } catch (error) {
    if (_isNodeError(error)) {
      logger.error(error.message);
    }
  }
}

function _getQuery(requestUrl: string): string | null {
  const { query } = url.parse(requestUrl);
  return query ? new URLSearchParams(query).get('query') : null;
}

async function _addNote(data: note) {
  return client.index({
    index: 'notes',
    document: data,
  });
}

async function _makeData(fpath: string, fname: string): Promise<note> {
  const md: string = await readFile(fpath, { encoding: 'utf8' });
  return {
    title: fname.slice(0, -3),
    body: md.replace(/[\r\n]/g, ' '),
    tags: _getTagList(md),
    hash: createHash('sha256').update(md).digest('hex'),
  };
}

function _getTagList(md: string): string[] {
  return md.match(/#[a-zA-Zа-яА-Я\d_]+/g) || [];
}

async function _getFileList(fpath: string): Promise<string[]> {
  return readdir(fpath)
    .then((res) => res.filter((fname) => /.+\.md$/.test(fname)));
}

function _isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error;
}

function _errorToJSON(message: string): string {
  return JSON.stringify({
    error: message,
  });
}

// fetch('http://5.181.108.248:9200')
//   .then(async res => console.log(await res.json()))
// fetch('http://5.181.108.248',{headers:{'Accept': 'text/html'}})
//   .then(async res => console.log(await res.text()))
// .catch(error => logger.error(error.message))
