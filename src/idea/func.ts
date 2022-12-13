import { Client } from '@elastic/elasticsearch';
import { 
  IndicesCreateResponse, 
  IndicesStatsResponse, 
  IndicesGetResponse } from '@elastic/elasticsearch/lib/api/types';
import config from '../config';

type T = 
  IndicesCreateResponse|
  IndicesStatsResponse|
  IndicesGetResponse|
  void|any

export default class Func {
  private client: Client;

  constructor() {
    this.client = new Client({ 
      node: `${config.db.host}:${config.db.port}`,
    });
  }

  async out(func: Promise<T>): Promise<T>{
    return func
      // .then(res => console.log(res))
      // .catch(error => console.log(error.message))
  }

  //здать индекс
  async indicesCreate(idxName: string): Promise<T>{
    return this.out(
      this.client.indices.create({
        index: idxName,
        body: {
          mappings: {
            properties: {
              "title": {
                type: "text", 
                analyzer: "russian", // указать анализатор
              },
              "message": {
                type: "text", 
                analyzer: "russian", 
                search_analyzer: "russian", // можно указать разные анализаторы
              },
              "tags": {type: "keyword"},
              "createdat": {type: "date"},
            }
          }
        }
      })
    )
  }

  //состояние всех индексов
  async indicesStats(): Promise<T>{
    return this.out(
      this.client.indices.stats()
    )
  }

  //состояние одного индекса
  async indicesStatsByName(idxName: string): Promise<T>{
    return this.out(
      this.client.indices.stats({
            index: idxName
          })
    )
  }

  //состояние одного индекса
  async indicesByName(idxName: string): Promise<T>{
    return this.out(
      this.client.indices.get({
            index: idxName
          })
    )
  }

}