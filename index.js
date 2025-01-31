import{a as w,S as v,i as h}from"./assets/vendor-DEenWwFD.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const p=t=>`
    <li class="gallery-card">
      <a class="gallery-link" href="${t.largeImageURL}">
        <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}" />
      </a>
      <ul class="text-info">
        <li class="image-info">
          <h4>Likes</h4>
          <p>${t.likes}</p>
        </li>
        <li class="image-info">
          <h4>Views</h4>
          <p>${t.views}</p>
        </li>
        <li class="image-info">
          <h4>Comments</h4>
          <p>${t.comments}</p>
        </li>
        <li class="image-info">
          <h4>Downloads</h4>
          <p>${t.downloads}</p>
        </li>
      </ul>
    </li>
  `,f=(t,s)=>{const a=new URLSearchParams({q:t,key:"48348047-29f6f569c2c15fdf8af3c5251",image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15});return w.get(`https://pixabay.com/api/?${a}`)},u=document.querySelector(".js-search-form"),m=document.querySelector(".js-gallery"),c=document.querySelector(".loader"),o=document.querySelector(".js-load-btn");let l=1,n="",b=15,g=0;o.classList.add("is-hidden");const y=new v(".js-gallery a",{captionDelay:300,captionsData:"alt"}),S=async t=>{try{if(t.preventDefault(),n=u.elements[0].value.trim(),n===""){h.error({message:"Please enter your request",position:"topRight"});return}l=1,o.classList.add("is-hidden"),c.classList.add("show-loader");const{data:s}=await f(n,l);if(g=s.totalHits,s.total===0){h.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),m.innerHTML="",u.reset();return}s.totalHits>1&&(o.classList.remove("is-hidden"),o.addEventListener("click",L));const a=s.hits.map(i=>p(i)).join("");m.innerHTML=a,y.refresh()}catch(s){console.log(s)}finally{c.classList.remove("show-loader")}};u.addEventListener("submit",S);const L=async()=>{try{c.classList.add("show-loader"),l++;const{data:t}=await f(n,l),s=t.hits.map(e=>p(e)).join("");m.insertAdjacentHTML("beforeend",s),y.refresh(),c.classList.remove("show-loader");let i=document.querySelector(".gallery-card").getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"}),l*b>=g&&(o.classList.add("is-hidden"),h.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),o.classList.contains("is-hidden")||o.removeEventListener("click",L))}catch(t){console.log(t)}};
//# sourceMappingURL=index.js.map
