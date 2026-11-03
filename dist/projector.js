/* Idempotent presentation enhancements. No routing, role, state or storage changes. */
(() => {
  let timer;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer=setTimeout(applyPresentation,50);
  });
  const observe = () => observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','open']});
  const labelChanges = new Map([
    ['Number of Themes','Themes'],['Number of Faculty Mentors','Faculty mentors'],['Number of Teams','Teams']
  ]);
  function addClass(element,name) { if(element && !element.classList.contains(name)) element.classList.add(name); }
  function setText(element,text) { if(element && element.textContent.trim()!==text) element.textContent=text; }
  function stripHeadingMarkers(element) {
    [...element.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).forEach(node=>{
      const cleaned=node.textContent.replace(/[\u25cf\u2022\u0007]/g,'').replace(/(Stage\s+\d+)\s*(?:\u2014|\u2013|-)\s*/g,'$1: ').replace(/\s*:-\s*$/,'');
      if(node.textContent!==cleaned) node.textContent=cleaned;
    });
  }
  function setLabels(app) {
    app.querySelectorAll('.stat-cards-grid div').forEach(element=>{
      if(element.children.length) return;
      const text=element.textContent.trim();if(labelChanges.has(text)) setText(element,labelChanges.get(text));
    });
    app.querySelectorAll('.theme-card-item').forEach(card=>{
      const action=card.lastElementChild?.querySelector('span');
      if(action && /^View Projects\s*&\s*Details/.test(action.textContent.trim())) setText(action,'See projects');
    });
    app.querySelectorAll('#hod-projects-table button').forEach(button=>{
      if(/^Project Portfolio/.test(button.textContent.trim())) setText(button,'Open portfolio');
    });
    app.querySelectorAll('[onclick^="backToThemes"]').forEach(button=>setText(button,'\u2190 Back to themes'));
    app.querySelectorAll('.tag').forEach(badge=>{
      const text=badge.textContent.trim(),match=text.match(/^(\d+) Projects$/);
      if(match) setText(badge,`${match[1]} projects`);
    });
    app.querySelectorAll('.nav-label,.portfolio-section-title h2,.faculty-accordion > summary').forEach(stripHeadingMarkers);
    app.querySelectorAll('.faculty-dashboard-heading').forEach(heading=>{
      setText(heading.querySelector('h1'),'HOD Mini-Project Dashboard');
      heading.querySelector('.faculty-dashboard-lead')?.remove();
    });
  }
  function dashboardPresentation(app) {
    const stats=app.querySelector('.stat-cards-grid');
    app.classList.toggle('projector-dashboard-page',Boolean(stats));
    if(stats) {
      addClass(stats,'projector-dashboard-stats');
      const heading=stats.previousElementSibling;
      if(heading?.querySelector('h1')) addClass(heading,'projector-dashboard-hero');
      [...stats.children].forEach(card=>{
        addClass(card,'projector-stat-card');addClass(card.firstElementChild,'projector-stat-number');
        const label=card.children[1]?.firstElementChild||card.children[1];addClass(label,'projector-stat-label');
      });
    }
    const cards=[...app.querySelectorAll('.theme-card-item')];
    if(cards.length) {
      const section=cards[0].closest('section');addClass(section,'projector-themes-section');
      const counts=cards.map(card=>Number(card.querySelector('.tag')?.textContent.match(/\d+/)?.[0]||0));
      const max=Math.max(...counts);
      cards.forEach((card,index)=>{
        const title=card.querySelector('h3');
        const number=card.dataset.projectorThemeNumber||title?.textContent.match(/Theme\s+(\d+)/i)?.[1];
        if(number) card.dataset.projectorThemeNumber=number;
        const headingRow=card.firstElementChild;
        addClass(headingRow,'projector-theme-heading');
        let icon=card.querySelector('.projector-theme-number');
        if(number && !icon) {
          icon=document.createElement('span');icon.className='projector-theme-number';icon.textContent=number;icon.setAttribute('aria-hidden','true');
          headingRow.prepend(icon);
        }
        if(title) {
          const topic=title.textContent.replace(/^\s*Theme\s*\d+\s*[:\-\u2013\u2014]\s*/i,'').trim();
          setText(title,topic);
          if(title.parentElement!==headingRow) headingRow.append(title);
        }
        const actionRow=card.lastElementChild;
        addClass(actionRow,'projector-theme-action');
        const badge=card.querySelector('.tag');
        if(badge && badge.parentElement!==actionRow) actionRow.append(badge);
        [...headingRow.children].forEach(child=>{
          if(child!==title && child!==icon && !child.textContent.trim() && !child.children.length) child.remove();
        });
        card.classList.remove('projector-featured');
        if(!card.hasAttribute('tabindex')) card.tabIndex=0;
        if(!card.hasAttribute('role')) card.setAttribute('role','button');
        if(!card.dataset.projectorKeyboard) {
          card.dataset.projectorKeyboard='true';
          card.addEventListener('keydown',event=>{
            if(event.target===card && (event.key==='Enter'||event.key===' ')) {event.preventDefault();card.click();}
          });
        }
      });
    }
    const back=app.querySelector('[onclick^="backToThemes"]');
    if(back) {
      const banner=back.closest('.projector-theme-banner') || back.nextElementSibling;
      const heading=banner?.querySelector('h1');
      if(heading) {
        addClass(banner,'projector-theme-banner');
        addClass(back,'projector-back-themes');
        setText(back,'\u2190 Back to Themes');
        if(back.parentElement!==heading.parentElement) heading.before(back);
      }
    }
  }
  function tablesPresentation(app) {
    app.querySelectorAll('table').forEach(table=>{
      let wrapper=table.parentElement;
      if(!wrapper.matches('.tablewrap,.faculty-table-scroll')) {
        wrapper=document.createElement('div');wrapper.className='tablewrap';table.before(wrapper);wrapper.append(table);
      }
      addClass(wrapper,'tablewrap');wrapper.tabIndex=0;
      if(!wrapper.hasAttribute('aria-label')) wrapper.setAttribute('aria-label','Scrollable table');
      wrapper.setAttribute('role','region');
    });
    app.querySelectorAll('.tag,.req-tag,.badge,.chip,.tab-badge,.badge-num').forEach(badge=>{
      badge.classList.toggle('projector-primary',/^(Mandatory|Core|Primary)\b/i.test(badge.textContent.trim()));
    });
  }
  function markEmptySections(app) {
    app.querySelectorAll('.portfolio-subblock,.portfolio-section').forEach(section=>{
      let placeholder=section.querySelector(':scope > .faculty-placeholder');
      if(!placeholder) {
        const copy=section.cloneNode(true);copy.querySelectorAll('h2,h3,.portfolio-section-title').forEach(el=>el.remove());
        if(!copy.textContent.trim() && !copy.querySelector('img,svg,table,video,input,textarea,select,button,a[href]')) {
          placeholder=document.createElement('div');placeholder.className='faculty-placeholder';
          placeholder.innerHTML='<span class="tag">In progress</span><p>This section is in progress and will be updated soon.</p>';
          section.append(placeholder);
        }
      }
      if(placeholder && section.id) {
        app.querySelectorAll('[data-target]').forEach(item=>{
          if(item.dataset.target!==section.id || item.querySelector('.projector-soon')) return;
          const badge=document.createElement('span');badge.className='projector-soon';badge.textContent='Soon';item.append(badge);
        });
      }
    });
  }
  function sidebarPresentation(app) {
    const nav=app.querySelector('.portfolio-subnav');if(!nav) return;
    const layout=app.querySelector('.portfolio-layout');
    const panel=app.querySelector('#app-sidebar');
    const tabs=app.querySelector('.portfolio-stage-tabs');
    if(layout && panel) {
      addClass(app.querySelector('.shell'),'projector-contextual-shell');
      addClass(layout,'projector-contextual-layout');
      if(panel.parentElement!==layout) layout.prepend(panel);
      if(tabs && tabs.parentElement!==layout.parentElement) layout.before(tabs);
      app.querySelector('.faculty-menu')?.remove();
      if(!panel.querySelector('.projector-close-nav')) {
        const close=document.createElement('button');close.type='button';close.className='projector-close-nav';
        close.textContent='Close navigation ×';close.setAttribute('aria-label','Close section navigation');
        close.onclick=()=>{
          layout.classList.remove('projector-nav-open');panel.inert=true;
          tabs?.querySelector('.active')?.focus();
          tabs?.querySelectorAll('button').forEach(button=>button.setAttribute('aria-expanded','false'));
        };
        panel.prepend(close);
      }
    }
    // Existing accordions and handlers are reused. Only add wrappers when absent.
    nav.querySelectorAll(':scope > .stage-link').forEach(button=>{
      const children=button.nextElementSibling?.classList.contains('subtopics')?button.nextElementSibling:null;
      const details=document.createElement('details');details.className='faculty-accordion';details.dataset.stage=button.dataset.target;
      const summary=document.createElement('summary');summary.className='stage-link portfolio-subnav-btn';summary.dataset.target=button.dataset.target;
      button.before(details);details.append(summary);summary.append(...button.childNodes);
      if(children) details.append(children);
      if(button.id) summary.id=button.id;
      if(button.hasAttribute('onclick')) summary.setAttribute('onclick',button.getAttribute('onclick'));
      button.remove();
    });
    nav.querySelectorAll('.faculty-accordion > summary').forEach(stripHeadingMarkers);
    const sidebar=app.querySelector('#app-sidebar');
    if(sidebar && app.querySelector('.portfolio-container')) {
      sidebar.querySelector(':scope > .school')?.remove();
      app.querySelector('.topbar .crumb')?.remove();
    }
    const back=app.querySelector('[onclick^="backToThemeProjects"]');
    const hero=app.querySelector('.portfolio-hero-banner > div');
    if(back && hero) {
      const theme=back.getAttribute('onclick')?.match(/backToThemeProjects\((\d+)\)/)?.[1];
      if(theme) setText(back,`\u2190 Back to Theme ${theme}`);
      addClass(back,'projector-project-back');
      if(back.parentElement!==hero) {
        const row=back.parentElement;
        hero.prepend(back);
        if(row.classList.contains('projector-portfolio-back-row') || !row.children.length) row.remove();
      }
    }
  }
  window.refreshPortfolioStageNav=function(stage) {
    const app=document.getElementById('app');
    const host=app?.querySelector('.portfolio-sidebar-nav');
    const panel=app?.querySelector('#app-sidebar');
    const layout=app?.querySelector('.portfolio-layout');
    if(!host || !panel || !layout) return;
    const template=document.createElement('template');template.innerHTML=portfolioSubnav();
    const nav=template.content.querySelector('.portfolio-subnav');
    [...nav.children].forEach(group=>{
      const links=group.matches('[data-target]')?[group]:[...group.querySelectorAll('[data-target]')];
      const belongs=links.some(link=>{
        const section=document.getElementById(link.dataset.target)?.closest('.portfolio-section');
        const owner=section?.id==='sec-system-design'?1:Number(section?.id?.replace('stage-',''));
        return owner===stage;
      });
      if(!belongs) group.remove();
    });
    host.replaceChildren(nav);
    panel.inert=false;layout.classList.add('projector-nav-open');
    app.querySelectorAll('.portfolio-stage-tab').forEach(tab=>tab.setAttribute('aria-expanded',String(Number(tab.dataset.tab)===stage)));
    sidebarPresentation(app);
  };
  function stagePresentation(app) {
    const tabs=[...app.querySelectorAll('.portfolio-stage-tab')];
    if(!tabs.length) return;
    tabs.forEach(tab=>{
      setText(tab,`STAGE ${tab.dataset.tab}`);
      tab.dataset.target=`stage-${tab.dataset.tab}`;
    });
    const content=app.querySelector('.portfolio-content');
    tabs.forEach(tab=>{tab.setAttribute('aria-controls','app-sidebar');});
    if(content && !content.dataset.stageInitialized) {
      content.dataset.stageInitialized='true';
      app.querySelectorAll('.portfolio-content > .portfolio-section').forEach(section=>section.hidden=true);
      const panel=app.querySelector('#app-sidebar');if(panel) panel.inert=true;
      if(window.activePortfolioStage!==null) switchPortfolioStage(window.activePortfolioStage);
    }
  }
  function imagesPresentation(app) {
    app.querySelectorAll('.diagram-frame img,.portfolio-diagram-card img,.faculty-diagram-frame img').forEach(img=>{
      if(img.loading!=='lazy') img.loading='lazy';
      if(!img.alt.trim()) {
        const caption=img.closest('.diagram-frame,.portfolio-diagram-card,.faculty-diagram-frame')?.querySelector('.diagram-caption');
        if(caption) img.alt=caption.textContent.trim();
      }
    });
    // Undo only term emphasis introduced by the prior presentation layer.
    app.querySelectorAll('strong.faculty-term').forEach(term=>term.replaceWith(document.createTextNode(term.textContent)));
  }
  function normalizeInlineType(app) {
    app.querySelectorAll('[style]').forEach(element=>{
      if(element.style.fontSize) element.style.removeProperty('font-size');
      if(element.style.fontWeight && Number(element.style.fontWeight)>800) element.style.removeProperty('font-weight');
      if(element.matches('thead')) {element.style.removeProperty('position');element.style.removeProperty('top');}
    });
  }
  function applyPresentation() {
    observer.disconnect();
    try {
      const app=document.getElementById('app');if(!app) return;
      normalizeInlineType(app);setLabels(app);dashboardPresentation(app);tablesPresentation(app);
      sidebarPresentation(app);stagePresentation(app);markEmptySections(app);imagesPresentation(app);
      document.querySelectorAll('.faculty-progress,#pf-progress,.reading-progress').forEach(element=>element.remove());
    } finally {observe();}
  }
  applyPresentation();
})();





