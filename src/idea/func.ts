import {readFileSync} from 'fs'
import path from 'path'
import { Client } from '@elastic/elasticsearch';
import {
  IndicesCreateResponse,
  IndicesStatsResponse,
  IndicesGetResponse,
  IndicesResponseBase,
  WriteResponseBase,
  IndicesAnalyzeResponse,
  IndicesGetFieldMappingResponse,
  InfoResponse,
  IndicesGetMappingResponse,
  IndicesGetSettingsResponse
} from '@elastic/elasticsearch/lib/api/types';
import config from '../config';

export default class Func {
  private client: Client;

  constructor() {
    // v.8.5.2
    // this.client = new Client({
    //   node: `${config.db.host}:${config.db.port}`,
    //   auth: {
    //     username: 'elastic',
    //     password: 'DQJWel6DeCW=-x64YSfu'
    //   },
    //   tls: {
    //     ca: readFileSync(path.join(__dirname, './http_ca.crt')),
    //     rejectUnauthorized: false
    //   }
    // });

    // v.7.17.7
    this.client = new Client({
      node: `${config.db.host}:${config.db.port}`,
    });
  }

  async out<T>(func: Promise<T>): Promise<T> {
    return func
    // .then(res => console.log(res))
    // .catch(error => console.log(error.message))
  }

  //информация о БД
  async info(): Promise<InfoResponse>{
    return this.out<InfoResponse>(
      this.client.info()
    )
  }

  //создать индекс
  async indicesCreate(idxName: string): Promise<IndicesCreateResponse> {
    return this.out<IndicesCreateResponse>(
      this.client.indices.create({
        index: idxName,
        body: {
          mappings: {
            properties: {
              title: {
                type: "text",
                // analyzer: "russian", // указать анализатор
              },
            //   message: {
            //     type: "text",
            //     analyzer: "russian",
            //     search_analyzer: "russian", // можно указать разные анализаторы
            //   },
            //   tags: { type: "keyword" },
            //   createdat: { type: "date" },
            }
          }
        }
      })
    )
  }

  //удалить индекс
  async indicesDelete(idxName: string): Promise<IndicesResponseBase> {
    return this.out<IndicesResponseBase>(
      this.client.indices.delete({
        index: idxName
      })
    )
  }

  //состояние всех индексов
  async indicesStats(): Promise<IndicesStatsResponse> {
    return this.out<IndicesStatsResponse>(
      this.client.indices.stats()
    )
  }

  //состояние одного индекса
  async indicesStatsByName(idxName: string): Promise<IndicesStatsResponse> {
    return this.out<IndicesStatsResponse>(
      this.client.indices.stats({
        index: idxName
      })
    )
  }

  //состояние одного индекса
  async indicesByName(idxName: string): Promise<IndicesGetResponse> {
    return this.out<IndicesGetResponse>(
      this.client.indices.get({
        index: idxName
      })
    )
  }

  //использование анализатора
  async indicesAnalyze(analyzer: string, text: string): Promise<IndicesAnalyzeResponse> {
    return this.out<IndicesAnalyzeResponse>(
      this.client.indices.analyze({
        analyzer,
        text
      })
    )
  }

  // вернуть данные полей документов
  async indicesGetMapping(idxName?: string): Promise<IndicesGetMappingResponse>{
    return this.out<IndicesGetMappingResponse>(
      // this.client.indices.getMapping()
      //то же самое
      this.client.indices.getMapping({
        index: idxName
      })
    )
  }

  // вернуть данные полей документов
  async indicesGetSettings(idxName?: string): Promise<IndicesGetSettingsResponse>{
    return this.out<IndicesGetSettingsResponse>(
      this.client.indices.getSettings()
      //то же самое
      // this.client.indices.getSettings({
      //   index: idxName
      // })
    )
  }

  //если указать индекс будет искать в индексе
  //если нет, то вернёт результат поиска по всем существующим индексам
  //если нет такого поля, вернёт все индексы с пустыми объектами mappings
  async indicesGetFieldMapping(fields: string, index?: string): Promise<IndicesGetFieldMappingResponse> {
    return this.out<IndicesGetFieldMappingResponse>(
      this.client.indices.getFieldMapping({
        fields,
        index
      })
    )
  }

  async indicesGet(idxName: string){
    return this.out(
      this.client.indices.get({index: idxName})
    )
  }


  //записать документ
  async create(idxName: string, id: string, customBody: {}): Promise<WriteResponseBase> {
    return this.out<WriteResponseBase>(
      this.client.create({
        index: idxName,
        body: customBody,
        id: id //обязательно тип string
      })
    )
  }

  //записать документ
  async index(idxName: string, customBody: {}): Promise<WriteResponseBase> {
    return this.out<WriteResponseBase>(
      this.client.index({
        index: idxName,
        // body: customBody,
        document: customBody,
      })
    )
  }



  //поиск документа
  //https://www.elastic.co/guide/en/elasticsearch/reference/7.16/query-filter-context.html
  async search(idxName: string, customBody: {}) {
    return this.out(
      this.client.search({
        index: idxName,
        query: {
          match: customBody
        }
      })
    )
  }
  // вывод всех документов в индексе
  async searchAll(idxName?: string) {
    return this.out(
      this.client.search({
        index: idxName,
        // size: 3,
        // from: 2
      })
    )
  }
}