# Generates src/data/skinScriptProducts.generated.json from the Skin Script
# WooCommerce Store API snapshot saved at $env:TEMP\wc_p1.json
$ErrorActionPreference = 'Stop'

$raw = Get-Content "$env:TEMP\wc_p1.json" -Raw | ConvertFrom-Json

function Decode($s) {
  if ($null -eq $s) { return '' }
  return [System.Net.WebUtility]::HtmlDecode([string]$s)
}
function Strip($s) {
  if ($null -eq $s) { return '' }
  $t = [System.Net.WebUtility]::HtmlDecode([string]$s)
  $t = $t -replace '<[^>]+>', ' '
  $t = $t -replace '\s+', ' '
  return $t.Trim()
}

# Product-type categories in priority order -> display group
$typeOrder = @('Chemical Peels','Enzymes','Cleansers','Toners','Exfoliants','Serums/Lips','Moisturizers','SPF','Masks','Retail Masks','Pre/Post Peel Care','Pro Tools','Retail Kits','Pro Bundles','Discovery Kit','Desert Collection')
$groupMap = @{
  'Chemical Peels'      = 'Chemical Peels'
  'Enzymes'             = 'Enzymes'
  'Cleansers'           = 'Cleansers'
  'Toners'              = 'Toners'
  'Exfoliants'          = 'Exfoliants'
  'Serums/Lips'         = 'Serums & Lips'
  'Moisturizers'        = 'Moisturizers'
  'SPF'                 = 'Sunscreen (SPF)'
  'Masks'               = 'Masks'
  'Retail Masks'        = 'Masks'
  'Pre/Post Peel Care'  = 'Peel Care'
  'Pro Tools'           = 'Tools'
  'Retail Kits'         = 'Kits & Collections'
  'Pro Bundles'         = 'Kits & Collections'
  'Discovery Kit'       = 'Kits & Collections'
  'Desert Collection'   = 'Kits & Collections'
}
$skinOrder = @('Normal/Combo','Dry','Oily','Sensitive','Acne Safe')
$skinMap = @{ 'Normal/Combo'='Normal/Combo'; 'Dry'='Dry'; 'Oily'='Oily'; 'Sensitive'='Sensitive'; 'Acne Safe'='Acne-safe' }

$out = @()
foreach ($p in $raw) {
  $cats = @($p.categories | ForEach-Object { $_.name })
  if ($cats -contains 'Education') { continue }

  $group = $null
  foreach ($tc in $typeOrder) { if ($cats -contains $tc) { $group = $groupMap[$tc]; break } }
  if (-not $group) { $group = 'Other' }

  $skin = @()
  foreach ($sc in $skinOrder) { if ($cats -contains $sc) { $skin += $skinMap[$sc] } }

  $isRetail = $cats -contains 'Retail Line'
  $pro = ((($cats -contains 'Professional Line') -and (-not $isRetail)) `
    -or ($p.description -match 'Professional Use Only') `
    -or ($cats -contains 'Pro Tools') `
    -or ($cats -contains 'Pro Bundles'))

  $price = 0.0
  if ($p.prices -and $p.prices.regular_price) {
    $minor = 2
    if ($p.prices.currency_minor_unit) { $minor = [int]$p.prices.currency_minor_unit }
    $price = [math]::Round([double]$p.prices.regular_price / [math]::Pow(10, $minor), 2)
  }

  $blurb = Strip $p.short_description
  if (-not $blurb) { $blurb = Strip $p.description }
  $blurb = ($blurb -replace 'Professional Use Only', '').Trim()
  if (($blurb -replace '[^\w]', '').Length -lt 4) { $blurb = '' }
  if ($blurb.Length -gt 190) { $blurb = $blurb.Substring(0, 187).Trim() + '...' }

  $name = Decode $p.name
  $size = ''
  $m = [regex]::Match($name, '(?i)(\d+(\.\d+)?\s?(oz|ml|g)\b)')
  if ($m.Success) { $size = $m.Value }

  $img = ''
  if ($p.images -and $p.images.Count -gt 0) { $img = [string]$p.images[0].src }

  $out += [pscustomobject]@{
    id        = [string]$p.slug
    name      = $name
    category  = $group
    skinTypes = $skin
    price     = $price
    size      = $size
    blurb     = $blurb
    image     = $img
    pro       = [bool]$pro
    retail    = [bool]$isRetail
    listed    = [bool]$isRetail
    dropship  = $false
    inStock   = $false
  }
}

$sorted = $out | Sort-Object category, name
"Generated $($sorted.Count) products"
"By group:"
$sorted | Group-Object category | Sort-Object Name | ForEach-Object { "  {0,3}  {1}" -f $_.Count, $_.Name }
$sorted | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 "src\data\skinScriptProducts.generated.json"
