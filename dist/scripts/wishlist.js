import { getJSON, setJSON } from './utils/storage.js';

const KEY = 'me:wishlist:v1';
function read(){ return getJSON(KEY) ?? { ids: [] }; }
function write(s){ setJSON(KEY,s); }

export function toggleWishlist(id){
  const s = read();
  if(s.ids.includes(id)) s.ids = s.ids.filter(x=>x!==id); else s.ids.push(id);
  write(s);
}
export function isWished(id){ return read().ids.includes(id); }


