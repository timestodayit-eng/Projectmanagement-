/* RecruitOps 2.0 — React UI with zero-build offline demo runtime. */
'use strict';
const E=(tag,props,...kids)=>React.createElement(tag,props,...kids.flat(Infinity).filter(x=>x!==null&&x!==undefined&&x!==false));
const $=(x)=>document.querySelector(x);
const icons={
  grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  check:'M20 6L9 17l-5-5',tasks:'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
  send:'M22 2L11 13 M22 2l-7 20-4-9-9-4z',calendar:'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
  chart:'M4 20V10 M10 20V4 M16 20v-8 M22 20V7',users:'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M22 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  book:'M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z',
  settings:'M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06-1.91 1.91-.06-.06A1.65 1.65 0 0016 18.4a1.65 1.65 0 00-1 .32V21h-2v-2.28a1.65 1.65 0 00-2 0V21H9v-2.28a1.65 1.65 0 00-1.82-.33l-.06.06-1.91-1.91.06-.06A1.65 1.65 0 005.6 15a1.65 1.65 0 00-.32-1H3v-2h2.28a1.65 1.65 0 000-2H3V8h2.28a1.65 1.65 0 00.33-1.82l-.06-.06 1.91-1.91.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-.32V2h2v2.28a1.65 1.65 0 002 0V2h2v2.28a1.65 1.65 0 001.82.33l.06-.06 1.91 1.91-.06.06A1.65 1.65 0 0019.4 8a1.65 1.65 0 00.32 1H22v2h-2.28a1.65 1.65 0 000 2H22v2h-2.28a1.65 1.65 0 00-.32 0z',
  bolt:'M13 2L3 14h8l-1 8 11-12h-8z',plus:'M12 5v14 M5 12h14',search:'M21 21l-4.35-4.35 M11 18a7 7 0 100-14 7 7 0 000 14z',
  chevron:'M9 18l6-6-6-6',down:'M6 9l6 6 6-6',arrow:'M5 12h14 M13 6l6 6-6 6',clock:'M12 6v6l4 2 M12 2a10 10 0 110 20 10 10 0 010-20',
  alert:'M10.3 3.8L2.1 18a2 2 0 001.7 3h16.4a2 2 0 001.7-3L13.7 3.8a2 2 0 00-3.4 0z M12 9v4 M12 17h.01',
  activity:'M22 12h-4l-3 9-6-18-3 9H2',eye:'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z',
  link:'M10 13a5 5 0 007.07 0l3-3A5 5 0 0013 2.93l-1.72 1.71 M14 11a5 5 0 00-7.07 0l-3 3A5 5 0 0011 21.07l1.72-1.71',
  logout:'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9',
  close:'M18 6L6 18 M6 6l12 12',menu:'M3 6h18 M3 12h18 M3 18h18',filter:'M4 7h16 M7 12h10 M10 17h4',
  briefcase:'M3 7h18v13H3z M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2 M3 13h18',
  bell:'M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
  dot:'M12 12h.01',edit:'M14 5l5 5 M3 21l4-1 13-13-4-4L3 16z',
  dollar:'M12 2v20 M17 6c-1-2-8-3-10 0-2 3 2 5 5 6s7 3 5 6c-2 3-9 2-10 0',
  shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  message:'M21 11.5a8.5 8.5 0 01-8.5 8.5 9 9 0 01-4-.9L3 21l1.9-5.5a9 9 0 01-.9-4A8.5 8.5 0 0112.5 3a8.5 8.5 0 018.5 8.5z',
  upload:'M12 16V3 M7 8l5-5 5 5 M5 17v3h14v-3',
  external:'M15 3h6v6 M10 14L21 3 M21 13v8H3V3h8',
  list:'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
  target:'M12 22a10 10 0 100-20 10 10 0 000 20z M12 17a5 5 0 100-10 5 5 0 000 10z M12 12h.01',
  spark:'M12 3l2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7z'
};
function Icon({name,size=19,stroke=1.85}){return E('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:stroke,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},E('path',{d:icons[name]||icons.grid}))}
const labelStatus={todo:'To do',in_progress:'In progress',in_review:'In review',revision:'Needs revision',blocked:'Blocked',done:'Completed'};
const statusClass={todo:'slate',in_progress:'blue',in_review:'purple',revision:'orange',blocked:'red',done:'green'};
const priorityClass={low:'slate',normal:'blue',high:'orange',urgent:'red'};
const fmtMoney=n=>'$'+Number(n||0).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:2});
const dateText=s=>{if(!s)return'—';try{return new Date(s+'T12:00:00').toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric'})}catch{return s}};
const delta=s=>{const a=new Date((s||'2000-01-01')+'T12:00:00Z'),b=new Date(bdToday()+'T12:00:00Z');return Math.round((a-b)/86400000)};
const bdToday=()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Dhaka',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`};
const isoOffset=(n)=>{const d=new Date(bdToday()+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const isoShift=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const humanDue=s=>{const d=delta(s);return d===0?'Today':d===1?'Tomorrow':d===-1?'Yesterday':d<0?`${-d} days late`:dateText(s)};
function Badge({tone='slate',children}){return E('span',{className:'pill pill-'+tone},children)}
function Button({children,icon,variant='primary',onClick,small=false,disabled=false,title}){return E('button',{className:`btn btn-${variant}${small?' btn-small':''}`,onClick,disabled,title},icon?E(Icon,{name:icon,size:small?15:17}):null,children)}
function Avatar({name,size='normal',color}){const initials=String(name||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();return E('span',{className:`avatar avatar-${size}`,style:color?{backgroundColor:color}:null},initials)}
function Field({label,children,full=false,hint}){return E('label',{className:'field'+(full?' field-full':'')},E('span',{className:'field-label'},label),children,hint?E('small',{className:'field-hint'},hint):null)}
function emptyBlock(icon,title,text,action){return E('div',{className:'empty-state'},E('div',{className:'empty-graphic'},E(Icon,{name:icon,size:28})),E('strong',null,title),E('p',null,text),action||null)}
const stagePct={Awareness:.7,Retargeting:.15,Conversion:.15};
function allocate(companyAccounts,budget){return companyAccounts.map(a=>{const share=companyAccounts.filter(x=>x.page===a.page&&x.channel===a.channel&&x.stage===a.stage).length;const amount=Number(budget||0)*.5 /* channel */*.5 /* page */*stagePct[a.stage]/share;return{...a,allocation:amount}})}
function Progress({value}){return E('div',{className:'progress'},E('span',{style:{width:Math.max(0,Math.min(100,value))+'%'}}))}
function Modal({title,subtitle,close,children,width='normal'}){return E('div',{className:'overlay',onMouseDown:e=>{if(e.target===e.currentTarget)close()}},E('section',{className:'modal modal-'+width,role:'dialog','aria-modal':'true','aria-label':title},E('div',{className:'modal-head'},E('div',null,E('h2',null,title),subtitle?E('p',null,subtitle):null),E('button',{className:'icon-btn',onClick:close,'aria-label':'Close'},E(Icon,{name:'close'}))),E('div',{className:'modal-body'},children)))}

class App extends React.Component{
 constructor(p){super(p);this.state={loading:true,me:null,data:null,view:'dashboard',company:'all',search:'',status:'all',modal:'',selectedTask:'',selectedInterview:'',selectedAccount:'',selectedRequest:'',form:{},busy:false,error:'',toast:'',demo:false,mobileNav:false,showAll:false,settingsDraft:{},comment:''};this.load=this.load.bind(this)}
 componentDidMount(){this.load()}
 async api(path,options={}){const res=await fetch('/api'+path,{credentials:'same-origin',headers:{'Content-Type':'application/json'},...options});let x;try{x=await res.json()}catch{x={error:'Server response unreadable'}}if(!res.ok)throw Error(x.error||'Request failed');return x}
 async load(){try{const d=await this.api('/state');this.setState({loading:false,data:d,me:d.me,company:d.me.role==='super_admin'?this.state.company:d.me.companyId,settingsDraft:{...d.settings}})}catch(e){try{const h=await this.api('/health');this.setState({loading:false,me:null,demo:!!h.demo,error:''})}catch{this.setState({loading:false,me:null,error:e.message})}}}
 async login(e){e.preventDefault();const f=this.state.form;this.setState({busy:true,error:''});try{await this.api('/login',{method:'POST',body:JSON.stringify({email:f.email,password:f.password})});this.setState({form:{},busy:false});await this.load()}catch(e){this.setState({busy:false,error:e.message})}}
 async logout(){try{await this.api('/logout',{method:'POST',body:'{}'})}catch(e){}this.setState({me:null,data:null,form:{},view:'dashboard'})}
 notify(msg){this.setState({toast:msg,error:''});setTimeout(()=>this.setState({toast:''}),4000)}
 async mutation(path,payload,method='POST',msg='Saved successfully'){this.setState({busy:true,error:''});try{const x=await this.api(path,{method,body:JSON.stringify(payload)});this.setState({busy:false,modal:'',selectedTask:'',selectedAccount:'',selectedInterview:''});await this.load();this.notify(msg);return x}catch(e){this.setState({busy:false,error:e.message});return null}}
 show(modal,obj={}){const defaultCompany=this.state.company==='all'?'creative':this.state.company;this.setState({modal,form:{companyId:defaultCompany,priority:'normal',status:'todo',dueDate:isoOffset(1),interviewDate:isoOffset(7),...obj},error:''})}
 get visible(){const d=this.state.data||{companies:[],tasks:[],interviews:[],accounts:[],requests:[],teams:[],users:[],activities:[]};const company=this.state.company;const subset=arr=>(arr||[]).filter(x=>company==='all'||x.companyId===company);return{...d,companies:d.companies||[],tasks:subset(d.tasks),interviews:subset(d.interviews),accounts:subset(d.accounts),requests:subset(d.requests),teams:subset(d.teams),users:subset(d.users),activities:subset(d.activities)}}
 navTo(view){this.setState({view,search:'',status:'all',mobileNav:false,modal:''})}
 companyOf(id){return(this.state.data?.companies||[]).find(c=>c.id===id)||{name:'Company',short:'Company',accent:'#5884b6'}}
 teamOf(id){return(this.state.data?.teams||[]).find(x=>x.id===id)}
 userOf(id){return(this.state.data?.users||[]).find(x=>x.id===id)}
 interviewOf(id){return(this.state.data?.interviews||[]).find(x=>x.id===id)}
 setForm(k,v){this.setState(s=>({form:{...s.form,[k]:v}}))}
 navItems(){return [['dashboard','grid','Overview'],['tasks','tasks','Task Tracker'],['requests','send','Team Requests'],['interviews','calendar','Interviews'],['campaigns','chart','Campaign Planner'],['accounts','briefcase','Ad Accounts'],['team','users','Team Members'],['guide','book','SOP & Strategy'],['settings','settings','Settings']]}
 renderLogin(){
   const f=this.state.form;
   const artwork=E('div',{className:'login-illustration'},
      E('div',{className:'login-mark'},E(Icon,{name:'spark',size:36})),
      E('div',{className:'login-title'},'One workspace.','\nEvery team aligned.'),
      E('p',null,'Interviews, tasks, campaign budgets, approvals and handoffs — in a single place for all three recruitment brands.'),
      E('div',{className:'login-feature'},E(Icon,{name:'shield'}),'Secure company-based workspace'),
      E('div',{className:'login-feature'},E(Icon,{name:'bolt'}),'7-day interview automation'),
      E('div',{className:'login-feature'},E(Icon,{name:'check'}),'One clear owner per task'));
   const brand=E('div',{className:'brand-login'},E('span',{className:'brand-monogram'},'R'),E('div',null,E('strong',null,'RecruitOps'),E('small',null,'Operations Command Center')));
   const form=E('form',{onSubmit:e=>this.login(e)},
      E(Field,{label:'Work email'},E('input',{type:'email',required:true,placeholder:'name@company.com',value:f.email||'',onChange:e=>this.setForm('email',e.target.value)})),
      E(Field,{label:'Password'},E('input',{type:'password',required:true,placeholder:'Enter your password',value:f.password||'',onChange:e=>this.setForm('password',e.target.value)})),
      this.state.error?E('div',{className:'inline-error'},this.state.error):null,
      E(Button,{icon:'arrow',disabled:this.state.busy},this.state.busy?'Signing in…':'Sign in to RecruitOps'));
   const demoNote=this.state.demo?E('div',{className:'login-demo-note'},
      'Local demo only: ',E('code',null,'demo@recruitops.local'),' / ',E('code',null,'DemoPass!2026'),
      E('p',null,'Sample recruitment records are for product testing, not real job advertisements.')):null;
   const card=E('div',{className:'login-form-card'},E('div',{className:'eyebrow'},'WELCOME BACK'),E('h1',null,'Sign in to your workspace'),E('p',null,'Manage your campaigns and team handoffs with clarity.'),form,demoNote);
   return E('main',{className:'login-screen'},artwork,E('div',{className:'login-panel'},brand,card,E('div',{className:'login-foot'},'RecruitOps · MVP v2.0 · Company-aware access')));
 }
 renderSidebar(){
   const d=this.state.data, ch=this.state.company;
   const logo=E('button',{className:'brand',onClick:()=>this.navTo('dashboard')},
      E('span',{className:'logo'},'R',E('i',null)),
      E('span',null,E('b',null,'RecruitOps'),E('small',null,'Command Center')));
   const companySelect=E('div',{className:'workspace-select-wrap'},
      E('span',{className:'workspace-dot',style:{background:ch==='all'?'#5aa3ee':this.companyOf(ch).accent}}),
      E('select',{className:'workspace-select',value:ch,onChange:e=>this.setState({company:e.target.value}),title:'Switch company'},
        this.state.me.role==='super_admin'?E('option',{value:'all'},'All companies'):null,
        (d.companies||[]).map(c=>E('option',{key:c.id,value:c.id},c.name))
      ),E(Icon,{name:'down',size:14}));
   const navGroup=(items)=>E('nav',{className:'side-nav'},items.map(([id,ico,title])=>
      E('button',{key:id,onClick:()=>this.navTo(id),className:'nav-link'+(this.state.view===id?' active':'')},
        E(Icon,{name:ico}),E('span',null,title),
        id==='tasks'&&this.visible.tasks.filter(t=>t.status!=='done').length?
          E('span',{className:'nav-count'},this.visible.tasks.filter(t=>t.status!=='done').length):null)));
   const top=E('div',{className:'sidebar-top'},logo,
      E('div',{className:'workspace-label'},'WORKSPACE'),companySelect,
      E('div',{className:'nav-label'},'GENERAL'),navGroup(this.navItems().slice(0,6)),
      E('div',{className:'nav-label nav-label-second'},'MANAGEMENT'),navGroup(this.navItems().slice(6)));
   const hint=E('div',{className:'team-help'},
      E('div',{className:'team-help-top'},E(Icon,{name:'spark',size:17}),'QUICK START'),
      E('strong',null,'Know what to do next.'),
      E('p',null,'Review overdue work, assign owners and approve completed tasks.'),
      E('button',{onClick:()=>this.navTo('guide')},'View the SOP ',E(Icon,{name:'arrow',size:15})));
   const profile=E('div',{className:'side-profile'},E(Avatar,{name:this.state.me.name}),
      E('span',null,E('strong',null,this.state.me.name),E('small',null,String(this.state.me.role).replaceAll('_',' '))),
      E('button',{className:'logout-btn',title:'Sign out',onClick:()=>this.logout()},E(Icon,{name:'logout',size:18})));
   return E('aside',{className:'sidebar'+(this.state.mobileNav?' sidebar-mobile-open':'')},top,
      E('div',{className:'sidebar-bottom'},hint,profile));
 }
 renderHeader(){const titles={dashboard:'Overview',tasks:'Task Tracker',requests:'Team Requests',interviews:'Interview Planner',campaigns:'Campaign Planner',accounts:'Ad Accounts',team:'Team Members',guide:'SOP & Strategy',settings:'Settings'};const sub={dashboard:'A clear view of everything your teams are working on.',tasks:'Find the next task, update progress, and request approval.',requests:'Assign work between teams and track every handoff.',interviews:'Manage employer interviews and seven-day campaign launches.',campaigns:'One interview. One budget. A clear account allocation.',accounts:'Your Meta account structure in one organized place.',team:'People, ownership and team responsibilities.',guide:'How your teams work and how your campaigns run.',settings:'Connect your CMS source and manage workspace access.'};return E('header',{className:'topbar'},E('div',{className:'topbar-left'},E('button',{className:'icon-btn mobile-toggle',onClick:()=>this.setState(s=>({mobileNav:!s.mobileNav}))},E(Icon,{name:'menu'})),E('div',null,E('div',{className:'breadcrumbs'},'Workspace ',E(Icon,{name:'chevron',size:13}),E('span',null,titles[this.state.view])),E('h1',null,titles[this.state.view]),E('p',null,sub[this.state.view]))),E('div',{className:'topbar-actions'},E('div',{className:'today-date'},E(Icon,{name:'calendar',size:16}),new Date().toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric'})),E(Button,{icon:'plus',onClick:()=>this.show('task')},'New Task')))}
 render(){if(this.state.loading)return E('div',{className:'startup'},E('div',{className:'spinner'}),E('strong',null,'RecruitOps'),E('span',null,'Preparing your workspace…'));if(!this.state.me)return this.renderLogin();const v=this.state.view;return E('div',{className:'app-shell'},this.renderSidebar(),E('div',{className:'main-shell'},this.renderHeader(),E('main',{className:'content'},v==='dashboard'?this.renderDashboard():v==='tasks'?this.renderTasks():v==='requests'?this.renderRequests():v==='interviews'?this.renderInterviews():v==='campaigns'?this.renderCampaigns():v==='accounts'?this.renderAccounts():v==='team'?this.renderTeam():v==='guide'?this.renderGuide():this.renderSettings()),E('footer',{className:'app-footer'},E('span',null,'RecruitOps v2.0 · Local operations pilot · Not connected to Meta Ads Manager'),E('span',null,'Company-aware operations workspace'))),this.renderOverlays(),this.state.toast?E('div',{className:'toast'},E(Icon,{name:'check',size:17}),this.state.toast):null)}
 renderDashboard(){
 const v=this.visible, active=v.tasks.filter(t=>t.status!=='done');
 const today=active.filter(t=>delta(t.dueDate)===0).length;
 const overdue=active.filter(t=>delta(t.dueDate)<0).length;
 const review=active.filter(t=>t.status==='in_review').length;
 const upcoming=v.interviews.filter(i=>delta(i.interviewDate)>=0).sort((a,b)=>a.interviewDate.localeCompare(b.interviewDate));
 const sorted=[...active].sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
 const completed=v.tasks.filter(t=>t.status==='done').length;
 const completion=v.tasks.length?Math.round(100*completed/v.tasks.length):0;
 const stats=[['Open tasks',active.length,'tasks','blue','Across selected workspace'],['Due today',today,'clock','orange','Tasks requiring action'],['Overdue',overdue,'alert','red','Need immediate follow-up'],['Needs approval',review,'shield','purple','Waiting on a reviewer']];
 const hero=E('section',{className:'hero'},
  E('div',null,
   E('div',{className:'hero-kicker'},E(Icon,{name:'spark',size:15}),'OPERATIONS AT A GLANCE'),
   E('h2',null,'Good ',new Date().getHours()<12?'morning':new Date().getHours()<17?'afternoon':'evening',', ',this.state.me.name.split(' ')[0],'.'),
   E('p',null,'Here’s what needs your attention today, across every active interview and team.'),
   E('div',{className:'hero-actions'},
     E(Button,{variant:'white',icon:'tasks',onClick:()=>this.navTo('tasks')},'Review tasks'),
     E(Button,{variant:'ghostlight',icon:'calendar',onClick:()=>this.navTo('interviews')},'View interviews'))),
  E('div',{className:'hero-graphic'},
     E('div',{className:'orbit orbit-1'}),E('div',{className:'orbit orbit-2'}),
     E('div',{className:'hero-center'},E(Icon,{name:'activity',size:31}),E('b',null,completion+'%'),E('small',null,'Tasks completed'))));
 const metric=E('section',{className:'stat-grid'},stats.map(([label,value,icon,tone,note])=>
   E('div',{className:'stat-card',key:label},
     E('div',{className:'stat-top'},E('span',null,label),E('span',{className:'stat-icon '+tone},E(Icon,{name:icon,size:20}))),
     E('div',{className:'stat-number'},value),E('p',null,note))));
 const queueRows=sorted.slice(0,5).map(t=>E('button',{key:t.id,className:'attention-item',onClick:()=>this.setState({selectedTask:t.id})},
   E('div',{className:'check-orbit'},E(Icon,{name:t.status==='in_review'?'shield':'check',size:17})),
   E('div',{className:'attention-body'},
      E('strong',null,t.title),
      E('div',{className:'attention-meta'},E('span',{className:'company-mini-dot',style:{background:this.companyOf(t.companyId).accent}}),this.companyOf(t.companyId).short,' · ',this.teamOf(t.teamId)?.name||'Unassigned')),
   E('div',{className:'attention-right'},E(Badge,{tone:delta(t.dueDate)<0?'red':delta(t.dueDate)===0?'orange':'slate'},humanDue(t.dueDate)),E(Icon,{name:'chevron',size:16}))));
 const queue=E('section',{className:'surface main-surface'},
   E('div',{className:'surface-head'},E('div',null,E('div',{className:'eyebrow'},'PRIORITY QUEUE'),E('h3',null,'Your team’s next actions'),E('p',null,'Next actions across your selected companies.')),E('button',{className:'text-link',onClick:()=>this.navTo('tasks')},'View all ',E(Icon,{name:'arrow',size:15}))),
   sorted.length?E('div',{className:'attention-list'},queueRows):emptyBlock('check','All caught up','Nothing urgent for this company.'),
   E('div',{className:'section-footer'},E('span',null,'Tip: use Assigned to me to focus on your own tasks. Open a task to attach links or submit for approval.')));
 const week=Array.from({length:7},(_,i)=>({d:isoOffset(i-2),name:new Date(isoOffset(i-2)+'T12:00:00').toLocaleDateString('en-US',{weekday:'short'}),count:active.filter(t=>t.dueDate===isoOffset(i-2)).length}));
 const max=Math.max(1,...week.map(w=>w.count));
 const bars=E('div',{className:'bar-chart'},week.map((w,i)=>E('div',{className:'bar-column',key:w.d},
   E('div',{className:'bar-space'},E('div',{className:'bar-fill'+(i===2?' bar-today':''),style:{height:(w.count?Math.max(14,100*w.count/max):5)+'%'}},w.count?E('span',null,w.count):null)),
   E('span',null,w.name),i===2?E('small',null,'TODAY'):null)));
 const workload=E('section',{className:'surface workload-surface'},
  E('div',{className:'surface-head'},E('div',null,E('div',{className:'eyebrow'},'WEEKLY WORKLOAD'),E('h3',null,'Upcoming deadlines'),E('p',null,'Tasks due by day.'))),
  bars,E('div',{className:'workload-bottom'},E('div',null,E('strong',null,completion+'%'),E('span',null,'Overall completion')),E(Progress,{value:completion})));
 const interviewsList=upcoming.slice(0,4).map(i=>{
   const tasks=v.tasks.filter(t=>t.interviewId===i.id),done=tasks.filter(t=>t.status==='done').length;
   const dt=new Date(i.interviewDate+'T12:00:00');
   return E('div',{className:'interview-quick',key:i.id},
     E('div',{className:'date-square'},E('b',null,dt.getDate()),E('span',null,dt.toLocaleDateString('en-US',{month:'short'}))),
     E('div',{className:'interview-quick-body'},E('strong',null,i.employer),E('div',null,this.companyOf(i.companyId).short,' · Starts ',dateText(isoShift(i.interviewDate,-7))),E(Progress,{value:tasks.length?100*done/tasks.length:0})),
     E('span',{className:'interview-quick-budget'},fmtMoney(i.budget)));
 });
 const interviews=E('section',{className:'surface'},
   E('div',{className:'surface-head'},E('div',null,E('div',{className:'eyebrow'},'RECRUITMENT SCHEDULE'),E('h3',null,'Upcoming interviews'),E('p',null,'Campaigns begin seven days before interview.')),E('button',{className:'text-link',onClick:()=>this.navTo('interviews')},'Full calendar ',E(Icon,{name:'arrow',size:15}))),
   upcoming.length?E('div',{className:'interview-quick-list'},interviewsList):emptyBlock('calendar','No interviews','Create an interview to auto-generate a workflow.'));
 const activity=E('section',{className:'surface'},
   E('div',{className:'surface-head'},E('div',null,E('div',{className:'eyebrow'},'TEAM UPDATES'),E('h3',null,'Recent activity'),E('p',null,'Progress and handoffs from the workspace.'))),
   v.activities.length?E('div',{className:'activity-list'},v.activities.slice(0,5).map(a=>E('div',{className:'activity-item',key:a.id},E('span',{className:'activity-dot'}),E('div',null,E('strong',null,a.actor),E('p',null,a.description),E('small',null,new Date(a.at).toLocaleString()))))):emptyBlock('activity','No updates yet','Task changes will appear here.'));
 const quick=E('section',{className:'quick-path'},
   E('div',{className:'quick-path-intro'},E(Icon,{name:'bolt',size:19}),E('div',null,E('strong',null,'3-step daily workflow'),E('span',null,'টিমের কাজ সহজভাবে পরিচালনা করুন'))),
   E('button',{onClick:()=>this.navTo('tasks')},E('b',null,'01'),E('span',null,'Check tasks'),E(Icon,{name:'arrow',size:16})),
   E('button',{onClick:()=>this.navTo('requests')},E('b',null,'02'),E('span',null,'Assign to a team'),E(Icon,{name:'arrow',size:16})),
   E('button',{onClick:()=>this.navTo('interviews')},E('b',null,'03'),E('span',null,'Review interviews'),E(Icon,{name:'arrow',size:16})));
 return E('div',{className:'page-enter'},hero,quick,metric,E('div',{className:'dashboard-grid'},queue,workload),E('div',{className:'dashboard-grid secondary-grid'},interviews,activity));
 }
 renderTasks(){
  const v=this.visible, q=this.state.search.toLowerCase(), filter=this.state.status;
  let tasks=v.tasks.filter(t=>{
    const matchFilter=filter==='all'||(filter==='mine'?t.assigneeId===this.state.me.id:filter==='overdue'?delta(t.dueDate)<0&&t.status!=='done':t.status===filter);
    const inText=[t.title,this.companyOf(t.companyId).name,this.interviewOf(t.interviewId)?.employer,this.teamOf(t.teamId)?.name].join(' ').toLowerCase();
    return matchFilter&&(!q||inText.includes(q));
  });
  tasks.sort((a,b)=>(a.status==='done'?1:0)-(b.status==='done'?1:0)||a.dueDate.localeCompare(b.dueDate));
  const filters=[['all','All tasks'],['mine','Assigned to me'],['overdue','Overdue'],['in_progress','In progress'],['in_review','In review'],['done','Completed']];
  const tabs=E('div',{className:'tabs'},filters.map(([k,label])=>E('button',{key:k,className:'tab'+(filter===k?' selected':''),onClick:()=>this.setState({status:k})},label)));
  const thead=E('thead',null,E('tr',null,['Task','Owner / Team','Due date','Status',''].map(h=>E('th',{key:h},h))));
  const trs=tasks.slice(0,160).map(t=>{
   const owner=this.userOf(t.assigneeId)?.name||'Unassigned',team=this.teamOf(t.teamId)?.name||'No team';
   return E('tr',{key:t.id,className:'click-row',onClick:()=>this.setState({selectedTask:t.id})},
    E('td',null,E('div',{className:'task-table-title'},E('span',{className:'task-dot '+priorityClass[t.priority]}),E('div',null,E('strong',null,t.title),E('small',null,this.companyOf(t.companyId).short,' · ',this.interviewOf(t.interviewId)?.employer||'General task')))),
    E('td',null,E('div',{className:'owner-cell'},E(Avatar,{name:owner==='Unassigned'?team:owner,size:'small'}),E('div',null,E('strong',null,owner),E('small',null,team)))),
    E('td',null,E('div',{className:'due-cell'+(delta(t.dueDate)<0&&t.status!=='done'?' late':'')},E(Icon,{name:'calendar',size:15}),humanDue(t.dueDate))),
    E('td',null,E(Badge,{tone:statusClass[t.status]},labelStatus[t.status]||t.status)),
    E('td',null,E('span',{className:'row-arrow'},E(Icon,{name:'chevron',size:17}))));
  });
  const contents=tasks.length?E('div',{className:'table-scroll'},E('table',{className:'data-table'},thead,E('tbody',null,trs))):emptyBlock('tasks','No matching tasks','Try another filter or create a new task.',E(Button,{icon:'plus',small:true,onClick:()=>this.show('task')},'Add task'));
  return E('div',{className:'page-enter'},
   E('div',{className:'page-brief'},E('div',null,E('div',{className:'eyebrow'},'TEAM TASK TRACKER'),E('h2',null,'Every task, one clear owner.'),E('p',null,'Only what your team needs. Open a task for links, comments and approvals.')),E(Button,{icon:'plus',onClick:()=>this.show('task')},'Create task')),
   E('section',{className:'surface tracker'},
    E('div',{className:'list-toolbar'},E('div',{className:'searchbox'},E(Icon,{name:'search',size:18}),E('input',{placeholder:'Search task, interview or team...',value:this.state.search,onChange:e=>this.setState({search:e.target.value})})),E('span',{className:'result-count'},tasks.length+' tasks')),
    tabs,contents,E('div',{className:'table-bottom'},E('span',null,'Showing ',Math.min(tasks.length,160),' of ',tasks.length,' tasks'),E('span',null,'Click a row to open task details'))));
 }
 renderRequests(){const v=this.visible,q=this.state.search.toLowerCase(),req=v.requests.filter(x=>!q||[x.title,x.description].join(' ').toLowerCase().includes(q));return E('div',{className:'page-enter'},E('div',{className:'page-brief'},E('div',null,E('div',{className:'eyebrow'},'CROSS-TEAM COLLABORATION'),E('h2',null,'One handoff. One trackable task.'),E('p',null,'Every new team request automatically creates a task in the Task Tracker, with the receiving team and deadline.')),E(Button,{icon:'plus',onClick:()=>this.show('request')},'New team request')),E('div',{className:'list-toolbar standalone'},E('div',{className:'searchbox'},E(Icon,{name:'search',size:18}),E('input',{placeholder:'Search team requests...',value:this.state.search,onChange:e=>this.setState({search:e.target.value})})),E('span',{className:'result-count'},req.length+' requests')),req.length?E('div',{className:'request-grid'},req.map(item=>E('div',{className:'request-card',key:item.id,onClick:()=>this.setState({selectedRequest:item.id})},E('div',{className:'request-top'},E('span',{className:'request-icon'},E(Icon,{name:'send',size:19})),E(Badge,{tone:statusClass[item.status]||'slate'},labelStatus[item.status]||item.status)),E('strong',{className:'request-title'},item.title),E('p',null,item.description||'No description provided.'),E('div',{className:'request-flow'},E('div',null,E('small',null,'FROM'),E('strong',null,this.teamOf(item.fromTeamId)?.name||'Requesting team')),E(Icon,{name:'arrow',size:17}),E('div',null,E('small',null,'TO'),E('strong',null,this.teamOf(item.toTeamId)?.name||'Receiving team'))),E('div',{className:'request-foot'},E('span',null,E(Icon,{name:'calendar',size:16}),humanDue(item.dueDate)),E(Badge,{tone:priorityClass[item.priority]},item.priority+' priority'))))):emptyBlock('send','No requests yet','Create a new request to coordinate work between teams.',E(Button,{icon:'plus',onClick:()=>this.show('request')},'Create request')))}
 renderInterviews(){const v=this.visible,items=[...v.interviews].sort((a,b)=>a.interviewDate.localeCompare(b.interviewDate));return E('div',{className:'page-enter'},E('div',{className:'page-brief'},E('div',null,E('div',{className:'eyebrow'},'7-DAY INTERVIEW PIPELINE'),E('h2',null,'From schedule to campaign launch.'),E('p',null,'Each interview gets its own budget and a prebuilt workflow, starting seven days earlier.')),E(Button,{icon:'plus',onClick:()=>this.show('interview')},'Add interview')),E('div',{className:'interview-grid'},items.map(i=>{const tasks=v.tasks.filter(t=>t.interviewId===i.id),done=tasks.filter(t=>t.status==='done').length,start=isoShift(i.interviewDate,-7),days=delta(i.interviewDate);return E('div',{className:'interview-card',key:i.id},E('div',{className:'interview-card-top'},E('span',{className:'company-label'},E('span',{className:'company-mini-dot',style:{background:this.companyOf(i.companyId).accent}}),this.companyOf(i.companyId).name),i.source==='demo'?E(Badge,{tone:'purple'},'Sample'):i.source==='google'?E(Badge,{tone:'blue'},'Google CMS'):E(Badge,{tone:'slate'},'Manual')),E('h3',null,i.employer),E('div',{className:'interview-meta'},E('span',null,E(Icon,{name:'calendar',size:16}),'Interview ',dateText(i.interviewDate)),E('span',null,E(Icon,{name:'bolt',size:16}),'Launch ',dateText(start))),E('div',{className:'interview-boxes'},E('div',null,E('small',null,'TOTAL BUDGET'),E('strong',null,fmtMoney(i.budget))),E('div',null,E('small',null,'TIME LEFT'),E('strong',null,days<0?'Completed':days===0?'Today':days+' days'))),E('div',{className:'interview-progress'},E('div',null,E('span',null,'Workflow progress'),E('b',null,done+'/'+tasks.length+' tasks')),E(Progress,{value:tasks.length?100*done/tasks.length:0})),E('div',{className:'interview-actions'},E(Button,{variant:'subtle',small:true,icon:'tasks',onClick:()=>{this.setState({view:'tasks',search:i.employer})}},'See tasks'),E(Button,{small:true,variant:'outline',icon:'chart',onClick:()=>this.setState({view:'campaigns',selectedInterview:i.id})},'Budget plan')))}),items.length?null:emptyBlock('calendar','No interviews scheduled','Add an interview to generate the seven-day task workflow.',E(Button,{icon:'plus',onClick:()=>this.show('interview')},'New interview'))))}
 renderCampaigns(){
  const v=this.visible;
  const selected=v.interviews.find(i=>i.id===this.state.selectedInterview)||v.interviews[0];
  const budget=Number(selected?.budget||0);
  const accounts=v.accounts.filter(a=>a.companyId===selected?.companyId);
  const allocations=allocate(accounts,budget);
  const header=E('div',{className:'page-brief'},E('div',null,
    E('div',{className:'eyebrow'},'INTERVIEW-SPECIFIC SPENDING'),
    E('h2',null,'A precise budget. Automatically allocated.'),
    E('p',null,'50% CALL + 50% WEB; then 70% Awareness / 15% Retargeting / 15% Conversion for each channel.')));
  if(!selected)return E('div',{className:'page-enter'},header,emptyBlock('dollar','No interview budgets yet','Create an interview first.',E(Button,{icon:'plus',onClick:()=>this.show('interview')},'Add interview')));
  const selector=E('select',{className:'select-wide',value:selected.id,onChange:e=>this.setState({selectedInterview:e.target.value})},
    v.interviews.map(i=>E('option',{key:i.id,value:i.id},this.companyOf(i.companyId).short+' · '+i.employer+' · '+dateText(i.interviewDate))));
  const budgetBoxes=E('div',{className:'budget-metrics'},
    E('div',{className:'budget-main'},E('span',null,'Total interview budget'),E('strong',null,fmtMoney(budget)),E('small',null,'Only this interview · no other company')),
    E('div',null,E('span',null,'Call campaigns · 50%'),E('strong',null,fmtMoney(budget*.5)),E('small',null,'Phone inquiries')),
    E('div',null,E('span',null,'Web campaigns · 50%'),E('strong',null,fmtMoney(budget*.5)),E('small',null,'Landing page → call / apply')));
  const summary=E('section',{className:'surface budget-top'},
    E('div',{className:'budget-top-select'},E('div',null,E('div',{className:'eyebrow'},'SELECT AN INTERVIEW'),E('h3',null,'Budget calculator')),selector),
    budgetBoxes,
    E('div',{className:'budget-graphic'},E('span',{style:{width:'50%'}},'CALL · 50%'),E('span',{style:{width:'50%'}},'WEB · 50%')),
    E('div',{className:'budget-edit-row'},E('span',null,E(Icon,{name:'shield',size:15}),'Actual spend must be checked in Meta Ads Manager.'),E(Button,{icon:'edit',variant:'outline',small:true,onClick:()=>this.show('budget',{budget:String(budget),interviewId:selected.id})},'Edit budget')));
  const stages=[['Awareness',.7],['Retargeting',.15],['Conversion',.15]];
  const stagePanels=['CALL','WEB'].map(ch=>{
    const list=stages.map(([stage,pct])=>E('div',{className:'stage-line',key:stage},
      E('div',{className:'stage-head'},E('div',null,E('span',{className:'stage-color '+stage.toLowerCase()}),E('strong',null,stage)),E('span',null,(pct*100)+'% · ',E('b',null,fmtMoney(budget*.5*pct)))),
      E('div',{className:'stage-track'},E('span',{style:{width:pct*100+'%'}}))));
    return E('section',{className:'surface stage-panel',key:ch},
      E('div',{className:'surface-head'},E('div',null,E('div',{className:'eyebrow'},ch+' CHANNEL'),E('h3',null,ch==='CALL'?'Call campaign distribution':'Web campaign distribution'),E('p',null,fmtMoney(budget*.5)+' channel total'))),list);
  });
  const trs=allocations.map(a=>E('tr',{key:a.id},
     E('td',null,E('strong',null,a.label)),E('td',null,'Page '+a.page),
     E('td',null,E(Badge,{tone:a.channel==='CALL'?'orange':'blue'},a.channel)),
     E('td',null,a.stage),E('td',{className:'numeric strong'},fmtMoney(a.allocation))));
  const matrix=E('section',{className:'surface accounts-budget'},
    E('div',{className:'surface-head'},
      E('div',null,E('div',{className:'eyebrow'},'ACCOUNT-LEVEL PLAN'),E('h3',null,'Where every dollar goes'),E('p',null,allocations.length+' ad accounts for '+this.companyOf(selected.companyId).name+'.')),
      E(Badge,{tone:'green'},'Allocated '+fmtMoney(allocations.reduce((s,a)=>s+a.allocation,0)))),
    E('div',{className:'table-scroll'},E('table',{className:'data-table budget-table'},
       E('thead',null,E('tr',null,['Ad account','Page','Channel','Funnel','Allocation'].map(h=>E('th',{key:h},h)))),E('tbody',null,trs))),
    E('div',{className:'table-bottom'},'Total planned allocation: ',fmtMoney(budget),' across ',allocations.length,' accounts.'));
  return E('div',{className:'page-enter'},header,summary,E('div',{className:'budget-stage-grid'},stagePanels),matrix);
 }
 renderAccounts(){const v=this.visible;return E('div',{className:'page-enter'},E('div',{className:'page-brief'},E('div',null,E('div',{className:'eyebrow'},'38 TOTAL ACCOUNTS'),E('h2',null,'A clean account map for every page.'),E('p',null,'Assign actual Meta account IDs and a responsible media buyer. Every account has a single funnel role.'))),E('section',{className:'surface'},E('div',{className:'surface-head'},E('div',null,E('h3',null,'Meta advertising accounts'),E('p',null,'The selected company has '+v.accounts.length+' accounts, organized by Facebook Page.'))),E('div',{className:'table-scroll'},E('table',{className:'data-table'},E('thead',null,E('tr',null,['Ad account','Page','Channel','Audience stage','Account ID','Action'].map(x=>E('th',{key:x},x)))),E('tbody',null,v.accounts.map(a=>E('tr',{key:a.id},E('td',null,E('strong',null,a.label),E('small',{className:'table-sub'},this.companyOf(a.companyId).short)),E('td',null,'Page '+a.page),E('td',null,E(Badge,{tone:a.channel==='CALL'?'orange':'blue'},a.channel)),E('td',null,a.stage),E('td',null,E('code',{className:'mini-code'},a.metaAccountId||'Not connected')),E('td',null,E(Button,{variant:'outline',small:true,icon:'edit',onClick:()=>this.show('account',{id:a.id,metaAccountId:a.metaAccountId,ownerId:a.ownerId})},'Edit'))))))),E('div',{className:'table-bottom'},E('span',null,'Creative 14 (8 CALL + 6 WEB) · Coastal 12 · SM 12'),E('span',null,'Real Meta login/OAuth is not included in this MVP'))))}
 renderTeam(){const v=this.visible;return E('div',{className:'page-enter'},E('div',{className:'page-brief'},E('div',null,E('div',{className:'eyebrow'},'PEOPLE & RESPONSIBILITIES'),E('h2',null,'Give every team a clear lane.'),E('p',null,'A company can have Marketing, Creative, Web, Media Buying, Call Center and Interview Ops teams.')),['super_admin','company_admin'].includes(this.state.me.role)?E(Button,{icon:'plus',onClick:()=>this.show('user')},'Add member'):null),E('div',{className:'team-cards'},v.teams.filter(t=>this.state.company!=='all'||v.companies.some(c=>c.id===t.companyId)).map(team=>{const people=v.users.filter(u=>u.teamId===team.id);return E('div',{className:'surface team-card',key:team.id},E('div',{className:'team-top'},E('span',{className:'team-icon'},E(Icon,{name:team.name==='Media Buying'?'target':team.name==='Creative Studio'?'spark':team.name==='Web & Tracking'?'link':'users',size:20})),E(Badge,{tone:'slate'},this.companyOf(team.companyId).short)),E('h3',null,team.name),E('p',null,people.length+' members · '+v.tasks.filter(t=>t.teamId===team.id&&t.status!=='done').length+' open tasks'),E('div',{className:'member-chips'},people.length?people.map(u=>E('div',{key:u.id,className:'person-chip'},E(Avatar,{name:u.name,size:'small'}),E('div',null,E('strong',null,u.name),E('small',null,u.role.replaceAll('_',' '))))):E('small',null,'No active members yet.')))})))}
 renderGuide(){const sop=[['01. Morning planning','Open Overview, review overdue work first, then confirm today’s launches and interview reminders. Assign one owner and due date to each task.'],['02. Content handoff','Marketing sends a brief to Creative Studio with employer facts, job category, reference links and required deliverables. Creative sends the approved videos for review.'],['03. Landing page QA','Web & Tracking publishes a mobile-first page with video, verified job conditions, call button, UTM labels and working conversion events.'],['04. Budget assignment','Pick one interview in Campaign Planner. Each interview has its own budget; split 50% Call and 50% Web. Every channel gets 70% Awareness, 15% Retargeting and 15% Conversion.'],['05. Media buying','Use the 38-account map. Check company/Page permissions, available audiences, destination links, correct hotline and exact dates before publishing.'],['06. Approval','An assignee can move work to In review. A manager or admin marks it Completed after reviewing the submitted proof. Revision Required sends it back.'],['07. Interview operations','Campaign launch is seven days before the interview. A previous interview may end on the same day that the new campaign begins; manage both separately.'],['08. Performance review','Compare planned with actual Meta spend, connected and qualified calls, verified website leads and interview attendance. Log learning by interview ID.']];const strategy=[['Company structure','Creative has 14 accounts (per page: 4 CALL + 3 WEB); Coastal has 12 (3 CALL + 3 WEB/page); SM has 12 (3 CALL + 3 WEB/page). Two Pages per company.'],['Awareness / TOF','70% of each channel. Use broad, policy-compliant new prospective applicants. Lead with verified opportunity, clear eligibility and role details.'],['Retargeting / MOF','15% of each channel. Use available, permitted video viewers, Page engagers or site visitors. Answer FAQs and verify the agency / employer process.'],['Conversion / BOF','15% of each channel. Use high-intent audiences when data and permissions allow. Real interview reminder, candidate preparation and call/apply CTA.'],['Creative account nuance','For each Creative page CALL01 + CALL02 both serve Awareness with distinct content, CALL03 is Retargeting, CALL04 is Conversion; WEB01–03 map one-to-one.'],['Tracking & outcome','Call-click is not a connected call. Link-click is not an eligible lead. Track verified calls, enquiry quality, attendance and campaign spend separately.'],['Policy & safeguards','Employment ad-targeting restrictions can apply. Do not claim guaranteed jobs, visas or salary. Never invent scarcity or unverified deadlines.'],['Budget controls','A manager approves deviations from 50/50 or 70/15/15 if warm audiences are too small or Meta delivery is limited.']];const section=(name,title,list)=>E('section',{className:'surface guide-section'},E('div',{className:'guide-top'},E('span',{className:'guide-icon'},E(Icon,{name:name==='SOP'?'list':'target',size:22})),E('div',null,E('div',{className:'eyebrow'},name),E('h3',null,title))),E('div',{className:'accordion-list'},list.map(([title,details],index)=>E('details',{className:'accordion',key:title,open:index===0?true:undefined},E('summary',null,E('span',{className:'accordion-number'},String(index+1).padStart(2,'0')),E('strong',null,title),E(Icon,{name:'down',size:16})),E('p',null,details)))));return E('div',{className:'page-enter'},E('div',{className:'page-brief'},E('div',null,E('div',{className:'eyebrow'},'ONE OPERATIONS PLAYBOOK'),E('h2',null,'Simple rules for the whole team.'),E('p',null,'No complicated spreadsheet columns. Expand the step you need and get back to work.'))),E('div',{className:'guide-grid'},section('SOP','Standard operating procedure',sop),section('STRATEGY','Campaign & audience guidelines',strategy)),E('div',{className:'note-banner'},E(Icon,{name:'shield',size:20}),E('div',null,E('strong',null,'Verified recruitment information comes first.'),E('p',null,'Before publishing, confirm employer details, interviews, eligibility, official numbers and all claims with the operations team.'))))}
 renderSettings(){
  const d=this.state.data||{},x=this.state.settingsDraft||{},canEdit=this.state.me.role==='super_admin';
  const tabInputs=(d.companies||[]).map(c=>E(Field,{key:c.id,label:c.short+' source tab'},E('input',{value:x.sourceTabs?.[c.id]||'',disabled:!canEdit,onChange:e=>this.setState(s=>({settingsDraft:{...s.settingsDraft,sourceTabs:{...s.settingsDraft.sourceTabs,[c.id]:e.target.value}}}))})));
  const connection=E('section',{className:'surface settings-card'},
    E('div',{className:'settings-card-head'},E('span',{className:'team-icon'},E(Icon,{name:'link',size:22})),E('div',null,E('h3',null,'Google Sheets source'),E('p',null,'Read-only interview and budget import.'))),
    E('div',{className:'settings-form'},
      E(Field,{label:'Mother Command Center URL'},E('input',{type:'url',placeholder:'https://docs.google.com/spreadsheets/d/.../edit',value:x.sourceUrl||'',disabled:!canEdit,onChange:e=>this.setState(s=>({settingsDraft:{...s.settingsDraft,sourceUrl:e.target.value}}))})),
      E('div',{className:'settings-trio'},tabInputs),
      E('div',{className:'integration-status'},E('span',{className:'status-led '+(d.settings?.serviceAccountConfigured?'on':'off')}),d.settings?.serviceAccountConfigured?'Server credentials configured':'Server credentials not configured'),
      E('p',{className:'small-muted'},'Configure a service-account JSON on your server and share your CMS spreadsheet with that email as Viewer. No private keys in the browser.'),
      E('p',{className:'small-muted'},'Last sync: ',d.settings?.lastSync?new Date(d.settings.lastSync).toLocaleString():'Never'),
      E('div',{className:'settings-buttons'},
         E(Button,{variant:'outline',icon:'check',disabled:!canEdit||this.state.busy,onClick:()=>this.mutation('/settings',{sourceUrl:x.sourceUrl,sourceTabs:x.sourceTabs},'POST','Source settings saved')},'Save connection'),
         E(Button,{icon:'upload',disabled:!['super_admin','company_admin','manager'].includes(this.state.me.role)||this.state.busy,onClick:()=>this.syncGoogle()},this.state.busy?'Working…':'Sync interviews'))));
  const roles=[['Super Admin','Sees all brands, controls CMS and creates users.'],['Company Admin','Manages users and content for one company only.'],['Manager','Assigns, reviews and approves tasks in that company.'],['Team Member','Updates assigned tasks and submits work for review.']];
  const access=E('section',{className:'surface settings-card'},
    E('div',{className:'settings-card-head'},E('span',{className:'team-icon'},E(Icon,{name:'shield',size:22})),E('div',null,E('h3',null,'Workspace access'),E('p',null,'Protect each company’s operations.'))),
    E('div',{className:'permissions-list'},roles.map(([title,description])=>E('div',{key:title},E('strong',null,title),E('p',null,description)))),
    E('div',{className:'settings-buttons'},['super_admin','company_admin'].includes(this.state.me.role)?E(Button,{variant:'outline',icon:'plus',onClick:()=>this.show('user')},'Add team member'):null));
  const brandCards=(d.companies||[]).map(c=>E('div',{className:'settings-brand',key:c.id},
    E('div',{className:'settings-brand-avatar',style:{background:c.accent}},c.short.charAt(0)),
    E('div',null,E('strong',null,c.name),E('small',null,c.phone)),
    E(Badge,{tone:'green'},'Active')));
  const brands=E('section',{className:'surface settings-card full-settings'},
    E('div',{className:'settings-card-head'},E('span',{className:'team-icon'},E(Icon,{name:'briefcase',size:22})),E('div',null,E('h3',null,'Connected brands'),E('p',null,'Three separate workspaces, one command center.'))),
    E('div',{className:'setting-brand-row'},brandCards));
  return E('div',{className:'page-enter'},
    E('div',{className:'page-brief'},E('div',null,E('div',{className:'eyebrow'},'DATA CONNECTIONS & ACCESS'),E('h2',null,'Keep your sources and teams organized.'),E('p',null,'Connect your Mother Google Sheet once, then import interviews by company tab.'))),
    E('div',{className:'settings-grid'},connection,access,brands),
    this.state.error?E('div',{className:'inline-error'},this.state.error):null);
 }
 async syncGoogle(){this.setState({busy:true,error:''});try{const x=await this.api('/sync/google',{method:'POST',body:'{}'});await this.load();this.notify(`Google sync complete: ${x.created} new interviews, ${x.updated} updated`)}catch(e){this.setState({error:e.message})}finally{this.setState({busy:false})}}
 renderOverlays(){const s=this.state,d=this.state.data||{companies:[],teams:[],users:[],interviews:[],tasks:[],accounts:[],requests:[]};const selectedTask=d.tasks?.find(t=>t.id===s.selectedTask),selectedRequest=d.requests?.find(x=>x.id===s.selectedRequest);if(selectedTask)return this.renderTaskDetail(selectedTask);if(selectedRequest)return this.renderRequestDetail(selectedRequest);if(!s.modal)return null;
 const f=s.form;const formInput=(label,k,type='text',req=false,hint)=>E(Field,{label,hint},E('input',{type,required:req,value:f[k]??'',onChange:e=>this.setForm(k,e.target.value)}));const select=(label,k,items)=>E(Field,{label},E('select',{value:f[k]||'',onChange:e=>this.setForm(k,e.target.value)},E('option',{value:''},'Select…'),items.map(([id,name])=>E('option',{value:id,key:id},name))));const choices=(arr)=>arr.map(x=>[x.id,x.name]);const companies=choices(d.companies);const teams=choices(d.teams.filter(t=>t.companyId===f.companyId));const users=choices(d.users.filter(u=>u.companyId===f.companyId));const interviews=d.interviews.filter(i=>i.companyId===f.companyId).map(i=>[i.id,i.employer+' · '+dateText(i.interviewDate)]);const pr=[['low','Low'],['normal','Normal'],['high','High'],['urgent','Urgent']];const footer=(label,onClick)=>E('div',{className:'form-footer'},E(Button,{variant:'outline',onClick:()=>this.setState({modal:'',error:''})},'Cancel'),E(Button,{icon:'check',disabled:this.state.busy,onClick},this.state.busy?'Saving…':label));const err=this.state.error?E('div',{className:'inline-error'},this.state.error):null;
 if(s.modal==='task')return E(Modal,{title:'Create a new task',subtitle:'Assign a clear owner, deadline and a detailed brief.',close:()=>this.setState({modal:''})},E('div',{className:'form-grid'},formInput('Task title','title','text',true),select('Company','companyId',companies),select('Assigned team','teamId',teams),select('Assign to member','assigneeId',users),select('Related interview (optional)','interviewId',interviews),select('Priority','priority',pr),formInput('Due date','dueDate','date',true),E(Field,{label:'Description & requirements',full:true},E('textarea',{value:f.description||'',rows:4,placeholder:'What exactly should be delivered? Add scope, specs and success criteria.',onChange:e=>this.setForm('description',e.target.value)})),E(Field,{label:'Reference links (one per line)',full:true},E('textarea',{rows:2,placeholder:'https://drive.google.com/...',value:f.linkText||'',onChange:e=>this.setForm('linkText',e.target.value)}))),err,footer('Create task',()=>this.mutation('/tasks',{...f,links:(f.linkText||'').split(/\n/).filter(Boolean)},'POST','Task created and assigned')));
 if(s.modal==='request')return E(Modal,{title:'Send a team request',subtitle:'A task handoff that both teams can see and track.',close:()=>this.setState({modal:''})},E('div',{className:'form-grid'},formInput('Request title','title','text',true),select('Company','companyId',companies),select('Requesting team','fromTeamId',teams),select('Receiving team','toTeamId',teams),select('Assigned member','assigneeId',users),select('Priority','priority',pr),formInput('Due date','dueDate','date',true),E(Field,{label:'Requirements & deliverables',full:true},E('textarea',{rows:5,value:f.description||'',placeholder:'Specify files, dimensions, content, links, approvals and exact outcome.',onChange:e=>this.setForm('description',e.target.value)})),E(Field,{label:'Reference links',full:true},E('textarea',{rows:2,value:f.linkText||'',placeholder:'One URL per line',onChange:e=>this.setForm('linkText',e.target.value)}))),err,footer('Send request',()=>this.mutation('/requests',{...f,links:(f.linkText||'').split(/\n/).filter(Boolean)},'POST','Team request sent')));
 if(s.modal==='interview')return E(Modal,{title:'Schedule an interview',subtitle:'Create the interview and automatically generate 12 workflow tasks.',close:()=>this.setState({modal:''})},E('div',{className:'form-grid'},select('Company','companyId',companies),formInput('Employer / interview name','employer','text',true),formInput('Country','country'),formInput('Interview date','interviewDate','date',true),formInput('Total interview marketing budget ($)','budget','number',true),E(Field,{label:'Notes / approved job brief',full:true},E('textarea',{value:f.notes||'',rows:4,placeholder:'Verified job title, categories, venue and operations brief',onChange:e=>this.setForm('notes',e.target.value)}))),E('div',{className:'info-callout'},E(Icon,{name:'bolt'}),'Campaign start: ',f.interviewDate?dateText(isoShift(f.interviewDate,-7)):'7 days before interview',' · 12 automatic tasks'),err,footer('Create interview + tasks',()=>this.mutation('/interviews',f,'POST','Interview created with 12 tasks')));
 if(s.modal==='budget'){const item=this.interviewOf(f.interviewId);return E(Modal,{title:'Update interview budget',subtitle:'This budget belongs to one interview only.',close:()=>this.setState({modal:''})},E('div',{className:'form-grid'},E('div',{className:'field field-full'},E('span',{className:'field-label'},'INTERVIEW'),E('strong',null,item?.employer||'—')),formInput('Total approved interview budget ($)','budget','number',true)),E('div',{className:'info-callout'},E(Icon,{name:'dollar'}),'50% Call / 50% Web. Updates the account allocation immediately.'),err,footer('Save budget',()=>this.mutation('/interviews/'+f.interviewId,{budget:f.budget},'PATCH','Interview budget updated')))}
 if(s.modal==='account'){const acc=d.accounts.find(a=>a.id===f.id);return E(Modal,{title:'Configure ad account',subtitle:acc?.label,close:()=>this.setState({modal:''})},E('div',{className:'form-grid'},formInput('Meta Ad Account ID','metaAccountId'),select('Media buyer / owner','ownerId',choices(d.users.filter(u=>u.companyId===acc?.companyId)))),E('p',{className:'muted'},'This stores the ID for internal tracking. It does not connect to Meta or grant permissions.'),err,footer('Save account',()=>this.mutation('/accounts',f,'POST','Account mapping saved')))}
 if(s.modal==='user')return E(Modal,{title:'Add a team member',subtitle:'A new user can see only their assigned company.',close:()=>this.setState({modal:''})},E('div',{className:'form-grid'},formInput('Full name','name','text',true),formInput('Email','email','email',true),select('Company','companyId',companies),select('Role','role',[['member','Team Member'],['manager','Manager'],['company_admin','Company Admin']]),select('Team','teamId',teams),formInput('Temporary password (12+ characters)','password','password',true)),E('p',{className:'muted'},'Share initial credentials privately. Users should change them using the deployment administrator (password reset UI is not implemented in MVP).'),err,footer('Create user',()=>this.mutation('/users',f,'POST','Team member created')));
 return null}
 renderTaskDetail(t){const d=this.state.data||{},team=this.teamOf(t.teamId),me=this.state.me,lead=['super_admin','company_admin','manager'].includes(me.role),owner=lead||t.assigneeId===me.id;const comments=t.comments||[];const foot=(label,value,variant='outline')=>E(Button,{variant,small:true,disabled:this.state.busy,onClick:()=>this.mutation('/tasks/'+t.id,{status:value},'PATCH','Task status updated')},label);return E(Modal,{title:'Task details',subtitle:this.companyOf(t.companyId).name+' · '+(this.interviewOf(t.interviewId)?.employer||'General task'),width:'wide',close:()=>this.setState({selectedTask:''})},E('div',{className:'task-detail'},E('div',{className:'task-detail-main'},E('div',{className:'detail-tags'},E(Badge,{tone:statusClass[t.status]},labelStatus[t.status]),E(Badge,{tone:priorityClass[t.priority]},t.priority+' priority')),E('h2',{className:'detail-title'},t.title),E('p',{className:'detail-description'},t.description||'No brief added.'),E('h4',null,'Reference & delivery links'),t.links?.length?E('div',{className:'link-list'},t.links.map((link,i)=>E('a',{href:link,target:'_blank',rel:'noopener noreferrer',key:i},E(Icon,{name:'external',size:16}),link))):E('p',{className:'muted'},'No links added yet.'),owner?E('div',{className:'link-update'},E('input',{placeholder:'Paste proof or Google Drive URL',value:this.state.form.proofUrl||'',onChange:e=>this.setForm('proofUrl',e.target.value)}),E(Button,{variant:'outline',small:true,icon:'plus',onClick:()=>{const link=this.state.form.proofUrl;if(link)this.mutation('/tasks/'+t.id,{links:[...(t.links||[]),link]},'PATCH','Proof link saved')}},'Add link')):null,E('div',{className:'comment-heading'},E('h4',null,'Comments & feedback'),E('span',null,comments.length+' messages')),E('div',{className:'comments'},comments.length?comments.map((c,i)=>E('div',{key:c.id||i,className:'comment-item'},E(Avatar,{name:c.name,size:'small'}),E('div',null,E('div',{className:'comment-meta'},E('strong',null,c.name),E('small',null,new Date(c.at).toLocaleString())),E('p',null,c.text)))):E('p',{className:'muted'},'No comments yet. Add your requirements or a revision note.'),E('div',{className:'comment-box'},E('textarea',{rows:2,placeholder:'Write feedback or a progress update…',value:this.state.comment,onChange:e=>this.setState({comment:e.target.value})}),E(Button,{small:true,icon:'send',onClick:async()=>{if(!this.state.comment.trim())return;const text=this.state.comment;const x=await this.mutation('/tasks/'+t.id+'/comments',{text},'POST','Comment added');if(x){this.setState({selectedTask:t.id,comment:''})}}},'Post comment')))),E('aside',{className:'detail-side'},lead?E('div',{className:'reassign-box'},E('strong',null,'MANAGE ASSIGNMENT'),E('label',null,'Team'),E('select',{value:t.teamId||'',onChange:e=>this.mutation('/tasks/'+t.id,{teamId:e.target.value},'PATCH','Team updated')},E('option',{value:''},'Select team'),(d.teams||[]).filter(x=>x.companyId===t.companyId).map(x=>E('option',{key:x.id,value:x.id},x.name))),E('label',null,'Assignee'),E('select',{value:t.assigneeId||'',onChange:e=>this.mutation('/tasks/'+t.id,{assigneeId:e.target.value},'PATCH','Assignee updated')},E('option',{value:''},'Unassigned'),(d.users||[]).filter(x=>x.companyId===t.companyId).map(x=>E('option',{key:x.id,value:x.id},x.name)))):null,E('div',{className:'detail-attribute'},E('span',null,'Assigned to'),E('strong',null,this.userOf(t.assigneeId)?.name||'Unassigned')),E('div',{className:'detail-attribute'},E('span',null,'Team'),E('strong',null,team?.name||'Not set')),E('div',{className:'detail-attribute'},E('span',null,'Due date'),E('strong',null,dateText(t.dueDate))),E('div',{className:'detail-attribute'},E('span',null,'Created'),E('strong',null,new Date(t.createdAt).toLocaleDateString())),E('div',{className:'detail-attribute'},E('span',null,'Approval'),E('strong',null,t.approvalBy?this.userOf(t.approvalBy)?.name||'Manager':'Pending')),owner?E('div',{className:'status-actions'},E('span',null,'MOVE TASK TO'),t.status!=='in_progress'?foot('Start working','in_progress'):null,t.status!=='in_review'?foot('Submit for review','in_review'):null,t.status!=='blocked'?foot('Mark blocked','blocked'):null,lead&&t.status!=='done'?foot('Approve & complete','done','primary'):null,lead&&t.status==='in_review'?foot('Request revision','revision','outline'):null):null)))}
 renderRequestDetail(item){
  const lead=['super_admin','company_admin','manager'].includes(this.state.me.role);
  const labels=E('div',{className:'detail-tags'},E(Badge,{tone:statusClass[item.status]},labelStatus[item.status]||item.status),E(Badge,{tone:priorityClass[item.priority]},item.priority+' priority'));
  const workflow=E('div',{className:'request-flow'},
    E('div',null,E('small',null,'REQUESTED BY'),E('strong',null,this.teamOf(item.fromTeamId)?.name||'—')),
    E(Icon,{name:'arrow'}),
    E('div',null,E('small',null,'ASSIGNED TO'),E('strong',null,this.teamOf(item.toTeamId)?.name||'—')));
  const links=(item.links||[]).map((link,i)=>E('a',{key:i,href:link,target:'_blank',rel:'noopener noreferrer',className:'request-link'},E(Icon,{name:'external',size:16}),link));
  const messages=(item.comments||[]).map((c,i)=>E('div',{className:'comment-item',key:c.id||i},
     E(Avatar,{name:c.name,size:'small'}),
     E('div',null,E('div',{className:'comment-meta'},E('strong',null,c.name),E('small',null,new Date(c.at).toLocaleString())),E('p',null,c.text))));
  const actions=E('div',{className:'request-buttons'},
     item.status!=='in_progress'?E(Button,{variant:'outline',onClick:()=>this.mutation('/requests/'+item.id,{status:'in_progress'},'PATCH','Request started')},'Start work'):null,
     item.status!=='in_review'?E(Button,{variant:'outline',onClick:()=>this.mutation('/requests/'+item.id,{status:'in_review'},'PATCH','Request submitted for review')},'Submit review'):null,
     lead?E(Button,{onClick:()=>this.mutation('/requests/'+item.id,{status:'done'},'PATCH','Request completed')},'Approve completed'):null);
  const comments=E('div',{className:'comments'},messages.length?messages:E('p',{className:'muted'},'Add a message or revision note.'),
     E('div',{className:'comment-box'},
       E('textarea',{rows:2,placeholder:'Comment, feedback, or revision…',value:this.state.comment,onChange:e=>this.setState({comment:e.target.value})}),
       E(Button,{icon:'send',small:true,onClick:async()=>{if(!this.state.comment.trim())return;const text=this.state.comment;const x=await this.mutation('/requests/'+item.id+'/comments',{text},'POST','Message added');if(x)this.setState({selectedRequest:item.id,comment:''})}},'Post comment')));
  return E(Modal,{title:'Team request',subtitle:this.companyOf(item.companyId).name,width:'normal',close:()=>this.setState({selectedRequest:''})},
    E('div',{className:'request-modal'},labels,E('h2',null,item.title),E('p',null,item.description),workflow,
      E('div',{className:'detail-attribute'},E('span',null,'Assigned member'),E('strong',null,this.userOf(item.assigneeId)?.name||'Unassigned')),
      E('div',{className:'detail-attribute'},E('span',null,'Deadline'),E('strong',null,dateText(item.dueDate))),
      E('h4',null,'Reference links'),links.length?links:E('p',{className:'muted'},'No links provided.'),
      E('h4',null,'Team conversation'),comments,
      item.taskId?E('div',{className:'linked-task-callout'},E(Icon,{name:'tasks',size:20}),E('div',null,E('strong',null,'Automatically added to Task Tracker'),E('p',null,'You can assign the member, attach proof, and approve this handoff as a task.')),E(Button,{variant:'outline',small:true,icon:'arrow',onClick:()=>this.setState({selectedRequest:'',selectedTask:item.taskId})},'Open task')):null,actions));
 }

}
ReactDOM.render(E(App),document.getElementById('root'));
