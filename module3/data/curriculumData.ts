
import type { Curriculum } from '../types';

export const curriculumData: Curriculum = {
  title: 'Module 3: Data Science & Machine Learning',
  summaryForAI:
    'Module 3 of ZEN AI VANGUARD, "From Information to Intelligence," guides learners from data science foundations to applied machine learning. The curriculum covers the entire data lifecycle: ethical collection, cleaning, exploratory data analysis (EDA), and visualization. It then transitions to machine learning concepts, including supervised (regression, classification) and unsupervised (clustering) learning, model evaluation, feature engineering, and ethical AI considerations. The module culminates in two practical capstone projects where learners build and deploy their own AI applications—a data visualizer and a machine learning app—as public Hugging Face Spaces. Key technologies covered include Python, Pandas, scikit-learn, Matplotlib, and Gradio, with a strong emphasis on ethical frameworks, bias mitigation, and real-world deployment pipelines.',
  sections: [
    {
      id: 'overview',
      title: 'Module 3 Overview',
      content: [
        {
          type: 'heading',
          content: 'Theme: From Information to Intelligence',
        },
        {
          type: 'paragraph',
          content:
            'Welcome to Module 3. This module transforms you from an AI systems architect into a data scientist and machine learning practitioner. You will move from fundamental data handling to practical machine-learning deployment, building two cloud-hosted AI Spaces as working products to showcase your skills.',
        },
        {
          type: 'quote',
          content: 'Everything here is self-paced, immersive, and tile-based: each section and lab appears as its own tile inside the AI.dev dashboard.'
        }
      ],
    },
    {
      id: 'part-1',
      title: 'SECTION 1: DATA SCIENCE FOUNDATIONS',
      content: [
        {
          type: 'paragraph',
          content: 'This first part lays the groundwork for understanding the entire data lifecycle, from ethical collection and cleaning to insightful analysis and visualization. You will develop the core competencies required to turn raw information into actionable intelligence.'
        }
      ],
      subSections: [
        {
          id: '1-1',
          title: '1.1 Introduction to Data Science & Ethics',
          content: [
            { type: 'paragraph', content: 'Situate data science within the ZEN ecosystem and examine its moral dimensions. We will cover the history of data analysis, ethical frameworks, privacy law, and bias.' },
            { type: 'heading', content: 'Interactive Simulator: Ethical Dilemma Lab' },
            { type: 'paragraph', content: 'Face scenario cards with challenges like biased hiring data and data leaks. Choose your actions and an AI judge will score your ethical soundness.'},
            { type: 'interactive', content: '', component: 'EthicalDilemmaSimulator', interactiveId: 'ethical-dilemma-lab-1' },
          ],
        },
        {
          id: '1-2',
          title: '1.2 Data Collection & Formats',
          content: [
            { type: 'paragraph', content: 'Learn about various data sources and formats, including APIs, web scraping, CSV, JSON, and SQL.' },
            { type: 'heading', content: 'App: Data Collector Sandbox' },
            { type: 'paragraph', content: 'Practice importing and inspecting datasets to understand their structure and health.'},
            { type: 'interactive', content: '', component: 'DataVisualizer', interactiveId: 'data-collector-sandbox-1' },
          ],
        },
        {
          id: '1-3',
          title: '1.3 Data Cleaning & Pre-processing',
          content: [
            { type: 'paragraph', content: 'Master the concepts of handling null values, standardizing data, and encoding categorical variables—the most crucial step in any data science project.' },
            { type: 'heading', content: 'Simulator: Data Cleaner Widget' },
            { type: 'paragraph', content: 'Conceptually clean a dataset by learning about handling missing values and preparing data for a machine learning model.'},
            { type: 'interactive', content: '', component: 'DataVisualizer', interactiveId: 'data-cleaner-widget-1' },
          ],
        },
        {
          id: '1-4',
          title: '1.4 Exploratory Data Analysis (EDA)',
          content: [
            { type: 'paragraph', content: 'Dive into descriptive statistics, distribution plots, and correlation tests to uncover the stories hidden in your data.' },
            { type: 'heading', content: 'App: EDA Assistant Agent' },
            { type: 'paragraph', content: 'Let an AI agent analyze a dataset and suggest the best visualizations and key insights, helping you understand your data faster.'},
            { type: 'interactive', content: '', component: 'ExplainabilityPanel', interactiveId: 'eda-assistant-1' },
          ],
        },
        {
            id: '1-5',
            title: '1.5 Visualization Fundamentals',
            content: [
              { type: 'paragraph', content: 'Learn the fundamentals of data visualization using tools like Matplotlib, Seaborn, and Plotly to create insightful charts.' },
              { type: 'heading', content: 'App: Mini Data Visualizer' },
              { type: 'paragraph', content: 'Use an interactive widget to switch between chart types, select data columns, and see how different visualizations represent the same data.'},
              { type: 'interactive', content: '', component: 'DataVisualizer', interactiveId: 'mini-data-visualizer-1' },
            ],
        },
        {
            id: '1-6',
            title: '1.6 Outlier & Anomaly Detection',
            content: [
              { type: 'paragraph', content: 'Understand various techniques to identify data points that deviate from the norm, such as Z-Score, IQR, and Isolation Forest.' },
              { type: 'heading', content: 'Simulator: Outlier Detector' },
              { type: 'paragraph', content: 'This visualizer conceptually demonstrates how algorithms sort through data to find patterns, a core concept related to identifying anomalies.'},
              { type: 'interactive', content: '', component: 'AlgorithmVisualizer', interactiveId: 'outlier-detector-1' },
            ],
        },
        {
            id: '1-7',
            title: '1.7 Correlation vs Causation',
            content: [
              { type: 'paragraph', content: 'Learn the critical difference between correlation and causation by interpreting Pearson correlation coefficients and identifying spurious relationships.' },
              { type: 'heading', content: 'App: Correlation Explorer' },
              { type: 'paragraph', content: 'Use this simulator to see how two variables can be correlated, and understand how a predictive model uses this relationship.'},
              { type: 'interactive', content: '', component: 'SimplePredictiveModel', interactiveId: 'correlation-explorer-1' },
            ],
        },
        {
            id: '1-8',
            title: '1.8 Storytelling with Data',
            content: [
              { type: 'paragraph', content: 'Master the art of transforming raw analytics and charts into a compelling narrative that drives decisions.' },
              { type: 'heading', content: 'App: Insight Narrator' },
              { type: 'paragraph', content: 'Use an AI to generate a textual summary and key insights from a given prompt, simulating the process of narrating data.'},
              { type: 'interactive', content: '', component: 'ExplainabilityPanel', interactiveId: 'insight-narrator-1' },
            ],
        },
        {
            id: '1-9',
            title: '1.9 Mini-Project – EDA Report',
            content: [
              { type: 'paragraph', content: 'Select a dataset of your choice to clean, analyze, visualize, and compile your findings into a comprehensive report.' },
              { type: 'heading', content: 'Tool: Auto-Report Builder' },
              { type: 'paragraph', content: 'Use this tool to input a meeting transcript (representing your raw findings) and have an AI structure it into a summary with key decisions and action items.'},
              { type: 'interactive', content: '', component: 'MeetingSummarizer', interactiveId: 'eda-report-1' },
            ],
        },
        {
            id: '1-10',
            title: '1.10 Assessment & Reflection',
            content: [
              { type: 'paragraph', content: 'Test your knowledge with an interactive quiz and reflect on your progress through the Data Science Foundations section.' },
              { type: 'heading', content: 'App: Competency Quiz' },
              { type: 'paragraph', content: 'Take a short quiz on key concepts from this section to earn your Data Literacy Badge (Level I).'},
              { type: 'interactive', content: '', component: 'DockerCommandQuiz', interactiveId: 'assessment-1' },
            ],
        },
        {
            id: '1-11',
            title: '1.11 Build & Launch Hugging Face Space #1 – ZEN VibeCoder',
            content: [
              { type: 'paragraph', content: 'For your first capstone project, you will deploy a live, multi-modal research and site-cloning foundry to the cloud. This powerful tool, "ZEN VibeCoder," uses Firecrawl for web data extraction and can leverage either OpenAI or Anthropic models for synthesis.' },
              { type: 'heading', content: 'Instructions'},
              { type: 'list', content: [
                'Create a new Space on Hugging Face, select the Gradio SDK, and use a sufficiently powerful hardware instance.',
                'Add your `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and `FIRECRAWL_API_KEY` to the Space secrets.',
                'Create a file named `README.md` and paste the code from the first block below.',
                'Create a file named `requirements.txt` and paste the code from the second block.',
                'Create a file named `app.py` and paste the Python code from the third block.',
                'Your app will build and go live! You now have a powerful research tool to use for your projects.',
                'Share the public URL to your Space to complete the project.'
              ]},
              { type: 'heading', content: 'README.md'},
              { type: 'code', language: 'bash', content: `---
title: ZEN VibeCoder — Web Clone & Research Foundry
emoji: 🛰️
colorFrom: blue
colorTo: indigo
sdk: gradio
sdk_version: 4.29.0
pinned: false
---

A research + site-cloning foundry powered by Firecrawl + GPT-4o + Claude Sonnet.
- Enter API keys (or supply via env).  
- Search the web, scrape/crawl targets, export ZIPs, and generate synthesis using your chosen model.

**Keys used (session-only unless env vars present):**  
- \`OPENAI_API_KEY\` (GPT-4o)  
- \`ANTHROPIC_API_KEY\` (Claude 3.5 Sonnet)  
- \`FIRECRAWL_API_KEY\` (Firecrawl search/scrape/crawl)`},
              { type: 'heading', content: 'requirements.txt'},
              { type: 'code', language: 'bash', content: `gradio>=4.0.0
firecrawl-py>=0.1.0
openai>=1.2.0
anthropic>=0.21.0
pydantic>=2.0.0
tenacity>=8.2.0
python-dotenv>=1.0.0
requests>=2.30.0`},
              { type: 'heading', content: 'app.py'},
              { type: 'code', language: 'python', content: `import os, io, json, zipfile, hashlib, time
from typing import List, Dict, Any, Optional, Tuple
import gradio as gr
from pydantic import BaseModel
from tenacity import retry, stop_after_attempt, wait_exponential, RetryError

# .env support (optional)
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

# SDKs
try:
    from openai import OpenAI
except Exception:
    OpenAI = None

try:
    import anthropic
    from anthropic import NotFoundError as AnthropicNotFound
except Exception:
    anthropic = None
    AnthropicNotFound = Exception  # fallback type

from firecrawl import Firecrawl  # v2.x

# -------------------- utils --------------------
def _to_dict(obj: Any) -> Any:
    if isinstance(obj, BaseModel):
        return obj.model_dump()
    if isinstance(obj, dict):
        return {k: _to_dict(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_to_dict(v) for v in obj]
    if hasattr(obj, "__dict__") and not isinstance(obj, (str, bytes)):
        try:
            return {k: _to_dict(v) for k, v in vars(obj).items()}
        except Exception:
            pass
    return obj

def _pretty_json(data: Any, limit: int = 300_000) -> str:
    try:
        s = json.dumps(_to_dict(data), indent=2)
        return s[:limit]
    except Exception as e:
        return f"<!> Could not serialize to JSON: {e}"

def _listify(x) -> List[Any]:
    if x is None:
        return []
    if isinstance(x, list):
        return x
    return [x]

def _hash(s: str) -> str:
    return hashlib.sha1(s.encode("utf-8")).hexdigest()[:10]

# -------------------- keys --------------------
class Keys(BaseModel):
    openai: Optional[str] = None
    anthropic: Optional[str] = None
    firecrawl: Optional[str] = None

def resolve_keys(s: Keys) -> Keys:
    return Keys(
        openai=s.openai or os.getenv("OPENAI_API_KEY"),
        anthropic=s.anthropic or os.getenv("ANTHROPIC_API_KEY"),
        firecrawl=s.firecrawl or os.getenv("FIRECRAWL_API_KEY"),
    )

# -------------------- firecrawl --------------------
def fc_client(s: Keys) -> Firecrawl:
    k = resolve_keys(s)
    if not k.firecrawl:
        raise gr.Error("Missing FIRECRAWL_API_KEY. Enter it in Keys → Save.")
    return Firecrawl(api_key=k.firecrawl)

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=8))
def fc_search(s: Keys, query: str, limit: int = 5, scrape_formats: Optional[List[str]] = None, location: Optional[str] = None) -> Dict[str, Any]:
    fc = fc_client(s)
    kwargs: Dict[str, Any] = {"query": query, "limit": limit}
    if location: kwargs["location"] = location
    if scrape_formats: kwargs["scrape_options"] = {"formats": scrape_formats}
    res = fc.search(**kwargs)
    return _to_dict(res)

@retry(stop=stop_after_attempt(2), wait=wait_exponential(multiplier=1, min=1, max=10))
def fc_scrape(s: Keys, url: str, formats: Optional[List[str]] = None, timeout_ms: Optional[int] = None, mobile: bool = False) -> Dict[str, Any]:
    fc = fc_client(s)
    kwargs: Dict[str, Any] = {"url": url}
    if formats: kwargs["formats"] = formats
    if timeout_ms: kwargs["timeout"] = min(int(timeout_ms), 40000)  # cap 40s
    if mobile: kwargs["mobile"] = True
    res = fc.scrape(**kwargs)
    return _to_dict(res)

@retry(stop=stop_after_attempt(2), wait=wait_exponential(multiplier=1, min=1, max=10))
def fc_crawl(s: Keys, url: str, max_pages: int = 25, formats: Optional[List[str]] = None) -> Dict[str, Any]:
    fc = fc_client(s)
    kwargs: Dict[str, Any] = {"url": url, "limit": max_pages}
    if formats: kwargs["scrape_options"] = {"formats": formats}
    res = fc.crawl(**kwargs)
    return _to_dict(res)

# -------------------- LLMs --------------------
SYSTEM_STEER = (
    "You are ZEN's VibeCoder: extract web insights, generate clean scaffolds, "
    "and produce production-ready artifacts. Prefer structured outlines, code blocks, and checklists. "
    "When asked to clone or refactor, output file trees and exact text."
)

def use_openai(s: Keys):
    k = resolve_keys(s)
    if not k.openai: raise gr.Error("Missing OPENAI_API_KEY.")
    if OpenAI is None: raise gr.Error("OpenAI SDK not installed.")
    return OpenAI(api_key=k.openai)

def use_anthropic(s: Keys):
    k = resolve_keys(s)
    if not k.anthropic: raise gr.Error("Missing ANTHROPIC_API_KEY.")
    if anthropic is None: raise gr.Error("Anthropic SDK not installed.")
    return anthropic.Anthropic(api_key=k.anthropic)

ANTHROPIC_FALLBACKS = [
    "claude-3-5-sonnet-20240620",
]
OPENAI_FALLBACKS = ["gpt-4o", "gpt-4-turbo"]

def llm_once_openai(s: Keys, model: str, prompt: str, ctx: str, temp: float) -> str:
    client = use_openai(s)
    resp = client.chat.completions.create(
        model=model, temperature=temp,
        messages=[{"role":"system","content":SYSTEM_STEER},
                  {"role":"user","content":f"{prompt}\\n\\n=== SOURCE (markdown) ===\\n{ctx}"}]
    )
    return (resp.choices[0].message.content or "").strip()

def llm_once_anthropic(s: Keys, model: str, prompt: str, ctx: str, temp: float) -> str:
    client = use_anthropic(s)
    resp = client.messages.create(
        model=model, max_tokens=4000, temperature=temp, system=SYSTEM_STEER,
        messages=[{"role":"user","content":f"{prompt}\\n\\n=== SOURCE (markdown) ===\\n{ctx}"}],
    )
    out=[]
    for blk in resp.content:
        t=getattr(blk,"text",None)
        if t: out.append(t)
    return "".join(out).strip()

def llm_summarize(s: Keys, provider: str, model_name: str, prompt: str, ctx_md: str, temp: float=0.4) -> str:
    ctx = (ctx_md or "")[:150000]
    if provider == "openai":
        candidates = [model_name] + OPENAI_FALLBACKS if model_name else OPENAI_FALLBACKS
        last=None
        for m in candidates:
            try: return llm_once_openai(s, m, prompt, ctx, temp)
            except Exception as e: last=e; continue
        raise gr.Error(f"OpenAI failed across fallbacks: {last}")
    else:
        candidates = [model_name] + ANTHROPIC_FALLBACKS if model_name else ANTHROPIC_FALLBACKS
        last=None
        for m in candidates:
            try: return llm_once_anthropic(s, m, prompt, ctx, temp)
            except AnthropicNotFound as e: last=e; continue
            except Exception as e: last=e; continue
        raise gr.Error(f"Anthropic failed across fallbacks: {last}")

# -------------------- ZIP export helpers --------------------
def pack_zip_pages(pages: List[Dict[str, Any]]) -> bytes:
    mem = io.BytesIO()
    with zipfile.ZipFile(mem, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
        manifest = []
        for i, p in enumerate(pages, start=1):
            url = p.get("url") or p.get("metadata", {}).get("sourceURL") or f"page_{i}"
            slug = _hash(str(url))
            md = p.get("markdown") or p.get("data", {}).get("markdown") or p.get("content") or ""
            html = p.get("html") or p.get("data", {}).get("html") or ""
            links = p.get("links") or p.get("data", {}).get("links") or []
            title = p.get("title") or p.get("metadata", {}).get("title")
            if md:   zf.writestr(f"{i:03d}_{slug}.md", md)
            if html: zf.writestr(f"{i:03d}_{slug}.html", html)
            manifest.append({"url": url, "title": title, "links": links})
        zf.writestr("manifest.json", json.dumps(manifest, indent=2))
    mem.seek(0); return mem.read()

def pack_zip_corpus(corpus: List[Dict[str, Any]], merged_md: str, extras: Dict[str,str]) -> bytes:
    mem = io.BytesIO()
    with zipfile.ZipFile(mem, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("corpus_merged.md", merged_md or "")
        zf.writestr("corpus_manifest.json", json.dumps(corpus, indent=2))
        for name,content in extras.items():
            zf.writestr(name, content)
    mem.seek(0); return mem.read()

# -------------------- actions: keys/search/scrape/crawl/generate --------------------
def save_keys(openai_key, anthropic_key, firecrawl_key):
    return Keys(
        openai=(openai_key or "").strip() or None,
        anthropic=(anthropic_key or "").strip() or None,
        firecrawl=(firecrawl_key or "").strip() or None,
    ), gr.Info("Keys saved to this session. (Env vars still apply if set.)")

def action_search(sess: Keys, query: str, limit: int, scrape_content: bool, location: str):
    if not query.strip(): raise gr.Error("Enter a search query.")
    formats = ["markdown", "links"] if scrape_content else None
    res = fc_search(sess, query=query.strip(), limit=limit, scrape_formats=formats, location=(location or None))
    data = res.get("data", res)
    items: List[Any] = []
    if isinstance(data, dict):
        for bucket in ("web", "news", "images", "videos", "discussion"):
            b = data.get(bucket)
            if b:
                items.extend(_listify(_to_dict(b)))
    elif isinstance(data, list):
        items = _to_dict(data)
    else:
        items = _listify(_to_dict(data))
    if not items:
        return _pretty_json(res), res  # return raw and obj (store for later)
    return json.dumps(items, indent=2), items

def action_scrape(sess: Keys, url: str, mobile: bool, formats_sel: List[str], timeout_ms: int):
    if not url.strip(): raise gr.Error("Enter a URL.")
    formats = formats_sel or ["markdown", "links"]
    try:
        out = fc_scrape(sess, url.strip(), formats=formats, timeout_ms=(timeout_ms or 15000), mobile=mobile)
        pretty = _pretty_json(out)
        md = out.get("markdown") or out.get("data", {}).get("markdown") or out.get("content") or ""
        return pretty, md, out
    except RetryError as e:
        return f"<!> Scrape timed out after retries. Try increasing timeout, unchecking 'mobile', or limiting formats.\\n\\n{e}", "", {}
    except Exception as e:
        return f"<!> Scrape error: {e}", "", {}

def action_crawl(sess: Keys, base_url: str, max_pages: int, formats_sel: List[str]):
    if not base_url.strip(): raise gr.Error("Enter a base URL to crawl.")
    formats = formats_sel or ["markdown", "links"]
    try:
        out = fc_crawl(sess, base_url.strip(), max_pages=max_pages, formats=formats)
        pages = out.get("data")
        if not isinstance(pages, list) or not pages: raise gr.Error("Crawl returned no pages.")
        zip_bytes = pack_zip_pages(pages)
        return gr.File.update(value=io.BytesIO(zip_bytes), visible=True, filename="site_clone.zip"), f"Crawled {len(pages)} pages. ZIP is ready.", pages
    except RetryError as e:
        return gr.File.update(visible=False), f"<!> Crawl timed out after retries. Reduce Max Pages or try again.\\n\\n{e}", []
    except Exception as e:
        return gr.File.update(visible=False), f"<!> Crawl error: {e}", []

def action_generate(sess: Keys, provider: str, model_name: str, sys_prompt: str, user_prompt: str, context_md: str, temp: float):
    if not user_prompt.strip(): raise gr.Error("Enter a prompt or click a starter tile.")
    model = (model_name or "").strip()
    steer = (sys_prompt or "").strip()
    prompt = (("SYSTEM:\\n" + steer + "\\n\\n") if steer else "") + user_prompt.strip()
    out = llm_summarize(sess, provider, model, prompt, context_md or "", temp=temp)
    return out

# -------------------- Corpus features --------------------
def corpus_normalize_items(items: Any) -> List[Dict[str, Any]]:
    """Accepts list/dict/raw and returns a list of page-like dicts with url/title/markdown/html/links."""
    out=[]
    if isinstance(items, dict): items=[items]
    for it in _listify(items):
        d=_to_dict(it)
        if not isinstance(d, dict): continue
        url = d.get("url") or d.get("metadata",{}).get("sourceURL") or d.get("link") or ""
        title = d.get("title") or d.get("metadata",{}).get("title") or d.get("name") or ""
        md = d.get("markdown") or d.get("data",{}).get("markdown") or d.get("content") or ""
        html = d.get("html") or d.get("data",{}).get("html") or ""
        links = d.get("links") or d.get("data",{}).get("links") or []
        out.append({"url":url,"title":title,"markdown":md,"html":html,"links":links})
    return out

def corpus_add(corpus: List[Dict[str,Any]], items: Any, include_filter: str, exclude_filter: str, dedupe: bool) -> Tuple[List[Dict[str,Any]], str]:
    added=0
    existing = set(_hash(x.get("url","")) for x in corpus if x.get("url"))
    inc = (include_filter or "").strip().lower()
    exc = (exclude_filter or "").strip().lower()
    for rec in corpus_normalize_items(items):
        url = (rec.get("url") or "").lower()
        title = (rec.get("title") or "").lower()
        if inc and (inc not in url and inc not in title): continue
        if exc and (exc in url or exc in title): continue
        if dedupe and rec.get("url") and _hash(rec["url"]) in existing: continue
        corpus.append(rec); added+=1
        if rec.get("url"): existing.add(_hash(rec["url"]))
    return corpus, f"Added {added} item(s). Corpus size: {len(corpus)}."

def corpus_list(corpus: List[Dict[str,Any]]) -> str:
    lines=[]
    for i,rec in enumerate(corpus,1):
        url = rec.get("url") or "(no url)"
        title = rec.get("title") or "(no title)"
        mlen = len(rec.get("markdown") or "")
        lines.append(f"{i:03d}. {title} — {url}  [md:{mlen} chars]")
    if not lines: return "_(empty)_"
    return "\\n".join(lines)

def corpus_clear() -> Tuple[List[Dict[str,Any]], str]:
    return [], "Corpus cleared."

def corpus_merge_md(corpus: List[Dict[str,Any]]) -> str:
    parts=[]
    for rec in corpus:
        hdr = f"### {rec.get('title') or rec.get('url') or 'Untitled'}"
        md = rec.get("markdown") or ""
        if md: parts.append(hdr+"\\n\\n"+md.strip())
    return "\\n\\n---\\n\\n".join(parts)

def corpus_export(corpus: List[Dict[str,Any]], merged: str, extras: Dict[str,str]):
    data = pack_zip_corpus(corpus, merged, extras)
    return gr.File.update(value=io.BytesIO(data), visible=True, filename=f"corpus_{int(time.time())}.zip")

def dual_generate(sess: Keys, model_openai: str, model_anthropic: str, sys_prompt: str, user_prompt: str, ctx_md: str, temp: float):
    if not user_prompt.strip(): raise gr.Error("Enter a prompt or use a tile.")
    steer = (sys_prompt or "").strip()
    prompt = (("SYSTEM:\\n" + steer + "\\n\\n") if steer else "") + user_prompt.strip()
    ctx = ctx_md or ""
    # OpenAI
    oa_txt, an_txt = "", ""
    try:
        oa_txt = llm_summarize(sess, "openai", model_openai or "", prompt, ctx, temp)
    except Exception as e:
        oa_txt = f"<!> OpenAI error: {e}"
    try:
        an_txt = llm_summarize(sess, "anthropic", model_anthropic or "", prompt, ctx, temp)
    except Exception as e:
        an_txt = f"<!> Anthropic error: {e}"
    # render side-by-side
    md = (
        "### OpenAI\\n\\n" + (oa_txt or "_(empty)_") +
        "\\n\\n---\\n\\n" +
        "### Anthropic\\n\\n" + (an_txt or "_(empty)_")
    )
    return md

def scaffold_from_corpus(corpus_md: str, site_name: str = "zen-scan"):
    """
    Produce a tiny site/docs scaffold as a ZIP:
      /README.md
      /docs/index.md  (from corpus)
      /docs/summary.md (brief)
    """
    summary = (corpus_md[:1800] + ("..." if len(corpus_md) > 1800 else "")) if corpus_md else "No content."
    mem = io.BytesIO()
    with zipfile.ZipFile(mem, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("README.md", f"# {site_name}\\n\\nAuto-generated scaffold from ZEN VibeCoder corpus.\\n")
        zf.writestr("docs/index.md", corpus_md or "# Empty\\n")
        zf.writestr("docs/summary.md", f"# Summary\\n\\n{summary}\\n")
    mem.seek(0)
    return gr.File.update(value=mem, visible=True, filename=f"{site_name}_scaffold.zip")

# -------------------- UI --------------------
with gr.Blocks(css="#keys .wrap.svelte-1ipelgc { filter: none !important; }") as demo:
    gr.Markdown("## ZEN VibeCoder — Web Clone & Research Foundry")
    session_state = gr.State(Keys())

    # keep stateful objects
    last_search_obj = gr.State({})
    last_scrape_obj = gr.State({})
    last_crawl_pages = gr.State([])
    corpus_state = gr.State([])        # list of dicts
    merged_md_state = gr.State("")     # merged markdown cache

    with gr.Accordion("🔐 Keys (session)", open=True):
        with gr.Row():
            openai_key = gr.Textbox(label="OPENAI_API_KEY (GPT-4o / fallbacks)", type="password", placeholder="sk-...", value=os.getenv("OPENAI_API_KEY") or "")
            anthropic_key = gr.Textbox(label="ANTHROPIC_API_KEY (Claude Sonnet)", type="password", placeholder="anthropic-key...", value=os.getenv("ANTHROPIC_API_KEY") or "")
            firecrawl_key = gr.Textbox(label="FIRECRAWL_API_KEY", type="password", placeholder="fc-...", value=os.getenv("FIRECRAWL_API_KEY") or "")
        save_btn = gr.Button("Save keys", variant="primary")
        save_msg = gr.Markdown()
        save_btn.click(save_keys, [openai_key, anthropic_key, firecrawl_key], [session_state, save_msg])

    with gr.Tabs():
        # --- SEARCH ---
        with gr.Tab("🔎 Search"):
            query = gr.Textbox(label="Query", placeholder='ex: site:docs "vector database" 2025')
            with gr.Row():
                limit = gr.Slider(1, 20, value=6, step=1, label="Limit")
                scrape_content = gr.Checkbox(label="Also scrape results (markdown + links)", value=True)
                location = gr.Textbox(label="Location (optional)", placeholder="ex: Germany")
            go_search = gr.Button("Run Search", variant="primary")
            search_json = gr.Code(label="Results JSON", language="json")

            def _search(sess, q, lmt, scp, loc):
                txt, obj = action_search(sess, q, lmt, scp, loc)
                return txt, obj
            go_search.click(_search, [session_state, query, limit, scrape_content, location], [search_json, last_search_obj])

        # --- SCRAPE / CRAWL ---
        with gr.Tab("🕸️ Scrape • Crawl • Clone"):
            with gr.Row():
                target_url = gr.Textbox(label="URL to Scrape", placeholder="https://example.com")
                timeout_ms = gr.Number(label="Timeout (ms, max 40000)", value=15000)
            with gr.Row():
                formats_sel = gr.CheckboxGroup(choices=["markdown","html","links","screenshot"], value=["markdown","links"], label="Formats")
                mobile = gr.Checkbox(label="Emulate mobile", value=False)
            run_scrape = gr.Button("Scrape URL", variant="primary")
            scrape_json = gr.Code(label="Raw Response (JSON)", language="json")
            scrape_md = gr.Markdown(label="Markdown Preview")
            run_scrape.click(action_scrape, [session_state, target_url, mobile, formats_sel, timeout_ms], [scrape_json, scrape_md, last_scrape_obj])

            gr.Markdown("---")

            with gr.Row():
                base_url = gr.Textbox(label="Base URL to Crawl", placeholder="https://docs.firecrawl.dev")
                max_pages = gr.Slider(1, 200, value=25, step=1, label="Max Pages")
            formats_crawl = gr.CheckboxGroup(choices=["markdown","html","links"], value=["markdown","links"], label="Crawl Formats")
            run_crawl = gr.Button("Crawl & Build ZIP", variant="primary")
            zip_file = gr.File(label="Clone ZIP", visible=False)
            crawl_status = gr.Markdown()
            run_crawl.click(action_crawl, [session_state, base_url, max_pages, formats_crawl], [zip_file, crawl_status, last_crawl_pages])

        # --- CORPUS & BUILD ---
        with gr.Tab("📦 Corpus & Build"):
            with gr.Row():
                include_filter = gr.Textbox(label="Include filter (substring)", placeholder="docs, api, blog...")
                exclude_filter = gr.Textbox(label="Exclude filter (substring)", placeholder="cdn, tracking, terms...")
                dedupe = gr.Checkbox(label="Dedupe by URL", value=True)
            with gr.Row():
                add_from_search = gr.Button("Add from Last Search")
                add_from_scrape = gr.Button("Add from Last Scrape")
                add_from_crawl = gr.Button("Add from Last Crawl")
            status_corpus = gr.Markdown()
            corpus_list_md = gr.Markdown(label="Corpus Items")

            def do_add_from_search(corpus, items, inc, exc, dd):
                corpus, msg = corpus_add(corpus or [], items, inc, exc, dd)
                return corpus, msg, corpus_list(corpus)
            def do_add_from_scrape(corpus, obj, inc, exc, dd):
                corpus, msg = corpus_add(corpus or [], obj, inc, exc, dd)
                return corpus, msg, corpus_list(corpus)
            def do_add_from_crawl(corpus, pages, inc, exc, dd):
                corpus, msg = corpus_add(corpus or [], pages, inc, exc, dd)
                return corpus, msg, corpus_list(corpus)

            add_from_search.click(do_add_from_search, [corpus_state, last_search_obj, include_filter, exclude_filter, dedupe], [corpus_state, status_corpus, corpus_list_md])
            add_from_scrape.click(do_add_from_scrape, [corpus_state, last_scrape_obj, include_filter, exclude_filter, dedupe], [corpus_state, status_corpus, corpus_list_md])
            add_from_crawl.click(do_add_from_crawl, [corpus_state, last_crawl_pages, include_filter, exclude_filter, dedupe], [corpus_state, status_corpus, corpus_list_md])

            with gr.Row():
                merge_btn = gr.Button("Merge ➜ Markdown", variant="primary")
                clear_btn = gr.Button("Clear Corpus", variant="secondary")
            merged_md = gr.Textbox(label="Merged Markdown (editable)", lines=12)

            def do_merge(corpus):
                md = corpus_merge_md(corpus or [])
                return md, md
            def do_clear():
                c,msg = corpus_clear()
                return c, msg, corpus_list(c), ""
            merge_btn.click(do_merge, [corpus_state], [merged_md, merged_md_state])
            clear_btn.click(do_clear, [], [corpus_state, status_corpus, corpus_list_md, merged_md])

            gr.Markdown("---")
            with gr.Row():
                site_name = gr.Textbox(label="Scaffold Name", value="zen-scan")
                scaffold_btn = gr.Button("Generate Minimal Site Scaffold (ZIP)")
                scaffold_zip = gr.File(visible=False)
            scaffold_btn.click(lambda md, name: scaffold_from_corpus(md, name or "zen-scan"),
                               [merged_md], [scaffold_zip])

            gr.Markdown("---")
            with gr.Row():
                export_zip_btn = gr.Button("Export Corpus (ZIP)")
                export_zip_file = gr.File(visible=False)

            def do_export(corpus, merged):
                extras = {"README.txt": "Exported by ZEN VibeCoder"}
                return corpus_export(corpus or [], merged or "", extras)
            export_zip_btn.click(do_export, [corpus_state, merged_md], [export_zip_file])

        # --- VIBE CODE (single provider) ---
        with gr.Tab("✨ Vibe Code (Synthesis)"):
            with gr.Row():
                provider = gr.Radio(choices=["openai","anthropic"], value="openai", label="Provider")
                model_name = gr.Textbox(label="Model (override)", placeholder="(blank = auto fallback)")
                temp = gr.Slider(0.0, 1.2, value=0.4, step=0.05, label="Temperature")
            sys_prompt = gr.Textbox(label="System Style (optional)",
                value="Return structured outputs with file trees, code blocks and ordered steps. Be concise and concrete.")
            user_prompt = gr.Textbox(label="User Prompt", lines=6)
            ctx_md = gr.Textbox(label="Context (paste markdown or click Merge first)", lines=10)
            gen_btn = gr.Button("Generate", variant="primary")
            out_md = gr.Markdown()
            gr.Markdown("**Starter Tiles**")
            with gr.Row():
                t1 = gr.Button("🔧 Clone Docs ➜ Clean README")
                t2 = gr.Button("🧭 Competitor Matrix")
                t3 = gr.Button("🧪 Python API Client")
                t4 = gr.Button("📐 ZEN Landing Rewrite")
                t5 = gr.Button("📊 Dataset & ETL Plan")
            def fill_tile(tile: str):
                tiles = {
                    "t1": "Create a clean knowledge pack from the context, then output a README.md with: Overview, Key features, Quickstart, API endpoints, Notes & gotchas, License. Include a /docs/ outline.",
                    "t2": "Produce a feature matrix, pricing table, ICP notes, moats/risks, and a market POV. End with a ZEN playbook: 5 lever moves.",
                    "t3": "Design a Python client that wraps the target API with retry/backoff and typed responses. Provide package layout, requirements, client.py, examples/, and README.",
                    "t4": "Rewrite the landing content in ZEN brand voice: headline, 3 value props, social proof, CTA, concise FAQ. Provide HTML sections and copy.",
                    "t5": "Propose a dataset schema. Output a table of fields, types, constraints, plus an ETL plan (sources, transforms, validation, freshness, monitoring).",
                }
                return tiles[tile]
            t1.click(lambda: fill_tile("t1"), outputs=[user_prompt])
            t2.click(lambda: fill_tile("t2"), outputs=[user_prompt])
            t3.click(lambda: fill_tile("t3"), outputs=[user_prompt])
            t4.click(lambda: fill_tile("t4"), outputs=[user_prompt])
            t5.click(lambda: fill_tile("t5"), outputs=[user_prompt])
            gen_btn.click(action_generate, [session_state, provider, model_name, sys_prompt, user_prompt, ctx_md, temp], [out_md])

        # --- DUAL (side-by-side router) ---
        with gr.Tab("🧪 Dual Synth (OpenAI vs Anthropic)"):
            with gr.Row():
                model_openai = gr.Textbox(label="OpenAI Model", placeholder="(blank = auto fallback)")
                model_anthropic = gr.Textbox(label="Anthropic Model", placeholder="(blank = auto fallback)")
                temp2 = gr.Slider(0.0, 1.2, value=0.4, step=0.05, label="Temperature")
            sys2 = gr.Textbox(label="System Style (optional)", value="Return structured outputs with file trees and clear steps.")
            user2 = gr.Textbox(label="User Prompt", lines=6, value="Summarize the corpus and propose a 5-step execution plan.")
            ctx2 = gr.Textbox(label="Context (tip: click Merge in Corpus tab)", lines=10)
            dual_btn = gr.Button("Run Dual Synthesis", variant="primary")
            dual_md = gr.Markdown()
            dual_btn.click(dual_generate, [session_state, model_openai, model_anthropic, sys2, user2, ctx2, temp2], [dual_md])

    gr.Markdown("Built for **ZEN Arena** pipelines. Export ZIPs → ingest → credentialize via ZEN Cards.")

if __name__ == "__main__":
    demo.launch(ssr_mode=False)`},
            ],
        },
      ]
    },
    {
      id: 'part-2',
      title: 'SECTION 2: APPLIED MACHINE LEARNING & DEPLOYMENT',
      content: [
        {
          type: 'paragraph',
          content: 'Building on your data science foundations, this section takes you into the world of predictive modeling. You will learn to train, evaluate, and deploy machine learning models that can make intelligent decisions based on data.'
        }
      ],
      subSections: [
        {
            id: '2-1',
            title: '2.1 Introduction to Machine Learning',
            content: [
              { type: 'paragraph', content: 'Understand the fundamental difference between learning from patterns versus being programmed with explicit rules. Explore the main categories of machine learning.' },
              { type: 'heading', content: 'App: Concept Sorter' },
              { type: 'paragraph', content: 'Drag and drop different real-world examples into the correct machine learning category: Supervised, Unsupervised, or Neither.'},
              { type: 'interactive', content: '', component: 'BenefitSorter', interactiveId: 'concept-sorter-1' },
            ],
        },
        {
            id: '2-2',
            title: '2.2 Supervised Learning – Regression',
            content: [
              { type: 'paragraph', content: 'Dive into linear regression, a foundational algorithm for predicting continuous values like prices, temperatures, or scores.' },
              { type: 'heading', content: 'Simulator: Predictive Model' },
              { type: 'paragraph', content: 'Use this interactive graph to see how changing input variables (like hours studied) affects a model\'s predicted output (test score).'},
              { type: 'interactive', content: '', component: 'SimplePredictiveModel', interactiveId: 'predictive-model-1' },
            ],
        },
        {
            id: '2-3',
            title: '2.3 Supervised Learning – Classification',
            content: [
              { type: 'paragraph', content: 'Learn about classification algorithms like logistic regression and decision trees, used for predicting categorical outcomes like "yes/no" or "spam/not spam".' },
              { type: 'heading', content: 'App: Decision Boundary Explorer' },
              { type: 'paragraph', content: 'This simulator visualizes the "loss landscape," a core concept in how classification models learn to separate different classes of data.'},
              { type: 'interactive', content: '', component: 'LossLandscapeNavigator', interactiveId: 'decision-boundary-1' },
            ],
        },
        {
            id: '2-4',
            title: '2.4 Unsupervised Learning – Clustering',
            content: [
              { type: 'paragraph', content: 'Explore K-Means clustering, a popular technique for discovering natural groupings and segments within your data without pre-existing labels.' },
              { type: 'heading', content: 'App: Cluster Visualizer' },
              { type: 'paragraph', content: 'This conceptual visualizer shows how a large model\'s parameters form specialized clusters. Click a cluster to learn about its hypothetical function.'},
              { type: 'interactive', content: '', component: 'ParameterUniverseExplorer', interactiveId: 'cluster-visualizer-1' },
            ],
        },
        {
            id: '2-5',
            title: '2.5 Model Evaluation',
            content: [
              { type: 'paragraph', content: 'Learn to measure your model\'s performance using key metrics like accuracy, precision, recall, and F1-score to understand its strengths and weaknesses.' },
              { type: 'heading', content: 'Simulator: Confusion Matrix Lab' },
              { type: 'paragraph', content: 'In this game, you provide feedback on AI-generated responses, simulating the process of Reinforcement Learning from Human Feedback (RLHF) used to evaluate and improve models.'},
              { type: 'interactive', content: '', component: 'RlhfTrainerGame', interactiveId: 'confusion-matrix-lab-1' },
            ],
        },
        {
            id: '2-6',
            title: '2.6 Overfitting vs Underfitting',
            content: [
              { type: 'paragraph', content: 'Understand the critical bias-variance trade-off and learn how to diagnose whether your model is too simple (underfitting) or too complex (overfitting).' },
              { type: 'heading', content: 'App: Training Curve Animator' },
              { type: 'paragraph', content: 'Explore a conceptual visualization of a model\'s error surface. This helps understand the process of finding the optimal model parameters while avoiding overfitting.'},
              { type: 'interactive', content: '', component: 'LossLandscapeNavigator', interactiveId: 'training-curve-1' },
            ],
        },
        {
            id: '2-7',
            title: '2.7 Feature Engineering',
            content: [
              { type: 'paragraph', content: 'Discover the art and science of creating new features from your existing data through scaling, encoding, and creating interaction terms to boost model performance.' },
              { type: 'heading', content: 'App: Feature Importance Panel' },
              { type: 'paragraph', content: 'Use this tool to see which parts of your input data (features) a model pays the most attention to when making a decision.'},
              { type: 'interactive', content: '', component: 'ExplainabilityPanel', interactiveId: 'feature-importance-1' },
            ],
        },
        {
            id: '2-8',
            title: '2.8 Ethical AI & Bias',
            content: [
              { type: 'paragraph', content: 'Focus on fairness metrics, explainability, and accountability. Learn to identify and mitigate biases that can arise in your models and data.' },
              { type: 'heading', content: 'Simulator: Bias Explorer' },
              { type: 'paragraph', content: 'See how the same prompt can generate different responses across languages, revealing potential cultural biases encoded in training data.'},
              { type: 'interactive', content: '', component: 'EthicalBiasMirror', interactiveId: 'bias-explorer-1' },
            ],
        },
        {
            id: '2-9',
            title: '2.9 Deployment Pipelines',
            content: [
              { type: 'paragraph', content: 'Learn the end-to-end process of taking a model from a research notebook to a live API that can be used in a real-world application.' },
              { type: 'heading', content: 'App: Deployment Monitor' },
              { type: 'paragraph', content: 'Test your knowledge of essential deployment commands and concepts with this interactive quiz.'},
              { type: 'interactive', content: '', component: 'DockerCommandQuiz', interactiveId: 'deployment-monitor-1' },
            ],
        },
        {
            id: '2-10',
            title: '2.10 Capstone Preparation',
            content: [
              { type: 'paragraph', content: 'Choose a dataset and an algorithm for your final project. Use a comparison tool to evaluate different models and finalize your deployment plan.' },
              { type: 'heading', content: 'App: Model Comparison Dashboard' },
              { type: 'paragraph', content: 'This timeline shows the rapid evolution of AI models. Use it to understand the context and capabilities of the model you might choose for your project.'},
              { type: 'interactive', content: '', component: 'ModelArmsRaceTimeline', interactiveId: 'model-comparison-1' },
            ],
        },
        {
            id: '2.11',
            title: '2.11 Build & Launch Hugging Face Space #2 – ML Application',
            content: [
              { type: 'paragraph', content: 'For your second capstone, you will publish a fully functional AI application that takes user input and returns a live model prediction.' },
              { type: 'heading', content: 'Instructions'},
              { type: 'list', content: [
                'Train a simple model (e.g., a house price predictor) in a notebook and save it as `model.pkl` using `joblib`.',
                'Create a new Hugging Face Space with the Gradio SDK.',
                'Create a `requirements.txt` file and add the necessary libraries.',
                'Create an `app.py` file and paste the Python code below, customizing it to match your model\'s input features.',
                'Upload your `model.pkl`, `requirements.txt`, and `app.py` to the Space.',
                'Your ML application is now live and ready to share!'
              ]},
              { type: 'heading', content: 'README.md'},
              { type: 'code', language: 'bash', content: `---
title: ZEN Vanguard 4
emoji: 🐠
colorFrom: green
colorTo: indigo
sdk: gradio
sdk_version: 5.49.1
app_file: app.py
pinned: false
short_description: ZEN Vanguard 4
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference`},
              { type: 'heading', content: 'requirements.txt'},
              { type: 'code', language: 'bash', content: `gradio==5.49.1
anthropic>=0.38
plotly>=5.24`},
              { type: 'heading', content: 'app.py'},
              { type: 'code', language: 'python', content: `import os, re, io, zipfile, tempfile, time
import gradio as gr
from anthropic import Anthropic

# -------------------- CONFIG --------------------
MODEL_ID = "claude-sonnet-4-5-20250929"
SYSTEM_PROMPT = (
    "You are an expert full-stack developer. When the user asks for an app or site, "
    "return complete production-ready code artifacts in Markdown code fences labeled "
    "\`\`\`html\`\`\`, \`\`\`css\`\`\`, and \`\`\`js\`\`\`. Always include index.html, optionally styles.css and app.js. "
    "Generate beautiful, functional, responsive designs using pure HTML, CSS, and JS."
)

# -------------------- HELPERS --------------------
def parse_artifacts(text: str):
    files = {}
    blocks = re.findall(r"\`\`\`(html|css|js)\\s+([\\s\\S]*?)\`\`\`", text, re.I)
    for lang, code in blocks:
        name = {"html": "index.html", "css": "styles.css", "js": "app.js"}[lang.lower()]
        if name in files:
            base, ext = name.split(".")
            n = 2
            while f"{base}{n}.{ext}" in files:
                n += 1
            name = f"{base}{n}.{ext}"
        files[name] = code.strip()
    if not files:
        esc = gr.utils.escape_html(text)
        files["index.html"] = f"<!doctype html><meta charset='utf-8'><title>Artifact</title><pre>{esc}</pre>"
    if "index.html" not in files:
        files["index.html"] = "<!doctype html><meta charset='utf-8'><title>Artifact</title><h1>Artifact</h1>"
    return files

def render_srcdoc(files: dict):
    html = files.get("index.html", "")
    css = files.get("styles.css", "")
    js = files.get("app.js", "")
    # Inline CSS + JS for sandbox preview
    if "</head>" in html:
        html = html.replace("</head>", f"<style>\\n{css}\\n</style></head>")
    else:
        html = f"<!doctype html><head><meta charset='utf-8'><style>{css}</style></head>{html}"
    if "</body>" in html:
        html = html.replace("</body>", f"<script>\\n{js}\\n</script></body>")
    else:
        html = f"{html}<script>{js}</script>"
    return html

def make_zip_path(files: dict):
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for name, code in files.items():
            z.writestr(name, code)
    tmp.flush()
    return tmp.name

def call_claude(api_key: str, prompt: str):
    client = Anthropic(api_key=api_key)
    t0 = time.time()
    resp = client.messages.create(
        model=MODEL_ID,
        max_tokens=4000,
        temperature=0.45,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
        timeout=120,
    )
    latency = int((time.time() - t0) * 1000)
    content = "".join(getattr(c, "text", "") for c in resp.content)
    files = parse_artifacts(content)
    return files, content, latency

# -------------------- UI --------------------
with gr.Blocks(fill_height=True, theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        "# 🌐 ZEN Artifact Builder — Claude Sonnet 4.5\\n"
        "Describe any app or website and see it appear live below."
    )

    with gr.Row():
        api_key = gr.Textbox(
            label="ANTHROPIC_API_KEY", type="password", placeholder="sk-ant-…"
        )
        prompt = gr.Textbox(
            label="Describe your app/site",
            lines=6,
            placeholder="Example: responsive dark-mode portfolio with glass panels and smooth animations.",
        )

    generate_btn = gr.Button("✨ Generate", variant="primary")

    with gr.Row():
        with gr.Tab("Live Preview"):
            preview = gr.HTML(
                elem_id="preview-pane",
                value="<div style='display:flex;align-items:center;justify-content:center;height:100%;color:#aaa;'>Awaiting generation…</div>",
            )
        with gr.Tab("Artifacts"):
            file_select = gr.Dropdown(label="Select file", choices=[], interactive=True)
            editor = gr.Code(language="html", label="Code Editor", value="")
            save_btn = gr.Button("💾 Save")
        with gr.Tab("Raw Output & Export"):
            raw_output = gr.Textbox(label="Model Output (raw)", lines=12)
            latency_box = gr.Number(label="Latency (ms)")
            zip_file = gr.File(label="Download ZIP", interactive=False)

    files_state = gr.State({})

    demo.css = """
    #preview-pane {
        height: 85vh !important;
        min-height: 550px;
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: auto;
        background: #fff;
    }
    """

    # -------------------- FUNCTIONS --------------------
    def generate(api_key, prompt):
        if not api_key:
            raise gr.Error("Please enter your Anthropic API key.")
        files, raw, latency = call_claude(api_key, prompt)
        srcdoc = render_srcdoc(files)
        zip_path = make_zip_path(files)
        names = list(files.keys())
        first = names[0] if names else ""
        return (
            files,
            gr.update(value=srcdoc),
            gr.update(choices=names, value=first),
            gr.update(value=files.get(first, "")),
            raw,
            latency,
            zip_path,
        )

    generate_btn.click(
        generate,
        inputs=[api_key, prompt],
        outputs=[files_state, preview, file_select, editor, raw_output, latency_box, zip_file],
    )

    def load_editor(files, name):
        return files.get(name, "")

    file_select.change(load_editor, inputs=[files_state, file_select], outputs=editor)

    def save_file(files, name, code):
        files = dict(files)
        if name:
            files[name] = code
        return files, gr.update(value=render_srcdoc(files))

    save_btn.click(save_file, inputs=[files_state, file_select, editor], outputs=[files_state, preview])

demo.launch()`},
            ],
        },
      ]
    }
  ],
};
