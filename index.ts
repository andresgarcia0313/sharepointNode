import { SPDefault } from "@pnp/nodejs";
import "@pnp/sp/webs/index.js";
import { readFileSync } from 'fs';
import { Configuration } from "@azure/msal-node";

function() {
    // configure your node options (only once in your application)
    const buffer = readFileSync("c:/temp/key.pem");

    const config: Configuration = {
        auth: {
            authority: "https://login.microsoftonline.com/{tenant id or common}/",
            clientId: "{application (client) i}",
            clientCertificate: {
              thumbprint: "{certificate thumbprint, displayed in AAD}",
              privateKey: buffer.toString(),
            },
        },
    };

    const sp = spfi().using(SPDefault({
        baseUrl: 'https://{my tenant}.sharepoint.com/sites/dev/',
        msal: {
            config: config,
            scopes: [ 'https://{my tenant}.sharepoint.com/.default' ]
        }
    }));

    // make a call to SharePoint and log it in the console
    const w = await sp.web.select("Title", "Description")();
    console.log(JSON.stringify(w, null, 4));
}();