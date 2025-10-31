const ls = typeof window !== 'undefined' ? window.localStorage : null;

export function getJSON(key){
  try{ const raw = ls?.getItem(key); return raw ? JSON.parse(raw) : null; }catch{ return null; }
}
export function setJSON(key, value){
  try{ ls?.setItem(key, JSON.stringify(value)); }catch{ /* ignore quota */ }
}
export function remove(key){ try{ ls?.removeItem(key); }catch{} }


