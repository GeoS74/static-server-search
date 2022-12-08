import { Client } from '@elastic/elasticsearch';
import config from './config';

const client = new Client({ 
  node: `${config.db.host}:${config.db.port}`,
});

//create index
// async function run(){
//   return client.indices.create({
//     index: 'wiki',
//     body: {
//       mappings: {
//         properties: {
//           "title": {type: "text"},
//           "message": {type: "text"},
//         }
//       }
//     }
//   }) 
// }


//get statements by all indeces
// async function run(){
//   return client.indices.stats()
// }
//get statements indeces by name
// async function run(){
//   return client.indices.stats({
//     index: 'wiki'
//   })
// }

//get info indeces by name
// async function run(){
//   return client.indices.get({
//     index: 'wiki'
//   })
// }


// get info by field
//если указать индекс будет искать в индексе
//если нет, то вернёт результат поиска по всем существующим индексам
//если нет такого поля, вернёт все индексы с пустыми объектами mappings
// async function run(){
//   return client.indices.getFieldMapping({
//     fields: 'title',
//     index: 'wiki',
//   })
// }
// async function run(){
//   return client.indices.getFieldMapping({
//     fields: 'title',
//   })
// }



// обязательно требует указание этих полей, включая id
// async function run(){
//   return client.create({
//     index: "wiki",
//     body: {
//       "age": 36
//     },
//     id: "100500"
//   })
// }



// async function run(){
//   return client.index({
//     index: 'wiki',
//     body: {
//       "title": "Скоро наступает Новый год!"
//     }
//   })
// }

// async function run(){
//   return client.search({
//     index: 'wiki'
//   })
// }

// delete index
// async function run(){
//   return client.indices.delete({
//     index: 'wiki'
//   })
// }


// bulk
// async function run(){
//   await client.indices.create({
//     index: 'wiki',
//     body: {
//       mappings: {
//         properties: {
//           id: { type: 'integer' },
//           text: { type: 'text' },
//           user: { type: 'keyword' },
//           time: { type: 'date' }
//         }
//       }
//     }
//   }, { ignore: [400] })

//   const dataset = [{
//     id: 1,
//     text: 'If I fall, don\'t bring me back.',
//     user: 'jon',
//     date: new Date()
//   }, {
//     id: 2,
//     text: 'Winter is coming',
//     user: 'ned',
//     date: new Date()
//   }, {
//     id: 3,
//     text: 'A Lannister always pays his debts.',
//     user: 'tyrion',
//     date: new Date()
//   }, {
//     id: 4,
//     text: 'I am the blood of the dragon.',
//     user: 'daenerys',
//     date: new Date()
//   }, {
//     id: 5, // change this value to a string to see the bulk response with errors
//     text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
//     user: 'arya',
//     date: new Date()
//   }]

//   const body = dataset.flatMap(doc => [{ index: { _index: 'wiki' } }, doc])
//   console.log(body)

//   const foo = await client.bulk({ refresh: true, body })
//   console.log(foo)
// }


run()
  .then(res => console.log(res))
  // .then(res => console.log(res.hits.hits))
  .catch(error => console.log(error.message))

