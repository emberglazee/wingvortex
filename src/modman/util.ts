import {log, selectors} from 'vortex-api';
import {getGamePath} from "vortex-ext-common";
import * as path from "path";
import * as nfs from "fs";
import {IExtensionApi, IGame, IInstruction, IState} from "vortex-api/lib/types/api";
import {enableSicarioIntegration, Features} from "../settings";

// The merged pak name stays "SicarioMerge_P" and the mod type keeps its
// historic ids so existing installs carry over without a migration.
const MergedFileName = "SicarioMerge_P";

export const SicarioRelPath = path.join("ProjectWingman", "Content", "Paks", "~sicario");

export const getMergePath = (game: IGame, state: IState): string => {
    return path.join(getGamePath(game, state), SicarioRelPath);
}

export const isSicarioMerge = async (instructions: IInstruction[]): Promise<boolean> => {
    let pakSources = instructions.filter(f => f.type == "copy" && path.extname(f.source) == '.pak');
    //this should also check that the destination is ~sicario, but that's for later
    // also might want to tweak this to account for the report?
    return pakSources.length > 0 && pakSources.every(p => path.basename(p.source, path.extname(p.source)) == MergedFileName);
}

export const toggleIntegration = (api: IExtensionApi) => {
    const state = api.getState();
    api.store.dispatch(enableSicarioIntegration(!Features.isSicarioEnabled(state)));
}

const MODMAN_EXE = "modman.exe";

/**
 * Find the modman merger executable. Unlike the old PSM flow (which needed
 * the merger installed as a Vortex tool or dropped into the game folder),
 * modman ships inside this extension, so the bundled copy is the normal path.
 */
export async function getMergerPath(state: IState, gameId: string): Promise<string|undefined> {
    // 1. the copy bundled with the extension
    const bundled = path.join(__dirname, "modman", MODMAN_EXE);
    if (nfs.existsSync(bundled)) {
        return bundled;
    }
    // 2. a copy in the game folder (manual installs, or a user keeping a
    //    newer modman than the bundled one)
    const gamePath = getGamePath(selectors.gameById(state, gameId), state, true);
    const candidatePath = path.join(gamePath, MODMAN_EXE);
    if (nfs.existsSync(candidatePath)) {
        log('info', 'using modman.exe from the game folder (bundled copy not found)');
        return candidatePath;
    }
    log('warn', 'modman.exe not found: neither bundled nor in the game folder');
    return undefined;
}
