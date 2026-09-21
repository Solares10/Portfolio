// Michelle Solares - portfolio scripts
(function(){
  // theme
  var root=document.documentElement, themeBtn=document.getElementById('theme');
  try{var saved=localStorage.getItem('theme');if(saved==='light'||saved==='dark'){root.setAttribute('data-theme',saved);}}catch(e){}
  themeBtn.addEventListener('click',function(){
    var current=root.getAttribute('data-theme');
    if(!current){current=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
    var next=current==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
  });

  // project filters
  var buttons=Array.prototype.slice.call(document.querySelectorAll('.seg button'));
  var cards=Array.prototype.slice.call(document.querySelectorAll('.project'));
  var count=document.getElementById('count');
  buttons.forEach(function(b){
    b.addEventListener('click',function(){
      buttons.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      var f=b.getAttribute('data-filter'),n=0;
      cards.forEach(function(c){
        var show=f==='all'||c.getAttribute('data-cats').split(' ').indexOf(f)>-1;
        c.hidden=!show; if(show){n++;}
      });
      count.textContent='Showing '+n+' project'+(n===1?'':'s');
    });
  });

  // highlight the current section in the sidebar
  var links=Array.prototype.slice.call(document.querySelectorAll('.side-nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(l){l.removeAttribute('aria-current');});
          var a=document.querySelector('.side-nav a[href="#'+e.target.id+'"]');
          if(a){a.setAttribute('aria-current','true');}
        }
      });
    },{rootMargin:'-25% 0px -65% 0px'});
    links.forEach(function(a){
      var s=document.querySelector(a.getAttribute('href'));
      if(s){io.observe(s);}
    });
  }

  // poster lightbox
  var posterBtn=document.querySelector('[data-poster]');
  var dialog=document.getElementById('poster-dialog');
  if(posterBtn&&dialog&&typeof dialog.showModal==='function'){
    var big=document.getElementById('poster-large');
    posterBtn.addEventListener('click',function(){
      if(!big.getAttribute('src')){big.src=posterBtn.querySelector('img').src;}
      dialog.showModal();
    });
    dialog.addEventListener('click',function(e){
      if(e.target===dialog||e.target.hasAttribute('data-close')){dialog.close();}
    });
  }
})();
