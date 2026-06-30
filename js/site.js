// Charge les coordonnées (data/site.json) et remplit les éléments marqués data-site=...
// Si le fichier est absent, le texte écrit en dur dans la page reste affiché (repli sûr).
(function(){
  fetch('data/site.json', { cache: 'no-store' })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(s){
      if(!s) return;
      var join = function(a){ return a.filter(Boolean).join('<br>'); };
      document.querySelectorAll('[data-site="tel"]').forEach(function(el){
        el.innerHTML = join([s.telephone1, s.telephone2, s.telephone3]);
      });
      document.querySelectorAll('[data-site="adresse"]').forEach(function(el){
        el.innerHTML = join([s.adresse, s.ville]);
      });
      document.querySelectorAll('[data-site="email"]').forEach(function(el){
        if(s.email){ el.textContent = s.email; if(el.tagName === 'A') el.setAttribute('href','mailto:'+s.email); }
      });
    })
    .catch(function(){});
})();
