export const getDeviceType = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const isAndroid = /android/i.test(userAgent);

  const isIos = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

  const isMobile = isAndroid || isIos;

  const isDesktop = !isMobile;

  return { isAndroid, isDesktop, isIos };
};

export default { getDeviceType };
