import {ITestResult} from "vortex-api/lib/types/ITestResult";
import {IExtensionApi} from "vortex-api/lib/types/api";
import {Features} from "../settings";
import {selectors} from "vortex-api";
import {GAME_ID} from "../index";
import {getMergerPath} from "./util";


export const modmanIntegrationTest = (api: IExtensionApi): () => Promise<ITestResult> => {
    const t = api.translate;
    const state = api.getState();
    return async () => {
        if (!Features.isSicarioEnabled(state)) {
            // not enabled;
            return undefined;
        }
        const gameMode = selectors.activeGameId(state);
        if (gameMode !== GAME_ID) {
            // game not supported
            return Promise.resolve(undefined);
        }
        return (await getMergerPath(state, gameMode)) !== undefined ? undefined : toolMissing;
    }
}



const toolMissing: ITestResult = {
    description: {
        short: 'modman merger not found',
        long: `You have configured Vortex to run the merger automatically, but modman.exe could not be found. It normally ships inside this extension, so try reinstalling the extension. Alternatively you can place a modman.exe in the game folder (downloads at [url]https://github.com/emberglazee/project-modman/releases[/url]) and Vortex will pick it up.`,
    },
    severity: "warning"
}
