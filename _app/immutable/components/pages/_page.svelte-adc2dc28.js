import{S as U,i as V,s as A,k as b,q as $,a as D,l as E,m as L,r as I,h as c,c as j,n as k,b as w,H as m,J as B,C,K as G,o as J,L as P,u as R}from"../../chunks/index-f277b9e7.js";function F(f,l,n){const i=f.slice();return i[3]=l[n],i}function S(f){let l,n,i,o=f[3].id+"",g,p,h,r,u,v,d,M,_=f[3].likesRecent+"",a,e;return{c(){l=b("div"),n=b("h3"),i=b("a"),g=$(o),h=D(),r=b("img"),v=D(),d=b("p"),M=$("Likes: "),a=$(_),e=D(),this.h()},l(s){l=E(s,"DIV",{class:!0});var t=L(l);n=E(t,"H3",{});var H=L(n);i=E(H,"A",{href:!0});var q=L(i);g=I(q,o),q.forEach(c),H.forEach(c),h=j(t),r=E(t,"IMG",{width:!0,src:!0,alt:!0}),v=j(t),d=E(t,"P",{});var y=L(d);M=I(y,"Likes: "),a=I(y,_),y.forEach(c),e=j(t),t.forEach(c),this.h()},h(){k(i,"href",p="https://huggingface.co/"+f[3].id),k(r,"width","300"),P(r.src,u=T(f[3].id,f[3].siblings))||k(r,"src",u),k(r,"alt","example"),k(l,"class","grid-item svelte-1lg2bo6")},m(s,t){w(s,l,t),m(l,n),m(n,i),m(i,g),m(l,h),m(l,r),m(l,v),m(l,d),m(d,M),m(d,a),m(l,e)},p(s,t){t&1&&o!==(o=s[3].id+"")&&R(g,o),t&1&&p!==(p="https://huggingface.co/"+s[3].id)&&k(i,"href",p),t&1&&!P(r.src,u=T(s[3].id,s[3].siblings))&&k(r,"src",u),t&1&&_!==(_=s[3].likesRecent+"")&&R(a,_)},d(s){s&&c(l)}}}function K(f){let l,n,i,o,g,p,h,r,u,v,d,M,_=f[0],a=[];for(let e=0;e<_.length;e+=1)a[e]=S(F(f,_,e));return{c(){l=b("h2"),n=$("Most liked models last month 🤗"),i=D(),o=b("p"),g=$("Diffusers models most liked on Hugging Face last month"),p=D(),h=b("div");for(let e=0;e<a.length;e+=1)a[e].c();r=D(),u=b("button"),v=$("Load more"),this.h()},l(e){l=E(e,"H2",{});var s=L(l);n=I(s,"Most liked models last month 🤗"),s.forEach(c),i=j(e),o=E(e,"P",{});var t=L(o);g=I(t,"Diffusers models most liked on Hugging Face last month"),t.forEach(c),p=j(e),h=E(e,"DIV",{class:!0});var H=L(h);for(let y=0;y<a.length;y+=1)a[y].l(H);H.forEach(c),r=j(e),u=E(e,"BUTTON",{type:!0});var q=L(u);v=I(q,"Load more"),q.forEach(c),this.h()},h(){k(h,"class","grid svelte-1lg2bo6"),k(u,"type","button")},m(e,s){w(e,l,s),m(l,n),w(e,i,s),w(e,o,s),m(o,g),w(e,p,s),w(e,h,s);for(let t=0;t<a.length;t+=1)a[t].m(h,null);w(e,r,s),w(e,u,s),m(u,v),d||(M=B(u,"click",f[1]),d=!0)},p(e,[s]){if(s&1){_=e[0];let t;for(t=0;t<_.length;t+=1){const H=F(e,_,t);a[t]?a[t].p(H,s):(a[t]=S(H),a[t].c(),a[t].m(h,null))}for(;t<a.length;t+=1)a[t].d(1);a.length=_.length}},i:C,o:C,d(e){e&&c(l),e&&c(i),e&&c(o),e&&c(p),e&&c(h),G(a,e),e&&c(r),e&&c(u),d=!1,M()}}}function T(f,l){let n=l.find(i=>{let o=i.rfilename.split(".").pop().toLowerCase();return["jpg","jpeg","png","webp"].includes(o)});return console.log(n),n?"https://huggingface.co/"+f+"/resolve/main/"+n.rfilename:"https://placehold.co/300x300"}function N(f,l,n){let i=[],o=null;J(async()=>{await g()});async function g(){let p="https://huggingface.co/api/models?filter=diffusers&sort=likesRecent&direction=-1&full=1&limit=25";o&&(p+=`&cursor=${o}`);const h=await fetch(p),r=h.headers.get("link");r&&r.split(",").forEach(v=>{const d=v.match(/<(.+)>;\srel="next"/);d&&(o=d[1].split("&cursor=")[1])}),n(0,i=[...i,...await h.json()])}return[i,g]}class x extends U{constructor(l){super(),V(this,l,N,K,A,{})}}export{x as default};
