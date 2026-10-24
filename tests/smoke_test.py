"""Run with python3 tests/smoke_test.py (requires requests). Starts private demo on localhost."""
import os, subprocess, tempfile, time, json
import requests
from pathlib import Path

root=Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory() as tmp:
 env=dict(os.environ,HOST='127.0.0.1',PORT='3096',DEMO_MODE='true',DATA_FILE=str(Path(tmp)/'db.json'))
 child=subprocess.Popen(['node','server/server.mjs'],cwd=root,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 try:
  url='http://127.0.0.1:3096'
  for _ in range(30):
   try:
    if requests.get(url+'/api/health',timeout=1).ok:break
   except requests.RequestException:time.sleep(.1)
  s=requests.Session()
  assert s.get(url+'/api/state').status_code==401
  assert s.post(url+'/api/login',json={'email':'demo@recruitops.local','password':'bad'}).status_code==401
  assert s.post(url+'/api/login',json={'email':'demo@recruitops.local','password':'DemoPass!2026'}).status_code==200
  d=s.get(url+'/api/state').json()
  assert len(d['companies'])==3
  assert len(d['accounts'])==38
  assert len(d['interviews'])==6
  assert len(d['tasks'])==72
  assert sum(a['channel']=='CALL' for a in d['accounts'])==20
  assert sum(a['channel']=='WEB' for a in d['accounts'])==18
  iv=s.post(url+'/api/interviews',json={'companyId':'creative','employer':'QA Test Interview','country':'Malaysia','interviewDate':'2026-11-15','budget':2500})
  assert iv.status_code==201,iv.text
  x=iv.json()
  x_tasks=[t for t in s.get(url+'/api/state').json()['tasks'] if t['interviewId']==x['id']]
  assert len(x_tasks)==12
  assert any(t['dueDate']=='2026-11-08' for t in x_tasks)
  assert any(t['dueDate']=='2026-11-04' for t in x_tasks)
  t=x_tasks[0]
  assert s.patch(url+'/api/tasks/'+t['id'],json={'status':'in_review'}).status_code==200
  assert s.patch(url+'/api/tasks/'+t['id'],json={'status':'done'}).status_code==200
  req=s.post(url+'/api/requests',json={'title':'Request Video','description':'Test handoff','companyId':'creative','fromTeamId':'creative-marketing','toTeamId':'creative-creative-studio','dueDate':'2026-11-03'})
  assert req.status_code==201,req.text
  assert s.post(url+'/api/requests/'+req.json()['id']+'/comments',json={'text':'Drive link added'}).status_code==201
  usr=s.post(url+'/api/users',json={'name':'Creative Manager','email':'manager@sample.local','password':'UniquePassword#1293','role':'company_admin','companyId':'creative','teamId':'creative-marketing'})
  assert usr.status_code==201,usr.text
  cm=requests.Session()
  assert cm.post(url+'/api/login',json={'email':'manager@sample.local','password':'UniquePassword#1293'}).status_code==200
  limited=cm.get(url+'/api/state').json()
  assert len(limited['companies'])==1 and limited['companies'][0]['id']=='creative'
  assert all(a['companyId']=='creative' for a in limited['accounts'])
  assert cm.post(url+'/api/tasks',json={'title':'Should Reject','companyId':'coastal'}).status_code==403
  assert s.get(url+'/').status_code==200
  assert s.get(url+'/app.js').status_code==200
  assert s.get(url+'/styles.css').status_code==200
  print('PASS: auth, 3 company isolation, 38 accounts, 7-day interview tasks, review/approval, team requests/comments, asset serving')
 finally:
  child.terminate()
  try:child.wait(timeout=3)
  except:child.kill()
