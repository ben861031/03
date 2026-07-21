import os

filepath = r"c:\Users\7902\Downloads\03-main (3)\03-main\index.html"
css_path = r"c:\Users\7902\Downloads\03-main (3)\03-main\style.css"
js_path = r"c:\Users\7902\Downloads\03-main (3)\03-main\app.js"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract CSS
style_start = -1
style_end = -1
for i, line in enumerate(lines):
    if '<style>' in line:
        style_start = i
    if '</style>' in line:
        style_end = i
        break

if style_start != -1 and style_end != -1:
    css_lines = lines[style_start+1:style_end]
    with open(css_path, 'w', encoding='utf-8') as f:
        f.writelines(css_lines)
    print(f"Extracted {len(css_lines)} lines to style.css")

# Extract JS
script_start = -1
script_end = -1
for i, line in enumerate(lines):
    if '<script>' in line:
        script_start = i
    if '</script>' in line:
        script_end = i
        break

if script_start != -1 and script_end != -1:
    js_lines = lines[script_start+1:script_end]
    with open(js_path, 'w', encoding='utf-8') as f:
        f.writelines(js_lines)
    print(f"Extracted {len(js_lines)} lines to app.js")

if style_start != -1 and script_start != -1:
    new_lines = lines[:style_start] + ['<link rel="stylesheet" href="style.css">\n'] + lines[style_end+1:script_start] + ['<script src="app.js"></script>\n'] + lines[script_end+1:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Updated index.html")
