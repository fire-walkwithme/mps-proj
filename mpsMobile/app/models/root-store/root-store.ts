import { Instance, SnapshotOut, types, getEnv, applySnapshot } from 'mobx-state-tree';
import { NavigationStoreModel } from '../../navigation/navigation-store';
import { UserModel, UserSnapshot } from '../user';
import { ContestsStoreModel } from '../contests-store';
import { Api } from '../../services/api';
import { UserCredentials } from '../../screens/auth-screen';
import { NavigationActions } from 'react-navigation';
import { withEnvironment } from '../extensions';

import * as storage from '../../utils/storage';
/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    /**
     * The store responsible for voting and fetching contests from the server
     */
    contestsStore: types.optional(ContestsStoreModel, {}),
    /**
     * The session of the current user
     */
    user: types.optional(UserModel, {}),
  })
  .extend(withEnvironment)
  .actions(self => {
    const api = self.environment.api;
    return {
      login: (userCredentials: UserCredentials) => {
        api.login(userCredentials).then(res => {
          if (res.kind !== 'ok') {
            self.user.setStatus('error');
          } else {
            const newSignedInUser: UserSnapshot = {
              name: userCredentials.username,
              token: res.token,
              email: res.email,
              status: 'success',
            };
            self.user.setUser(newSignedInUser);
            api.setToken(newSignedInUser.token);
            self.navigationStore.dispatch(NavigationActions.navigate({ routeName: 'overview' }));
          }
        });
      },
      logout: async () => {
        await api.logout();
        const snapshot: RootStoreSnapshot = await storage.load('DEFAULT_STATE');
        applySnapshot(self, snapshot);
      },
    };
  })
  .actions(self => ({
    afterCreate() {
      const api: Api = getEnv(self).api;
      api.setToken(self.user.token);
    },
  }));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
