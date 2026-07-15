#!/usr/bin/env python3
import csv, subprocess, sys, time
from pathlib import Path
root=Path(__file__).resolve().parent.parent
rows=list(csv.DictReader(open(root/'docs/curseforge-compatibility.csv',encoding='utf-8')))
log=root/'work/packwiz-import.log'; log.parent.mkdir(exist_ok=True)
with log.open('a',encoding='utf-8') as f:
 for i,r in enumerate(rows,1):
  if r['has_1_20_1_forge']!='true': continue
  pid=r['project_id']; fid=r['new_file_id']; title=r['title']
  cmd=['packwiz','-y','curseforge','add','--addon-id',pid,'--file-id',fid]
  f.write(f'[{i}/153] {title} project={pid} file={fid}\n'); f.flush()
  p=subprocess.run(cmd,cwd=root,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=180)
  f.write(p.stdout+'\n');f.flush()
  print(f'[{i}/153] rc={p.returncode} {title}',flush=True)
  if p.returncode:
   print(p.stdout,file=sys.stderr,flush=True)
   # Continue so the complete failure set is visible.
print('refreshing',flush=True)
subprocess.run(['packwiz','refresh'],cwd=root,check=True)
