import{l as g,aw as E,aO as b,aP as L}from"./index-a6f06e5a.js";function k(l){const e=l.replace(/\n{2,}/g,`
`);return L(e)}function v(l){const e=k(l),{children:n}=b(e),a=[[]];let o=0;function r(t,c="normal"){t.type==="text"?t.value.split(`
`).forEach((s,i)=>{i!==0&&(o++,a.push([])),s.split(" ").forEach(u=>{u&&a[o].push({content:u,type:c})})}):(t.type==="strong"||t.type==="emphasis")&&t.children.forEach(f=>{r(f,t.type)})}return n.forEach(t=>{t.type==="paragraph"&&t.children.forEach(c=>{r(c)})}),a}function $(l){const{children:e}=b(l);function n(a){return a.type==="text"?a.value.replace(/\n/g,"<br/>"):a.type==="strong"?`<strong>${a.children.map(n).join("")}</strong>`:a.type==="emphasis"?`<em>${a.children.map(n).join("")}</em>`:a.type==="paragraph"?`<p>${a.children.map(n).join("")}</p>`:`Unsupported markdown: ${a.type}`}return e.map(n).join("")}function j(l,e){e&&l.attr("style",e)}function C(l,e,n,a,o=!1){const r=l.append("foreignObject"),t=r.append("xhtml:div"),c=e.label,f=e.isNode?"nodeLabel":"edgeLabel";t.html(`
    <span class="${f} ${a}" `+(e.labelStyle?'style="'+e.labelStyle+'"':"")+">"+c+"</span>"),j(t,e.labelStyle),t.style("display","table-cell"),t.style("white-space","nowrap"),t.style("max-width",n+"px"),t.attr("xmlns","http://www.w3.org/1999/xhtml"),o&&t.attr("class","labelBkg");let s=t.node().getBoundingClientRect();return s.width===n&&(t.style("display","table"),t.style("white-space","break-spaces"),t.style("width",n+"px"),s=t.node().getBoundingClientRect()),r.style("width",s.width),r.style("height",s.height),r.node()}function w(l,e,n){return l.append("tspan").attr("class","text-outer-tspan").attr("x",0).attr("y",e*n-.1+"em").attr("dy",n+"em")}function m(l,e,n){const a=l.append("text"),o=w(a,1,e);S(o,[{content:n,type:"normal"}]);const r=o.node().getComputedTextLength();return a.remove(),r}function M(l,e,n,a=!1){const r=e.append("g");let t=r.insert("rect").attr("class","background");const c=r.append("text").attr("y","-10.1");let f=0;if(n.forEach(s=>{let i=s.map(p=>p.content).join(" "),u="",h=[],d=0;if(m(r,1.1,i)<=l)h.push(i);else{for(let p=0;p<=i.length;p++)if(u=i.slice(d,p),g.info(u,d,p),m(r,1.1,u)>l){const y=i.slice(d,p).lastIndexOf(" ");y>-1&&(p=d+y+1),h.push(i.slice(d,p).trim()),d=p,u=null}u!=null&&h.push(u)}const T=h.map(p=>({content:p,type:s.type}));for(const p of T){let x=w(c,f,1.1);S(x,[p]),f++}}),a){const s=c.node().getBBox(),i=2;return t.attr("x",-i).attr("y",-i).attr("width",s.width+2*i).attr("height",s.height+2*i),r.node()}else return c.node()}function S(l,e){l.text(""),e.forEach((n,a)=>{const o=l.append("tspan").attr("font-style",n.type==="em"?"italic":"normal").attr("class","text-inner-tspan").attr("font-weight",n.type==="strong"?"bold":"normal");a===0?o.text(n.content):o.text(" "+n.content)})}const I=(l,e="",{style:n="",isTitle:a=!1,classes:o="",useHtmlLabels:r=!0,isNode:t=!0,width:c,addSvgBackground:f=!1}={})=>{if(g.info("createText",e,n,a,o,r,t,f),r){const s=$(e),i={isNode:t,label:E(s).replace(/fa[blrs]?:fa-[\w-]+/g,h=>`<i class='${h.replace(":"," ")}'></i>`),labelStyle:n.replace("fill:","color:")};return C(l,i,c,o,f)}else{const s=v(e);return M(c,l,s,f)}};export{I as c};