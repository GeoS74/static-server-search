import Func from './func'
const F: Func = new Func()

const arr = [
  // F.indicesCreate('foo'),
  // F.indicesDelete('wiki'),
  // F.indicesStats(),
  F.indicesGet('wiki')
  // F.indicesStatsByName('wiki'),
  // F.indicesGetFieldMapping('message', 'wiki'),
  // F.indicesAnalyze("english", "Dogs love the cats"),
  // F.create(),
  // F.index('wiki', {message: "Dogs love the cats"}),
  // F.search('wiki', {message: "тендер мыс"}),
]

Promise.all(arr)
  .then(res => console.log(res[0].wiki?.settings?.index?.routing))
  // .then(res => console.log(res[0]['wiki'].mappings.message.mapping.message))
//.then(res => console.log(res[0].hits.hits))
  .catch(error => console.log(`Error: ${error.message}`))
















// async function run(){
//   return client.search({
//     index: 'wiki',
//     query: {
//       match: {
//         message: "машины"
//       }
//     }
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




