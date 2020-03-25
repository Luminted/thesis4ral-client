import {GrabbedEntity} from './common/dataModelDefinitions';
import {RootState} from './store'
import { MaybeUndefined } from './common/genericTypes';

export function selectGrabbedEntityByClientId(clientId: string) {
    return function (store: RootState): MaybeUndefined<GrabbedEntity> {
        return store.gameState.clients.find(client => client.clientInfo.clientId === clientId)?.grabbedEntitiy;
    }
}