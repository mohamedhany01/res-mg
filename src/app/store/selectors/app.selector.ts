import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppSettings } from '../modules/app-settings.interface';

const selectSettingsState = createFeatureSelector<AppSettings>('settings');

export const selectSettings = createSelector(
  selectSettingsState,
  state => state
);
