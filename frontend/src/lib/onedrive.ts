import { PublicClientApplication, Configuration, AuthenticationResult } from "@azure/msal-node";
import sanitize from "sanitize-filename";

const CLIENT_ID = "f2a0cca4-a73a-497c-aee3-d15256e5c8d3"; // Replace with your app's Client ID
const AUTHORITY = "https://login.microsoftonline.com/consumers"; // For personal accounts
const SCOPES = ["Files.ReadWrite", "User.Read"];
const SERVER = "http://localhost:3000";

// Microsoft Graph API base URL
const GRAPH_API_ENDPOINT = "https://graph.microsoft.com/v1.0/me/drive";

// Note: msal-node does not provide a direct refresh token API for public clients.
// In production you might need to use an Authorization Code Flow or device code flow.
// Here, we assume that acquireTokenByRefreshToken is available or simulate its behavior.
async function getValidAccessToken(): Promise<string> {
    const refreshToken = 'M.C511_SN1.0.U.-Cpj0vIgI*edNN*!KS*ILm*4cbfeKl0gmT3!miMrUKZBKi0W5xTn0PomTV!YDuMQpZtpZ!lFK7GXZl2XL8fGlNSaIhICekdmPvQjlIzYJ5Vb6c4IHGZRYa3V*WgvwgOMfO5Gam1jCrxWfkdMJsHz5fhkbVmyY6*aWbaeWgdIAOx5Z7yQHQYJjG8pqqNC4FrCjmUkmTbq0kV5O1tZ9D9dov4T6OZbo2MqGB4L*hL!EjEpVHGZ!AWNOzhAXMcY*TukN9mWaIT8T6z!jJxrRTOrsGUyd7E7HNRV1IqrXXGWC5Tj1lT7zqAfx8HUnohf9CL*FjULwaExzQ8BVXWWhbwROC2yNDWAJCEp!e7DCZ6HzehOi';

    const config: Configuration = {
        auth: {
            clientId: CLIENT_ID,
            authority: AUTHORITY
        }
    };

    const pca = new PublicClientApplication(config);

    // Simulated token request using refresh token.
    // Note: In msal-node, refresh token flows may require a confidential client or a custom implementation.
    const tokenRequest = {
        refreshToken: refreshToken,
        scopes: SCOPES
    };

    // @ts-ignore: acquireTokenByRefreshToken might not be available on PublicClientApplication.
    const result: AuthenticationResult | null = await pca.acquireTokenByRefreshToken(tokenRequest);
    if (result && result.accessToken) {
        return result.accessToken;
    } else {
        throw new Error(`Could not refresh access token: ${result ? result.errorDescription : 'Unknown error'}`);
    }
}

export async function listFiles(): Promise<any[] | null> {
    const token = await getValidAccessToken();
    const headers = { "Authorization": `Bearer ${token}` };

    const response = await fetch(`${GRAPH_API_ENDPOINT}/root/children`, { headers });
    if (response.ok) {
        const data = await response.json();
        return data.value || [];
    } else {
        console.error(`Error: ${await response.text()}`);
        return null;
    }
}

export async function uploadFile(binaryData: Buffer, onedrivePath: string, fileName: string): Promise<any | null> {
    // Use sanitize-filename package to secure the file name
    fileName = sanitize(fileName);

    const token = await getValidAccessToken();
    let headers: Record<string, string> = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/octet-stream"
    };

    const uploadUrl = `${GRAPH_API_ENDPOINT}/root:/${onedrivePath}/${fileName}:/content`;
    const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers,
        body: binaryData
    });

    if (response.ok && (response.status === 200 || response.status === 201)) {
        const uploadResponse = await response.json();
        // Change Content-Type header for JSON request
        headers["Content-Type"] = "application/json";
        const createLinkUrl = `${GRAPH_API_ENDPOINT}/items/${uploadResponse.id}/createLink`;
        const linkResponse = await fetch(createLinkUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                type: "embed",
                scope: "anonymous"
            })
        });
        if (linkResponse.ok) {
            const linkJson = await linkResponse.json();
            return {
                onedriveUrl: linkJson.link.webUrl,
                url: `${SERVER}/${onedrivePath}/${fileName}`,
            };
        } else {
            return {
                onedriveUrl: `${SERVER}/${onedrivePath}/${fileName}`,
                url: `${SERVER}/${onedrivePath}/${fileName}`,
            };
        }
    } else {
        console.error(`Upload failed: ${await response.text()}`);
        return null;
    }
}

export async function downloadFile(onedrivePath: string): Promise<Buffer> {
    const token = await getValidAccessToken();
    const headers = {
        "Authorization": `Bearer ${token}`,
    };

    // Construct URL using the OneDrive path.
    const url = `${GRAPH_API_ENDPOINT}/root:/${onedrivePath}:/content`;
    const response = await fetch(url, { headers });

    if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } else {
        throw new Error(`Download failed: ${await response.text()}`);
    }
}

export async function deleteFile(fileName: string): Promise<void> {
    const token = await getValidAccessToken();
    const headers = { "Authorization": `Bearer ${token}` };

    // Get the file ID by listing files
    const files = await listFiles();
    let fileId: string | null = null;
    if (files) {
        for (const file of files) {
            if (file.name === fileName) {
                fileId = file.id;
                break;
            }
        }
    }

    if (fileId) {
        const response = await fetch(`${GRAPH_API_ENDPOINT}/items/${fileId}`, {
            method: 'DELETE',
            headers
        });
        if (response.status === 204) {
            console.log("File deleted successfully!");
        } else {
            console.error(`Delete failed: ${await response.text()}`);
        }
    } else {
        console.log("File not found.");
    }
}
