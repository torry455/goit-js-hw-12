import{s as A,a as f,i as d}from"./assets/vendor-c817b881.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const h="/goit-js-hw-12/assets/bi_x-octagon-ae8a7ac1.svg",m=document.querySelector(".form"),g=document.querySelector(".form-input"),y=document.querySelector(".gallery"),a=document.createElement("div");a.classList.add("loader");const q=new A("li a",{captionsData:"alt",captionClass:"img-caption",captionDelay:250}),c=document.querySelector(".load-more-btn");let p=1,b="41929636-e94244ac3daa63b74aaebcf18",u="",l=!1;function w(i,t){const s=i.map(({webformatURL:r,largeImageURL:e,tags:o,likes:n,views:v,comments:L,downloads:F})=>`<li class="gallery-item">
                <a class="item-link" href="${e}">
                    <img
                        src="${r}"
                        alt="${o}"
                        width="360"
                        height="200"
                    />
                </a>
                <ul class="mini-list">
                    <li class="mini-header">
                        <h3>Likes</h3>
                        <p>${n}</p>
                    </li>
                    <li class="mini-header">
                        <h3>Views</h3>
                        <p>${v}</p>
                    </li>
                    <li class="mini-header">
                        <h3>Comments</h3>
                        <p>${L}</p>
                    </li>
                    <li class="mini-header">
                        <h3>Downloads</h3>
                        <p>${F}</p>
                    </li>
                </ul>
                </li>`).join("");a.remove(),y.insertAdjacentHTML("beforeend",s),p*40>=t?(c.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"#808080",messageColor:"#FAFAFB"})):c.style.display="block",q.refresh(),l=!1}async function O(i){i.preventDefault(),y.innerHTML="",c.style.display="none",m.after(a),u=g.value,p=1;try{const t=await f.get("https://pixabay.com/api/",{params:{key:b,q:u,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}}),{hits:s,totalHits:r}=t.data;w(s,r)}catch(t){a.remove(),console.error("Error during API request:",t.response),d.show({message:"Failed to fetch images. Please try again later.",position:"topRight",color:"#EF4040",messageColor:"#FAFAFB",iconUrl:h})}}async function P(i){if(i.preventDefault(),!l){g.value="",m.after(a);try{l=!0;const t=window.scrollY||window.pageYOffset;p++;const s=await f.get("https://pixabay.com/api/",{params:{key:b,q:u,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:p}}),{hits:r,totalHits:e}=s.data;w(r,e),window.scrollTo({top:t,behavior:"smooth"})}catch(t){a.remove(),console.error("Error during API request:",t.response),d.show({message:`${t}`,position:"topRight",color:"#EF4040",messageColor:"#FAFAFB",iconUrl:h})}finally{l=!1}}}m.addEventListener("submit",O);c.addEventListener("click",P);
//# sourceMappingURL=commonHelpers.js.map
