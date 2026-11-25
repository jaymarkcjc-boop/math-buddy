const assert=require('node:assert/strict'), E=require('./engine.js');
for(const [a,b] of [['0.75','3/4'],['-1 1/2','-3/2'],['2/4','1/2'],['.50','1/2'],['−2','-2']])assert(E.eq(E.parse(a),E.parse(b)));
for(const a of ['1/0','NaN','1+1','1e3','2 3/2',''])assert.equal(E.parse(a),null);
assert.equal(E.fmt(E.calc(E.parse('-8'),E.parse('-3'),'-')),'-5');assert.equal(E.fmt(E.calc(E.parse('3/4'),E.parse('1/2'),'÷')),'3/2');assert.equal(E.misconception({a:'1/2',b:'1/3',answer:'5/6',type:'fraction',op:'+'},'2/5'),'denominator');
let count=0;for(const op of ['+','-','×','÷'])for(const type of ['integer','fraction','decimal'])for(let l=1;l<=3;l++)for(let i=0;i<100;i++){let q=E.generate(op,type,l);assert(E.eq(E.parse(q.answer),E.calc(E.parse(q.a),E.parse(q.b),q.op)));assert(E.solution(q).includes(q.answer));count++}console.log('PASS: '+count+' generated questions plus arithmetic/parser/error checks');
