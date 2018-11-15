'use strict';

import 'babel-polyfill'
let news;


document.addEventListener('DOMContentLoaded', ()=>{
  news = document.getElementById('news');
  let search = document.getElementById('search')

  search.addEventListener('keyup', (event)=>{
    // console.log(event)/
    if(event.key == 'Enter') {
      getNews(search.value)
    }
  })
  
  getNews().then(
  
    function () {
      let mupVote = document.querySelector('#upvote');
      mupVote.addEventListener('click', function(e) {
      //  debugger
        let counterElem = document.getElementById('counter' + this.attributes[3].nodeValue);
        let counterValue = parseInt(counterElem.textContent) + 1;
        counterElem.innerHTML = counterValue
        localStorage.setItem('counter p',counterValue);
      })

      let mdVote = document.querySelector('#downvote');
      mdVote.addEventListener('click', function(e) {
      //  debugger
        let counterElem2 = document.getElementById('counter' + this.attributes[3].nodeValue);
        let counterValue2 = parseInt(counterElem2.textContent) - 1;
        counterElem2.innerHTML = counterValue2
        localStorage.setItem('counter m ',counterValue2);
      })
    }
    
  );
})

async function getNews(query) {
  let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
  let content = await response.json()
  console.log(content)
  updateUI(content.articles.map(createArticle).join('\n'))
}

function updateUI(content) {
  news.innerHTML = content
}




function createArticle(article, i) {
  // debugger
  article.counter = 1;

  return ` 

    <article id="${i}">
      <img width="124px" height="124px" src="${article.urlToImage}" alt="">
      <div id="text">
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <time>${article.publishedAt}</time>
      </div>
      <div id="voter">
        <img src="${require('./assets/upvote.svg')}" id="upvote" alt="" data-artice-id='${i}'>
       

        <div id="counter${i}">${article.counter}</div>
        <img src="${require('./assets/downvote.svg')}" id="downvote" alt="" data-artice-id='${i}'>
              </div>
      <Script>
       console.log('nabuu')
      </Script>
    </article>
  `


  
}
