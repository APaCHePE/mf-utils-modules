// Anything exported from this file is importable by other in-browser modules.
export const isSidebarMenuItemsVisible = (roles) => {
  console.log("roles", roles);
  const currentRole = localStorage.getItem("role");
  console.log("currentRole", currentRole);
  console.log("MF-UTILS-MODULES");

  return roles.includes(currentRole);
};
export * from './app-configurator/index.js';
export * from './api/index.js';
export * from './utils/jwt.utils';