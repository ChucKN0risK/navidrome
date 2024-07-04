export const disablePageScroll = (): void => {
  document.documentElement.classList.add('u-overflow:hidden');
};

export const enablePageScroll = (): void => {
  document.documentElement.classList.remove('u-overflow:hidden');
};
