const IC={
 chev:'<path d="M3.5 6l4.5 4.5L12.5 6"/>',
 back:'<path d="M13.5 8H2.5M6.5 4l-4 4 4 4"/>',
 fwd:'<path d="M2.5 8h11M9.5 4l4 4-4 4"/>',
 reload:'<path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5v3h-3"/>',
 search:'<circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>',
 star:'<path d="M8 1.8l1.9 4 4.3.5-3.2 3 .9 4.3L8 11.4l-3.9 2.2.9-4.3-3.2-3 4.3-.5z"/>',
 starf:'<path fill="currentColor" d="M8 1.8l1.9 4 4.3.5-3.2 3 .9 4.3L8 11.4l-3.9 2.2.9-4.3-3.2-3 4.3-.5z"/>',
 favs:'<path d="M6 2l1.4 3 3.2.4-2.4 2.2.7 3.2L6 9.2 3.1 10.8l.7-3.2L1.4 5.4 4.6 5z"/><path d="M10 11h5M10 14h5"/>',
 ext:'<path d="M6.5 3.5a1.5 1.5 0 1 1 3 0V5h3v3h-1.5a1.5 1.5 0 1 0 0 3H12.5v3h-9v-3H5a1.5 1.5 0 1 0 0-3H3.5V5h3z"/>',
 more:'<circle cx="3" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="13" cy="8" r="1" fill="currentColor"/>',
 apps:'<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>',
 imp:'<path d="M2 5V3.5h4.5L8 5h6v8H2z"/><path d="M8 7.5v3M6.5 9.5L8 11l1.5-1.5"/>',
 folder:'<path d="M2 3.5h4.5L8 5h6v8H2z"/>',
 pen:'<path d="M3 13l.8-3L11 2.8 13.2 5 6 12.2z"/>',
 plus:'<path d="M8 3v10M3 8h10"/>',
 x:'<path d="M4 4l8 8M12 4l-8 8"/>',
 page:'<rect x="2" y="3" width="12" height="10" rx="2"/><path d="M2 6.5h12M4.5 4.7h.1"/>',
 person:'<circle cx="8" cy="5.5" r="2.8"/><path d="M2.8 14c.6-3 2.7-4.5 5.2-4.5s4.6 1.5 5.2 4.5"/>',
 win:'<rect x="2" y="3" width="12" height="10" rx="2"/>',
 priv:'<rect x="2" y="3" width="12" height="10" rx="2"/><circle cx="6" cy="9" r="1.3"/><circle cx="10" cy="9" r="1.3"/><path d="M5 6.800h6"/>',
 zoom:'<circle cx="7" cy="7" r="4.500"/><path d="M10.500 10.500L14 14M5 7h4M7 5v4"/>',
 clock:'<circle cx="8" cy="8" r="5.500"/><path d="M8 5v3.200l2 1.300"/>',
 tabs:'<rect x="2" y="4" width="12" height="8" rx="2"/><path d="M5 8h6"/>',
 dl:'<path d="M8 2.500v7M5 6.800l3 3 3-3M3 13h10"/>',
 trash:'<path d="M3 4.500h10M6.500 4.500V3h3v1.500M4.500 4.500l.6 8.500h5.800l.6-8.500M7 7v4M9 7v4"/>',
 print:'<rect x="4" y="2.500" width="8" height="3.500"/><rect x="2.500" y="6" width="11" height="5" rx="1.500"/><rect x="4.500" y="9.500" width="7" height="4"/>',
 trans:'<path d="M2.500 4h6M5.500 2.500V4M3.500 4c.6 2.600 2.200 4.200 4 5M7.500 4c-.6 2.600-2.200 4.200-4.500 5.200M9.500 13.500l2.200-6 2.200 6M10.200 11.700h3"/>',
 split:'<rect x="2" y="3" width="12" height="10" rx="2"/><path d="M8 3v10"/>',
 cam:'<rect x="2.500" y="3.500" width="11" height="9" rx="2" stroke-dasharray="2 2"/>',
 tools:'<rect x="3" y="3" width="10" height="10" rx="2"/><path d="M6 8h4"/>',
 full:'<path d="M9.500 2.500h4v4M6.500 13.500h-4v-4M13.500 2.500L9 7M2.500 13.500L7 9"/>',
 chevr:'<path d="M6 3.500L10.500 8 6 12.500"/>',
 cloud:'<path d="M5 12.5h6.5a2.5 2.5 0 0 0 .3-5A3.7 3.7 0 0 0 4.6 6.6 3 3 0 0 0 5 12.5z"/>'
};
const svg=(n,c)=>`<svg viewBox="0 0 16 16"${c?` class="${c}"`:""}>${IC[n]}</svg>`;
const PRIV=new URLSearchParams(location.search).has("private");
const PART=PRIV?"inprivate":"persist:www";
if(PRIV)document.body.classList.add("private");
const ENGINE="https://www.google.com/search?q=";
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const SC0=[["Convertio","https://convertio.co","convertio"],["Edifice","https://www.edifice.io","edifice"],["Espace inscrit","https://inscrits.cned.fr","cned"],["YouTube","https://www.youtube.com","youtube"],["Tinkercad","https://www.tinkercad.com","tinkercad"],["GitHub","https://github.com","github"],["Clinique Vétérinaire","https://www.google.com/search?q=clinique+vétérinaire","clinique"]].map(s=>({t:s[0],u:s[1],i:s[2]}));
let D={bm:[],hist:[],sc:SC0,bg:null,prof:null};
try{const r=localStorage.getItem("www2");if(r)D=Object.assign(D,JSON.parse(r))}catch(e){}
if(D.v!==3){const known=SC0.map(x=>x.t);D.sc=SC0.concat((D.sc||[]).filter(x=>!known.includes(x.t)&&x.t!=="Clinique Vétérinaire"&&!x.i));D.v=3;try{localStorage.setItem("www2",JSON.stringify(D))}catch(e){}}
const save=()=>{try{localStorage.setItem("www2",JSON.stringify(D))}catch(e){}};
let tabs=[],cur=null,nid=1,editing=false,temp=null;


/* arrière-plan */
const PRESETS={aurore:["Aurore","linear-gradient(160deg,#0b1d3a,#0f5e5a 45%,#6b3fa0 80%,#d46fa0)"],ocean:["Océan","linear-gradient(180deg,#0a3d62,#1e90c8 55%,#9fd8ef)"],foret:["Forêt","linear-gradient(180deg,#0f2a1d,#1f5c3b 55%,#7fb069)"],couchant:["Coucher de soleil","linear-gradient(180deg,#2b1055,#c0392b 55%,#f7b733)"],sombre:["Sombre","#14171c"]};
function applyBg(el){
  const b=D.bg;el.style.background="";el.classList.remove("photo");
  if(!b)return;
  if(b.k==="img")el.style.background=`url("${b.v}") center/cover no-repeat`;
  else if(PRESETS[b.v])el.style.background=PRESETS[b.v][1];
  el.classList.add("photo");
}
function pickImg(cb){const i=document.createElement("input");i.type="file";i.accept="image/*";
  i.onchange=()=>{const f=i.files[0];if(!f)return;const r=new FileReader();
    r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,1920/im.width);const c=document.createElement("canvas");
      c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",0.85))};im.src=r.result};
    r.readAsDataURL(f)};i.click()}

/* icônes fixes */
$("tabmenu").innerHTML=svg("chev");$("plus").innerHTML=svg("plus");
$("back").innerHTML=svg("back");$("fwd").innerHTML=svg("fwd");$("reload").innerHTML=svg("reload");
$("osearch").innerHTML=svg("search");$("ext").innerHTML=svg("ext");$("favs").innerHTML=svg("favs");$("more").innerHTML=svg("more");

/* onglets */
function mkTab(kind,url){
  const t={id:nid++,kind,title:kind==="web"?url:kind==="hist"?"Historique":kind==="dl"?"Téléchargements":"Nouvel onglet",icon:null};
  if(kind==="web"){
    const w=document.createElement("webview");w.setAttribute("partition",PART);w.src=url;w.setAttribute("allowpopups","");
    w.addEventListener("dom-ready",()=>{if(t.zoom&&t.zoom!==1){try{w.setZoomFactor(t.zoom)}catch(e){}}});
    w.addEventListener("page-title-updated",e=>{t.title=e.title;draw()});
    w.addEventListener("page-favicon-updated",e=>{t.icon=e.favicons[0];draw()});
    const upd=()=>{t.url=w.getURL();draw();if(cur===t)sync()};
    w.addEventListener("did-navigate",e=>{if(!PRIV){D.hist.unshift({u:e.url,d:Date.now()});D.hist=D.hist.slice(0,200);save()}upd()});
    w.addEventListener("found-in-page",e=>{if(cur===t)$("fc").textContent=e.result.matches?e.result.activeMatchOrdinal+"/"+e.result.matches:"0/0"});
    w.addEventListener("focus",()=>{if($("pop").className==="ctx")$("pop").style.display="none"});
    w.addEventListener("context-menu",e=>ctxMenu(t,w,e.params));
    w.addEventListener("did-navigate-in-page",upd);
    t.el=w;
  }else{const d=document.createElement("div");d.className="page "+(kind==="home"?"newtab":"");t.el=d;}
  $("main").appendChild(t.el);tabs.push(t);return t;
}
function newTab(kind,url){const t=mkTab(kind||"home",url);select(t);if(t.kind!=="web")fill(t);return t}
function select(t){closeSplit();closeFind();cur=t;tabs.forEach(x=>x.el.classList.toggle("on",x===t));$("pop").style.display="none";draw();sync()}
function closeTab(t){clearInterval(t._r);const i=tabs.indexOf(t);t.el.remove();tabs.splice(i,1);
  if(!tabs.length)return newTab("home");if(cur===t)select(tabs[Math.max(0,i-1)]);else draw()}
function draw(){
  $("tabs").innerHTML=tabs.map(t=>`<div class="tab ${t===cur?"on":""}" data-i="${t.id}">${t.icon?`<img src="${esc(t.icon)}">`:svg(t.kind==="web"?"search":"page","ti")}<span>${esc(t.title)}</span><b data-x="${t.id}">${svg("x")}</b></div>`).join("");
  document.querySelectorAll(".tab").forEach(e=>e.onmousedown=ev=>{
    const x=ev.target.closest("b");const t=tabs.find(z=>z.id==(x?x.dataset.x:e.dataset.i));
    if(ev.button===1||x)closeTab(t);else select(t)});
  fbar();
}
function sync(){
  const w=cur&&cur.kind==="web"?cur.el:null;
  $("back").disabled=!(w&&w.canGoBack&&w.canGoBack());
  $("fwd").disabled=!(w&&w.canGoForward&&w.canGoForward());
  $("url").value=w?(cur.url||""):"";
  const on=w&&D.bm.some(b=>b.u===cur.url);
  $("star").innerHTML=svg(on?"starf":"star");$("star").style.visibility=w?"visible":"hidden";
}
function toUrl(q){q=q.trim();if(!q)return null;
  if(/^https?:\/\//i.test(q))return q;
  if(/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(q))return "https://"+q;
  return ENGINE+encodeURIComponent(q)}
function open(q){const u=toUrl(q);if(!u)return;
  if(cur.kind==="web")return cur.el.loadURL(u);
  const old=cur,i=tabs.indexOf(old);const t=newTab("web",u);
  tabs.splice(tabs.indexOf(t),1);tabs.splice(i,0,t);closeTab(old);select(t)}

/* barre des favoris */
function fbar(){
  const right=`<span class="fi" id="others">${svg("folder")}Autres favoris</span>`;
  const left=D.bm.length
    ?D.bm.map((b,i)=>`<span class="fi" data-b="${i}" title="Clic droit : supprimer">${svg("star")}${esc(b.t)}</span>`).join("")+'<span class="grow"></span>'
    :`<span class="fi" id="imp">${svg("imp")}Importer les favoris</span><span class="sep"></span><span class="grow">Pour un accès rapide, placez vos favoris ici dans la barre des Favoris. <a id="manage">Gérer les favoris maintenant</a></span>`;
  $("fbar").innerHTML=`<span class="fi" id="appsb">${svg("apps")}</span>`+left+right;
  document.querySelectorAll("#fbar [data-b]").forEach(a=>{a.onclick=()=>open(D.bm[a.dataset.b].u);a.oncontextmenu=e=>{e.preventDefault();D.bm.splice(+a.dataset.b,1);save();draw();sync()}});
  const m=$("manage");if(m)m.onclick=()=>favPop($("favs"));
  const o=$("others");if(o)o.onclick=()=>favPop(o);
  const i=$("imp");if(i)i.onclick=()=>pop(i,'<div class="nt">L\'import depuis un autre navigateur n\'est pas encore disponible.</div>');
  $("appsb").onclick=()=>pop($("appsb"),D.sc.map((s,k)=>`<div class="it" data-u="${esc(s.u)}">${esc(s.t)}</div>`).join(""));
}

/* clic droit dans une page */
function ctxMenu(t,w,p){
  const r=w.getBoundingClientRect();const img=p.mediaType==="image"&&p.srcURL;const link=p.linkURL;
  const items=[];
  if(img){items.push(["ci","Copier l'image"],["cl","Copier le lien"],["sj","Enregistrer l'image en JPEG"],["sa","Enregistrer l'image sous"]);}
  else{
    if(link){items.push(["ol","Ouvrir le lien dans un nouvel onglet"],["cl","Copier le lien"]);}
    if(p.selectionText){items.push(["ct","Copier"]);}
    items.push(["bk","Retour"],["rl","Actualiser"]);
  }
  const m=$("pop");m.className="ctx";
  m.innerHTML=items.map(i=>`<div class="it" data-c="${i[0]}">${i[1]}</div>`).join("");
  m.style.display="block";m.style.right="auto";
  const x=Math.min(r.left+p.x,innerWidth-m.offsetWidth-6),y=Math.min(r.top+p.y,innerHeight-m.offsetHeight-6);
  m.style.left=Math.max(4,x)+"px";m.style.top=Math.max(4,y)+"px";
  m.querySelectorAll("[data-c]").forEach(e=>e.onclick=async()=>{m.style.display="none";const c=e.dataset.c;
    const id=w.getWebContentsId();
    if(c==="ci"){window.wwwApi.copyImage(id,p.x,p.y);toast("Image copiée")}
    else if(c==="cl"){window.wwwApi.copyText(link||p.srcURL);toast("Lien copié")}
    else if(c==="ct"){window.wwwApi.copyText(p.selectionText);toast("Copié")}
    else if(c==="ol"){newTab("web",link)}
    else if(c==="bk"){try{w.goBack()}catch(e){}}
    else if(c==="rl"){try{w.reload()}catch(e){}}
    else if(c==="sa"){const f=await window.wwwApi.saveImageAs({url:p.srcURL,part:PART});if(f)toast("Image enregistrée");else if(f===false)toast("Impossible d'enregistrer l'image")}
    else if(c==="sj"){const f=await window.wwwApi.saveImageJpeg({url:p.srcURL,part:PART,id,x:p.x,y:p.y});toast(f?"Image enregistrée en JPEG dans Téléchargements":"Impossible d'enregistrer l'image")}
  });
}

/* popups */
function pop(a,html,right,cls){const p=$("pop");p.className=cls||"";p.innerHTML=html;p.style.display="block";const r=a.getBoundingClientRect();p.style.top=r.bottom+4+"px";
  if(right){p.style.left="auto";p.style.right=Math.max(4,innerWidth-r.right)+"px"}else{p.style.right="auto";p.style.left=Math.min(r.left,innerWidth-260)+"px"}
  p.querySelectorAll("[data-u]").forEach(e=>e.onclick=()=>{p.style.display="none";open(e.dataset.u)});return p}
document.addEventListener("mousedown",e=>{if(!e.target.closest("#pop")&&!e.target.closest("[data-pop]")&&!e.target.closest("#fbar"))$("pop").style.display="none"});
function favPop(a){pop(a,D.bm.map(b=>`<div class="it" data-u="${esc(b.u)}">${svg("star")}${esc(b.t)}</div>`).join("")||'<div class="nt">Aucun favori pour le moment. Cliquez sur ☆ dans la barre d\'adresse.</div>',true)}
$("favs").onclick=()=>favPop($("favs"));
$("tabmenu").onclick=()=>{const p=pop($("tabmenu"),tabs.map(t=>`<div class="it" data-t="${t.id}">${esc(t.title)}</div>`).join(""));
  p.querySelectorAll("[data-t]").forEach(e=>e.onclick=()=>select(tabs.find(t=>t.id==e.dataset.t)))};
$("ext").onclick=()=>pop($("ext"),'<div class="nt">Aucune extension installée.</div>',true);
const PROV={google:{n:"Google",acct:"https://myaccount.google.com",c:"#4285f4"},microsoft:{n:"Microsoft",acct:"https://account.microsoft.com",c:"#00a4ef"}};
function drawProf(){const b=$("prof"),p=D.prof;
  b.innerHTML=p&&p.photo?`<img src="${esc(p.photo)}">`:p&&p.name?esc(p.name[0].toUpperCase()):svg("person");
  b.title=p&&p.name?p.name:"Se connecter"}
function avatarHtml(p){return p.photo?`<img class="pp" src="${esc(p.photo)}">`:`<div class="pp">${esc((p.name||"?")[0].toUpperCase())}</div>`}
$("prof").onclick=()=>{
  const a=$("prof"),pr=D.prof;
  if(pr&&pr.name){const v=PROV[pr.prov];
    const p=pop(a,`<div class="pcard">${avatarHtml(pr)}<div><b>${esc(pr.name)}</b>${pr.email?`<br><span class="mut">${esc(pr.email)}</span>`:""}</div></div><div class="nt">Service de connexion : <b style="color:${v.c}">${v.n}</b></div><div class="it" data-u="${v.acct}">Gérer mon compte ${v.n}</div><div class="it" data-a="out">Se déconnecter</div>`,true);
    p.querySelector("[data-a=out]").onclick=async()=>{try{await window.wwwApi.logout()}catch(e){}D.prof=null;save();drawProf();p.style.display="none"};
  }else{
    const p=pop(a,`<div class="nt">Connectez-vous pour afficher votre photo et votre adresse e-mail.</div><div class="it" data-a="google"><span style="color:#4285f4;font-weight:700">G</span>Continuer avec Google</div><div class="it" data-a="microsoft"><span style="color:#00a4ef;font-weight:700">M</span>Continuer avec Microsoft</div>`,true);
    p.querySelectorAll("[data-a]").forEach(x=>x.onclick=async()=>{const k=x.dataset.a,v=PROV[k];
      const q=pop(a,`<div class="nt">Connexion ${v.n} en cours… terminez dans la page qui s'est ouverte dans votre navigateur.</div>`,true);
      let r;try{r=await window.wwwApi.login(k)}catch(e){r={error:"reseau"}}
      if(r&&!r.error){D.prof=r;save();drawProf();q.style.display="none";return}
      const msg={config:`La connexion ${v.n} n'est pas encore configurée. Suivez la section « Connexion Google / Microsoft » du fichier README.md, puis relancez l'appli.`,annule:"Connexion annulée ou expirée.",jeton:"Le service a refusé la connexion. Vérifiez les identifiants dans oauth.json.",reseau:"Connexion impossible. Vérifiez votre accès internet."}[r&&r.error]||"Erreur de connexion.";
      pop(a,`<div class="nt">${esc(msg)}</div>`,true)})
  }};
drawProf();
/* menu « ... » */
const row=(ic,lb,sc,a,x)=>`<div class="mi ${x||""}" data-a="${a}">${svg(ic)}<span class="ml">${lb}</span>${x==="sub"?svg("chevr"):sc?`<span class="ms">${sc}</span>`:""}</div>`;
const msep='<div class="msep"></div>';
function toast(m){const d=document.createElement("div");d.className="toast";d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3500)}
const zoomOf=()=>cur.zoom||1;
const ZS=[.25,.33,.5,.67,.75,.8,.9,1,1.1,1.25,1.5,1.75,2,2.5,3,4,5];
function applyZoom(t){const z=t.zoom||1;if(t.kind==="web"){try{t.el.setZoomFactor(z)}catch(e){}}else t.el.style.zoom=z}
function zoomBy(d){const z=zoomOf();const n=d>0?ZS.find(x=>x>z+1e-6):[...ZS].reverse().find(x=>x<z-1e-6);if(!n)return;cur.zoom=n;applyZoom(cur)}
function doPrint(){if(cur.kind==="web"){try{cur.el.print()}catch(e){}}else window.print()}
async function doCapture(){let id=null;try{if(cur.kind==="web")id=cur.el.getWebContentsId()}catch(e){}
  try{const f=await window.wwwApi.capture(id);toast("Capture enregistrée dans Téléchargements : "+f.split("\\").pop())}catch(e){toast("Capture impossible.")}}
function openFind(){if(cur.kind!=="web")return;$("findbar").style.display="flex";$("fi").focus();$("fi").select()}
function closeFind(){const f=$("findbar");if(f.style.display==="flex"){f.style.display="none";try{if(cur&&cur.kind==="web")cur.el.stopFindInPage("clearSelection")}catch(e){}}}
function findNext(fw){const v=$("fi").value;if(v&&cur.kind==="web")cur.el.findInText(v,{forward:fw,findNext:true})}
$("fi").oninput=()=>{const v=$("fi").value;if(cur.kind!=="web")return;if(v)cur.el.findInText(v);else{cur.el.stopFindInPage("clearSelection");$("fc").textContent=""}};
$("fi").onkeydown=e=>{if(e.key==="Enter")findNext(!e.shiftKey);if(e.key==="Escape")closeFind()};
$("fprev").onclick=()=>findNext(false);$("fnext").onclick=()=>findNext(true);$("fclose").onclick=closeFind;
let splitEl=null,splitBtn=null;
function closeSplit(){if(splitEl){splitEl.remove();splitBtn.remove();splitEl=splitBtn=null}$("main").classList.remove("splitting")}
function toggleSplit(){if(splitEl)return closeSplit();if(cur.kind!=="web")return toast("Ouvrez d'abord une page web.");
  const w=document.createElement("webview");w.setAttribute("partition",PART);w.setAttribute("allowpopups","");w.src=cur.url||"https://www.google.com";w.className="split on";
  splitBtn=document.createElement("button");splitBtn.className="splitx";splitBtn.textContent="✕ Fermer";splitBtn.onclick=closeSplit;
  $("main").append(w,splitBtn);$("main").classList.add("splitting");splitEl=w}
function menuMain(){
  const z=Math.round(zoomOf()*100);
  const p=pop($("more"),
    row("page","Nouvel onglet","Ctrl+T","nt")+row("win","Nouvelle fenêtre","Ctrl+N","nw")+row("priv","Nouvelle fenêtre InPrivate","Ctrl+Maj+N","np")+msep+
    `<div class="mi zoom">${svg("zoom")}<span class="ml">Zoom</span><span class="zc"><b data-a="zo">−</b><span id="zv">${z} %</span><b data-a="zi">+</b></span><b class="zf" data-a="full">${svg("full")}</b></div>`+msep+
    row("favs","Favoris","Ctrl+Maj+O","fav")+row("clock","Historique","Ctrl+H","hist")+row("tabs","Groupes d'onglets","","tg","sub")+row("dl","Téléchargements","Ctrl+J","dl")+row("ext","Extensions","","ex","sub")+msep+
    row("trash","Supprimer les données de navigation","Ctrl+Maj+Suppr","clr")+row("print","Imprimer","Ctrl+P","print")+row("trans","Traduire","","tr","off")+row("split","Écran fractionné","","split")+row("cam","Capture d'écran","Ctrl+Maj+S","cap")+row("search","Rechercher sur la page","Ctrl+F","find")+row("tools","Outils supplémentaires","","tools","sub")+msep+row("x","Fermer World Wide Web","","quit"),
    true,"menu");
  bindMenu(p)}
function subMenu(title,rows){const p=pop($("more"),`<div class="mi" data-a="back">${svg("back")}<span class="ml">${title}</span></div>${msep}${rows}`,true,"menu");bindMenu(p)}
function bindMenu(p){p.querySelectorAll("[data-a]").forEach(e=>e.onclick=ev=>{ev.stopPropagation();menuAct(e.dataset.a,p)})}
function askClear(){const p=pop($("more"),`<div class="nt">Supprimer l'historique, les cookies et le cache ? Vous serez déconnecté des sites visités.</div><div class="mi" data-a="clr-ok">${svg("trash")}<span class="ml">Supprimer maintenant</span></div><div class="mi" data-a="back">${svg("back")}<span class="ml">Annuler</span></div>`,true,"menu");bindMenu(p)}
async function menuAct(a,p){
  const hide=()=>{$("pop").style.display="none"};
  switch(a){
    case"nt":hide();newTab("home");break;
    case"nw":hide();window.wwwApi.newWindow(false);break;
    case"np":hide();window.wwwApi.newWindow(true);break;
    case"zi":case"zo":zoomBy(a==="zi"?.1:-.1);$("zv").textContent=Math.round(zoomOf()*100)+" %";break;
    case"full":hide();window.wwwApi.fullscreen();break;
    case"fav":favPop($("favs"));break;
    case"hist":hide();newTab("hist");break;
    case"dl":hide();newTab("dl");break;
    case"tg":subMenu("Groupes d'onglets",row("x","Fermer les autres onglets","","cto")+row("x","Fermer les onglets à droite","","ctr")+row("page","Dupliquer l'onglet","","dup"));break;
    case"cto":hide();tabs.filter(t=>t!==cur).forEach(t=>{t.el.remove();clearInterval(t._r)});tabs=[cur];draw();break;
    case"ctr":{hide();const i=tabs.indexOf(cur);tabs.slice(i+1).forEach(t=>{t.el.remove();clearInterval(t._r)});tabs=tabs.slice(0,i+1);draw();break}
    case"dup":hide();if(cur.kind==="web")newTab("web",cur.url);else newTab(cur.kind);break;
    case"ex":subMenu("Extensions",'<div class="nt">Aucune extension installée.</div>');break;
    case"clr":askClear();break;
    case"clr-ok":hide();try{await window.wwwApi.clearData()}catch(e){}D.hist=[];save();toast("Données de navigation supprimées.");break;
    case"print":hide();doPrint();break;
    case"split":hide();toggleSplit();break;
    case"cap":hide();setTimeout(doCapture,150);break;
    case"find":hide();openFind();break;
    case"tools":subMenu("Outils supplémentaires",row("full","Plein écran","F11","full")+row("tools","Outils de développement","F12","dev")+row("reload","Actualiser la page","F5","rel"));break;
    case"dev":hide();if(cur.kind==="web")cur.el.openDevTools();break;
    case"rel":hide();if(cur.kind==="web")cur.el.reload();break;
    case"back":menuMain();break;
    case"quit":window.close();break;
  }}
$("more").onclick=menuMain;
$("conv").onclick=()=>newTab("web","https://copilot.microsoft.com");

/* pages internes */
function fill(t){
  if(t.kind==="home"){
    const el=t.el;
    const tiles=D.sc.map((s,i)=>`<div class="tile" data-u="${esc(s.u)}"><div class="ic">${s.i?`<img src="icons/${s.i}.png">`:esc(s.t[0])}</div><div class="lb">${esc(s.t)}</div><div class="rm" data-r="${i}">✕</div></div>`).join("")
      +`<div class="tile" id="addsc"><div class="ic">${svg("plus")}</div><div class="lb">Ajouter un raccourci</div></div>`;
    el.innerHTML=`<div class="nt-apps">${"<i></i>".repeat(9)}</div>
    <div class="nt-top"><div class="w">Ceyreste <svg viewBox="0 0 34 34"><circle cx="13" cy="13" r="7.5" fill="#f6a623"/><path d="M10 27h15a5 5 0 0 0 .6-10 7.4 7.4 0 0 0-14.3-1.2A6 6 0 0 0 10 27z" fill="#e6edf9"/></svg><span id="tmp">${temp===null?"":temp+"°C"}</span></div><div class="pen" id="pen">${svg("pen")}</div></div>
    <form class="nt-search" id="nts">${svg("search")}<input id="ntq" placeholder="Rechercher sur le Web" autocomplete="off"></form>
    <div class="tiles ${editing?"editing":""}">${tiles}</div>
    <div class="nt-acc">Accessibilité : partiellement conforme</div>`;
    el.querySelector("#nts").onsubmit=e=>{e.preventDefault();open(el.querySelector("#ntq").value)};
    el.querySelectorAll(".tile[data-u]").forEach(x=>x.onclick=e=>{if(e.target.dataset.r!==undefined)return;open(x.dataset.u)});
    el.querySelectorAll("[data-r]").forEach(x=>x.onclick=e=>{e.stopPropagation();D.sc.splice(+x.dataset.r,1);save();fill(t)});
    applyBg(el);
    el.querySelector("#pen").onclick=()=>{
      const pr=Object.keys(PRESETS).map(k=>`<div class="it" data-p="${k}">Fond : ${PRESETS[k][0]}</div>`).join("");
      const p=pop(el.querySelector("#pen"),`<div class="it" data-a="img">${svg("pen")}Choisir une image sur mon PC…</div>${pr}<div class="it" data-a="reset">Rétablir l'arrière-plan d'origine</div><div class="it" data-a="edit">${editing?"Terminer la modification des raccourcis":"Modifier les raccourcis"}</div>`,true);
      p.querySelectorAll("[data-p]").forEach(x=>x.onclick=()=>{D.bg={k:"preset",v:x.dataset.p};save();p.style.display="none";applyBg(el)});
      p.querySelectorAll("[data-a]").forEach(x=>x.onclick=()=>{const a=x.dataset.a;p.style.display="none";
        if(a==="img")pickImg(v=>{D.bg={k:"img",v};save();applyBg(el)});
        if(a==="reset"){D.bg=null;save();applyBg(el)}
        if(a==="edit"){editing=!editing;fill(t)}})};
    el.querySelector("#addsc").onclick=()=>{const p=pop(el.querySelector("#addsc"),'<input id="sn" placeholder="Nom"><input id="su" placeholder="Adresse (ex : youtube.com)"><button class="ok" id="sok">Ajouter</button>');
      p.querySelector("#sok").onclick=()=>{const n=p.querySelector("#sn").value.trim(),u=toUrl(p.querySelector("#su").value);
        if(n&&u&&!u.startsWith(ENGINE)){D.sc.push({t:n,u});save();p.style.display="none";fill(t)}}};
    el.querySelector(".nt-apps").onclick=()=>$("appsb").click();
    el.querySelector("#ntq").focus();
    if(temp===null)loadTemp();
  }else if(t.kind==="dl"){
    const render=async()=>{let L=[];try{L=await window.wwwApi.downloads()}catch(e){}
      t.el.innerHTML=`<div class="doc"><h1>Téléchargements</h1>${L.map((d,i)=>`<div class="row"><span data-o="${i}">${esc(d.name)}</span><span class="mut">${esc(d.state)} · <a data-s="${i}" style="cursor:pointer;color:#a23b3b">Afficher dans le dossier</a></span></div>`).join("")||'<p class="mut">Aucun téléchargement.</p>'}</div>`;
      t.el.querySelectorAll("[data-o]").forEach(x=>x.onclick=()=>window.wwwApi.openItem(L[x.dataset.o].path));
      t.el.querySelectorAll("[data-s]").forEach(x=>x.onclick=()=>window.wwwApi.showItem(L[x.dataset.s].path))};
    render();t._r=setInterval(()=>{if(cur===t)render()},2500);
  }else if(t.kind==="hist"){
    t.el.innerHTML=`<div class="doc"><h1>Historique</h1>${D.hist.map(h=>`<div class="row"><span data-u="${esc(h.u)}">${esc(h.u)}</span><span class="mut">${new Date(h.d).toLocaleString("fr-FR")}</span></div>`).join("")||'<p class="mut">Vide.</p>'}</div>`;
    t.el.querySelectorAll("[data-u]").forEach(x=>x.onclick=()=>open(x.dataset.u));
  }
}
async function loadTemp(){try{const r=await fetch("https://api.open-meteo.com/v1/forecast?latitude=43.2&longitude=5.55&current=temperature_2m");
  const j=await r.json();temp=Math.round(j.current.temperature_2m);const e=$("tmp");if(e)e.textContent=temp+"°C"}catch(e){}}

/* commandes */
$("url").onkeydown=e=>{if(e.key==="Enter")open(e.target.value)};
$("url").onfocus=e=>e.target.select();
$("back").onclick=()=>cur.el.goBack();
$("fwd").onclick=()=>cur.el.goForward();
$("reload").onclick=()=>{if(cur.kind==="web")cur.el.reload()};
$("plus").onclick=()=>newTab("home");
$("star").onclick=()=>{if(cur.kind!=="web")return;const i=D.bm.findIndex(b=>b.u===cur.url);
  if(i>=0)D.bm.splice(i,1);else D.bm.push({t:(cur.title||cur.url).slice(0,24),u:cur.url});save();draw();sync()};
function shortcut(c){switch(c){
  case"ctrl+t":newTab("home");break;case"ctrl+w":closeTab(cur);break;
  case"ctrl+n":window.wwwApi.newWindow(false);break;case"ctrl+shift+n":window.wwwApi.newWindow(true);break;
  case"ctrl+h":newTab("hist");break;case"ctrl+j":newTab("dl");break;
  case"ctrl+p":doPrint();break;case"ctrl+f":openFind();break;case"ctrl+l":$("url").focus();break;
  case"ctrl+shift+s":doCapture();break;case"ctrl+shift+o":favPop($("favs"));break;case"ctrl+shift+Delete":askClear();break;
  case"ctrl++":case"ctrl+=":zoomBy(.1);break;case"ctrl+-":zoomBy(-.1);break;
  case"ctrl+0":cur.zoom=1;applyZoom(cur);break;
  case"F11":window.wwwApi.fullscreen();break;case"F12":if(cur.kind==="web")cur.el.openDevTools();break}}
document.addEventListener("keydown",e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;let c=null;
  if(e.ctrlKey&&!e.shiftKey&&["t","w","n","h","j","p","f","l","+","=","-","0"].includes(k))c="ctrl+"+k;
  else if(e.ctrlKey&&e.shiftKey&&["n","s","o","Delete"].includes(k))c="ctrl+shift+"+k;
  else if(k==="F11"||k==="F12")c=k;
  if(c){e.preventDefault();shortcut(c)}
  if(e.key==="F5"&&cur.kind==="web")cur.el.reload()});
if(window.wwwApi&&window.wwwApi.onShortcut)window.wwwApi.onShortcut(shortcut);
if(window.wwwApi)window.wwwApi.onOpenUrl(u=>newTab("web",u));
newTab("home");
