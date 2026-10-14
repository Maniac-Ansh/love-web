param(
    [int]$Port = 8080,
    [string]$Root = $PSScriptRoot
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
    $listener.Start()
    Write-Output "Server running at http://localhost:$Port/"
} catch {
    Write-Error "Failed to start listener: $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".mp3"  = "audio/mpeg"
    ".mpeg" = "audio/mpeg"
    ".wav"  = "audio/wav"
    ".ogg"  = "audio/ogg"
    ".m4a"  = "audio/mp4"
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($urlPath)) {
        $urlPath = "game/index.html"
    }

    $filePath = [System.IO.Path]::Combine($Root, $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

    if (Test-Path -Path $filePath -PathType Container) {
        $filePath = [System.IO.Path]::Combine($filePath, "index.html")
    }

    if (Test-Path -Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        
        $response.ContentType = $contentType
        $response.AddHeader("Accept-Ranges", "bytes")
        $fileInfo = New-Object System.IO.FileInfo($filePath)
        $totalLength = $fileInfo.Length

        # Check for Range header (required for browser audio/video seeking and streaming)
        $rangeHeader = $request.Headers["Range"]
        if ($rangeHeader -and $rangeHeader -match "bytes=(\d+)-(\d*)") {
            $start = [int64]$matches[1]
            $end = if ($matches[2] -ne "") { [int64]$matches[2] } else { $totalLength - 1 }
            if ($end -ge $totalLength) { $end = $totalLength - 1 }
            $length = $end - $start + 1

            $response.StatusCode = 206
            $response.AddHeader("Content-Range", "bytes $start-$end/$totalLength")
            $response.ContentLength64 = $length

            if ($request.HttpMethod -ne "HEAD") {
                try {
                    $fs = [System.IO.File]::OpenRead($filePath)
                    [void]$fs.Seek($start, [System.IO.SeekOrigin]::Begin)
                    $buffer = New-Object byte[] 65536
                    $bytesRemaining = $length
                    while ($bytesRemaining -gt 0) {
                        $bytesToRead = [Math]::Min($bytesRemaining, $buffer.Length)
                        $bytesRead = $fs.Read($buffer, 0, $bytesToRead)
                        if ($bytesRead -le 0) { break }
                        $response.OutputStream.Write($buffer, 0, $bytesRead)
                        $bytesRemaining -= $bytesRead
                    }
                    $fs.Close()
                } catch {}
            }
        } else {
            $response.StatusCode = 200
            $response.ContentLength64 = $totalLength

            if ($request.HttpMethod -ne "HEAD") {
                try {
                    $fs = [System.IO.File]::OpenRead($filePath)
                    $buffer = New-Object byte[] 65536
                    while (($bytesRead = $fs.Read($buffer, 0, $buffer.Length)) -gt 0) {
                        $response.OutputStream.Write($buffer, 0, $bytesRead)
                    }
                    $fs.Close()
                } catch {}
            }
        }
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        try {
            $response.OutputStream.Write($msg, 0, $msg.Length)
        } catch {}
    }

    try { $response.OutputStream.Close() } catch {}
}
