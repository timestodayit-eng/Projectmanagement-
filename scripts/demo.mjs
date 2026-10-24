// Cross-platform local demo: no shell environment syntax required.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const child=spawn(process.execPath,['server/server.mjs'],{cwd:root,env:{...process.env,DEMO_MODE:'true',HOST:'127.0.0.1'},stdio:'inherit'});
for(const sig of ['SIGINT','SIGTERM'])process.on(sig,()=>child.kill(sig));
child.on('exit',code=>process.exit(code||0));
