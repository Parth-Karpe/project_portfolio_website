/* Presentation only: never writes project data or browser storage. */
(() => {
  const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let headerObserver, returnFocus, framePending = false;
  const nextStageButton = document.createElement('button');
  nextStageButton.type='button'; nextStageButton.className='faculty-top faculty-next-stage'; nextStageButton.textContent='Next stage';
  nextStageButton.setAttribute('aria-label','Go to next stage'); nextStageButton.title='Next stage'; nextStageButton.hidden=true;

  function getNextPortfolioStage(cur) {
    if (cur === '0') return '1';
    if (cur === '1') return 'system-design';
    if (cur === 'system-design') return '2';
    if (cur === '2') return '3';
    return null;
  }

  function updateFloatingNextButton() {
    const isPortfolio = typeof page !== 'undefined' ? page === 'Team Portfolio' : Boolean(document.querySelector('.portfolio-container'));
    if (!isPortfolio || window.mentorSplitOpen) {
      nextStageButton.hidden = true;
      document.body.classList.remove('has-floating-next');
      return;
    }
    const curStage = String(window.activePortfolioStage || '0');
    const nextStage = getNextPortfolioStage(curStage);
    if (nextStage) {
      nextStageButton.hidden = false;
      nextStageButton.dataset.targetStage = nextStage;
      document.body.classList.add('has-floating-next');
    } else {
      nextStageButton.hidden = true;
      document.body.classList.remove('has-floating-next');
    }
  }
  window.updateFloatingNextButton = updateFloatingNextButton;

  nextStageButton.onclick = () => {
    const target = nextStageButton.dataset.targetStage;
    if (target && typeof window.switchPortfolioStage === 'function') {
      window.switchPortfolioStage(target, true);
      updateFloatingNextButton();
    }
  };
  const backdrop = document.createElement('button');
  backdrop.type='button'; backdrop.className='faculty-backdrop'; backdrop.hidden=true;
  backdrop.setAttribute('aria-label','Close section navigation');
  const viewer = document.createElement('dialog');
  viewer.className='faculty-lightbox'; viewer.setAttribute('aria-label','Diagram viewer');
  viewer.innerHTML='<div class="faculty-lightbox-controls"><button type="button" data-zoom aria-pressed="false">Full size</button><button type="button" data-close aria-label="Close diagram">×</button></div><div class="faculty-image-viewport"><img alt=""></div>';
  document.body.append(nextStageButton,backdrop,viewer);

  function closeDrawer(restoreFocus=false) {
    document.body.classList.remove('faculty-drawer-open'); backdrop.hidden=true;
    const toggle=document.querySelector('.faculty-menu'); toggle?.setAttribute('aria-expanded','false');
    if(restoreFocus) toggle?.focus();
  }
  backdrop.onclick=()=>closeDrawer(true);
  viewer.querySelector('[data-close]').onclick=()=>viewer.close();
  viewer.querySelector('[data-zoom]').onclick=e=>{
    const full=viewer.querySelector('img').classList.toggle('full-size');
    e.currentTarget.setAttribute('aria-pressed',String(full));
    e.currentTarget.textContent=full?'Fit to screen':'Full size';
  };
  viewer.addEventListener('click',e=>{
    if(e.target===viewer || e.target.classList.contains('faculty-image-viewport')) viewer.close();
  });
  viewer.addEventListener('close',()=>{
    document.body.classList.remove('faculty-viewer-open'); returnFocus?.focus();
    const img=viewer.querySelector('img');
    if(img.dataset.objectUrl) {URL.revokeObjectURL(img.dataset.objectUrl); delete img.dataset.objectUrl;}
  });
  function showDiagram(diagram,title) {
    returnFocus=diagram; const img=viewer.querySelector('img');
    if(diagram.tagName.toLowerCase()==='svg') {
      const clone=diagram.cloneNode(true); clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
      const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml'}));
      img.dataset.objectUrl=url; img.src=url;
    } else img.src=diagram.currentSrc||diagram.src;
    img.alt=title; img.classList.remove('full-size');
    viewer.querySelector('[data-zoom]').setAttribute('aria-pressed','false');
    viewer.querySelector('[data-zoom]').textContent='Full size';
    document.body.classList.add('faculty-viewer-open'); viewer.showModal();
  }
  document.addEventListener('keydown',e=>{
    if(!document.body.classList.contains('faculty-drawer-open')) return;
    if(e.key==='Escape') {closeDrawer(true); return;}
    if(e.key!=='Tab') return;
    const focusable=[...document.querySelectorAll('#app-sidebar button,#app-sidebar summary,#app-sidebar a')].filter(el=>el.getClientRects().length);
    const first=focusable[0],last=focusable[focusable.length-1];
    if(e.shiftKey && document.activeElement===first) {e.preventDefault();last?.focus();}
    else if(!e.shiftKey && document.activeElement===last) {e.preventDefault();first?.focus();}
  });
  matchMedia('(max-width:900px)').addEventListener('change',()=>closeDrawer());

  function cleanHeading(value) {
    return value.replace(/[\u2022\u25cf\u0007]/g,'').replace(/\s*:-\s*$/,'').replace(/(Stage\s+\d+)\s*[-\u2013:]\s*/,'$1: ').trim();
  }
  function inlinePalette(value,property) {
    // Translate old inline UI colors; images and diagram contents are excluded.
    return value.replace(/#[\da-f]{8}\b|#[\da-f]{6}\b|#[\da-f]{3}\b|rgba?\([^)]*\)/gi,token=>{
      let channels;
      if(token[0]==='#') {
        let hex=token.slice(1); if(hex.length===3) hex=[...hex].map(c=>c+c).join('');
        channels=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16));
      } else channels=token.match(/[\d.]+/g)?.slice(0,3).map(Number);
      if(!channels || channels.length!==3) return token;
      const [r,g,b]=channels,light=.2126*r+.7152*g+.0722*b;
      if(property==='color') return light>245?'var(--white)':Math.max(r,g,b)-Math.min(r,g,b)<35?'var(--ink)':'var(--blue)';
      if(light>245) return 'var(--surface)';
      return light>160?'var(--tint)':'var(--blue)';
    });
  }
  function normalizeInlinePresentation(app) {
    app.querySelectorAll('[style]').forEach(el=>{
      if(el.closest('#stage-0,#stage-1,table')) {
        const size=el.style.fontSize;
        if(size && (size.includes('12px') || size.includes('11.5px') || size.includes('12.5px') || (size.endsWith('px')&&parseFloat(size)<16))) {
          el.style.fontSize='var(--p-prose, 1.125rem)';
        }
        return;
      }
      const size=el.style.fontSize;
      if(size && ((size.endsWith('px')&&parseFloat(size)<16)||(size.endsWith('rem')&&parseFloat(size)<1))) el.style.fontSize='1rem';
      if(el.closest('.diagram-frame,.portfolio-diagram-card,.faculty-diagram-frame')) return;
      ['color','backgroundColor','background','borderColor'].forEach(property=>{
        const value=el.style[property]; if(!value) return;
        el.style[property]=/gradient\(/.test(value)?'var(--surface)':inlinePalette(value,property);
      });
    });
    app.querySelectorAll('svg [fill],svg [stroke]').forEach(el=>{
      if(el.closest('.diagram-frame,.portfolio-diagram-card,.faculty-diagram-frame')) return;
      ['fill','stroke'].forEach(attribute=>{const value=el.getAttribute(attribute);if(value && !['none','currentColor','transparent'].includes(value) && !value.startsWith('url(')) el.setAttribute(attribute,'currentColor');});
    });
    app.querySelectorAll('.tag,.badge,.chip,.req-tag,.portfolio-stage-badge,[class*="-chip"]').forEach(el=>{
      el.classList.toggle('faculty-badge-primary',/^(Mandatory|Core|Dominant|Primary|E[1-4])\b/i.test(el.textContent.trim()));
    });
  }
  function enhanceTables(app) {
    app.querySelectorAll('table').forEach(table=>{
      let wrapper=table.parentElement;
      if(!wrapper.matches('.tablewrap,.table-wrap,.faculty-table-scroll')) {
        wrapper=document.createElement('div'); table.before(wrapper); wrapper.append(table);
      }
      wrapper.classList.add('faculty-table-scroll'); wrapper.tabIndex=0;
      wrapper.setAttribute('role','region');
      wrapper.setAttribute('aria-label',table.closest('article,section')?.querySelector('h2,h3')?.textContent||'Scrollable table');
      table.querySelectorAll('th').forEach(th=>{
        if(/sl\.?\s*(number|no\b)|serial/i.test(th.textContent)) th.classList.add('faculty-serial');
        if(!th.hasAttribute('scope')) th.scope='col';
      });
    });
  }
  function addEmptyState(host) {
    if(host.querySelector('.faculty-placeholder')) return;
    const copy=host.cloneNode(true);
    copy.querySelectorAll('h2,h3,.portfolio-section-title').forEach(el=>el.remove());
    if(copy.textContent.trim() || copy.querySelector('img,svg,table,video,input,textarea,select,button,a[href]')) return;
    const card=document.createElement('div'); card.className='faculty-placeholder';
    card.innerHTML='<span class="tag">In progress</span><p>This section is in progress and will be updated soon.</p>';
    host.append(card);
  }
  function orderedProse(portfolio) {
    portfolio.querySelectorAll('#sec-arch .portfolio-prose,#sec-data-design .portfolio-prose,#sec-algo-design .portfolio-prose').forEach(prose=>{
      const paragraphs=[...prose.children]; if(!paragraphs.length || !paragraphs.every(el=>el.tagName==='P')) return;
      const list=document.createElement('ol'); list.className='portfolio-prose faculty-ordered-prose';
      paragraphs.forEach(p=>{
        const item=document.createElement('li'); item.innerHTML=p.innerHTML.replace(/^\s*\d+[.)]\s*/,''); list.append(item);
      });
      prose.replaceWith(list);
      const walker=document.createTreeWalker(list,NodeFilter.SHOW_TEXT),nodes=[];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node=>{
        const parts=node.textContent.split(/(Interval Tree|Sweep-Line Algorithm|Greedy Algorithm|Dynamic Programming|Jain[’']s Fairness Index|Priority and Aging)/g);
        if(parts.length<2) return;
        const fragment=document.createDocumentFragment();
        parts.forEach((part,index)=>{
          if(index%2) {const strong=document.createElement('strong');strong.className='faculty-term';strong.textContent=part;fragment.append(strong);}
          else fragment.append(document.createTextNode(part));
        });
        node.replaceWith(fragment);
      });
    });
  }
  function accordionNavigation(app) {
    const nav=app.querySelector('.portfolio-subnav'); if(!nav) return;
    nav.querySelectorAll(':scope > .stage-link').forEach(button=>{
      const children=button.nextElementSibling?.classList.contains('subtopics')?button.nextElementSibling:null;
      const details=document.createElement('details'); details.className='faculty-accordion'; details.dataset.stage=button.dataset.target;
      details.open = true;
      const summary=document.createElement('summary'); summary.textContent=cleanHeading(button.textContent);
      summary.className=button.className; summary.dataset.target=button.dataset.target;
      if(button.id) summary.id=button.id;
      button.before(details); details.append(summary); if(children) details.append(children); button.remove();
      // One triangle heading per stage retains the existing navigation hooks.
      summary.addEventListener('click',()=>{
        if(!details.open) nav.querySelectorAll('details').forEach(other=>{if(other!==details) other.open=false;});
        if(!children) scrollToPortfolioTopic(details.dataset.stage);
      });
    });
  }
  function imagePresentation(app) {
    let number=0;
    app.querySelectorAll('.portfolio-content img,.diagram-frame img,.portfolio-diagram-card img,.evidence-item img,.stage-diagram img,.diagram-frame > svg').forEach(diagram=>{
      if(diagram.closest('.avatar,.portfolio-member-card')) return;
      number++;
      let frame=diagram.closest('.diagram-frame,.portfolio-diagram-card,.faculty-diagram-frame');
      if(!frame) {frame=document.createElement('div');frame.className='faculty-diagram-frame';diagram.before(frame);frame.append(diagram);}
      let caption=frame.querySelector('.diagram-caption');
      const title=(caption?.textContent||diagram.getAttribute('alt')||diagram.closest('article,section')?.querySelector('h2,h3')?.textContent||'Project diagram').replace(/^Fig(?:ure)?\s*[\d.]*\s*[:.]?\s*/i,'').trim();
      diagram.removeAttribute('onclick'); diagram.tabIndex=0; diagram.setAttribute('role','button');
      diagram.setAttribute('aria-label',`Enlarge ${title}`);
      if(diagram.tagName.toLowerCase()==='img') {if(!diagram.alt && caption) diagram.alt=caption.textContent.trim();diagram.loading='lazy';}
      diagram.onclick=()=>showDiagram(diagram,title);
      diagram.onkeydown=e=>{if(e.key==='Enter'||e.key===' ') {e.preventDefault();showDiagram(diagram,title);}};
    });
  }
  function setActiveStage(stageId) {
    document.querySelectorAll('.portfolio-stage-tab').forEach(button=>{
      const active=button.dataset.target===stageId;button.classList.toggle('active',active);
      if(active) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current');
    });
    document.querySelectorAll('.faculty-accordion').forEach(details=>{
      const active=details.dataset.stage===stageId;if(active && details.dataset.active!=='true') details.open=true;details.dataset.active=String(active);
    });
  }
  function syncReading() {
    updateFloatingNextButton();
    const sections=[...document.querySelectorAll('.portfolio-section')].filter(section=>!section.hidden && section.offsetParent!==null); if(!sections.length) return;
    const styles=getComputedStyle(document.documentElement);
    const offset=parseFloat(styles.getPropertyValue('--header-height'))+parseFloat(styles.getPropertyValue('--stage-height'))+20;
    const current=sections.filter(section=>section.getBoundingClientRect().top<=offset).pop()||sections[0];
    setActiveStage(current.id);
  }
  const originalActiveNav=updateActivePortfolioNav;
  updateActivePortfolioNav=function(id) {
    // Avoid scrollIntoView on sidebar items moving the main reading position.
    originalActiveNav(id,false);
    const target=document.getElementById(id),stage=target?.closest('.portfolio-section');
    if(stage) setActiveStage(stage.id);
    document.querySelectorAll('.portfolio-subnav-btn').forEach(button=>{
      if(button.dataset.target===id) button.setAttribute('aria-current','location'); else button.removeAttribute('aria-current');
    });
  };
  function enhance() {
    closeDrawer(); if(viewer.open) viewer.close(); headerObserver?.disconnect();
    const app=document.getElementById('app'); normalizeInlinePresentation(app); enhanceTables(app);
    const portfolio=app.querySelector('.portfolio-container');
    if(portfolio) {
      app.querySelectorAll('h2,.nav-label').forEach(el=>{if(!el.children.length) el.textContent=cleanHeading(el.textContent);});
      const team=typeof activeTeam==='function'?activeTeam():null;
      const theme=window.lastViewedTheme??team?.theme_no??1;
      const crumb=app.querySelector('.crumb');
      if(crumb) crumb.textContent=`Theme ${theme} › ${portfolio.querySelector('h1')?.textContent||team?.title||''}`;
      if(typeof state !== 'undefined' && state.role === 'Faculty') {
        const backBtn = app.querySelector('.page-navigation [data-page-back], .portfolio-hero-banner .page-navigation button');
        if(backBtn) {
          backBtn.textContent = '← Back';
          backBtn.setAttribute('onclick', "go('Overview')");
        }
        app.querySelectorAll('.page-navigation button').forEach(b => {
          if(b !== backBtn && b.textContent.trim().toLowerCase() === 'home') b.remove();
        });
      } else {
        const back=app.querySelector('[onclick^="backToThemeProjects"]');if(back) back.textContent=`Back to Theme ${theme}`;
      }
      portfolio.querySelectorAll('.portfolio-subblock,.portfolio-section').forEach(addEmptyState);
      orderedProse(portfolio);accordionNavigation(app);
      const sidebar=app.querySelector('#app-sidebar');
      if(sidebar) {
        const toggle=document.createElement('button');toggle.type='button';toggle.className='faculty-menu';toggle.textContent='\u2630';
        toggle.setAttribute('aria-label','Open section navigation');toggle.setAttribute('aria-controls','app-sidebar');toggle.setAttribute('aria-expanded','false');
        toggle.onclick=()=>{
          const open=document.body.classList.toggle('faculty-drawer-open');backdrop.hidden=!open;toggle.setAttribute('aria-expanded',String(open));
          if(open) sidebar.querySelector('button,summary')?.focus();
        };
        app.querySelector('.topbar-left')?.prepend(toggle);
        sidebar.addEventListener('click',e=>{if(e.target.closest('button')) closeDrawer();});
      }
    }
    imagePresentation(app);
    const header=app.querySelector('.topbar');
    if(header) {headerObserver=new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`));headerObserver.observe(header);}
    syncReading();
    updateFloatingNextButton();
  }
  window.addEventListener('scroll',()=>{
    if(framePending) return;framePending=true;
    requestAnimationFrame(()=>{framePending=false;syncReading();});
  },{passive:true});
  const originalRender=render;
  render=function(){originalRender.apply(this,arguments);enhance();};
  enhance();
})();
