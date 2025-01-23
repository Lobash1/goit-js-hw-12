import{i,S as d}from"./assets/vendor-5ObWk2rO.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const m=r=>{const t=[{title:"Likes",value:r.likes},{title:"Views",value:r.views},{title:"Comments",value:r.comments},{title:"Downloads",value:r.downloads}].map(o=>`
        <div class="gallery-item">
          <p class="gallery-title">${o.title}</p>
          <p class="gallery-count">${o.value}</p>
        </div>`).join("");return`
    <li class="gallery-card">
      <article class="card">
        <a class="gallery-link" href="${r.largeImageURL}" target="_blank" rel="noopener noreferrer">
          <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <div class="gallery-container">
          ${t}
        </div>
      </article>
    </li>`},h="https://pixabay.com/api/",y="48348047-29f6f569c2c15fdf8af3c5251",p=r=>{const a=new URLSearchParams({q:r,key:y,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${h}?${a}`).then(t=>{if(!t.ok)throw new Error(`Error: ${t.status} ${t.statusText}`);return t.json()}).catch(t=>{throw console.error("Error fetching photos:",t.message),t})},n=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),u=document.querySelector(".loader"),f=r=>{r.preventDefault();const a=r.currentTarget.elements.user_query.value.trim();if(a===""){i.error({message:"Please enter your request",position:"topRight"});return}u.classList.remove("is-hidden"),p(a).then(t=>{if(t.total===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c.innerHTML="",n.reset();return}const o=t.hits.map(e=>m(e)).join("");c.innerHTML=o,new d(".js-gallery a",{captionDelay:300,captionsData:"alt"})}).catch(t=>{i.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(t)}).finally(()=>{u.classList.add("is-hidden")}),n.reset()};n.addEventListener("submit",f);
//# sourceMappingURL=index.js.map
