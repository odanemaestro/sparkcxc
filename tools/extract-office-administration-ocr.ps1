param([string]$SourceDir,[string]$OutputDir)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$ErrorActionPreference = 'Stop'
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime]
$taskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
function Wait-OcrOperation($Operation, $ResultType) {
  $pendingTask = $taskMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $pendingTask.Wait()
  $pendingTask.Result
}
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime]

foreach($inputImage in (Get-ChildItem -LiteralPath $SourceDir -File -Filter '*.png' -Recurse)){
 $ImagePath=$inputImage.FullName
 $OutputPath=Join-Path $inputImage.Directory.FullName ($inputImage.BaseName+'.json')
 if(Test-Path -LiteralPath $OutputPath){continue}
 $imageStream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
$imageWriter = New-Object Windows.Storage.Streams.DataWriter($imageStream)
$imageWriter.WriteBytes([IO.File]::ReadAllBytes($ImagePath))
$null = Wait-OcrOperation ($imageWriter.StoreAsync()) ([uint32])
$null = $imageWriter.DetachStream()
$imageStream.Seek(0)
$imageDecoder = Wait-OcrOperation ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($imageStream)) ([Windows.Graphics.Imaging.BitmapDecoder])
$bitmap = Wait-OcrOperation ($imageDecoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
$ocrEngine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
$recognized = Wait-OcrOperation ($ocrEngine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
$lines = @($recognized.Lines | ForEach-Object {
  @{ text = $_.Text; words = @($_.Words | ForEach-Object { @{ text = $_.Text; x = $_.BoundingRect.X; y = $_.BoundingRect.Y; width = $_.BoundingRect.Width; height = $_.BoundingRect.Height } }) }
})
@{ width = $bitmap.PixelWidth; height = $bitmap.PixelHeight; lines = $lines } | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $OutputPath -Encoding UTF8
$bitmap.Dispose()
$imageStream.Dispose()

 Write-Output $inputImage.FullName
}
