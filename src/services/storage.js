const STORAGE_KEY = 'CRUD_PERSISTENCE';
const SITES = 'SITES';

/**
 * @typedef Page
 * @property {string} name
 * @property {string} path
 * @property {string} method
 * @property {Object} body
 * @property {Object} headers
*/

/**
 * @typedef Site
 * @property {string} url
 * @property {string} name
 * @property {Array<Page>} pages
*/

let storage;

const raw = localStorage.getItem(STORAGE_KEY);

if (raw) {
  try {
    storage = JSON.parse(raw);
  } catch {
    storage = {};
  }
} else {
  storage = {};
}

if (!storage[SITES]) {
  storage[SITES] = [];
}

export const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

/**
 * @returns {Array<Site>}
 */
export const getSites = () => storage[SITES];

export const createSite = (url, name) => {
  if (!(url && name)) {
    return false;
  }

  const site = storage[SITES].find((s) => s.url === url || s.name === name);
  if (site) {
    return false;
  }

  storage[SITES].push({ url, name, pages: [] });
  storage[SITES] = [...storage[SITES]];
  save();
  return storage[SITES];
};

export const deleteSite = (url) => {
  storage[SITES] = storage[SITES].filter((site) => site.url !== url);
  save();
  return storage[SITES];
};

export const addSitePath = (url, name, path, method) => {
  const site = storage[SITES].find((site) => site.url === url);
  if (!site) {
    return false;
  }

  const page = site.pages.find(
    (page) => page.name === name || (page.path === path && page.method === method),
  );

  if (page) {
    return false;
  }

  site.pages.push({
    name,
    path,
    method,
    body: {},
    headers: {},
  });
  storage[SITES] = [...storage[SITES]];
  save();
  return storage[SITES];
};

export const addSiteBody = (url, name, key, value) => {
  const site = storage[SITES].find((site) => site.url === url);
  if (!site) {
    return false;
  }

  const page = site.pages.find((page) => page.name === name);
  if (!page) {
    return false;
  }

  page.body[key] = value;

  storage[SITES] = [...storage[SITES]];
  save();
  return storage[SITES];
};

export const addSiteHeader = (url, name, key, value) => {
  const site = storage[SITES].find((site) => site.url === url);
  if (!site) {
    return false;
  }

  const page = site.pages.find((page) => page.name === name);
  if (!page) {
    return false;
  }

  page.headers[key] = value;

  storage[SITES] = [...storage[SITES]];
  save();
  return storage[SITES];
};
