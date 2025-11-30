import streamlit as st
import os

html_file = "index.html"

if os.path.exists(html_file):
    with open(html_file, "r", encoding="utf-8") as f:
        page = f.read()
    st.components.v1.html(page, height=950, scrolling=True)
else:
    st.write(f"Error: {html_file} not found. Please ensure your main HTML file is in the repo root.")
