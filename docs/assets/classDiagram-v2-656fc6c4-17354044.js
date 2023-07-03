import{p as I,d as N,s as M}from"./styles-a893c203-71b012a2.js";import{l as d,c,h as w,x as R,t as B,r as E,o as _,p as G,j as C}from"./index-b0a120a6.js";import{G as z}from"./layout-282527c2.js";import{r as P}from"./index-1e7f2254-c892ae30.js";import"./edges-66ea8538-3cc7ec8f.js";import"./createText-a49d2d2a-13a09883.js";import"./svgDraw-95adee0a-1a39138e.js";import"./line-f5463ede.js";import"./array-9f3ba611.js";import"./path-53f90ab3.js";const S=s=>C.sanitizeText(s,c());let k={dividerMargin:10,padding:5,textHeight:10,curve:void 0};const q=function(s,t,y,n){const e=Object.keys(s);d.info("keys:",e),d.info(s),e.forEach(function(i){var o,r;const l=s[i],p={shape:"rect",id:l.id,domId:l.domId,labelText:S(l.id),labelStyle:"",style:"fill: none; stroke: black",padding:((o=c().flowchart)==null?void 0:o.padding)??((r=c().class)==null?void 0:r.padding)};t.setNode(l.id,p),A(l.classes,t,y,n,l.id),d.info("setNode",p)})},A=function(s,t,y,n,e){const i=Object.keys(s);d.info("keys:",i),d.info(s),i.filter(o=>s[o].parent==e).forEach(function(o){var r,l;const a=s[o],p=a.cssClasses.join(" "),f={labelStyle:"",style:""},m=a.label??a.id,b=0,h="class_box",u={labelStyle:f.labelStyle,shape:h,labelText:S(m),classData:a,rx:b,ry:b,class:p,style:f.style,id:a.id,domId:a.domId,tooltip:n.db.getTooltip(a.id,e)||"",haveCallback:a.haveCallback,link:a.link,width:a.type==="group"?500:void 0,type:a.type,padding:((r=c().flowchart)==null?void 0:r.padding)??((l=c().class)==null?void 0:l.padding)};t.setNode(a.id,u),e&&t.setParent(a.id,e),d.info("setNode",u)})},F=function(s,t,y,n){d.info(s),s.forEach(function(e,i){var o,r;const l=e,a="",p={labelStyle:"",style:""},f=l.text,m=0,b="note",h={labelStyle:p.labelStyle,shape:b,labelText:S(f),noteData:l,rx:m,ry:m,class:a,style:p.style,id:l.id,domId:l.id,tooltip:"",type:"note",padding:((o=c().flowchart)==null?void 0:o.padding)??((r=c().class)==null?void 0:r.padding)};if(t.setNode(l.id,h),d.info("setNode",h),!l.class||!(l.class in n))return;const u=y+i,x={id:`edgeNote${u}`,classes:"relation",pattern:"dotted",arrowhead:"none",startLabelRight:"",endLabelLeft:"",arrowTypeStart:"none",arrowTypeEnd:"none",style:"fill:none",labelStyle:"",curve:E(k.curve,_)};t.setEdge(l.id,l.class,x,u)})},H=function(s,t){const y=c().flowchart;let n=0;s.forEach(function(e){var i;n++;const o={classes:"relation",pattern:e.relation.lineType==1?"dashed":"solid",id:"id"+n,arrowhead:e.type==="arrow_open"?"none":"normal",startLabelRight:e.relationTitle1==="none"?"":e.relationTitle1,endLabelLeft:e.relationTitle2==="none"?"":e.relationTitle2,arrowTypeStart:D(e.relation.type1),arrowTypeEnd:D(e.relation.type2),style:"fill:none",labelStyle:"",curve:E(y==null?void 0:y.curve,_)};if(d.info(o,e),e.style!==void 0){const r=G(e.style);o.style=r.style,o.labelStyle=r.labelStyle}e.text=e.title,e.text===void 0?e.style!==void 0&&(o.arrowheadStyle="fill: #333"):(o.arrowheadStyle="fill: #333",o.labelpos="c",((i=c().flowchart)==null?void 0:i.htmlLabels)??c().htmlLabels?(o.labelType="html",o.label='<span class="edgeLabel">'+e.text+"</span>"):(o.labelType="text",o.label=e.text.replace(C.lineBreakRegex,`
`),e.style===void 0&&(o.style=o.style||"stroke: #333; stroke-width: 1.5px;fill:none"),o.labelStyle=o.labelStyle.replace("color:","fill:"))),t.setEdge(e.id1,e.id2,o,n)})},V=function(s){k={...k,...s}},W=async function(s,t,y,n){d.info("Drawing class - ",t);const e=c().flowchart??c().class,i=c().securityLevel;d.info("config:",e);const o=(e==null?void 0:e.nodeSpacing)??50,r=(e==null?void 0:e.rankSpacing)??50,l=new z({multigraph:!0,compound:!0}).setGraph({rankdir:n.db.getDirection(),nodesep:o,ranksep:r,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),a=n.db.getNamespaces(),p=n.db.getClasses(),f=n.db.getRelations(),m=n.db.getNotes();d.info(f),q(a,l,t,n),A(p,l,t,n),H(f,l),F(m,l,f.length+1,p);let b;i==="sandbox"&&(b=w("#i"+t));const h=i==="sandbox"?w(b.nodes()[0].contentDocument.body):w("body"),u=h.select(`[id="${t}"]`),x=h.select("#"+t+" g");if(await P(x,l,["aggregation","extension","composition","dependency","lollipop"],"classDiagram",t),R.insertTitle(u,"classTitleText",(e==null?void 0:e.titleTopMargin)??5,n.db.getDiagramTitle()),B(l,u,e==null?void 0:e.diagramPadding,e==null?void 0:e.useMaxWidth),!(e!=null&&e.htmlLabels)){const T=i==="sandbox"?b.nodes()[0].contentDocument:document,$=T.querySelectorAll('[id="'+t+'"] .edgeLabel .label');for(const g of $){const L=g.getBBox(),v=T.createElementNS("http://www.w3.org/2000/svg","rect");v.setAttribute("rx",0),v.setAttribute("ry",0),v.setAttribute("width",L.width),v.setAttribute("height",L.height),g.insertBefore(v,g.firstChild)}}};function D(s){let t;switch(s){case 0:t="aggregation";break;case 1:t="extension";break;case 2:t="composition";break;case 3:t="dependency";break;case 4:t="lollipop";break;default:t="none"}return t}const J={setConf:V,draw:W},oe={parser:I,db:N,renderer:J,styles:M,init:s=>{s.class||(s.class={}),s.class.arrowMarkerAbsolute=s.arrowMarkerAbsolute,N.clear()}};export{oe as diagram};
