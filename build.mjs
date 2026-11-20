import {build} from 'esbuild';
await build({entryPoints:['src/main.tsx'],bundle:true,minify:true,format:'esm',target:['es2022'],jsx:'automatic',outfile:'assets/app.js',external:['https://*'],define:{'process.env.NODE_ENV':'"production"'}});
console.log('GitHub Pages 檔案已完成：index.html、firebase-config.js、assets/');
