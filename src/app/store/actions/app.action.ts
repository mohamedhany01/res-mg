import { createAction, props } from '@ngrx/store';
import { AppSettings } from '../modules/app-settings.interface';

export const addSettings = createAction(
  '[add Settings] add',
  props<{ settings: Partial<AppSettings> }>()
);

export const loadSettings = createAction(
  '[Settings] Load Settings Success',
  props<{ settings: AppSettings }>()
);
