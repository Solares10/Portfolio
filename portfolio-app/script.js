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

  // collage carousels: auto-advance, arrows, swipe
  var carouselEls=Array.prototype.slice.call(document.querySelectorAll('[data-carousel]'));
  var INTERVAL=4500;
  var playing=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ICON='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ARROW_PREV=ICON+'<path d="M15 5l-7 7 7 7"/></svg>';
  var ARROW_NEXT=ICON+'<path d="M9 5l7 7-7 7"/></svg>';

  function setupCarousel(el,index){
    var track=el.querySelector('.track');
    var viewport=el.querySelector('.viewport');
    var current=0,timer=null,paused=false;

    var prev=document.createElement('button');
    prev.type='button';prev.className='nav prev';
    prev.setAttribute('aria-label','Previous photo');prev.innerHTML=ARROW_PREV;
    var next=document.createElement('button');
    next.type='button';next.className='nav next';
    next.setAttribute('aria-label','Next photo');next.innerHTML=ARROW_NEXT;
    var dots=document.createElement('div');
    dots.className='dots';dots.setAttribute('aria-hidden','true');
    el.appendChild(prev);el.appendChild(next);el.appendChild(dots);

    function slides(){return Array.prototype.slice.call(track.children);}

    function go(i){
      var list=slides(),n=list.length;
      current=((i%n)+n)%n;
      track.style.transform='translateX(-'+(current*100)+'%)';
      list.forEach(function(s,k){s.setAttribute('aria-hidden',k===current?'false':'true');});
      Array.prototype.forEach.call(dots.children,function(d,k){d.className=k===current?'on':'';});
    }

    function rebuild(){
      var list=slides();
      if(!list.length){
        var s=document.createElement('div');
        s.className='slide';
        s.innerHTML='<div class="ph"><svg width="30" height="30"><use href="#cam"/></svg><span>Add photo</span></div>';
        track.appendChild(s);list=[s];
      }
      dots.innerHTML='';
      list.forEach(function(s,i){
        s.setAttribute('role','group');
        s.setAttribute('aria-roledescription','slide');
        s.setAttribute('aria-label',(i+1)+' of '+list.length);
        dots.appendChild(document.createElement('i'));
      });
      el.classList.toggle('single',list.length<2);
      go(Math.min(current,list.length-1));
    }

    function stop(){clearTimeout(timer);timer=null;}
    function start(delay){
      stop();
      if(!playing||paused||slides().length<2){return;}
      timer=setTimeout(function(){
        if(!document.hidden){track.setAttribute('aria-live','off');go(current+1);}
        start();
      },delay||INTERVAL);
    }
    function manual(step){
      track.setAttribute('aria-live','polite');
      go(current+step);
      start();
    }

    prev.addEventListener('click',function(){manual(-1);});
    next.addEventListener('click',function(){manual(1);});

    if(window.matchMedia('(hover: hover)').matches){
      el.addEventListener('mouseenter',function(){paused=true;stop();});
      el.addEventListener('mouseleave',function(){paused=false;start();});
    }
    el.addEventListener('focusin',function(e){
      var keyboard=true;
      try{keyboard=e.target.matches(':focus-visible');}catch(err){}
      if(keyboard){paused=true;stop();}
    });
    el.addEventListener('focusout',function(e){
      if(!el.contains(e.relatedTarget)){paused=false;start();}
    });

    var startX=null;
    viewport.addEventListener('touchstart',function(e){startX=e.touches[0].clientX;},{passive:true});
    viewport.addEventListener('touchend',function(e){
      if(startX===null){return;}
      var dx=e.changedTouches[0].clientX-startX;startX=null;
      if(Math.abs(dx)>40){manual(dx<0?1:-1);}
    },{passive:true});

    // skip any photo whose file is missing
    function dropSlide(img){
      var s=img.closest('.slide');
      if(s&&s.parentNode===track){track.removeChild(s);}
    }
    Array.prototype.forEach.call(track.querySelectorAll('img'),function(img){
      if(img.complete&&img.naturalWidth===0){dropSlide(img);}
      else{img.addEventListener('error',function(){dropSlide(img);rebuild();start();});}
    });

    rebuild();
    start(INTERVAL+index*700);
  }

  carouselEls.forEach(setupCarousel);
})();
