$lines = (Get-Content -Path "app.js" -Raw -Encoding UTF8)

# Find the start of the problem block
$searchText = "document.getElementById('search').addEventListener('input',"
$startIndex = $lines.IndexOf($searchText)

if ($startIndex -eq -1) {
    Write-Host "Could not find start index"
    exit
}

# The block ends right before "document.addEventListener('DOMContentLoaded', initApp);"
$endText = "document.addEventListener('DOMContentLoaded', initApp);"
$endIndex = $lines.IndexOf($endText)

$problemBlock = $lines.Substring($startIndex, $endIndex - $startIndex)

# Create a function wrapping the problem block
$wrappedBlock = @"
function initFiltersAndEvents() {
$problemBlock
}
"@

# Replace the problem block with the wrapped block
$newLines = $lines.Remove($startIndex, $endIndex - $startIndex).Insert($startIndex, $wrappedBlock)

# Also need to call initFiltersAndEvents() inside initApp()
# Find render(); inside initApp
$newLines = $newLines -replace 'setupEvents\(\);\s*render\(\);', "setupEvents();`n    initFiltersAndEvents();`n    render();"

Set-Content -Path "app2.js" -Value $newLines -Encoding UTF8
Move-Item -Path "app2.js" -Destination "app.js" -Force
Write-Host "Fixed!"
