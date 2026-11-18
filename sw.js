const CACHE='patrimonio-v2';
const ASSETS=['./','./index.html','./data.js','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  // Navegações (páginas): sempre tenta a REDE primeiro — garante versão nova
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request).then(res=>{ const copy=res.clone(); caches.open(CACHE).then(c=>c.put('./index.html',copy)); return res; })
      .catch(()=>caches.match('./index.html'))
    );
    return;
  }
  // Arquivos do próprio site: usa cache e revalida em segundo plano
  if(url.origin===self.location.origin){
    e.respondWith(
      caches.match(e.request).then(hit=>{
        const refresh=fetch(e.request).then(res=>{ caches.open(CACHE).then(c=>c.put(e.request,res.clone())); return res; }).catch(()=>hit);
        return hit||refresh;
      })
    );
    return;
  }
  // CDNs e fontes: rede com fallback de cache
  e.respondWith(
    fetch(e.request).then(res=>{ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return res; })
    .catch(()=>caches.match(e.request))
  );
});
