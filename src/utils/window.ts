export const trimTrailingSlashes = (path: string): string => {
  return path.toLowerCase().replace(/(^\/)|(\/$)/g, ''); // trim trailing '/'
};

export const scrollToTop = (): void => {
  window.scrollTo(0, 0);
};
