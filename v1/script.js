const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

//Create DOM elements: Render facts in list
factsList.innerHTML = '';

//Load data from Supabase
loadFacts();

async function loadFacts() {
  //Fetch Supabase data
  const res = await fetch(
    'https://cdkkziejbymtbtqufpam.supabase.co/rest/v1/facts',
    {
      headers: {
        apikey: '<SUPABASE API KEY>',
        authorization: 'Bearer <SUPABASE API KEY>',
      },
    }
  );
  //
  const data = await res.json(); //The json() method of the Response interface takes a Response stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as JSON.
  // console.log(res, data);
  createFactsList(data, factsList);
}

//Display facts list
// createFactsList(initialFacts, factsList);

// function createFactsList(dataArray) {
//   const htmlArr = dataArray.map(
//     fact => (
//       'afterbegin',
//       `<li class="fact"><p>
//                 ${fact.text}
//                 <a
//                   class="source"
//                   rel="noopener"
//                   href="${fact.source}"
//                   target="_blank"
//                   >(Source)
//                 </a>
//               </p>
//               <span class="tag" style="background-color:
//                 ${
//                   CATEGORIES.find(category => category.name === fact.category)
//                     .color
//                 }
//               "
//                 >#${fact.category}#</span
//               >
//               <div class="vote-buttons">
//                 <button>👍 ${fact.votesInteresting}</button>
//                 <button>🤯 ${fact.votesMindblowing}</button>
//                 <button>⛔️ ${fact.votesFalse}</button>
//               </div></li>`
//     )
//   );
//   // //Make a HTML string from the array
//   console.log(htmlArr);
//   const html = htmlArr.join('');
//   console.log(html);
//   factsList.insertAdjacentHTML('afterbegin', html);
// }
function createFactsList(dataArray, addToDOMEl) {
  dataArray.map(fact =>
    addToDOMEl.insertAdjacentHTML(
      'afterbegin',
      `<li class="fact"><p>
                ${fact.text}
                <a
                  class="source"
                  rel="noopener"
                  href="${fact.source}"
                  target="_blank"
                  >(Source)
                </a>
              </p>
              <span class="tag" style="background-color:
                ${
                  CATEGORIES.find(category => category.name === fact.category)
                    .color
                }
              "
                >#${fact.category}#</span
              >
              <div class="vote-buttons">
                <button>👍 ${fact.votesInteresting}</button>
                <button>🤯 ${fact.votesMindblowing}</button>
                <button>⛔️ ${fact.votesFalse}</button>
              </div></li>`
    )
  );
}

// Eventhandler -> Toggle <Share a Fact> Button
btn.addEventListener('click', function () {
  // // #1.solution
  // if (form.classList.contains('hidden')) {
  //   form.classList.remove('hidden');
  //   btn.textContent = 'Close';
  // } else {
  //   form.classList.add('hidden');
  //   btn.textContent = 'Share a fact';
  // }
  // #2. solution
  form.classList.toggle('hidden');
  btn.textContent = form.classList.contains('hidden')
    ? 'Share a fact'
    : 'Close';
});
