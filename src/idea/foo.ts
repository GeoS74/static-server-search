import Func from './func'
const F: Func = new Func()

/*
2. создать документ с предварительным созданием индекса 2-мя способами
*/

const arr = [
  // F.info(),
  // F.indicesCreate('wiki'),
  // F.indicesDelete('wiki'),

  // F.indicesGetSettings('wiki')
  // F.indicesGetMapping('wiki')
  // F.indicesGet('wiki')

  // F.indicesStats(),
  // F.indicesStatsByName('wiki'),
  // F.indicesGetFieldMapping('title', 'wiki'),
  // F.indicesAnalyze("english", "Dogs love the cats"),

  // F.index('wiki', {
  //   title: "Белый плащ",
  //   message: "Зонт открылся сразу, не дав намокнуть плащу.",
  //   tags: ["#раз", "#два"],
  //   createdat: Date.now(),
  // }),
  // F.index('wiki', {
  //   title: "Чёрный плащ",
  //   message: "Завтра сегодня было вчера",
  //   tags: ["#мысли", "#вслуз"],
  //   createdat: Date.now(),
  // }),
  // F.create('wiki', "1", {title: "привет мир"}),

  // F.searchAll('wiki'),
  // F.search('wiki', {
  //   "title": "плаща нет",
  //   "tags": "#раз"
  // }),
  F.searchMulti('wiki', {
    multi_match: {
      query: 'намокнуть на вслуз',
      fields: ["message", "tags"]
    }
  })
]

Promise.all(arr)
  // .then(res => console.log(res))
  // .then(res => console.log(res[0].wiki.mappings.properties))
  .then(res => console.log(res[0].hits.hits))
  .catch(error => console.log(`Error: ${error.message}`))
  .finally(() => console.log('~ok~'))


















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




