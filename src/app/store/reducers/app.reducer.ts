import { addSettings, loadSettings } from '../actions/app.action';
import { AppSettings } from '../modules/app-settings.interface';

import { createReducer, on } from '@ngrx/store';

export const initialState: Readonly<AppSettings> = {
  supplier: {
    name: '',
    avatarUrl: '../../assets/avatars/default.png',
    avatarAlt: 'Supplier',
  },
  resourceAvailability: {
    availabilityTime: '',
    resourceTime: {
      fixedTime: false,
      serviceTime: false,
    },
    reservation: {
      once: false,
      multiple: false,
    },
  },
  resourceType: {
    oneDay: false,
    moreThanOneDay: false,
  },
  scheduler: {
    active: false,
    startData: '',
    endDate: '',
  },
};

const _settingsReducer = createReducer(
  initialState,
  on(loadSettings, state => state),
  on(addSettings, (state, { settings }): AppSettings => {
    // Merge the new settings with the current state settings for each sub-property
    const mergedSettings: AppSettings = {
      ...state,
      ...settings,
      supplier: {
        ...state.supplier,
        ...settings.supplier,
      },
      resourceAvailability: {
        ...state.resourceAvailability,
        ...settings.resourceAvailability,
        resourceTime: {
          ...state.resourceAvailability?.resourceTime,
          ...settings.resourceAvailability?.resourceTime,
        },
        reservation: {
          ...state.resourceAvailability?.reservation,
          ...settings.resourceAvailability?.reservation,
        },
      },
      resourceType: {
        ...state.resourceType,
        ...settings.resourceType,
      },
      scheduler: {
        ...state.scheduler,
        ...settings.scheduler,
      },
    };

    return mergedSettings;
  })
);

export function settingsReducer(state: AppSettings | undefined, action: any) {
  return _settingsReducer(state, action);
}
