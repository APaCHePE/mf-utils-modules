let layoutConfig = {
  menuMode: 'static',
  darkTheme: true,
  topbarTheme: 'dark',
  menuTheme: 'dim',
  menuProfilePosition: 'top'
};

let layoutState = {
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  staticMenuMobileActive: false,
  topbarMenuActive: false,
  rightMenuActive: false,
  sidebarActive: true,
  anchored: false
};

export function getLayoutConfig() {
  return layoutConfig;
}

export function getLayoutState() {
  return layoutState;
}

export function getContainerClass() {
  console.log('getContainerClass called');
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-slim': layoutConfig.menuMode === 'slim',
    'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
    'layout-horizontal': layoutConfig.menuMode === 'horizontal',
    'layout-reveal': layoutConfig.menuMode === 'reveal',
    'layout-drawer': layoutConfig.menuMode === 'drawer',
    'layout-sidebar-dark': layoutConfig.darkTheme,
    'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
    'layout-topbar-menu-active': layoutState.topbarMenuActive,
    'layout-menu-profile-active': layoutState.rightMenuActive,
    'layout-sidebar-active': layoutState.sidebarActive,
    'layout-sidebar-anchored': layoutState.anchored,
    [`layout-topbar-${layoutConfig.topbarTheme}`]: true,
    [`layout-menu-${layoutConfig.menuTheme}`]: true,
    [`layout-menu-profile-${layoutConfig.menuProfilePosition}`]: true
  };
}

export function toggleMobileMenu(show) {
  layoutState.staticMenuMobileActive = show;
}