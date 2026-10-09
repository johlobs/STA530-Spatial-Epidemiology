# build_topics.py
# Quarto pre-render script. Scans session*.qmd for topic headings and writes
# _topics-data.html, a <script> that defines window.STA530_TOPICS.
# The dashboard, the sidebar counters and the glossary links all read from it.
#
# Topic heading format (level 2 only):
#   ## 2.7 Moran's I {#t2-7 .topic flag="objective"}
#   ## 1.3 Coordinate reference systems {#t1-3 .topic flag="inferred"}
#   ## 4.14 Penalized-complexity priors {#t4-14 .topic flag="optional"}
#   ## 1.1 What is spatial data? {#t1-1 .topic}
#
# Flags: objective (matches a stated learning objective: the course syllabus,
# the instructor's Canvas session post or a "Learning goals" slide), keyq (an
# instructor's key question or in-class question), notes (emphasised in class
# according to the lecture notes, Notes.docx), inferred (AI-inferred exam relevance), optional
# (the instructor marked it as optional depth or outside the course scope),
# seminar (reserved for seminar content).

import glob
import json
import os
import re

HEADING = re.compile(r'^## (.+?)\s*\{#(\S+)\s+\.topic(?:\s+flag="(objective|keyq|notes|inferred|optional|seminar)")?\s*\}\s*$')

here = os.path.dirname(os.path.abspath(__file__))
topics = []

files = sorted(glob.glob(os.path.join(here, "session*.qmd")),
               key=lambda f: int(re.search(r"session(\d+)", f).group(1)))

# Cross-session pages get a group number after the sessions and a short label.
# Example: EXTRA_PAGES = [("seminar.qmd", 20, "Sem")]
EXTRA_PAGES = []

pages = [(path, int(re.search(r"session(\d+)", path).group(1)), None) for path in files]
pages += [(os.path.join(here, name), num, label) for name, num, label in EXTRA_PAGES
          if os.path.exists(os.path.join(here, name))]

for path, session, label in pages:
    page = os.path.basename(path).replace(".qmd", ".html")
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            m = HEADING.match(line.rstrip("\n"))
            if m:
                topics.append({
                    "id": m.group(2),
                    "title": m.group(1),
                    "lecture": session,
                    "label": label or f"S{session}",
                    "page": page,
                    "flag": m.group(3) or None,
                })

out = os.path.join(here, "_topics-data.html")
with open(out, "w", encoding="utf-8") as fh:
    fh.write("<script>\nwindow.STA530_TOPICS = ")
    fh.write(json.dumps(topics, ensure_ascii=False, indent=1))
    fh.write(";\n</script>\n")

print(f"build_topics.py: {len(topics)} topics from {len(pages)} pages")
