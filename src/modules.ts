import { MenuItem } from './models/MenuItem';
import { modules as sitesModules } from './core_modules';
import { modules as coreModules } from './site_modules';

export const modules: Array<MenuItem> = [
  ...coreModules,
  ...sitesModules
];