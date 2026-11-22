Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()

$src = Split-Path -Parent $PSScriptRoot
$script:dest = ''
$script:proc = $null

$f = New-Object System.Windows.Forms.Form
$f.Text = 'Installation de World Wide Web'
$f.Size = New-Object System.Drawing.Size(520, 310)
$f.StartPosition = 'CenterScreen'
$f.FormBorderStyle = 'FixedDialog'
$f.MaximizeBox = $false
$f.BackColor = [System.Drawing.Color]::FromArgb(30, 33, 40)
$f.ForeColor = [System.Drawing.Color]::White
$f.Font = New-Object System.Drawing.Font('Segoe UI', 10)
$ico = Join-Path $src 'icon.ico'
if (Test-Path $ico) { $f.Icon = New-Object System.Drawing.Icon($ico) }

$t = New-Object System.Windows.Forms.Label
$t.Text = 'World Wide Web'
$t.Font = New-Object System.Drawing.Font('Segoe UI', 18)
$t.Location = New-Object System.Drawing.Point(20, 15)
$t.AutoSize = $true
$f.Controls.Add($t)

$l = New-Object System.Windows.Forms.Label
$l.Text = "Choisissez l'emplacement de l'installation :"
$l.Location = New-Object System.Drawing.Point(22, 70)
$l.AutoSize = $true
$f.Controls.Add($l)

$tb = New-Object System.Windows.Forms.TextBox
$tb.Text = Join-Path $env:LOCALAPPDATA 'Programs\World Wide Web'
$tb.Location = New-Object System.Drawing.Point(22, 98)
$tb.Size = New-Object System.Drawing.Size(365, 28)
$f.Controls.Add($tb)

$br = New-Object System.Windows.Forms.Button
$br.Text = 'Parcourir...'
$br.Location = New-Object System.Drawing.Point(395, 96)
$br.Size = New-Object System.Drawing.Size(95, 30)
$br.ForeColor = [System.Drawing.Color]::Black
$f.Controls.Add($br)

$cb = New-Object System.Windows.Forms.CheckBox
$cb.Text = 'Créer un raccourci sur le Bureau'
$cb.Checked = $true
$cb.Location = New-Object System.Drawing.Point(22, 140)
$cb.AutoSize = $true
$f.Controls.Add($cb)

$st = New-Object System.Windows.Forms.Label
$st.Text = ''
$st.Location = New-Object System.Drawing.Point(22, 178)
$st.Size = New-Object System.Drawing.Size(470, 24)
$f.Controls.Add($st)

$pb = New-Object System.Windows.Forms.ProgressBar
$pb.Style = 'Marquee'
$pb.MarqueeAnimationSpeed = 30
$pb.Location = New-Object System.Drawing.Point(22, 206)
$pb.Size = New-Object System.Drawing.Size(468, 12)
$pb.Visible = $false
$f.Controls.Add($pb)

$go = New-Object System.Windows.Forms.Button
$go.Text = 'Installer'
$go.Location = New-Object System.Drawing.Point(290, 232)
$go.Size = New-Object System.Drawing.Size(95, 32)
$go.ForeColor = [System.Drawing.Color]::Black
$f.Controls.Add($go)

$ca = New-Object System.Windows.Forms.Button
$ca.Text = 'Annuler'
$ca.Location = New-Object System.Drawing.Point(395, 232)
$ca.Size = New-Object System.Drawing.Size(95, 32)
$ca.ForeColor = [System.Drawing.Color]::Black
$f.Controls.Add($ca)
$ca.Add_Click({ $f.Close() })

$br.Add_Click({
  $d = New-Object System.Windows.Forms.FolderBrowserDialog
  $d.Description = "Choisissez le dossier dans lequel installer World Wide Web"
  if ($d.ShowDialog() -eq 'OK') {
    $tb.Text = Join-Path $d.SelectedPath 'World Wide Web'
  }
})

$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 500
$timer.Add_Tick({
  if ($script:proc -and $script:proc.HasExited) {
    $timer.Stop()
    $pb.Visible = $false
    if (-not (Test-Path (Join-Path $script:dest 'node_modules\electron'))) {
      $st.Text = "Échec de l'installation (npm install). Node.js est-il installé ?"
      $go.Enabled = $true; $ca.Enabled = $true
      return
    }
    if ($cb.Checked) {
      $sh = (New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path ([Environment]::GetFolderPath('Desktop')) 'World Wide Web.lnk'))
      $sh.TargetPath = Join-Path $script:dest 'dist\Lancer.bat'
      $sh.WorkingDirectory = $script:dest
      $sh.WindowStyle = 7
      $sh.IconLocation = Join-Path $script:dest 'icon.ico'
      $sh.Save()
    }
    $st.Text = 'Installation terminée !'
    $go.Text = 'Lancer'
    $go.Enabled = $true
    $ca.Text = 'Fermer'; $ca.Enabled = $true
    $script:done = $true
  }
})

$go.Add_Click({
  if ($script:done) {
    Start-Process -FilePath (Join-Path $script:dest 'dist\Lancer.bat') -WorkingDirectory $script:dest -WindowStyle Hidden
    $f.Close(); return
  }
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    [System.Windows.Forms.MessageBox]::Show("Node.js n'est pas installé.", 'World Wide Web') | Out-Null
    return
  }
  $script:dest = $tb.Text.Trim()
  if (-not $script:dest) { return }
  $go.Enabled = $false; $ca.Enabled = $false; $br.Enabled = $false; $tb.Enabled = $false
  $pb.Visible = $true
  try {
    $st.Text = 'Copie des fichiers...'
    $f.Refresh()
    New-Item -ItemType Directory -Force -Path $script:dest | Out-Null
    robocopy $src $script:dest /E /XD node_modules .git /NFL /NDL /NJH /NJS /NP | Out-Null
    if ($LASTEXITCODE -ge 8) { throw 'copie impossible' }
    $st.Text = 'Installation des composants (quelques minutes)...'
    $script:proc = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', 'npm install' -WorkingDirectory $script:dest -WindowStyle Hidden -PassThru
    $timer.Start()
  } catch {
    $pb.Visible = $false
    $st.Text = "Erreur : $($_.Exception.Message)"
    $go.Enabled = $true; $ca.Enabled = $true; $br.Enabled = $true; $tb.Enabled = $true
  }
})

[void]$f.ShowDialog()
