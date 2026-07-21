$css = Get-Content -Path "style.css" -Raw -Encoding UTF8

$rootVars = @"
:root {
  --bg-main: #f4f7fb;
  --text-main: #1f2937;
  --text-muted: #64748b;
  --sidebar-bg: #173153;
  --sidebar-hover: #35639c;
  --sidebar-active: #4f7fc0;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --success: #15803d;
  --danger: #dc2626;
  --warning: #d97706;
  --secondary: #475569;
  --border-light: #e5e7eb;
  --table-th-bg: #edf3fb;
}

"@

$css = $css -replace '(?s)\*\{margin:0', ($rootVars + '*{margin:0')

# Color replacements
$css = $css -replace '#f4f7fb', 'var(--bg-main)'
$css = $css -replace '#1f2937', 'var(--text-main)'
$css = $css -replace '#173153', 'var(--sidebar-bg)'
$css = $css -replace '#4f7fc0', 'var(--sidebar-active)'
$css = $css -replace '#2563eb', 'var(--primary)'
$css = $css -replace '#1d4ed8', 'var(--primary-hover)'
$css = $css -replace '#edf3fb', 'var(--table-th-bg)'
$css = $css -replace '#64748b', 'var(--text-muted)'

# Animations for Modal
$animations = @"

@keyframes modalFadeIn {
  from { background: rgba(0,0,0,0); }
  to { background: rgba(0,0,0,0.55); }
}
@keyframes modalBoxSlideDown {
  from { opacity: 0; transform: translateY(-20px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
"@

$css = $css + $animations
$css = $css -replace '\.modal\{', '.modal{animation: modalFadeIn 0.25s ease-out;'
$css = $css -replace '\.modal-box\{', '.modal-box{animation: modalBoxSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;'

# Better Toast
$css = $css -replace 'transform:translateY\(8px\)', 'transform:translateY(16px) scale(0.95)'
$css = $css -replace 'transition:\.2s', 'transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
$css = $css -replace 'transform:translateY\(0\)', 'transform:translateY(0) scale(1)'

Set-Content -Path "style.css" -Value $css -Encoding UTF8
Write-Host "style.css upgraded!"
