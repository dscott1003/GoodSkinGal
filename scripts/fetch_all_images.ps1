# Downloads every Skin Script product image locally into src/assets/products/,
# named by product id, so the shop no longer depends on hotlinking (and keeps
# working even if Skin Script changes their catalog/image URLs later).
$ErrorActionPreference = 'Stop'

$dir = 'src\assets\products'
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

# Start clean so the folder exactly matches the current catalog.
Get-ChildItem $dir -File -Include *.webp, *.jpg, *.jpeg, *.png -ErrorAction SilentlyContinue | Remove-Item -Force

$j = Get-Content 'src\data\skinScriptProducts.generated.json' -Raw | ConvertFrom-Json
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

$ok = 0; $fail = 0; $i = 0
foreach ($p in $j) {
  $i++
  if (-not $p.image) { Write-Host "[$i] SKIP (no url) $($p.id)"; $fail++; continue }
  $clean = ($p.image -split '\?')[0]
  $ext = [System.IO.Path]::GetExtension($clean)
  if (-not $ext) { $ext = '.webp' }
  $target = Join-Path $dir ($p.id + $ext)
  & curl.exe -s -L -f --connect-timeout 10 --max-time 30 --retry 2 -A $ua -o $target $p.image
  if ($LASTEXITCODE -eq 0 -and (Test-Path $target) -and (Get-Item $target).Length -gt 800) {
    $ok++
    Write-Host "[$i/$($j.Count)] OK   $($p.id)$ext"
  } else {
    if (Test-Path $target) { Remove-Item $target -Force }
    $fail++
    Write-Host "[$i/$($j.Count)] FAIL $($p.id)"
  }
  Start-Sleep -Milliseconds 250
}
Write-Host "DONE ok=$ok fail=$fail"
