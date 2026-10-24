import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STATIC = path.join(ROOT, 'public');
const DATA_FILE = process.env.DATA_FILE || path.join(ROOT, 'data', 'operations.json');
const PORT = Number(process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 3077));
// Hostinger injects PORT and requires the Node server to bind an available network interface.
const HOST = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');
const DEMO = process.env.DEMO_MODE === 'true';
if (DEMO && !['127.0.0.1','localhost','::1'].includes(HOST)) throw Error('For safety, DEMO_MODE can only listen on localhost.');
const ALLOWED_ROLES = ['super_admin', 'company_admin', 'manager', 'member'];
const BRANDS = [
  {id:'creative', name:'Creative International', short:'Creative', accent:'#df4c57', phone:'01958044480 | 01969905050'},
  {id:'coastal', name:'Coastal Manpower', short:'Coastal', accent:'#0977c1', phone:'01969918811 | 01969918822'},
  {id:'sm', name:'SM Enterprise', short:'SM Enterprise', accent:'#7352ce', phone:'01969928484 | 01969919494'}
];
const TEMPLATES = [
  ['Verify job brief & employer information','Interview Ops',-4,'high'],
  ['Write awareness video script','Creative Studio',-3,'high'],
  ['Produce awareness & trust videos','Creative Studio',-2,'high'],
  ['Prepare landing page & hotline CTA','Web & Tracking',-2,'high'],
  ['QA pixel, form & call tracking','Web & Tracking',-1,'high'],
  ['Approve campaign budget & audience map','Marketing',-1,'high'],
  ['Launch CALL awareness / warm / conversion','Media Buying',0,'urgent'],
  ['Launch WEB awareness / warm / conversion','Media Buying',0,'urgent'],
  ['Verify ads delivering; check call routing','Media Buying',0,'urgent'],
  ['Publish interview voice reminder','Creative Studio',5,'normal'],
  ['Confirm interview attendance & call follow-up','Interview Ops',7,'high'],
  ['Close campaign & submit performance report','Marketing',8,'normal']
];
const TODAY = ()=>{const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Dhaka',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));return `${parts.year}-${parts.month}-${parts.day}`};
function addDays(v,n){const d=new Date(v+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
function hashPassword(password,salt=crypto.randomBytes(16).toString('hex')){return `${salt}:${crypto.scryptSync(password,salt,64).toString('hex')}`}
function checkPassword(password,stored){if(!stored)return false;const [salt,key]=stored.split(':'); if(!salt||!key)return false;const actual=crypto.scryptSync(password,salt,64);const expected=Buffer.from(key,'hex');return actual.length===expected.length && crypto.timingSafeEqual(actual,expected)}
function makeId(prefix){return prefix+'_'+crypto.randomUUID().slice(0,16)}
function safeLink(v){if(typeof v!=='string')return '';try{const u=new URL(v);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}}
function budgetAccounts(){const rows=[];for(const b of BRANDS){for(const p of [1,2]){const slots=b.id==='creative'?[['CALL','Awareness',1],['CALL','Awareness',2],['CALL','Retargeting',3],['CALL','Conversion',4],['WEB','Awareness',1],['WEB','Retargeting',2],['WEB','Conversion',3]]:[['CALL','Awareness',1],['CALL','Retargeting',2],['CALL','Conversion',3],['WEB','Awareness',1],['WEB','Retargeting',2],['WEB','Conversion',3]];for(const [channel,stage,index] of slots)rows.push({id:`${b.id}-p${p}-${channel.toLowerCase()}${index}`,companyId:b.id,page:p,channel,stage,index,label:`${b.short} · Page ${p} · ${channel} ${String(index).padStart(2,'0')}`,metaAccountId:'',ownerId:''})}}return rows}
function dateOfInterview(t){return addDays(t,-7)}
function makeTask(interview,teamName,step,offset,priority,teams){const team=teams.find(v=>v.companyId===interview.companyId&&v.name===teamName);return{id:makeId('task'),companyId:interview.companyId,interviewId:interview.id,title:step,description:'Auto-created from interview workflow. Attach the approved brief, working links and final proof before requesting review.',teamId:team?.id||'',requesterTeamId:'',assigneeId:'',priority,status:'todo',dueDate:addDays(dateOfInterview(interview.interviewDate),offset),links:[],comments:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),approvalBy:'',origin:'template'}}
function createInterviewTasks(db,item){for(const [title,team,offset,p] of TEMPLATES){if(!db.tasks.some(t=>t.interviewId===item.id&&t.title===title))db.tasks.push(makeTask(item,team,title,offset,p,db.teams))}}
function addActivity(db,companyId,actor,description){db.activities.unshift({id:makeId('event'),companyId,actor,description,at:new Date().toISOString()});db.activities=db.activities.slice(0,250)}
function emptyData(){return {schema:1,companies:BRANDS,users:[],teams:BRANDS.flatMap(b=>['Marketing','Creative Studio','Web & Tracking','Media Buying','Call Center','Interview Ops'].map(name=>({id:`${b.id}-${name.toLowerCase().replace(/[^a-z]/g,'-')}`,name,companyId:b.id}))),accounts:budgetAccounts(),interviews:[],tasks:[],requests:[],activities:[],settings:{sourceUrl:'',sourceTabs:{creative:'Creative International',coastal:'Coastal Manpower',sm:'SM Enterprise'},leadDays:7,callShare:.5,awarenessShare:.7,retargetShare:.15,conversionShare:.15,lastSync:''}}}
function seedDemo(db){const sample=[['creative','Saudi Arabia · Hospitality Recruitment',8,2500],['creative','Malaysia · Factory Workers',15,3000],['coastal','Malaysia · Construction & Service',7,2400],['coastal','Saudi Arabia · Technical Workers',14,1800],['sm','Saudi Arabia · Construction Workers',10,2800],['sm','Malaysia · Plantation Workers',17,2200]];
  for(const [companyId,employer,days,budget] of sample){const interview={id:makeId('int'),companyId,employer,country:employer.split(' · ')[0],interviewDate:addDays(TODAY(),days),budget,source:'demo',sourceRow:0,notes:'Sample interview for product preview; replace with verified CMS data.',createdAt:new Date().toISOString()};db.interviews.push(interview);createInterviewTasks(db,interview)}
  const staffs=[['Creative Lead','creative','manager','Marketing'],['Coastal Lead','coastal','manager','Marketing'],['SM Lead','sm','manager','Marketing'],['Video Editor','coastal','member','Creative Studio'],['Web Developer','creative','member','Web & Tracking'],['Media Buyer','sm','member','Media Buying']];for(const [name,companyId,role,teamName] of staffs)db.users.push({id:makeId('usr'),name,email:`${name.toLowerCase().replace(/ /g,'.')}@example.invalid`,role,companyId,teamId:db.teams.find(t=>t.companyId===companyId&&t.name===teamName)?.id,passwordHash:'',disabled:true});
  for(let i=0;i<db.tasks.length;i++){if(i%7===0)db.tasks[i].status='done';else if(i%6===0)db.tasks[i].status='in_progress';else if(i%11===0)db.tasks[i].status='in_review';}
  const a=db.tasks.find(x=>x.companyId==='coastal');if(a){a.assigneeId=db.users.find(x=>x.name==='Video Editor')?.id||'';a.status='in_progress';}
  db.requests.push({id:makeId('req'),companyId:'coastal',title:'New recruitment promo video package',description:'Please prepare one main awareness video, one trust-building cut and a final CTA version. Add Google Drive links to the approved assets.',fromTeamId:db.teams.find(x=>x.companyId==='coastal'&&x.name==='Marketing')?.id||'',toTeamId:db.teams.find(x=>x.companyId==='coastal'&&x.name==='Creative Studio')?.id||'',priority:'high',status:'in_progress',dueDate:addDays(TODAY(),2),links:[],comments:[],createdAt:new Date().toISOString()});
}
let db;
function createInitial(){const initial=emptyData();const email=process.env.ADMIN_EMAIL|| (DEMO?'demo@recruitops.local':'');const pw=process.env.ADMIN_PASSWORD|| (DEMO?'DemoPass!2026':'');if(!email||!pw)throw Error('Set ADMIN_EMAIL and ADMIN_PASSWORD or use DEMO_MODE=true locally.');if(pw.length<12)throw Error('ADMIN_PASSWORD must contain at least 12 characters');initial.users.push({id:'usr-super-admin',name:'Super Admin',email:email.toLowerCase(),role:'super_admin',companyId:null,teamId:null,passwordHash:hashPassword(pw),disabled:false});if(DEMO)seedDemo(initial);return initial}
// Local file persistence is for the offline demo only. Hostinger deploy directories are replaced
// on redeploy; MySQL holds the state of the hosted app instead of storing it in those folders.
function saveLocal(next){fs.mkdirSync(path.dirname(DATA_FILE),{recursive:true});const temp=DATA_FILE+'.tmp-'+process.pid;fs.writeFileSync(temp,JSON.stringify(next,null,2),{mode:0o600});fs.renameSync(temp,DATA_FILE)}
let mysqlPool=null;
async function connectMySQL(){
  const {default:mysql}=await import('mysql2/promise');
  mysqlPool=mysql.createPool({
    host:process.env.DB_HOST || '127.0.0.1',
    port:Number(process.env.DB_PORT || 3306),
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:4,
    connectTimeout:12000,
    enableKeepAlive:true
  });
  await mysqlPool.query(`CREATE TABLE IF NOT EXISTS recruitops_state (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
    payload LONGTEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await mysqlPool.query('SELECT 1');
}
async function persist(next){
  if(mysqlPool){
    await mysqlPool.execute(`INSERT INTO recruitops_state(id,payload) VALUES (1,?)
       ON DUPLICATE KEY UPDATE payload=VALUES(payload)`,[JSON.stringify(next)]);
  }else saveLocal(next);
}
async function initializeState(){
  const hasDb=[process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_NAME].every(Boolean);
  if(process.env.NODE_ENV==='production'&&!hasDb) throw Error('PRODUCTION BLOCKED: Configure Hostinger MySQL via DB_HOST, DB_USER, DB_PASSWORD and DB_NAME first. Deployments overwrite local files.');
  if(hasDb){
    await connectMySQL();
    const [rows]=await mysqlPool.query('SELECT payload FROM recruitops_state WHERE id=1');
    if(rows.length){const saved=JSON.parse(rows[0].payload);if(saved.schema!==1)throw Error('Unsupported database version');return saved}
    const initial=createInitial();await persist(initial);return initial;
  }
  if(fs.existsSync(DATA_FILE)){
    const saved=JSON.parse(fs.readFileSync(DATA_FILE,'utf8'));
    if(saved.schema!==1)throw Error('Unsupported data version');return saved;
  }
  const initial=createInitial();saveLocal(initial);return initial;
}
const sessions=new Map();let failedLogin=new Map();let writes=Promise.resolve();
function serialized(fn){
  const res=writes.then(async()=>{
    const before=structuredClone(db);
    try{const out=await fn();await persist(db);return out}
    catch(err){db=before;throw err}
  });
  writes=res.catch(()=>{});
  return res;
}
function publicUser(u){if(!u)return null;const{passwordHash,...safe}=u;return safe}
function permittedCompanies(user){return user.role==='super_admin'?BRANDS.map(c=>c.id):[user.companyId]}
function canRead(user,obj){return !!obj&&permittedCompanies(user).includes(obj.companyId)}
function isLead(user){return ['super_admin','company_admin','manager'].includes(user.role)}
function canModifyTask(user,t){return canRead(user,t)&&(isLead(user)||t.assigneeId===user.id)}
function sanitize(s,limit=1000){return String(s||'').trim().slice(0,limit)}
function applyTaskPatch(user,task,input){if(!canModifyTask(user,task))throw httpError(403,'Only the assigned member or manager can update this task');if(input.teamId&&!db.teams.some(t=>t.id===input.teamId&&t.companyId===task.companyId))throw httpError(400,'Invalid team');if(input.assigneeId&&!db.users.some(u=>u.id===input.assigneeId&&u.companyId===task.companyId))throw httpError(400,'Invalid assignee');const old=task.status;for(const f of ['title','description','priority','dueDate','teamId','assigneeId','requesterTeamId']){if(input[f]===undefined)continue;if(!isLead(user)&&f!=='description')continue;if(f==='priority'&&!['low','normal','high','urgent'].includes(input[f]))continue;if(f==='dueDate'&&input[f]&&!/^\d{4}-\d{2}-\d{2}$/.test(input[f]))continue;task[f]=sanitize(input[f],f==='description'?3000:160)}if(input.links!==undefined&&Array.isArray(input.links))task.links=input.links.map(safeLink).filter(Boolean).slice(0,20);if(input.status!==undefined){const next=String(input.status);if(!['todo','in_progress','in_review','revision','blocked','done'].includes(next))throw httpError(400,'Unknown status');if(next==='done'&&!isLead(user))throw httpError(403,'Reviewer approval is needed to complete a task');task.status=next;if(next==='done')task.approvalBy=user.id;}task.updatedAt=new Date().toISOString();if(task.requestId){const request=db.requests.find(r=>r.id===task.requestId);if(request){request.status=task.status;request.updatedAt=task.updatedAt;}}if(old!==task.status)addActivity(db,task.companyId,user.name,`${task.title} → ${task.status.replaceAll('_',' ')}`);return true}
function httpError(code,message){return Object.assign(new Error(message),{status:code})}
function send(res,status,body,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(JSON.stringify(body))}
function cookies(req){const obj={};for(const s of (req.headers.cookie||'').split(';')){const i=s.indexOf('=');if(i>0)obj[s.slice(0,i).trim()]=s.slice(i+1).trim()}return obj}
function currentUser(req){const sid=cookies(req).sid;const session=sessions.get(sid);if(!session)return null;if(session.expires<Date.now()){sessions.delete(sid);return null}return db.users.find(x=>x.id===session.userId&&!x.disabled)||null}
async function body(req){let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>1024*1024)throw httpError(413,'Request too large');chunks.push(chunk)}try{return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}')}catch{throw httpError(400,'Invalid JSON')}}
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
function serveStatic(req,res,url){const part=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname);const resolved=path.resolve(STATIC,'.'+part);if(!resolved.startsWith(STATIC+path.sep)){res.writeHead(403);res.end();return}try{const stat=fs.statSync(resolved);if(!stat.isFile())throw Error('not file');res.writeHead(200,{'Content-Type':MIME[path.extname(resolved)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'",'Cache-Control':'no-cache'});fs.createReadStream(resolved).pipe(res)}catch{res.writeHead(404);res.end('Not found')}}
function filteredState(user){const ids=permittedCompanies(user);return{companies:db.companies.filter(x=>ids.includes(x.id)),users:db.users.filter(x=>!x.disabled&&(user.role==='super_admin'||x.companyId===user.companyId||x.id===user.id)).map(publicUser),teams:db.teams.filter(x=>ids.includes(x.companyId)),accounts:db.accounts.filter(x=>ids.includes(x.companyId)),interviews:db.interviews.filter(x=>ids.includes(x.companyId)),tasks:db.tasks.filter(x=>ids.includes(x.companyId)),requests:db.requests.filter(x=>ids.includes(x.companyId)),activities:db.activities.filter(x=>ids.includes(x.companyId)).slice(0,60),settings:{...db.settings,serviceAccountConfigured:!!(process.env.GOOGLE_SERVICE_ACCOUNT_FILE||process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64)},me:publicUser(user),demo:DEMO}}
const GOOGLE_SCOPE='https://www.googleapis.com/auth/spreadsheets.readonly';
function b64url(v){return Buffer.from(typeof v==='string'?v:JSON.stringify(v)).toString('base64url')}
async function googleAccessToken(){let sa;if(process.env.GOOGLE_SERVICE_ACCOUNT_FILE)sa=JSON.parse(fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_FILE,'utf8'));else if(process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64)sa=JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64,'base64').toString('utf8'));else throw httpError(400,'Set GOOGLE_SERVICE_ACCOUNT_FILE on the server. Share the CMS sheet with the service-account email as Viewer.');const now=Math.floor(Date.now()/1000);const head=b64url({alg:'RS256',typ:'JWT'}),payload=b64url({iss:sa.client_email,scope:GOOGLE_SCOPE,aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3500});const text=`${head}.${payload}`,sig=crypto.sign('RSA-SHA256',Buffer.from(text),sa.private_key).toString('base64url');const data=new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:`${text}.${sig}`});const res=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:data,signal:AbortSignal.timeout(15000)});const x=await res.json();if(!res.ok)throw httpError(502,'Google authentication failed: '+sanitize(x.error_description||x.error,120));return x.access_token}
function sheetIdFromUrl(url){const match=String(url||'').match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]{20,})/);return match?.[1]||''}
function serialToDate(v){if(typeof v==='number'){const d=new Date(Date.UTC(1899,11,30)+v*86400000);return d.toISOString().slice(0,10)}const str=String(v||'').trim();if(/^\d{4}-\d{2}-\d{2}$/.test(str))return str;const date=new Date(str);return Number.isNaN(date.getTime())?'':date.toISOString().slice(0,10)}
async function syncGoogle(user){if(!isLead(user))throw httpError(403,'Only managers can sync');const ss=sheetIdFromUrl(db.settings.sourceUrl);if(!ss)throw httpError(400,'Set a valid Google Sheets link in Settings first');const token=await googleAccessToken();const updates=[];for(const company of BRANDS){if(!permittedCompanies(user).includes(company.id))continue;const tab=db.settings.sourceTabs[company.id]||company.name;const a1=`'${tab.replaceAll("'","''")}'!A2:K300`;const endpoint=`https://sheets.googleapis.com/v4/spreadsheets/${ss}/values/${encodeURIComponent(a1)}?valueRenderOption=UNFORMATTED_VALUE`;const res=await fetch(endpoint,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(15000)});const data=await res.json();if(!res.ok)throw httpError(502,`Cannot read '${tab}': ${data.error?.message||'Google API error'}`);(data.values||[]).forEach((cells,i)=>{const employer=sanitize(cells[1],180),interviewDate=serialToDate(cells[3]),budget=Number(cells[9]);if(!employer||!interviewDate) return;updates.push({companyId:company.id,employer,country:sanitize(cells[2],120),interviewDate,budget:Number.isFinite(budget)&&budget>=0?budget:0,source:'google',sourceRow:i+2})})}
return serialized(()=>{let created=0,updated=0;for(const item of updates){let x=db.interviews.find(i=>i.source==='google'&&i.companyId===item.companyId&&i.sourceRow===item.sourceRow);if(x){const changedDate=x.interviewDate!==item.interviewDate;Object.assign(x,item);if(changedDate){for(const task of db.tasks.filter(t=>t.interviewId===x.id&&t.origin==='template')){const template=TEMPLATES.find(r=>r[0]===task.title);if(template)task.dueDate=addDays(dateOfInterview(x.interviewDate),template[2]);}}updated++}else{x={id:makeId('int'),...item,notes:'Imported from Mother Google Sheet.',createdAt:new Date().toISOString()};db.interviews.push(x);created++}createInterviewTasks(db,x)}db.settings.lastSync=new Date().toISOString();addActivity(db,'creative',user.name,`Google CMS synced: ${created} new, ${updated} updated`);return{created,updated,read:updates.length,lastSync:db.settings.lastSync}})}
async function handler(req,res){const url=new URL(req.url,'http://localhost');if(!url.pathname.startsWith('/api/'))return serveStatic(req,res,url);
  try{if(req.method==='GET'&&url.pathname==='/api/health')return send(res,200,{ok:true,app:'Recruitment Operations',storage:mysqlPool?'mysql':'local-demo',demo:DEMO});
    if(req.method!=='GET'&&req.method!=='HEAD'&&req.headers.origin){const origin=new URL(req.headers.origin);const currentHost=req.headers.host;const trustedHost=new URL(`http://${currentHost}`).host;if(origin.host!==trustedHost)throw httpError(403,'Origin mismatch')}
    if(req.method==='POST'&&url.pathname==='/api/login'){const input=await body(req);const key=String(req.socket.remoteAddress||'unknown');const attempts=failedLogin.get(key)||{count:0,at:Date.now()};if(attempts.count>=12&&Date.now()-attempts.at<15*60*1000)throw httpError(429,'Too many login attempts. Try later.');const user=db.users.find(u=>u.email===sanitize(input.email,160).toLowerCase()&&!u.disabled);if(!user||!checkPassword(String(input.password||''),user.passwordHash)){failedLogin.set(key,{count:attempts.count+1,at:attempts.at});throw httpError(401,'Invalid email or password')}failedLogin.delete(key);const sid=crypto.randomBytes(32).toString('hex');sessions.set(sid,{userId:user.id,expires:Date.now()+7*86400000});const secure=req.socket.encrypted||req.headers['x-forwarded-proto']==='https';return send(res,200,{me:publicUser(user)}, {'Set-Cookie':`sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secure?'; Secure':''}`})}
    const user=currentUser(req);if(!user)throw httpError(401,'Login required');
    if(req.method==='POST'&&url.pathname==='/api/logout'){sessions.delete(cookies(req).sid);return send(res,200,{ok:true},{'Set-Cookie':'sid=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'})}
    if(req.method==='GET'&&url.pathname==='/api/state')return send(res,200,filteredState(user));
    if(req.method==='POST'&&url.pathname==='/api/tasks'){const x=await body(req);if(!permittedCompanies(user).includes(x.companyId))throw httpError(403,'Wrong company');const task={id:makeId('task'),companyId:x.companyId,title:sanitize(x.title,180),description:sanitize(x.description,3000),requesterTeamId:sanitize(x.requesterTeamId,80),teamId:sanitize(x.teamId,80),assigneeId:sanitize(x.assigneeId,80),interviewId:sanitize(x.interviewId,80),dueDate:sanitize(x.dueDate,10)||TODAY(),priority:['low','normal','high','urgent'].includes(x.priority)?x.priority:'normal',status:'todo',links:(x.links||[]).map(safeLink).filter(Boolean).slice(0,20),comments:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),origin:'manual'};if(!task.title)throw httpError(400,'Task title is required');if(!/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate))throw httpError(400,'Valid due date required');if(task.teamId&&!db.teams.some(t=>t.id===task.teamId&&t.companyId===task.companyId))throw httpError(400,'Invalid team for selected company');if(task.interviewId&&!db.interviews.some(i=>i.id===task.interviewId&&i.companyId===task.companyId))throw httpError(400,'Invalid interview for selected company');if(task.assigneeId&&!db.users.some(u=>u.id===task.assigneeId&&u.companyId===task.companyId))throw httpError(400,'Invalid assignee');if(task.requesterTeamId&&!db.teams.some(t=>t.id===task.requesterTeamId&&t.companyId===task.companyId))throw httpError(400,'Invalid requesting team');return send(res,201,await serialized(()=>{db.tasks.push(task);addActivity(db,task.companyId,user.name,`Created task: ${task.title}`);return task}))}
    const taskPath=url.pathname.match(/^\/api\/tasks\/([^/]+)$/);
    if(taskPath&&req.method==='PATCH'){const x=await body(req);const task=db.tasks.find(t=>t.id===taskPath[1]);if(!task||!canRead(user,task))throw httpError(404,'Task not found');return send(res,200,await serialized(()=>{applyTaskPatch(user,task,x);return task}))}
    const taskComment=url.pathname.match(/^\/api\/tasks\/([^/]+)\/comments$/);if(taskComment&&req.method==='POST'){const x=await body(req),task=db.tasks.find(t=>t.id===taskComment[1]);if(!task||!canRead(user,task))throw httpError(404,'Task not found');const note=sanitize(x.text,2000);if(!note)throw httpError(400,'Comment required');return send(res,201,await serialized(()=>{task.comments.push({id:makeId('comment'),userId:user.id,name:user.name,text:note,at:new Date().toISOString()});task.updatedAt=new Date().toISOString();return task}))}
    if(req.method==='POST'&&url.pathname==='/api/interviews'){if(!isLead(user))throw httpError(403,'Manager required');const x=await body(req);if(!permittedCompanies(user).includes(x.companyId))throw httpError(403,'Wrong company');const interview={id:makeId('int'),companyId:x.companyId,employer:sanitize(x.employer,180),country:sanitize(x.country,80),interviewDate:sanitize(x.interviewDate,10),budget:Number(x.budget)||0,source:'manual',sourceRow:0,notes:sanitize(x.notes,1000),createdAt:new Date().toISOString()};if(!interview.employer||!/^\d{4}-\d{2}-\d{2}$/.test(interview.interviewDate)||!Number.isFinite(Number(x.budget))||Number(x.budget)<0)throw httpError(400,'Employer and valid date/budget required');return send(res,201,await serialized(()=>{db.interviews.push(interview);createInterviewTasks(db,interview);addActivity(db,interview.companyId,user.name,`Added interview: ${interview.employer}`);return interview}))}
    const intPath=url.pathname.match(/^\/api\/interviews\/([^/]+)$/);if(intPath&&req.method==='PATCH'){if(!isLead(user))throw httpError(403,'Manager required');const x=await body(req),item=db.interviews.find(i=>i.id===intPath[1]);if(!canRead(user,item))throw httpError(404,'Interview not found');return send(res,200,await serialized(()=>{if(x.budget!==undefined){const b=Number(x.budget);if(!Number.isFinite(b)||b<0)throw httpError(400,'Invalid budget');item.budget=b}if(x.interviewDate&&/^\d{4}-\d{2}-\d{2}$/.test(x.interviewDate)){item.interviewDate=x.interviewDate;for(const t of db.tasks.filter(t=>t.interviewId===item.id&&t.origin==='template')){const a=TEMPLATES.find(row=>row[0]===t.title);if(a)t.dueDate=addDays(dateOfInterview(item.interviewDate),a[2]);}}if(x.notes!==undefined)item.notes=sanitize(x.notes,1000);return item}))}
    if(req.method==='POST'&&url.pathname==='/api/requests'){const x=await body(req);if(!permittedCompanies(user).includes(x.companyId))throw httpError(403,'Wrong company');const out={id:makeId('req'),companyId:x.companyId,title:sanitize(x.title,180),description:sanitize(x.description,3000),fromTeamId:sanitize(x.fromTeamId,80),toTeamId:sanitize(x.toTeamId,80),assigneeId:sanitize(x.assigneeId,80),priority:['low','normal','high','urgent'].includes(x.priority)?x.priority:'normal',status:'todo',dueDate:sanitize(x.dueDate,10)||TODAY(),links:Array.isArray(x.links)?x.links.map(safeLink).filter(Boolean).slice(0,20):[],comments:[],createdAt:new Date().toISOString(),taskId:''};if(!out.title)throw httpError(400,'Title required');if(!/^\d{4}-\d{2}-\d{2}$/.test(out.dueDate))throw httpError(400,'Valid due date required');if(!db.teams.some(t=>t.id===out.fromTeamId&&t.companyId===out.companyId)||!db.teams.some(t=>t.id===out.toTeamId&&t.companyId===out.companyId))throw httpError(400,'Select valid requesting and receiving teams');if(out.assigneeId&&!db.users.some(u=>u.id===out.assigneeId&&u.companyId===out.companyId))throw httpError(400,'Invalid assignee');return send(res,201,await serialized(()=>{const task={id:makeId('task'),companyId:out.companyId,title:out.title,description:out.description,requesterTeamId:out.fromTeamId,teamId:out.toTeamId,assigneeId:out.assigneeId,interviewId:'',requestId:out.id,dueDate:out.dueDate,priority:out.priority,status:'todo',links:[...out.links],comments:[],createdAt:out.createdAt,updatedAt:out.createdAt,approvalBy:'',origin:'team-request'};out.taskId=task.id;db.tasks.push(task);db.requests.push(out);addActivity(db,out.companyId,user.name,`Handoff created and added to Task Tracker: ${out.title}`);return out}))}
    const reqPath=url.pathname.match(/^\/api\/requests\/([^/]+)$/);if(reqPath&&req.method==='PATCH'){const x=await body(req),item=db.requests.find(q=>q.id===reqPath[1]);if(!canRead(user,item))throw httpError(404,'Request not found');return send(res,200,await serialized(()=>{if(x.status&&['todo','in_progress','in_review','revision','blocked','done'].includes(x.status)){if(x.status==='done'&&!isLead(user))throw httpError(403,'Manager approval needed');item.status=x.status;}if(x.description!==undefined)item.description=sanitize(x.description,3000);if(Array.isArray(x.links))item.links=x.links.map(safeLink).filter(Boolean).slice(0,20);const linked=db.tasks.find(t=>t.id===item.taskId);if(linked){linked.status=item.status;linked.description=item.description;linked.links=[...item.links];linked.updatedAt=new Date().toISOString();if(item.status==='done')linked.approvalBy=user.id}return item}))}
    const requestComment=url.pathname.match(/^\/api\/requests\/([^/]+)\/comments$/);
    if(requestComment&&req.method==='POST'){const x=await body(req),item=db.requests.find(q=>q.id===requestComment[1]);if(!canRead(user,item))throw httpError(404,'Request not found');const note=sanitize(x.text,2000);if(!note)throw httpError(400,'Comment required');return send(res,201,await serialized(()=>{item.comments=item.comments||[];item.comments.push({id:makeId('comment'),userId:user.id,name:user.name,text:note,at:new Date().toISOString()});return item}))}
    if(req.method==='POST'&&url.pathname==='/api/accounts'){if(!isLead(user))throw httpError(403,'Manager required');const x=await body(req);const account=db.accounts.find(a=>a.id===x.id);if(!canRead(user,account))throw httpError(404,'Account not found');return send(res,200,await serialized(()=>{if(x.ownerId&&!db.users.some(u=>u.id===x.ownerId&&u.companyId===account.companyId))throw httpError(400,'Invalid account owner');account.metaAccountId=sanitize(x.metaAccountId,64);account.ownerId=sanitize(x.ownerId,80);return account}))}
    if(req.method==='POST'&&url.pathname==='/api/users'){if(!['super_admin','company_admin'].includes(user.role))throw httpError(403,'Company admin required');const x=await body(req);const companyId=sanitize(x.companyId,80);if(!permittedCompanies(user).includes(companyId))throw httpError(403,'Wrong company');const email=sanitize(x.email,160).toLowerCase(),password=String(x.password||'');if(!email.includes('@')||password.length<12||db.users.some(u=>u.email===email))throw httpError(400,'Unique email and password of at least 12 characters required');const role=ALLOWED_ROLES.includes(x.role)?x.role:'member';if(role==='super_admin'&&user.role!=='super_admin')throw httpError(403,'No permission');const usr={id:makeId('usr'),name:sanitize(x.name,120),email,role,companyId:role==='super_admin'?null:companyId,teamId:sanitize(x.teamId,80),passwordHash:hashPassword(password),disabled:false};return send(res,201,await serialized(()=>{db.users.push(usr);return publicUser(usr)}))}
    if(req.method==='POST'&&url.pathname==='/api/settings'){if(user.role!=='super_admin')throw httpError(403,'Super admin required');const x=await body(req);return send(res,200,await serialized(()=>{if(x.sourceUrl!==undefined){const link=safeLink(x.sourceUrl);if(x.sourceUrl&&!sheetIdFromUrl(link))throw httpError(400,'Invalid Sheets URL');db.settings.sourceUrl=link}if(x.sourceTabs&&typeof x.sourceTabs==='object'){for(const c of BRANDS){if(x.sourceTabs[c.id])db.settings.sourceTabs[c.id]=sanitize(x.sourceTabs[c.id],140)}}return db.settings}))}
    if(req.method==='POST'&&url.pathname==='/api/sync/google')return send(res,200,await syncGoogle(user));
    throw httpError(404,'API path not found');
  }catch(e){if(Number(e.status)>=500||!e.status)console.error('[api]',e);send(res,e.status||500,{error:e.status?e.message:'Unexpected server error'})}
}
async function start(){
  db=await initializeState();
  const server=http.createServer(handler);
  server.listen(PORT,HOST,()=>console.log(`RecruitOps running on ${HOST}:${PORT} (storage: ${mysqlPool?'MySQL':'local demo'})`));
}
start().catch(err=>{console.error('[startup]',err.message);process.exitCode=1});
