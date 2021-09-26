const STORAGE_KEY = 'CRUD_PERSISTENCE';
const SNIPPETS = 'SNIPPETS';

let storage;

const saved = localStorage.getItem(STORAGE_KEY);

if (saved) {
  try {
    storage = JSON.parse(saved);
  } catch {
    storage = {};
  }
} else {
  storage = {};
}

if (!storage[SNIPPETS]) {
  storage[SNIPPETS] = {};
}

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

export const getSnippets = () => storage[SNIPPETS];

export const addSnippet = (key, value) => {
  storage[SNIPPETS][key] = value;
  save();
};

export const deleteSnippet = (key) => {
  delete storage[SNIPPETS][key];
  save();
};
