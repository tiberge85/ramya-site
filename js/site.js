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
      // Titres hero : data-hero="accueil" => s.accueil_titre (+ partie orange accent)
      var esc = function(t){ var d=document.createElement('div'); d.textContent=(t==null?'':t); return d.innerHTML; };
      document.querySelectorAll('[data-hero]').forEach(function(el){
        var k = el.getAttribute('data-hero');
        var main = s[k+'_titre'], accent = s[k+'_titre_accent'];
        if(main){
          el.innerHTML = accent
            ? esc(main) + '<br><span class="text-[#ffb695]">' + esc(accent) + '</span>'
            : esc(main);
        }
      });
      // Sous-titres : data-sub="accueil" => s.accueil_soustitre
      document.querySelectorAll('[data-sub]').forEach(function(el){
        var v = s[el.getAttribute('data-sub') + '_soustitre'];
        if(v) el.textContent = v;
      });
    })
    .catch(function(){});
})();
