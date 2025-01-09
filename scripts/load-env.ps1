# Load environment variables from .env file
Get-Content ../.env | ForEach-Object {
    if ($_ -match '^([^#=]+)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        # Remove any comments after the value
        $value = $value -replace '#.*$', ''
        # Remove quotes if present
        $value = $value -replace '^[''"]|[''"]$', ''
        [System.Environment]::SetEnvironmentVariable($name, $value)
    }
}

# Run the Facebook setup script
& "$PSScriptRoot/setup_facebook_app.ps1"
