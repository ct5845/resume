import{a as R,t as O}from"../chunks/disclose-version.BuY_Vepp.js";import{l as W,m as Z,j as w,p as H,q as j,r as ee,i as ae,t as J,H as re,u as z,v as N,w as E,x as te,y as K,z as Q,A as ne,I as B,e as L,c as se,E as le,B as ie,C as fe,s as P,D as oe,F as ce,G as ve,J as ue,K as de,M as he,N as V,O as C,P as y,Q as D,n as ge,d as A}from"../chunks/runtime.CjcMSCuo.js";import{s as _e}from"../chunks/render.CDXArxwn.js";import{s as k,a as Y}from"../chunks/class.NVc0S33u.js";let M=null;function pe(l,e){return e}function xe(l,e,r,n){for(var c=[],o=e.length,i=0;i<o;i++)ce(e[i].e,c,!0);var d=o>0&&c.length===0&&r!==null;if(d){var _=r.parentNode;ve(_),_.append(r),n.clear(),b(l,e[0].prev,e[o-1].next)}ue(c,()=>{for(var a=0;a<o;a++){var t=e[a];d||(n.delete(t.k),b(l,t.prev,t.next)),de(t.e,!d)}})}function be(l,e,r,n,c,o=null){var i=l,d={flags:e,items:new Map,first:null};{var _=l;i=w?H(ee(_)):_.appendChild(W())}w&&j();var a=null;Z(()=>{var t=r(),s=ae(t)?t:t==null?[]:J(t),v=s.length;let h=!1;if(w){var u=i.data===re;u!==(v===0)&&(i=z(),H(i),N(!1),h=!0)}if(w){for(var p=null,f,g=0;g<v;g++){if(E.nodeType===8&&E.data===te){i=E,h=!0,N(!1);break}var T=s[g],m=n(T,g);f=U(E,d,p,null,T,m,g,c,e),d.items.set(m,f),p=f}v>0&&H(z())}w||me(s,d,i,c,e,n),o!==null&&(v===0?a?K(a):a=Q(()=>o(i)):a!==null&&ne(a,()=>{a=null})),h&&N(!0)}),w&&(i=E)}function me(l,e,r,n,c,o){var i=l.length,d=e.items,_=e.first,a=_,t,s=null,v=[],h=[],u,p,f,g;for(g=0;g<i;g+=1){if(u=l[g],p=o(u,g),f=d.get(p),f===void 0){var T=a?a.e.nodes_start:r;s=U(T,e,s,s===null?e.first:s.next,u,p,g,n,c),d.set(p,s),v=[],h=[],a=s.next;continue}if(we(f,u,g),f.e.f&B&&K(f.e),f!==a){if(t!==void 0&&t.has(f)){if(v.length<h.length){var m=h[0],x;s=m.prev;var q=v[0],S=v[v.length-1];for(x=0;x<v.length;x+=1)F(v[x],m,r);for(x=0;x<h.length;x+=1)t.delete(h[x]);b(e,q.prev,S.next),b(e,s,q),b(e,S,m),a=m,s=S,g-=1,v=[],h=[]}else t.delete(f),F(f,a,r),b(e,f.prev,f.next),b(e,f,s===null?e.first:s.next),b(e,s,f),s=f;continue}for(v=[],h=[];a!==null&&a.k!==p;)a.e.f&B||(t??(t=new Set)).add(a),h.push(a),a=a.next;if(a===null)continue;f=a}v.push(f),s=f,a=f.next}if(a!==null||t!==void 0){for(var I=t===void 0?[]:J(t);a!==null;)I.push(a),a=a.next;var X=I.length;if(X>0){var $=i===0?r:null;xe(e,I,$,d)}}L.first=e.first&&e.first.e,L.last=s&&s.e}function we(l,e,r,n){se(l.v,e),l.i=r}function U(l,e,r,n,c,o,i,d,_){var a=M;try{var t=(_&le)!==0,s=(_&ie)===0,v=t?s?fe(c):P(c):c,h=_&oe?P(i):i,u={i:h,v,k:o,a:null,e:null,prev:r,next:n};return M=u,u.e=Q(()=>d(l,v,h),w),u.e.prev=r&&r.e,u.e.next=n&&n.e,r===null?e.first=u:(r.next=u,r.e.next=u.e),n!==null&&(n.prev=u,n.e.prev=u.e),u}finally{M=a}}function F(l,e,r){for(var n=l.next?l.next.e.nodes_start:r,c=e?e.e.nodes_start:r,o=l.e.nodes_start;o!==n;){var i=he(o);c.before(o),o=i}}function b(l,e,r){e===null?l.first=r:(e.next=r,e.e.next=r&&r.e),r!==null&&(r.prev=e,r.e.prev=e&&e.e)}var ye=O("<div><span>A</span></div>"),Ce=O('<section class="rounded aspect-video shadow-z3 overflow-hidden border-2 flex"><div class="bg-base-100 p-scale flex flex-col justify-end gap-scale grow"><h3 class="text-base-content text-4xl" aria-label="Contrast for Surface colors"> </h3> <div class="flex gap-scale" aria-label="Theme Colors"></div></div> <div aria-label="Elevated Surface Colors" class="grow max-w-28 min-w-12 flex flex-col self-stretch"><div class="bg-base-200 grow flex items-center justify-center" aria-label="Higher Surface color swatch"><span aria-label="Contrast for Surface Color" class="text-base-content">a</span></div> <div class="bg-base-300 grow flex items-center justify-center" aria-label="Highest Surface color swatch"><span aria-label="Contrast for Surface Color" class="text-base-content">a</span></div></div></section>');function G(l,e){const r=[{bg:"bg-primary",fg:"text-primary-content",name:"Primary"},{bg:"bg-secondary",fg:"text-secondary-content",name:"Secondary"},{bg:"bg-accent",fg:"text-accent-content",name:"Accent"},{bg:"bg-neutral",fg:"text-neutral-content",name:"Neutral"}];var n=Ce(),c=C(n),o=C(c),i=C(o);y(o);var d=D(o,2);be(d,21,()=>r,pe,(_,a)=>{var t=ye(),s=C(t);y(t),V(()=>{Y(t,`${A(a).bg??""} grow max-w-14 sm:max-w-20 md:max-w-24 aspect-square flex items-center justify-center`),k(t,"aria-label",A(a).name),Y(s,A(a).fg),k(s,"aria-label",`Contract for ${A(a).name??""} Color`)}),R(_,t)}),y(d),y(c),ge(2),y(n),V(()=>{k(n,"data-theme",e.theme),_e(i,e.theme)}),R(l,n)}var Ee=O('<section class="flex flex-col gap-scale"><h2>Theme</h2> <div class="contents sm:flex gap-scale *:grow"><!> <!></div></section>');function He(l){var e=Ee(),r=D(C(e),2),n=C(r);G(n,{theme:"dark"});var c=D(n,2);G(c,{theme:"light"}),y(r),y(e),R(l,e)}export{He as component};