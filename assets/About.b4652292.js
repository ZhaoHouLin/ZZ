import{o as v,c as x,_ as b,r as H,a as j,g as B,b as l,t as N,p as P,d as $,e as Z,f as T}from"./index.36152c8a.js";import{S as V}from"./ScrollTrigger.7586122f.js";const O={class:"logo"};function R(D,u){return v(),x("div",O,"ZZ")}const k={},G=b(k,[["render",R],["__scopeId","data-v-54b76b78"]]),U=D=>(P("data-v-1571a8ad"),D=D(),$(),D),W={class:"ring"},X=U(()=>l("svg",{id:"ring",viewBox:"0 0 500 500"},[l("path",{id:"textCircle",d:"M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z",fill:"none"}),l("text",null,[l("textPath",{href:"#textCircle",textLength:"180%"},"Hello! Wellcome to my website. I'm ZZ. ")])],-1)),q={__name:"Ring",setup(D){const u=H(0);return j(()=>{B.to("#ring",{duration:10,rotate:"-360deg",repeat:-1,ease:"none"}),B.to(u,{value:3030,onUpdate:()=>{u.value=Math.round(u.value)},duration:3})}),(F,a)=>(v(),x("div",W,[l("h1",null,N(`#${u.value}`),1),X]))}},z=b(q,[["__scopeId","data-v-1571a8ad"]]);/*!
 * strings: 3.11.3
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var J=/(?:^\s+|\s+$)/g,K=/([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;function L(D){var u=D.nodeType,F="";if(u===1||u===9||u===11){if(typeof D.textContent=="string")return D.textContent;for(D=D.firstChild;D;D=D.nextSibling)F+=L(D)}else if(u===3||u===4)return D.nodeValue;return F}function I(D,u,F,a){for(var e=D.firstChild,C=[],E;e;)e.nodeType===3?(E=(e.nodeValue+"").replace(/^\n+/g,""),a||(E=E.replace(/\s+/g," ")),C.push.apply(C,M(E,u,F,a))):(e.nodeName+"").toLowerCase()==="br"?C[C.length-1]+="<br>":C.push(e.outerHTML),e=e.nextSibling;for(E=C.length;E--;)C[E]==="&"&&C.splice(E,1,"&amp;");return C}function M(D,u,F,a){if(D+="",F&&(D=D.trim?D.trim():D.replace(J,"")),u&&u!=="")return D.replace(/>/g,"&gt;").replace(/</g,"&lt;").split(u);for(var e=[],C=D.length,E=0,s,t;E<C;E++)t=D.charAt(E),(t.charCodeAt(0)>=55296&&t.charCodeAt(0)<=56319||D.charCodeAt(E+1)>=65024&&D.charCodeAt(E+1)<=65039)&&(s=((D.substr(E,12).split(K)||[])[1]||"").length||2,t=D.substr(E,s),e.emoji=1,E+=s-1),e.push(t===">"?"&gt;":t==="<"?"&lt;":a&&t===" "&&(D.charAt(E-1)===" "||D.charAt(E+1)===" ")?"&nbsp;":t);return e}/*!
 * TextPlugin 3.11.3
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var p,m,Q=function(){return p||typeof window<"u"&&(p=window.gsap)&&p.registerPlugin&&p},A={version:"3.11.3",name:"text",init:function(u,F,a){typeof F!="object"&&(F={value:F});var e=u.nodeName.toUpperCase(),C=this,E=F,s=E.newClass,t=E.oldClass,g=E.preserveSpaces,d=E.rtl,f=C.delimiter=F.delimiter||"",h=C.fillChar=F.fillChar||(F.padSpace?"&nbsp;":""),r,n,i,o,S,w,c,_;if(C.svg=u.getBBox&&(e==="TEXT"||e==="TSPAN"),!("innerHTML"in u)&&!C.svg)return!1;if(C.target=u,!("value"in F)){C.text=C.original=[""];return}for(i=I(u,f,!1,g),m||(m=document.createElement("div")),m.innerHTML=F.value,n=I(m,f,!1,g),C.from=a._from,(C.from||d)&&!(d&&C.from)&&(e=i,i=n,n=e),C.hasClass=!!(s||t),C.newClass=d?t:s,C.oldClass=d?s:t,e=i.length-n.length,r=e<0?i:n,e<0&&(e=-e);--e>-1;)r.push(h);if(F.type==="diff"){for(o=0,S=[],w=[],c="",e=0;e<n.length;e++)_=n[e],_===i[e]?c+=_:(S[o]=c+_,w[o++]=c+i[e],c="");n=S,i=w,c&&(n.push(c),i.push(c))}F.speed&&a.duration(Math.min(.05/F.speed*r.length,F.maxDuration||9999)),C.rtl=d,C.original=i,C.text=n,C._props.push("text")},render:function(u,F){u>1?u=1:u<0&&(u=0),F.from&&(u=1-u);var a=F.text,e=F.hasClass,C=F.newClass,E=F.oldClass,s=F.delimiter,t=F.target,g=F.fillChar,d=F.original,f=F.rtl,h=a.length,r=(f?1-u:u)*h+.5|0,n,i,o;e&&u?(n=C&&r,i=E&&r!==h,o=(n?"<span class='"+C+"'>":"")+a.slice(0,r).join(s)+(n?"</span>":"")+(i?"<span class='"+E+"'>":"")+s+d.slice(r).join(s)+(i?"</span>":"")):o=a.slice(0,r).join(s)+s+d.slice(r).join(s),F.svg?t.textContent=o:t.innerHTML=g==="&nbsp;"&&~o.indexOf("  ")?o.split("  ").join("&nbsp;&nbsp;"):o}};A.splitInnerHTML=I;A.emojiSafeSplit=M;A.getText=L;Q()&&p.registerPlugin(A);const Y={class:"info-text"},DD=Z('<div class="name" data-v-166ed315>ZhaoHou Lin</div><div class="phone-number" data-v-166ed315>+886 906-822-708 </div><div class="mail" data-v-166ed315>rodes5292@gmail.com</div><div class="line left" data-v-166ed315></div><div class="line top" data-v-166ed315></div><div class="line left-bottom-slash" data-v-166ed315></div><div class="line right-bottom" data-v-166ed315></div>',7),uD=[DD],FD={__name:"InfoText",setup(D){return j(()=>{B.registerPlugin(A),B.to(".name",{text:"Raiden",ease:"power1.in",duration:2,repeat:1,yoyo:!0,repeatDelay:1}),B.from(".phone-number",{text:"",ease:"power1.in",duration:2,repeat:2,yoyo:!0,repeatDelay:1}),B.from(".mail",{text:"",ease:"slow(0.7, 0.7, false)",duration:2,repeat:2,yoyo:!0,repeatDelay:1})}),(u,F)=>(v(),x("div",Y,uD))}},CD=b(FD,[["__scopeId","data-v-166ed315"]]),y=D=>(P("data-v-facbd178"),D=D(),$(),D),eD={class:"about"},ED=y(()=>l("div",{class:"page page1"},[l("h1",null,"one")],-1)),tD=y(()=>l("div",{class:"page page2",id:"section-one"},null,-1)),sD=y(()=>l("div",{class:"page page3"},null,-1)),nD=y(()=>l("div",{class:"page page4"},null,-1)),iD={__name:"About",setup(D){return j(()=>{B.registerPlugin(V);const u=B.timeline({scrollTrigger:{trigger:".about",pin:!0,pinSpacing:!0,scrub:5}});u.from(".page1",{duration:5,yPercent:"100"}),u.to(".page1",{duration:5,xPercent:"-100"}),u.from(".page2",{duration:5,xPercent:"100"},"<")}),(u,F)=>(v(),x("div",eD,[T(G),T(z),T(CD),ED,tD,sD,nD]))}},oD=b(iD,[["__scopeId","data-v-facbd178"]]);export{oD as default};