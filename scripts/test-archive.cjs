// Transpile the same typed registry used by Vite; no second test-only dataset.
const ts = require('typescript')
const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,filename)
const {registry,collection,filterRecords} = require('../src/archive/registry.ts')
const {validateRegistry} = require('../src/archive/schema.ts')
const media = require('../src/data/evidence-manifest.json')
const empty={search:'',status:'',category:'',collection:'',season:''}
assert.equal(registry.length,7)
assert.deepEqual(collection.workIds,['com2601','com2602','com2603'])
assert.deepEqual(filterRecords(registry,{...empty,collection:collection.id}).map(r=>r.id),collection.workIds)
assert.equal(filterRecords(registry,{...empty,search:'  HOTEL SIERRA  '}).length,1)
assert.equal(filterRecords(registry,{...empty,search:'435354858348183'})[0].id,'com2603')
assert.equal(filterRecords(registry,{...empty,status:'solved'}).length,0)
assert.equal(filterRecords(registry,{...empty,status:'partially_solved'}).length,7)
assert.equal(filterRecords(registry,{...empty,category:'simulation'}).length,1)
assert.equal(filterRecords(registry,{...empty,season:'unknown'}).length,7)
assert.equal(filterRecords(registry,{...empty,category:'audio puzzle',collection:collection.id}).length,0)
for(const r of registry){
 for(const id of [...r.imageIds,...r.audioIds,r.thumbnail.mediaId]){
  const m=media.find(m=>m.id===id);assert.ok(m,`${r.id}: ${id}`)
  assert.ok(fs.existsSync(path.join(__dirname,'../public',m.path)),`asset ${m.path}`)
 }
 for(const report of r.reportPaths) assert.ok(fs.existsSync(path.join(__dirname,'../public/research',path.basename(report))),report)
 assert.ok(r.verifiedFindings.length && r.openQuestions.length)
}
for(const mutate of [r=>r[0].youtubeVideoId='bad',r=>r[0].officialVideoUrl='https://example.com',r=>r[0].slug=r[1].slug,r=>r[0].fieldSources.originalTitle=[],r=>r[0].season={label:'Season 1',kind:'official',source:''},r=>r[0].investigationStatus='solved',r=>r[0].relatedWorks=[{id:'invented',citation:'x'}]]){
 const copy=structuredClone(registry);mutate(copy);assert.throws(()=>validateRegistry(copy))
}
console.log('Archive tests passed: 7 records; collection order; search and combined filters; source/media paths; invalid IDs, provenance, seasons, solution claims and relations rejected.')
