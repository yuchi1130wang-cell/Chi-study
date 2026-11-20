import {build} from 'esbuild';
await build({entryPoints:['main.tsx'],bundle:true,minify:true,format:'esm',target:['es2022'],jsx:'automatic',outfile:'app.js',external:['https://*'],define:{'process.env.NODE_ENV':'"production"'}});
console.log('GitHub Pages 檔案已完成：index.html、firebase-config.js、app.js、style.css');

