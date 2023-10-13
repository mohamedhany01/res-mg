import { addSettings } from '../actions/app.action';
import { AppSettings } from '../modules/app-settings.interface';

import { createReducer, on } from '@ngrx/store';

export const initialState: Readonly<AppSettings> = {
  supplier: {
    name: '',
    avatarUrl: '',
    avatarAlt: '',
  },
};

const _settingsReducer = createReducer(
  initialState,
  on(addSettings, (state, { settings }): AppSettings => {
    return {
      ...state,
      supplier: { ...settings.supplier },
    };
  })
);
export function settingsReducer(state: any, action: any) {
  return _settingsReducer(state, action);
}
