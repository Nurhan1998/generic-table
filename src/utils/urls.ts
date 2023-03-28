

export const getQueryAsObject = (): Record<string, string | Array<string>> => {
  if (typeof window === 'undefined') return {};
  const urlSearch = new URLSearchParams(window.location.search);
  const result: Record<string, string | Array<string>> = {};
  urlSearch.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};
