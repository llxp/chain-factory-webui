import { MenuItem } from "../../../../models/MenuItem";
import { Location } from 'history';

export function activeMenuItems(sites: Array<MenuItem>, location: Location<unknown>): Array<MenuItem> {
  const siteElements = sites.filter(
    (site) => site.path && site.path.startsWith(currentPath(location)) && site.text && site.text.length > 0
  );
  if (siteElements.length > 0) {
    const siteElement = siteElements[0];
    if (siteElement.menuItems) {
      return siteElement.menuItems.filter(
        (menuItem) => menuItem.text && menuItem.text.length > 0
      );
    }
    return [];
  }
  return [];
}

export function currentPath(location: Location<unknown>) {
  const splittedPathname = location.pathname.split("/");
  if (splittedPathname.length > 1) {
    return "/" + splittedPathname[1];
  }
  return "/";
}
