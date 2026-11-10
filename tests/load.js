const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(root+'/index.html','utf8');
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(s=>/^js\/(core|data)\//.test(s));
const ctx=vm.createContext({console,Math,Date,setTimeout,clearTimeout});
const errs=[];
for(const s of scripts){
  try{vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s})}catch(e){errs.push([s,e.message])}
}
module.exports={ctx,scripts,errs,run:code=>vm.runInContext(code,ctx)};
