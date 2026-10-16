import{Al as e,Cs as t,Ss as n,_s as r,as as i,bs as a,ds as o,fs as s,gs as c,hs as l,is as u,ls as d,ms as f,ns as p,os as m,rs as h,ts as g,us as _,xs as v,ys as y}from"./app-shell-C55K_DXk.js";var b=e(`WorkspaceV2Migrator`),x=`filmstrips`,S=`waveform-bin`,C=`preview-audio`,w=`proxies`,T=`thumbnail.meta.json`,E=`thumbnail.jpg`;async function D(e){let t=performance.now(),r={ran:!1,fromVersion:null,toVersion:`2.0`,filmstripMediaMoved:0,waveformBinMoved:0,previewAudioMoved:0,proxiesMoved:0,thumbnailMetaRemoved:0,projectThumbnailsFixed:0,errors:[],durationMs:0},i=await y(e,[p]);if(!i||(r.fromVersion=i.schemaVersion,i.schemaVersion===`2.0`))return r.durationMs=performance.now()-t,r;r.ran=!0,b.info(`Migrating workspace ${i.schemaVersion} → 2.0`);let a=await O(e);try{r.filmstripMediaMoved=await k(e,r.errors)}catch(e){r.errors.push(`filmstrips: ${L(e)}`)}try{r.waveformBinMoved=await A(e,r.errors)}catch(e){r.errors.push(`waveform-bin: ${L(e)}`)}try{r.previewAudioMoved=await j(e,r.errors)}catch(e){r.errors.push(`preview-audio: ${L(e)}`)}try{r.proxiesMoved=await M(e,r.errors)}catch(e){r.errors.push(`proxies: ${L(e)}`)}try{r.thumbnailMetaRemoved=await N(e,r.errors)}catch(e){r.errors.push(`thumbnail-meta: ${L(e)}`)}try{r.projectThumbnailsFixed=await P(e,a,r.errors)}catch(e){r.errors.push(`project-thumbnails: ${L(e)}`)}if(r.errors.length===0){let t={...i,schemaVersion:`2.0`};await n(e,[p],t),b.info(`Workspace migrated to v2`,r)}else b.warn(`Workspace migration completed with errors; marker left at v1 for retry`,{errorCount:r.errors.length});return r.durationMs=performance.now()-t,r}async function O(e){let t=await c(e,[u]),n=new Set;for(let e of t)e.kind===`directory`&&n.add(e.name);return n}async function k(e,n){let i=await c(e,[x]),o=0;for(let s of i){if(s.kind!==`directory`)continue;let i=s.name;try{await t(`migrate-v2:filmstrip:${i}`,async()=>{let t=await c(e,[x,i]);for(let n of t){if(n.kind!==`file`)continue;let t=await r(e,[x,i,n.name]);t&&await v(e,[...m(i),n.name],t)}await a(e,[x,i],{recursive:!0})}),o++}catch(e){n.push(`filmstrip ${i}: ${L(e)}`)}}return o>0&&await F(e,x),o}async function A(e,n){let i=await c(e,[S]),o=0;for(let s of i){if(s.kind!==`file`||!s.name.endsWith(`.bin`))continue;let i=s.name.slice(0,-4);try{await t(`migrate-v2:waveform-bin:${i}`,async()=>{let t=await r(e,[S,s.name]);t&&(await v(e,f(i),t),await a(e,[S,s.name]))}),o++}catch(e){n.push(`waveform-bin ${i}: ${L(e)}`)}}return o>0&&await F(e,S),o}async function j(e,n){let i=await c(e,[C]),o=0;for(let s of i){if(s.kind!==`directory`)continue;let i=await c(e,[C,s.name]);for(let l of i){if(l.kind!==`directory`)continue;let i=await c(e,[C,s.name,l.name]);for(let c of i){if(c.kind!==`file`||!c.name.endsWith(`.wav`))continue;let i=c.name.slice(0,-4);try{await t(`migrate-v2:preview-audio:${i}`,async()=>{let t=await r(e,[C,s.name,l.name,c.name]);t&&(await v(e,_(i),t),await a(e,[C,s.name,l.name,c.name]))}),o++}catch(e){n.push(`preview-audio ${i}: ${L(e)}`)}}await I(e,[C,s.name,l.name])}await I(e,[C,s.name])}return o>0&&await F(e,C),o}async function M(e,n){let i=await c(e,[w]),o=0;for(let l of i){if(l.kind!==`directory`)continue;let i=l.name;try{await t(`migrate-v2:proxy:${i}`,async()=>{let t=await c(e,[w,i]);for(let n of t){if(n.kind!==`file`)continue;let t=await r(e,[w,i,n.name]);t&&await v(e,[...s(),i,n.name],t)}await a(e,[w,i],{recursive:!0})}),o++}catch(e){n.push(`proxy ${i}: ${L(e)}`)}}return o>0&&await F(e,w),o}async function N(e,t){let n=await c(e,[h]),r=0;for(let i of n){if(i.kind!==`directory`)continue;let n=i.name,o=[...d(n),T];try{if(!await l(e,o))continue;await a(e,o),r++}catch(e){t.push(`thumbnail.meta ${n}: ${L(e)}`)}}return r}async function P(e,t,n){let i=await c(e,[h]),s=0;for(let l of i){if(l.kind!==`directory`||!t.has(l.name))continue;let i=l.name;try{let t=await c(e,d(i));if(t.some(e=>e.kind===`file`&&e.name===`metadata.json`))continue;let n=await r(e,[...d(i),E]);if(!n||(await v(e,o(i),n),t.some(e=>!(e.kind===`file`&&e.name===E))))continue;await a(e,d(i),{recursive:!0}),s++}catch(e){n.push(`project-thumbnail ${i}: ${L(e)}`)}}return s}async function F(e,t){await I(e,[t])}async function I(e,t){if(!((await c(e,t)).length>0))try{await a(e,t)}catch(e){b.debug(`removeDirIfEmpty skipped`,{segments:t,error:e})}}function L(e){return e instanceof Error?e.message:String(e)}var R=`# FreeCut Workspace

This folder is your FreeCut project workspace - the app's source of truth
for everything: projects, media metadata, thumbnails, waveforms, caches.

Everything here is **plain files** you can \`cat\`, \`grep\`, and diff with
normal tools. AI coding agents can read them directly without a browser.

## Layout

\`\`\`
./
|-- README.md                  <- this file
|-- .freecut-workspace.json    <- marker + schema version
|-- index.json                 <- fast project list
|-- projects/
|   \`-- <projectId>/
|       |-- project.json       <- timeline, settings, keyframes, markers, transitions
|       |-- thumbnail.jpg
|       \`-- media-links.json   <- which media this project uses
|-- media/
|   \`-- <mediaId>/
|       |-- metadata.json      <- codec, duration, resolution, etc.
|       |-- source.<ext>       <- inline source file
|       |-- source.link.json   <- OR a link descriptor to an external file
|       |-- thumbnail.jpg
|       \`-- cache/
|           |-- filmstrip/     <- timeline frame thumbnails (0.jpg, 1.jpg, ...)
|           |-- waveform/      <- audio peaks (binned binary + multi-res.bin)
|           |-- gif-frames/    <- pre-extracted GIF frames
|           |-- decoded-audio/ <- chunked PCM for preview playback
|           |-- preview-audio.wav  <- conformed WAV for non-browser codecs
|           \`-- ai/            <- transcripts, captions, scene cuts, ...
\`-- content/
    |-- <hash[0:2]>/<hash>/    <- content-addressable source dedup (reserved)
    |   |-- refs.json
    |   \`-- data.<ext>
    \`-- proxies/<proxyKey>/    <- shared proxies (keyed by content fingerprint)
        |-- proxy.mp4
        \`-- meta.json
\`\`\`

## Safe to edit?

Everything except media source bytes is safe to inspect. Editing
\`project.json\` externally works; FreeCut picks up changes on next load.

Binary caches (waveforms, decoded audio, filmstrips) are regeneratable -
delete them and the app will rebuild them on demand.

## Moving the workspace

You can move this folder to a new location - the app just needs you to
re-pick it via the "Reconnect" prompt on next launch.
`,z=e(`WorkspaceBootstrap`);async function B(e,t){let n=0;async function r(e){let t=[];for await(let n of e.values())t.push({name:n.name,kind:n.kind});for(let i of t){if(i.kind===`directory`){try{await r(await e.getDirectoryHandle(i.name,{create:!1}))}catch(e){z.debug(`sweepStrandedTmpFiles: subdir skipped`,{name:i.name,error:e})}continue}if(i.name.endsWith(`.tmp`))try{await e.removeEntry(i.name),n++}catch(e){z.debug(`sweepStrandedTmpFiles: remove failed`,{name:i.name,error:e})}}}for(let n of t)try{await r(await e.getDirectoryHandle(n,{create:!1}))}catch{}return n}var V=/^[hof]-/;async function H(e){let t=await c(e,s()),n=0;for(let i of t){if(i.kind!==`directory`||!V.test(i.name))continue;let t=i.name,o=t.slice(2),u=[...s(),t],d=[...s(),o];try{if(await l(e,d)){await a(e,u,{recursive:!0}),n++;continue}let i=await c(e,u),o=[],s=!0;for(let t of i){if(t.kind!==`file`)continue;let n=await r(e,[...u,t.name]).catch(()=>null);if(!n){s=!1;break}o.push({name:t.name,blob:n})}if(!s){z.warn(`stripProxyKeyPrefixes: aborting ${t} — unreadable file, leaving source intact`);continue}let f=!0,p=[];for(let n of o)try{await v(e,[...d,n.name],n.blob),p.push(n.name)}catch(e){z.warn(`stripProxyKeyPrefixes: write failed for ${t}/${n.name}`,e),f=!1;break}if(!f){for(let t of p)await a(e,[...d,t],{recursive:!1}).catch(()=>void 0);continue}await a(e,u,{recursive:!0}),n++}catch(e){z.warn(`stripProxyKeyPrefixes: failed to rename ${t}`,e)}}return n}async function U(e){if(!await l(e,[`README.md`]))try{await v(e,[i],R)}catch(e){z.warn(`Failed to write README.md`,e)}if(await l(e,[`.freecut-workspace.json`]))try{let t=await D(e);t.ran&&z.info(`Workspace migration finished`,{from:t.fromVersion,to:t.toVersion,filmstrips:t.filmstripMediaMoved,waveforms:t.waveformBinMoved,previewAudio:t.previewAudioMoved,proxies:t.proxiesMoved,thumbnailMetaRemoved:t.thumbnailMetaRemoved,projectThumbnailsFixed:t.projectThumbnailsFixed,errors:t.errors.length,durationMs:Math.round(t.durationMs)})}catch(e){z.warn(`Workspace migration failed`,e)}else{let t={schemaVersion:`2.0`,createdAt:Date.now()};try{await n(e,[p],t)}catch(e){z.warn(`Failed to write workspace marker`,e)}}try{let t=await H(e);t>0&&z.info(`Stripped source-type prefix from ${t} proxy folder(s)`)}catch(e){z.warn(`stripProxyKeyPrefixes failed`,e)}try{let t=await B(e,[u,h,g]);t>0&&z.info(`Swept ${t} stranded .tmp file(s) from prior crash`)}catch(e){z.warn(`sweepStrandedTmpFiles failed`,e)}}export{U as bootstrapWorkspace};
//# sourceMappingURL=bootstrap-Du_ohJ22.js.map