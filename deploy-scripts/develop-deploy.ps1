Write-Host "Deploying React app to development server..."
# Example for Windows/IIS deployment
# Copy-Item -Path "build\*" -Destination "C:\Apps\halaz.ir\dev-management" -Recurse -Force
Copy-Item -Path "$env:CI_PROJECT_DIR\build\*" -Destination "C:\Apps\halaz.ir\dev-management" -Recurse -Force
