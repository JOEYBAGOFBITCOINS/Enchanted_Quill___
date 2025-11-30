import streamlit as st
import os
from bs4 import BeautifulSoup

# Paths
HTML_FILE = "index.html"
SRC_FOLDER = "src"

st.set_page_config(layout="wide")

# --- Load the HTML file ---
if not os.path.exists(HTML_FILE):
    st.error(f"{HTML_FILE} not found")
    st.stop()

with open(HTML_FILE, "r", encoding="utf-8") as f:
    html = f.read()

# --- Parse HTML and inline CSS/JS so Streamlit Cloud can render it ---
soup = BeautifulSoup(html, "html.parser")

# Inline all CSS located inside /src
for link in soup.find_all("link", rel="stylesheet"):
    href = link.get("href", "")
    if href.startswith("src/"):
        full_path = os.path.join(SRC_FOLDER, os.path.basename(href))
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as css_file:
                style_tag = soup.new_tag("style")
                style_tag.string = css_file.read()
                link.replace_with(style_tag)

# Inline all JS inside /src
for script in soup.find_all("script"):
    src = script.get("src", "")
    if src and src.startswith("src/"):
        full_path = os.path.join(SRC_FOLDER, os.path.basename(src))
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as js_file:
                script_tag = soup.new_tag("script")
                script_tag.string = js_file.read()
                script.replace_with(script_tag)

# Convert images to base64 for correct loading in Streamlit Cloud
import base64
for img in soup.find_all("img"):
    src = img.get("src", "")
    if src.startswith("src/"):
        full_path = os.path.join(SRC_FOLDER, os.path.basename(src))
        if os.path.exists(full_path):
            with open(full_path, "rb") as img_file:
                encoded = base64.b64encode(img_file.read()).decode()
                img["src"] = f"data:image/png;base64,{encoded}"

# Render final HTML
final_html = str(soup)
st.components.v1.html(final_html, height=2000, scrolling=True)
