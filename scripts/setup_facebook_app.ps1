# Facebook App Setup Script
# This script helps configure your Facebook App for Supabase OAuth integration

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$FACEBOOK_APP_ID = $env:VITE_FACEBOOK_APP_ID
$FACEBOOK_APP_SECRET = $env:VITE_FACEBOOK_APP_SECRET
$SUPABASE_CALLBACK_URL = "https://qbybzxwvggqtvxdfwerg.supabase.co/auth/v1/callback"
$APP_DOMAIN = "qbybzxwvggqtvxdfwerg.supabase.co"

# Function to get Facebook Access Token
function Get-FacebookAccessToken {
    try {
        Write-Host "Requesting access token from Facebook..."
        $tokenUrl = "https://graph.facebook.com/oauth/access_token"
        $params = @{
            client_id = $FACEBOOK_APP_ID
            client_secret = $FACEBOOK_APP_SECRET
            grant_type = "client_credentials"
        }
        
        $response = Invoke-RestMethod -Uri $tokenUrl -Method Get -Body $params
        Write-Host "Successfully retrieved access token"
        return $response.access_token
    }
    catch {
        Write-Host "Error getting access token: $($_.Exception.Message)"
        Write-Host "Response: $($_.Exception.Response.StatusCode.Value__) - $($_.Exception.Response.StatusDescription)"
        
        # Check if we can get more error details
        try {
            $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
            Write-Host "Error details: $($errorDetails.error.message)"
        }
        catch {
            # No additional error details available
        }
        return $null
    }
}

# Function to update Facebook App settings
function Update-FacebookAppSettings {
    param (
        [string]$accessToken
    )

    Write-Host "`nUpdating Facebook App settings..."

    # Update OAuth Settings
    try {
        Write-Host "Configuring OAuth settings..."
        $oauthUrl = "https://graph.facebook.com/v18.0/$FACEBOOK_APP_ID/settings"
        $oauthBody = @{
            client_token = $FACEBOOK_APP_SECRET
            redirect_uris = @($SUPABASE_CALLBACK_URL)
            app_domains = @($APP_DOMAIN)
            access_token = $accessToken
        }

        $response = Invoke-RestMethod -Uri $oauthUrl -Method Post -Body $oauthBody -ContentType "application/json"
        Write-Host "Successfully updated OAuth settings"
    }
    catch {
        Write-Host "Error updating OAuth settings: $($_.Exception.Message)"
        Write-Host "Response: $($_.Exception.Response.StatusCode.Value__) - $($_.Exception.Response.StatusDescription)"
    }

    # Configure Facebook Login
    try {
        Write-Host "`nConfiguring Facebook Login..."
        $loginUrl = "https://graph.facebook.com/v18.0/$FACEBOOK_APP_ID/facebook_login"
        $loginBody = @{
            enabled = $true
            client_oauth_login = $true
            web = @{
                auth_type = "reauthenticate"
                oauth_client_id = $FACEBOOK_APP_ID
                oauth_client_secret = $FACEBOOK_APP_SECRET
                oauth_redirect_uri = $SUPABASE_CALLBACK_URL
            }
            access_token = $accessToken
        }

        $response = Invoke-RestMethod -Uri $loginUrl -Method Post -Body ($loginBody | ConvertTo-Json -Depth 10) -ContentType "application/json"
        Write-Host "Successfully configured Facebook Login"
    }
    catch {
        Write-Host "Error configuring Facebook Login: $($_.Exception.Message)"
        Write-Host "Response: $($_.Exception.Response.StatusCode.Value__) - $($_.Exception.Response.StatusDescription)"
    }
}

# Main execution
Write-Host "Starting Facebook App Configuration..."

# Check if environment variables are set
if (-not $FACEBOOK_APP_ID -or -not $FACEBOOK_APP_SECRET) {
    Write-Host "Error: Please set VITE_FACEBOOK_APP_ID and VITE_FACEBOOK_APP_SECRET in your .env file"
    exit 1
}

Write-Host "Using App ID: $($FACEBOOK_APP_ID.Substring(0,4))..." # Show only first 4 chars for security
Write-Host "Callback URL: $SUPABASE_CALLBACK_URL"
Write-Host "App Domain: $APP_DOMAIN"

# Get access token
$accessToken = Get-FacebookAccessToken

if ($accessToken) {
    Write-Host "`nAccess token obtained successfully"
    Update-FacebookAppSettings -accessToken $accessToken
    
    Write-Host "`nConfiguration Complete!"
    Write-Host "`nPlease verify the following manually in the Facebook Developer Console (https://developers.facebook.com):"
    Write-Host "1. OAuth redirect URI: $SUPABASE_CALLBACK_URL"
    Write-Host "2. App Domain: $APP_DOMAIN"
    Write-Host "3. Facebook Login is enabled and configured"
    Write-Host "`nRequired Permissions:"
    Write-Host "- pages_manage_posts"
    Write-Host "- pages_read_engagement"
    Write-Host "- pages_show_list"
}
else {
    Write-Host "`nError: Failed to get Facebook access token. Please check your App ID and Secret"
    exit 1
}
