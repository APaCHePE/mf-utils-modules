const storedConfig = localStorage.getItem('layout-config');
let _layoutConfig = storedConfig
  ? JSON.parse(storedConfig)
  : {
      menuMode: 'static',
      darkTheme: true,
      topbarTheme: 'dark',
      menuTheme: 'dim',
      menuProfilePosition: 'top',
      primary: 'blue',
      surface: 'slate',
      layoutTheme: 'default'
    };

let _layoutState = {
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  staticMenuMobileActive: true,
  topbarMenuActive: false,
  rightMenuActive: false,
  sidebarActive: true,
  anchored: false
};

export function getLayoutConfig() {
  return _layoutConfig;
}

export function getLayoutState() {
  return _layoutState;
}

export function getContainerClass() {
  console.log('getContainerClass called');
  const config = getLayoutConfig();
  const state = getLayoutState();
  return {
    'layout-overlay': config.menuMode === 'overlay',
    'layout-static': config.menuMode === 'static',
    'layout-slim': config.menuMode === 'slim',
    'layout-slim-plus': config.menuMode === 'slim-plus',
    'layout-horizontal': config.menuMode === 'horizontal',
    'layout-reveal': config.menuMode === 'reveal',
    'layout-drawer': config.menuMode === 'drawer',
    'layout-sidebar-dark': config.darkTheme,
    'layout-static-inactive': state.staticMenuDesktopInactive && config.menuMode === 'static',
    'layout-overlay-active': state.overlayMenuActive,
    'layout-mobile-active': state.staticMenuMobileActive,
    'layout-topbar-menu-active': state.topbarMenuActive,
    'layout-menu-profile-active': state.rightMenuActive,
    'layout-sidebar-active': state.sidebarActive,
    'layout-sidebar-anchored': state.anchored,
    [`layout-topbar-${config.topbarTheme}`]: true,
    [`layout-menu-${config.menuTheme}`]: true,
    [`layout-menu-profile-${config.menuProfilePosition}`]: true
  };
}

export function updateLayoutState(patch) {
  _layoutState = {
    ..._layoutState,
    ...patch
  };
}

export function updateLayoutConfig(patch) {
  _layoutConfig = {
    ..._layoutConfig,
    ...patch
  };
  // Ensure the new properties always exist with default values if not set
  if (typeof _layoutConfig.primary === 'undefined') _layoutConfig.primary = 'blue';
  if (typeof _layoutConfig.surface === 'undefined') _layoutConfig.surface = 'slate';
  if (typeof _layoutConfig.layoutTheme === 'undefined') _layoutConfig.layoutTheme = 'default';

  localStorage.setItem('layout-config', JSON.stringify(_layoutConfig));
  window.dispatchEvent(new CustomEvent('layout-updated')); // <-- Aquí lo haces automático
}

export function toggleDarkTheme(enable) {
  updateLayoutConfig({
    darkTheme: enable,
    menuTheme: enable ? 'dark' : 'light'
  });

  // Aplica o remueve clase de modo oscuro al HTML
  if (enable) {
    document.documentElement.classList.add('app-dark');
  } else {
    document.documentElement.classList.remove('app-dark');
  }

  window.dispatchEvent(new CustomEvent('layout-updated'));
}

export function toggleMobileMenu(show) {
  console.log('toggleMobileMenu called with:', show);
  updateLayoutState({
    staticMenuMobileActive: show
  });
  window.dispatchEvent(new CustomEvent('layout-updated')); // <-- AGREGAR ESTO

}

// ---- New exported functions ----
export function getSelectedPrimaryColor() {
  return getLayoutConfig().primary;
}

export function getSelectedSurface() {
  return getLayoutConfig().surface;
}

export function getLayoutTheme() {
  return getLayoutConfig().layoutTheme;
}

export function setLayoutTheme(theme) {
  updateLayoutConfig({
    layoutTheme: theme
  });
}

export function setPrimaryColor(color) {
  updateLayoutConfig({
    primary: color
  });
}

export function setSurfaceColor(color) {
  updateLayoutConfig({
    surface: color
  });
}
// ---- Surface palette event utility ----
export function applySurfacePalette(palette) {
  window.dispatchEvent(new CustomEvent('surface-updated', { detail: palette }));
}