(function(){"use strict"
var DEBUG=false
var MOVE_STOCK=true
var SHOW_STOCK_BADGE=false
var COLLAPSE_ZIP=false
var PICKUP={enabled:true,weekday:"16:00",saturday:"11:30",sunday:null}
var ETA={enabled:true,label:"Várható szállítás",inStockDays:4,orderableDays:9,cutoff:"16:00",saturdayCounts:false,override:{}}
var DAY_NAMES=["vasárnap","hétfőn","kedden","szerdán","csütörtökön","pénteken","szombaton"]
var DAY_PLAIN=["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"]
var MONTHS=["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"]
var FEE_ROW=true
var FEES=[{re:"Csomagolási\\s+(?:díj|költség)",title:"Csomagolási költség"},{re:"Logisztikai\\s+díj",title:"Logisztikai díj"}]
var FEE_NOTES={unknown:"csak futáros és raklapos szállításnál",out:"futáros és raklapos szállításnál",courier:"futáros szállításnál",small:"futáros szállításnál",own:null}
var FEE_ALL={note:"minden kiszállítási módnál, személyes átvételnél nincs",skus:["32082","35058","32004","36701_140","04507_150","32005","32006","32007","32009","40055","18813"]}
var FEE_OFF=["01229","29383","01230","30577","24574","16266","04092","24578","24580"]
var ZONE_TEXT={courier:/futárszolgálattal küldjük/i,small:/10\s*kg/i}
var FEE_ID="bba-fee"
var WRAP_ID="bba-buybox"
var MOVE_IDS=["artdet__warehouses","bb-zip-artdet","artdet__service-plus",FEE_ID]
var BADGES=[{re:/Nincs raktáron/,cls:"bba-stock-badge--no-stock"},{re:/Elfogyott/,cls:"bba-stock-badge--no-stock"},{re:/Rendelhető/,cls:"bba-stock-badge--to-order"},{re:/Raktáron/,cls:"bba-stock-badge--in-stock"},{re:/Készleten/,cls:"bba-stock-badge--in-stock"}]
var MAX_RUNS=25
var runs=0
var zipOpen=false
function log(){if(!DEBUG||!window.console)return
var args=Array.prototype.slice.call(arguments)
args.unshift("[bba]")
console.log.apply(console,args)}function scope(){return document.querySelector("#page_artdet_content .artdet__data-right-inner")}function pick(id){var root=scope()
if(!root)return null
var el=document.getElementById(id)
return el&&root.contains(el)?el:null}function toMinutes(hhmm){var p=String(hhmm).split(":")
return parseInt(p[0],10)*60+parseInt(p[1],10)}function isInStock(){var s=scope()
if(s&&s.querySelector(".artdet__stock.on-stock"))return true
var wh=pick("artdet__warehouses")
var t=wh?wh.textContent||"":""
if(/Nincs raktáron|Elfogyott/i.test(t))return false
return/Raktáron|Készleten/.test(t)}function buildWrap(){var inner=document.querySelector("#page_artdet_content .artdet__block-right-inner")
if(!inner)return
var wrap=document.getElementById(WRAP_ID)
if(!wrap){wrap=document.createElement("div")
wrap.id=WRAP_ID
wrap.className="bba-buybox"
inner.appendChild(wrap)
log("keret letrehozva")}var want=[]
MOVE_IDS.forEach((function(id){var el=pick(id)
if(el)want.push(el)}))
var kids=[]
for(var k=0;k<wrap.children.length;k++){if(wrap.children[k].className.indexOf("bba-eta")===-1){kids.push(wrap.children[k])}}var same=kids.length===want.length
if(same){for(var i=0;i<want.length;i++){if(kids[i]!==want[i]){same=false
break}}}if(!same){want.forEach((function(el){wrap.appendChild(el)}))
log("dobozok berendezve:",want.length)}wrap.style.display=want.length?"":"none"}function moveStock(){if(!MOVE_STOCK)return
var inner=document.querySelector("#page_artdet_content .artdet__block-right-inner")
var cart=pick("artdet__cart")
var root=scope()
if(!inner||!cart||!root)return
var stock=root.querySelector(".artdet__stock")
if(!stock||stock.parentNode===inner)return
inner.insertBefore(stock,cart)
log("keszletjelzes athelyezve")}function markWarehouseMode(){var root=pick("artdet__warehouses")
if(!root)return
root.classList.toggle("bba-wh--lead",!isInStock())}function decorateStock(){if(!SHOW_STOCK_BADGE)return
var root=pick("artdet__warehouses")
if(!root)return
var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null)
var hits=[]
var node
while(node=walker.nextNode()){if(!node.nodeValue||!node.nodeValue.trim())continue
var parent=node.parentNode
var pcls=parent&&parent.className?String(parent.className):""
if(pcls.indexOf("bba-stock-badge")!==-1)continue
for(var i=0;i<BADGES.length;i++){var m=node.nodeValue.match(BADGES[i].re)
if(m){hits.push({node:node,at:m.index,text:m[0],cls:BADGES[i].cls})
break}}}if(!hits.length)return
hits.forEach((function(hit){var rest=hit.node.splitText(hit.at)
rest.splitText(hit.text.length)
var span=document.createElement("span")
span.className=hit.cls
span.textContent=hit.text
rest.parentNode.replaceChild(span,rest)}))
log("badge:",hits.length)}function cutoffFor(day){if(day===0)return PICKUP.sunday
if(day===6)return PICKUP.saturday
return PICKUP.weekday}function closedDay(d){return!!holidays(d.getFullYear())[dayKey(d)]}function pickupText(){var now=new Date
var day=now.getDay()
var mins=now.getHours()*60+now.getMinutes()
var today=cutoffFor(day)
if(today&&mins<toMinutes(today)&&!closedDay(now)){return"Személyesen ma "+today+"-ig átvehető"}for(var i=1;i<=8;i++){var next=(day+i)%7
var cut=cutoffFor(next)
var date=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i)
if(cut&&!closedDay(date)){return"Személyesen "+DAY_NAMES[next]+" "+cut+"-ig átvehető"}}return null}function addPickup(){if(!PICKUP.enabled)return
var root=pick("artdet__warehouses")
if(!root)return
var line=root.querySelector(".bba-pickup")
if(!isInStock()){if(line&&line.parentNode)line.parentNode.removeChild(line)
return}var text=pickupText()
if(!text)return
if(line&&line.textContent===text)return
if(!line){line=document.createElement("div")
line.className="bba-pickup"
root.appendChild(line)}line.textContent=text
log("atveteli sor:",text)}function applyZipState(box,btn){if(zipOpen){box.classList.remove("bba-zip-collapsed")
btn.textContent="Kevesebb"}else{box.classList.add("bba-zip-collapsed")
btn.textContent="Szállítási részletek"}}function collapseZip(){var box=pick("bb-zip-artdet")
if(!box)return
if(!COLLAPSE_ZIP){box.classList.remove("bba-zip-collapsed")
var old=box.querySelectorAll(".bba-more")
for(var k=0;k<old.length;k++)old[k].parentNode.removeChild(old[k])
var l=box.querySelector(".bb-zip__list")
if(l)l.removeAttribute("data-bba-collapsed")
return}var list=box.querySelector(".bb-zip__list")
if(!list)return
if(list.children.length<3)return
var btn=box.querySelector(".bba-more")
if(btn&&list.getAttribute("data-bba-collapsed")==="1"){applyZipState(box,btn)
return}list.setAttribute("data-bba-collapsed","1")
if(btn&&btn.parentNode)btn.parentNode.removeChild(btn)
btn=document.createElement("button")
btn.type="button"
btn.className="bba-more"
btn.addEventListener("click",(function(e){e.preventDefault()
e.stopPropagation()
zipOpen=!zipOpen
applyZipState(box,btn)}))
list.parentNode.insertBefore(btn,list.nextSibling)
applyZipState(box,btn)
log("lenyilo felepitve")}function easter(y){var a=y%19,b=Math.floor(y/100),c=y%100
var d=Math.floor(b/4),e=b%4
var f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3)
var h=(19*a+b-d-g+15)%30
var i=Math.floor(c/4),k=c%4
var l=(32+2*e+2*i-h-k)%7
var m=Math.floor((a+11*h+22*l)/451)
var month=Math.floor((h+l-7*m+114)/31)
var day=(h+l-7*m+114)%31+1
return new Date(y,month-1,day)}function dayKey(d){return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}var holidayCache={}
function holidays(year){if(holidayCache[year])return holidayCache[year]
var set={}
var fixed=[ [0,1],[2,15],[4,1],[7,20],[9,23],[10,1],[11,24],[11,25],[11,26] ]
for(var i=0;i<fixed.length;i++){set[dayKey(new Date(year,fixed[i][0],fixed[i][1]))]=true}var e=easter(year)
var offsets=[-2,1,50]
for(var j=0;j<offsets.length;j++){var d=new Date(e.getTime())
d.setDate(d.getDate()+offsets[j])
set[dayKey(d)]=true}holidayCache[year]=set
return set}function isWorkday(d){var wd=d.getDay()
if(wd===0)return false
if(wd===6&&!ETA.saturdayCounts)return false
return!holidays(d.getFullYear())[dayKey(d)]}function addWorkdays(from,n){var d=new Date(from.getTime())
var left=n
var guard=0
while(left>0&&guard<400){guard++
d.setDate(d.getDate()+1)
if(isWorkday(d))left--}return d}function formatDate(d){return d.getFullYear()+". "+MONTHS[d.getMonth()]+" "+d.getDate()+". ("+DAY_PLAIN[d.getDay()]+")"}function sku(){var el=document.querySelector("#page_artdet_content .artdet__sku")
if(el){var m=(el.textContent||"").match(/([A-Za-z0-9_\-]{3,})\s*$/)
if(m)return m[1]}var fav=document.querySelector('[class*="page_artdet_func_favourites_"]')
if(fav){var f=String(fav.className).match(/page_artdet_func_favourites_([A-Za-z0-9_\-]+)/)
if(f)return f[1].replace(/__unas__/g,"-")}return null}function leadDays(){var code=sku()
if(code&&ETA.override[code])return ETA.override[code]
var wh=pick("artdet__warehouses")
var text=wh?wh.textContent||"":""
if(text.indexOf("érdeklőd")!==-1)return null
return isInStock()?ETA.inStockDays:ETA.orderableDays}function noShipping(){var adat=window.BB_SZALL_TILT,code=sku()
if(!adat||!code)return false
return["x","l"].some((function(k){return typeof adat[k]==="string"&&("|"+adat[k]+"|").indexOf("|"+code+"|")!==-1}))}function addEta(){if(!ETA.enabled)return
var wrap=document.getElementById(WRAP_ID)
if(!wrap)return
var row=wrap.querySelector(".bba-eta")
var days=noShipping()?0:leadDays()
if(!days){if(row&&row.parentNode)row.parentNode.removeChild(row)
return}var now=new Date
var mins=now.getHours()*60+now.getMinutes()
var base=new Date(now.getFullYear(),now.getMonth(),now.getDate())
if(mins>=toMinutes(ETA.cutoff))base.setDate(base.getDate()+1)
var text=formatDate(addWorkdays(base,days))
if(row&&row.getAttribute("data-bba-eta")===text)return
if(!row){row=document.createElement("div")
row.className="bba-eta"}if(row.parentNode!==wrap||wrap.firstChild!==row){wrap.insertBefore(row,wrap.firstChild)}row.setAttribute("data-bba-eta",text)
while(row.firstChild)row.removeChild(row.firstChild)
var lab=document.createElement("span")
lab.className="bba-eta__label"
lab.textContent=ETA.label
var val=document.createElement("span")
val.className="bba-eta__value"
val.textContent=text
row.appendChild(lab)
row.appendChild(val)
log("varhato szallitas:",text,"("+days+" munkanap)")}var FEE_SKIP="#"+WRAP_ID+", #"+FEE_ID+", #artdet__service-plus, .bb-lapozo, script, style, noscript"
var feesFound=null
function feeSkipped(el){while(el&&el.nodeType===1){if(el.matches&&el.matches(FEE_SKIP))return true
el=el.parentNode}return false}function formatFt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")}function findFees(){if(feesFound)return feesFound
var root=document.getElementById("page_artdet_content")
if(!root)return[]
var labels=FEES.map((function(f){return new RegExp(f.re,"i")}))
var full=FEES.map((function(f){return new RegExp(f.re+"\\s*:?[^0-9]{0,90}?(?:br\\.?|bruttó)?\\s*([0-9][0-9 .\\u00a0\\u202f]*)\\s*Ft","i")}))
var hits=[]
var done={}
var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null)
var node
while(node=walker.nextNode()){var v=node.nodeValue
if(!v||v.length<8)continue
for(var i=0;i<FEES.length;i++){if(done[i]||!labels[i].test(v))continue
if(feeSkipped(node.parentNode))break
var el=node.parentNode
for(var up=0;up<4&&el&&el!==root;up++){var text=(el.textContent||"").replace(/\s+/g," ")
if(text.length>600)break
var m=text.match(full[i])
if(m){var amount=parseInt(m[1].replace(/[^0-9]/g,""),10)
if(amount>0){done[i]=true
hits.push({fee:FEES[i],amount:amount})
log("dij megtalalva:",FEES[i].title,amount)}break}el=el.parentNode}}}if(hits.length)feesFound=hits
return hits}function zoneState(){var box=pick("bb-zip-artdet")
if(!box)return"unknown"
var cls=" "+(box.className||"")+" "
if(cls.indexOf(" bb-zip--out ")!==-1)return"out"
if(cls.indexOf(" bb-zip--in ")===-1)return"unknown"
var t=box.textContent||""
if(ZONE_TEXT.courier.test(t))return"courier"
if(ZONE_TEXT.small.test(t))return"small"
return"own"}function feeOnAllModes(){var code=sku()
return!!code&&FEE_ALL.skus.indexOf(code)!==-1}function feeStyle(){if(document.getElementById("bba-fee-style"))return
var icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' "+"viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='1.8' stroke-linecap='round' "+"stroke-linejoin='round'><path d='M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z'/><path d='M12 12l8-4.5'/>"+"<path d='M12 12v9'/><path d='M12 12L4 7.5'/></svg>"
var st=document.createElement("style")
st.id="bba-fee-style"
st.textContent="#bba-fee{margin:0;border-top:1px solid #e5e7eb;}"+"#bba-buybox>#bba-fee:first-child{border-top:0;}"+"#bba-fee .bba-fee__item{position:relative;padding:16px 0 16px 34px;font-size:14px;"+"line-height:1.5;color:#1f2433;}"+"#bba-fee .bba-fee__item+.bba-fee__item{padding-top:0;}"+"#bba-fee .bba-fee__item::before{content:'';position:absolute;left:0;top:17px;width:20px;"+'height:20px;background:url("'+icon+'") no-repeat center/contain;}'+"#bba-fee .bba-fee__item+.bba-fee__item::before{top:1px;}"+"#bba-fee .bba-fee__title{display:block;font-weight:600;line-height:1.4;}"+"#bba-fee .bba-fee__price{display:block;margin-top:2px;color:#4b5563;font-size:13px;}"+"#bba-fee .bba-fee__note{display:block;color:#6b7280;font-size:12px;line-height:1.4;}"
document.head.appendChild(st)}function renderFees(){if(!FEE_ROW)return
var code=sku()
if(code&&FEE_OFF.indexOf(code)!==-1){var old=pick(FEE_ID)||document.getElementById(FEE_ID)
if(old&&old.parentNode)old.parentNode.removeChild(old)
return}var fees=findFees()
if(!fees.length)return
var row=pick(FEE_ID)
if(!row){var inner=document.querySelector("#page_artdet_content .artdet__block-right-inner")
if(!inner)return
feeStyle()
row=document.createElement("div")
row.id=FEE_ID
fees.forEach((function(f){var item=document.createElement("div")
item.className="bba-fee__item"
var title=document.createElement("span")
title.className="bba-fee__title"
title.textContent=f.fee.title
var price=document.createElement("span")
price.className="bba-fee__price"
price.textContent="+"+formatFt(f.amount)+" Ft / db"
var note=document.createElement("span")
note.className="bba-fee__note"
item.appendChild(title)
item.appendChild(price)
item.appendChild(note)
row.appendChild(item)}))
inner.appendChild(row)
log("dij sor letrehozva:",fees.length)}var state=zoneState()
var noteText=feeOnAllModes()?FEE_ALL.note:FEE_NOTES.hasOwnProperty(state)?FEE_NOTES[state]:FEE_NOTES.unknown
var hide=noteText===null
var disp=hide?"none":""
if(row.style.display!==disp)row.style.display=disp
if(!hide){var notes=row.querySelectorAll(".bba-fee__note")
for(var i=0;i<notes.length;i++){if(notes[i].textContent!==noteText)notes[i].textContent=noteText}}log("dij allapot:",state,hide?"(rejtve)":noteText)}function run(why){if(!document.getElementById("page_artdet_content"))return
if(runs>=MAX_RUNS){log("elerte a futaskorlatot, leall")
return}runs++
log("futas #"+runs,why||"")
var steps=[ ["renderFees",renderFees],["buildWrap",buildWrap],["moveStock",moveStock],["markWarehouseMode",markWarehouseMode],["decorateStock",decorateStock],["addPickup",addPickup],["addEta",addEta],["collapseZip",collapseZip] ]
for(var i=0;i<steps.length;i++){try{steps[i][1]()}catch(err){if(window.console){console.error("[bba] hiba a(z) "+steps[i][0]+" lepesben:",err)}}}}function zipRefresh(){var steps=[renderFees,buildWrap,collapseZip]
for(var i=0;i<steps.length;i++){try{steps[i]()}catch(err){if(window.console)console.error("[bba] hiba (zipRefresh):",err)}}}function init(){run("init");[200,600,1200,2500,4000].forEach((function(ms){setTimeout((function(){run("idozitett "+ms)}),ms)}))
document.addEventListener("bbZipChanged",(function(){setTimeout((function(){run("bbZipChanged")
zipRefresh()}),250)}))
document.addEventListener("bbZipRendered",zipRefresh)}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init)}else{init()}})()

