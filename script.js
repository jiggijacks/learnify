const records={mtn:["MTN","Illustrative demo claim: strongest sample consistency for the Jabi scenario.","9 demo items","Demo verified","High"],airtel:["Airtel","Illustrative demo claim: value-led option with less consistent sample performance.","6 demo items","Demo verified","Medium"],glo:["Glo","Illustrative demo claim: mixed sample results; needs more verification.","4 demo items","Needs verification","Low"]};
let choice=localStorage.getItem("learnifyngChoice")||"MTN";
let currentQuestion="Which network works best around Jabi?";

function go(route){
  const home=route==="home";
  document.querySelector("main").hidden=!home;
  document.querySelector("#mvp").hidden=home;
  document.querySelectorAll(".mvp-view").forEach(v=>v.style.display="none");
  if(!home){const view=document.querySelector("#"+route+"-view");if(view)view.style.display="block";else return go("home")}
  history.replaceState(null,"",route==="home"?"#top":"#"+route);
  window.scrollTo(0,0);
}

function cards(){
  document.querySelector("#record-list").innerHTML=Object.entries(records).map(([id,r])=>`<article class="record-card"><div class="record-top"><span class="demo-pill">DEMO DATA</span><span class="confidence">${r[3]}</span></div><h3>${r[1]}</h3><div class="record-meta"><span><b>Claim</b>${r[1]}</span><span><b>Location</b>Jabi, Abuja (demo)</span><span><b>Date</b>September 2026 (demo)</span><span><b>Source</b>Illustrative demo record</span><span><b>Evidence</b>${r[2]}</span><span><b>Verification</b>${r[3]}</span><span><b>Confidence</b>${r[4]} (demo)</span><span><b>Last verified</b>September 2026 (demo)</span></div><button class="outline-dark" data-record-open="${id}">Why should I trust this? →</button></article>`).join("");
}

function detail(id){
  const r=records[id]||records.mtn;
  document.querySelector("#record-detail").innerHTML=`<div class="detail-claim"><span class="demo-pill">DEMO DATA</span><h2>${r[0]} evidence record</h2><p>${r[1]}</p></div><div class="layer"><span>FACT</span><p>${r[1]} This is illustrative demo intelligence, not a real local claim.</p></div><div class="layer"><span>EVIDENCE</span><div class="evidence-row"><b>${r[2]}</b><small>Demo screenshots, observations and documents; not real-world activity.</small></div></div><div class="layer"><span>VERIFICATION</span><p>Status: ${r[3]}. Method: demo internal consistency review. Reviewer role: demo reviewer. Date: September 2026. Confidence: ${r[4]}.</p></div><div class="layer analysis"><span>ANALYSIS</span><p>This record can inform comparison but is not advisory or a verified recommendation.</p></div>`;
}

function table(){
  const rows=[["Price","Higher","Moderate","Lower"],["Local performance","Strong / consistent","Good / variable","Mixed"],["Availability","Demo: broad","Demo: broad","Demo: uncertain"],["Customer service","Demo: not assessed","Demo: not assessed","Demo: not assessed"],["Evidence strength","9 demo items","6 demo items","4 demo items"],["Verification","Demo verified","Demo verified","Needs verification"],["Freshness","Sep 2026 demo","Sep 2026 demo","Sep 2026 demo"],["Pros","Reliability","Value","Low cost"],["Cons","Higher price","Less consistency","More uncertainty"],["Suitability","Video calls","Balanced use","Budget-first"]];
  document.querySelector("#comparison-table").innerHTML=rows.map(r=>`<tr><th>${r[0]}</th>${r.slice(1).map(x=>`<td>${x}</td>`).join("")}</tr>`).join("");
}

function updateDecision(){
  document.querySelectorAll(".option-select").forEach(x=>x.classList.toggle("selected",x.dataset.option===choice));
  document.querySelector("#selected-option").textContent=choice+" selected";
  document.querySelector("#decision-title").textContent=choice==="MTN"?"MTN is the recommended demo fit.":choice+" is your selected demo option.";
  document.querySelector("#decision-copy").textContent="This is a demo decision summary based only on illustrative records.";
  localStorage.setItem("learnifyngChoice",choice);
}

function restoreSaved(){
  const saved=localStorage.getItem("learnifyngDecision");
  const status=document.querySelector("#saved-status");
  if(saved)status.textContent="Demo decision saved for "+saved+". No real investigation was created.";
}

document.addEventListener("click",e=>{
  let el=e.target.closest("[data-route]");
  if(el){e.preventDefault();go(el.dataset.route);return}
  el=e.target.closest(".example-question");
  if(el){document.querySelector("#question").value=el.textContent;return}
  el=e.target.closest("[data-record-open]");
  if(el){detail(el.dataset.recordOpen);go("evidence");return}
  el=e.target.closest("[data-record]");
  if(el){detail(el.dataset.record);return}
  el=e.target.closest("[data-option]");
  if(el){choice=el.dataset.option;updateDecision();return}
  if(e.target.id==="save-decision"){
    localStorage.setItem("learnifyngDecision",choice);
    document.querySelector("#saved-status").textContent="Demo decision saved for "+choice+". No real investigation was created.";
    return;
  }
  if(e.target.id==="community-action"){
    e.target.textContent="Demo action only · no real contribution created";
    e.target.disabled=true;
  }
});

document.querySelector("#question-form").onsubmit=e=>{e.preventDefault();currentQuestion=document.querySelector("#question").value.trim()||currentQuestion;document.querySelector("#ask-question").value=currentQuestion;go("ask")};
document.querySelector("#ask-form").onsubmit=e=>{e.preventDefault();currentQuestion=document.querySelector("#ask-question").value.trim()||currentQuestion;document.querySelector("#question").value=currentQuestion;go("intelligence")};
cards();detail("mtn");table();updateDecision();restoreSaved();
go(location.hash.slice(1)==="top"?"home":location.hash.slice(1)||"home");
