"""Bundle the static export (out/) into one self-contained file: Bunpotwittaya.html

Usage:  STATIC_EXPORT=1 npm run build && python3 scripts/build-single-file.py
Every page becomes a <template>; a small hash router (scripts/runtime.js) swaps them into <main>.
CSS and the Noto Sans Thai fonts are inlined, so the file opens offline by double-click.
"""
import base64, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")
DEST = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "Bunpotwittaya.html")

NAV = [
    {"href": "/", "label": "หน้าหลัก"},
    {"href": "/about", "label": "รู้จักโรงเรียน", "children": [
        {"href": "/about/history", "label": "ประวัติโรงเรียน"},
        {"href": "/about/vision", "label": "วิสัยทัศน์และอัตลักษณ์"},
        {"href": "/about/basic-information", "label": "ข้อมูลพื้นฐาน"}]},
    {"href": "/academic", "label": "การจัดการศึกษา", "children": [
        {"href": "/academic/curriculum", "label": "หลักสูตรสถานศึกษา"},
        {"href": "/academic/learning", "label": "การจัดการเรียนรู้"},
        {"href": "/academic/innovation", "label": "นวัตกรรมการศึกษา"}]},
    {"href": "/students", "label": "ผลลัพธ์ของผู้เรียน", "children": [
        {"href": "/students/outcomes", "label": "ผลลัพธ์ของผู้เรียน"},
        {"href": "/students/achievements", "label": "ผลงานและรางวัล"}]},
    {"href": "/campus", "label": "โรงเรียนของเรา", "children": [
        {"href": "/campus", "label": "สถานที่และแหล่งเรียนรู้"},
        {"href": "/community", "label": "ชุมชนและวัฒนธรรม"}]},
    {"href": "/news", "label": "ข่าวสารและกิจกรรม", "children": [
        {"href": "/news", "label": "ข่าวสาร"},
        {"href": "/activities", "label": "กิจกรรม"}]},
    {"href": "/quality", "label": "คุณภาพการศึกษา", "children": [
        {"href": "/quality", "label": "แดชบอร์ดคุณภาพ"},
        {"href": "/quality/standard-1", "label": "มาตรฐานที่ 1"},
        {"href": "/quality/standard-2", "label": "มาตรฐานที่ 2"},
        {"href": "/quality/standard-3", "label": "มาตรฐานที่ 3"},
        {"href": "/evidence", "label": "ศูนย์หลักฐานดิจิทัล"}]},
    {"href": "/contact", "label": "ติดต่อโรงเรียน"},
]


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def clean(fragment):
    fragment = re.sub(r"<script\b.*?</script>", "", fragment, flags=re.S)
    fragment = re.sub(r"<!--.*?-->", "", fragment, flags=re.S)
    # internal links → hash routes
    def link(m):
        attr, path, rest = m.group(1), m.group(2), m.group(3)
        path = path.rstrip("/") or "/"
        return f'{attr}="#{path}{rest}"'
    fragment = re.sub(r'(href)="(/(?!/)[^"#?]*)([^"]*)"', link, fragment)
    fragment = re.sub(r'<form([^>]*?) action="/evidence/?"', r'<form\1 data-action="/evidence"', fragment)
    return fragment


# ---- CSS with inlined woff2 fonts ----
css_dir = os.path.join(OUT, "_next", "static", "css")
css = "\n".join(read(os.path.join(css_dir, f)) for f in sorted(os.listdir(css_dir)) if f.endswith(".css"))
css = re.sub(r',\s*url\([^)]*\.woff\)\s*format\("woff"\)', "", css)


def font(m):
    p = os.path.join(OUT, m.group(1).lstrip("/"))
    with open(p, "rb") as f:
        return "url(data:font/woff2;base64," + base64.b64encode(f.read()).decode() + ")"


css = re.sub(r"url\((/_next/static/media/[^)]+\.woff2)\)", font, css)

# ---- shell from the home page ----
home = read(os.path.join(OUT, "index.html"))
header = clean(re.search(r"<header\b.*?</header>", home, re.S).group(0))
footer = clean(re.search(r"<footer\b.*?</footer>", home, re.S).group(0))
skip = clean(re.search(r'<a href="#main".*?</a>', home, re.S).group(0))
jsonld = re.search(r'<script type="application/ld\+json">.*?</script>', home, re.S).group(0)
meta_desc = re.search(r'<meta name="description"[^>]*>', home).group(0)

# ---- pages ----
templates = []
for dirpath, _, files in os.walk(OUT):
    if "_next" in dirpath or "index.html" not in files:
        continue
    rel = os.path.relpath(dirpath, OUT)
    route = "/" if rel == "." else "/" + rel.replace(os.sep, "/")
    html = read(os.path.join(dirpath, "index.html"))
    m = re.search(r"<main\b[^>]*>(.*)</main>", html, re.S)
    title = re.search(r"<title>(.*?)</title>", html, re.S).group(1)
    templates.append((route, title, clean(m.group(1))))
nf = read(os.path.join(OUT, "404.html"))
templates.append(("/404", re.search(r"<title>(.*?)</title>", nf).group(1), clean(re.search(r"<main\b[^>]*>(.*)</main>", nf, re.S).group(1))))
templates.sort()

runtime = read(os.path.join(ROOT, "scripts", "runtime.js")).replace("__NAV__", json.dumps(NAV, ensure_ascii=False))

tpl_html = "\n".join(
    f'<template data-route="{r}" data-title="{t.replace(chr(34), "&quot;")}">{body}</template>' for r, t, body in templates
)

doc = f"""<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>โรงเรียนบรรพตวิทยา | Bunpot Wittaya School</title>
{meta_desc}
<meta name="theme-color" content="#faf4ea">
<style>{css}</style>
{jsonld}
</head>
<body class="min-h-dvh antialiased">
{skip}
{header}
<main id="main" tabindex="-1" class="focus:outline-none"></main>
{footer}
<div hidden>
{tpl_html}
</div>
<script>{runtime}</script>
</body>
</html>
"""
with open(DEST, "w", encoding="utf-8") as f:
    f.write(doc)
print(f"wrote {DEST}: {len(doc.encode()) / 1024 / 1024:.2f} MB, {len(templates)} pages")
