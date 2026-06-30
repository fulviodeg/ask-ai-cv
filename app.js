/* ============================================================
   Ask AI about Fulvio — behaviour (shared by every theme)
   Graphics live in the theme-*.css files, not here.
   ============================================================ */

/* ====== EDIT THESE IF YOUR GITHUB USER / REPO / FILES CHANGE ====== */
var BASE      = "https://fulviodeg.github.io/ask-ai-cv/";
var KB_URL    = BASE + "fulvio-de-giovanni.md";        // the profile the AI reads (markdown = source of truth)
var CV_URL    = BASE + "Fulvio-de-Giovanni-CV.pdf";    // the PDF behind "Open my full CV"
var ANALYTICS = "";  // optional: paste your GoatCounter URL, e.g. "https://fulviodeg.goatcounter.com/count"
/* ================================================================= */

/* ====== THEMES — add an entry + a matching theme-<id>.css to create a new look ====== */
var THEMES = [
  { id: "retro",   label: "Retro",   css: "theme-retro.css" },
  { id: "minimal", label: "Minimal", css: "theme-minimal.css" }
];
var DEFAULT_THEME = "retro";
/* ==================================================================================== */

// Ready-made questions (the first one = ask freely)
var QUESTIONS = [
  { label: "Let me ask freely", q: null },
  { label: "What roles is he after?", q: "What kind of roles is Fulvio looking for, and why is he a fit?" },
  { label: "His best AI / agentic work?", q: "What is Fulvio's strongest, most relevant work in AI and agentic commerce?" },
  { label: "A complex project he led", q: "Walk me through a complex, high-stakes project Fulvio led end-to-end." },
  { label: "Fit for a Solution Architect role?", q: "Is Fulvio a strong fit for a senior Solution Architect role? Be balanced about any gaps." },
  { label: "His standout impact numbers", q: "What are Fulvio's standout, quantified impact results?" }
];

function buildPrompt(q){
  var base = "Use this markdown page as the source of truth: " + KB_URL + "\n" +
             "Answer my questions about Fulvio from that page. ";
  if(!q){
    return base + "Start by asking: \"What do you want to know about Fulvio? Maybe I can start from his 2026 work highlights?\"";
  }
  return base + "To start, please answer this: " + q;
}

// Assistant launchers
var ASSISTANTS = [
  { id:"chatgpt",   name:"ChatGPT",        sub:"chatgpt.com",            mode:"link",  build:function(e){return "https://chatgpt.com/?hints=search&q="+e;},
    svg:'<svg viewBox="0 0 24 24" fill="#0f9d76"><path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.1 5.98 5.98 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9A6 6 0 0 0 19.02 19.8a5.98 5.98 0 0 0 3.998-2.9 6.05 6.05 0 0 0-.738-7.08Zm-9.022 12.6a4.48 4.48 0 0 1-2.876-1.04l.142-.08 4.778-2.758a.78.78 0 0 0 .393-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.054v5.583a4.5 4.5 0 0 1-4.495 4.49Zm-9.66-4.126a4.48 4.48 0 0 1-.535-3.014l.142.085 4.778 2.759a.78.78 0 0 0 .787 0l5.832-3.367v2.336a.08.08 0 0 1-.03.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.645ZM2.34 7.896a4.48 4.48 0 0 1 2.343-1.973v5.677a.78.78 0 0 0 .393.68l5.832 3.367-2.02 1.168a.07.07 0 0 1-.069.006L4.49 13.66a4.5 4.5 0 0 1-2.15-5.765Zm16.597 3.855-5.832-3.367 2.02-1.167a.07.07 0 0 1 .068-.006l4.778 2.758a4.5 4.5 0 0 1-.677 8.116v-5.677a.78.78 0 0 0-.357-.657Zm2.01-3.026-.142-.085-4.778-2.759a.78.78 0 0 0-.787 0L9.51 9.243V6.907a.08.08 0 0 1 .03-.062l4.778-2.758a4.5 4.5 0 0 1 6.68 4.66Zm-12.64 4.155-2.02-1.168a.07.07 0 0 1-.038-.054V9.13a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.78.78 0 0 0-.393.681l-.004 6.744Zm1.097-2.365 2.598-1.5 2.598 1.5v2.999l-2.598 1.5-2.598-1.5Z"/></svg>' },
  { id:"claude",    name:"Claude",         sub:"claude.ai",              mode:"link",  build:function(e){return "https://claude.ai/new?q="+e;},
    svg:'<svg viewBox="0 0 24 24" fill="#d97757"><path d="M5.6 16.6 9.9 4.9c.2-.5.6-.8 1.1-.8h1.9c.5 0 .9.3 1.1.8l4.3 11.7c.2.6-.2 1.2-.9 1.2h-1.2c-.5 0-.9-.3-1-.8l-.8-2.4H9.5l-.8 2.4c-.2.5-.6.8-1 .8H6.5c-.7 0-1.1-.6-.9-1.2Zm4.6-4.7h3.6L12 7Z"/></svg>' },
  { id:"perplexity",name:"Perplexity",     sub:"perplexity.ai",          mode:"link",  build:function(e){return "https://www.perplexity.ai/search?q="+e;},
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#20808d" stroke-width="1.7"><path d="M12 3v18"/><path d="M12 7.5 5.5 3v8L12 7.5l6.5 3.5V3Z"/><path d="M5.5 11v6.5L12 14m0 0 6.5 3.5V11"/></svg>' },
  { id:"aimode",    name:"Google AI Mode", sub:"google.com",             mode:"link",  build:function(e){return "https://www.google.com/search?udm=50&q="+e;},
    svg:'<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M12 11v3.6h5.1c-.22 1.32-1.6 3.86-5.1 3.86A5.46 5.46 0 0 1 6.5 12 5.46 5.46 0 0 1 12 6.54c1.7 0 2.84.72 3.49 1.34l2.38-2.3C16.34 4.16 14.4 3.3 12 3.3 7.2 3.3 3.3 7.2 3.3 12s3.9 8.7 8.7 8.7c5.02 0 8.34-3.53 8.34-8.5 0-.57-.06-1-.14-1.43H12Z"/></svg>' },
  { id:"gemini",    name:"Gemini",         sub:"gemini.google.com",      mode:"paste", open:"https://gemini.google.com/app",
    svg:'<svg viewBox="0 0 24 24"><path fill="#8E68FF" d="M12 2c.3 5.3 4.4 9.4 9.7 9.7v.6C16.4 12.6 12.3 16.7 12 22h-.6C11 16.7 7 12.6 1.7 12.3v-.6C7 11.4 11 7.3 11.4 2H12Z"/></svg>' },
  { id:"copilot",   name:"Copilot",        sub:"copilot.microsoft.com",  mode:"paste", open:"https://copilot.microsoft.com/",
    svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#16A6C4" stroke-width="1.8" stroke-linecap="round"><path d="M6 9c2.2 0 3 1.5 3.6 3.2C10.2 14 11 15.5 13.2 15.5c2.4 0 3.3-2 3.8-3.7.5-1.7 1.3-2.8 2.8-2.8"/><path d="M8.5 15.5c-1.5 0-2.3-1-2.8-2.7C5.2 11 4.4 9 2 9"/></svg>' }
];

var CURRENT = buildPrompt(null);

// ---- theme switcher ----
function applyTheme(id){
  var t = null, i;
  for(i=0;i<THEMES.length;i++){ if(THEMES[i].id===id){ t=THEMES[i]; break; } }
  if(!t){ t = THEMES[0]; }
  var link = document.getElementById("themecss");
  if(link){ link.setAttribute("href", t.css); }
  var btns = document.querySelectorAll(".theme-switch button");
  btns.forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-theme")===t.id); });
  try{ localStorage.setItem("askai-theme", t.id); }catch(e){}
}
(function buildSwitcher(){
  var host = document.getElementById("themeSwitch");
  if(!host) return;
  THEMES.forEach(function(t){
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = t.label;
    b.setAttribute("data-theme", t.id);
    b.addEventListener("click", function(){ applyTheme(t.id); });
    host.appendChild(b);
  });
  var saved = null;
  try{ saved = localStorage.getItem("askai-theme"); }catch(e){}
  applyTheme(saved || DEFAULT_THEME);
})();

// ---- render chips ----
var chipsEl = document.getElementById("chips");
QUESTIONS.forEach(function(item, i){
  var b = document.createElement("button");
  b.type = "button";
  b.className = "chip" + (item.q===null ? " free" : "") + (i===0 ? " active" : "");
  b.textContent = (item.q===null ? "✦ " : "") + item.label;
  b.addEventListener("click", function(){
    document.querySelectorAll(".chip").forEach(function(c){c.classList.remove("active");});
    b.classList.add("active");
    CURRENT = buildPrompt(item.q);
    refresh();
  });
  chipsEl.appendChild(b);
});

// ---- render assistant buttons ----
var grid = document.getElementById("aiGrid");
ASSISTANTS.forEach(function(a){
  var el = document.createElement(a.mode==="link" ? "a" : "button");
  el.className = "ai-btn";
  el.id = "ai-" + a.id;
  if(a.mode==="link"){ el.target="_blank"; el.rel="noopener"; }
  else { el.type="button"; }
  el.innerHTML = a.svg
    + '<span>'+a.name+'</span>'
    + '<small>'+a.sub+'</small>'
    + (a.mode==="paste" ? '<span class="badge">paste</span>' : '');
  if(a.mode==="paste"){
    el.addEventListener("click", function(){
      copyText(CURRENT, function(){
        toast("Prompt copied — paste it into " + a.name);
        track("open-"+a.id);
        window.open(a.open, "_blank", "noopener");
      });
    });
  } else {
    el.addEventListener("click", function(){ track("open-"+a.id); });
  }
  grid.appendChild(el);
});

var promptEl = document.getElementById("prompt");
function refresh(){
  promptEl.textContent = CURRENT;
  var enc = encodeURIComponent(CURRENT);
  ASSISTANTS.forEach(function(a){
    if(a.mode==="link"){ document.getElementById("ai-"+a.id).href = a.build(enc); }
  });
}

document.getElementById("cvLink").href = CV_URL;

// ---- copy button ----
var copyBtn = document.getElementById("copyBtn");
var copyLabel = document.getElementById("copyLabel");
copyBtn.addEventListener("click", function(){
  copyText(CURRENT, function(){
    copyBtn.classList.add("copied");
    copyLabel.textContent = "Copied — now paste it into your AI";
    track("copy");
    setTimeout(function(){ copyBtn.classList.remove("copied"); copyLabel.textContent = "Copy prompt"; }, 2400);
  });
});

// ---- helpers ----
function copyText(text, done){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else { fallback(); }
  function fallback(){
    var ta=document.createElement("textarea"); ta.value=text;
    ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select();
    try{ document.execCommand("copy"); }catch(e){}
    document.body.removeChild(ta); done();
  }
}
var toastEl = document.getElementById("toast"), toastT;
function toast(msg){
  toastEl.textContent = msg; toastEl.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(function(){ toastEl.classList.remove("show"); }, 2600);
}
function track(name){ try{ if(window.goatcounter && window.goatcounter.count){ window.goatcounter.count({path:name, event:true}); } }catch(e){} }

// ---- optional privacy-friendly analytics (GoatCounter, no cookies) ----
if(ANALYTICS){
  var s=document.createElement("script");
  s.async=true; s.src="//gc.zgo.at/count.js"; s.setAttribute("data-goatcounter", ANALYTICS);
  document.head.appendChild(s);
}

refresh();
