/**
 * @description 获取assets静态资源
 * @param url
 * @returns
 */
export const getAssets = (url: string) => {
    return new URL(`../assets/${url}`, import.meta.url).href;
  };