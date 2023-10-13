import { addSettings, loadSettings } from '../actions/app.action';
import { AppSettings } from '../modules/app-settings.interface';

import { createReducer, on } from '@ngrx/store';

export const initialState: Readonly<AppSettings> = {
  supplier: {
    name: 'foo',
    avatarUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    avatarAlt: 'Supplier',
  },
};

const _settingsReducer = createReducer(
  initialState,
  on(loadSettings, state => state),
  on(addSettings, (state, { settings }): AppSettings => {
    const newSettings = {
      ...state,
      supplier: { ...settings.supplier },
    };

    return newSettings;
  })
);
export function settingsReducer(state: AppSettings | undefined, action: any) {
  return _settingsReducer(state, action);
}
