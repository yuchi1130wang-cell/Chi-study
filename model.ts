export type Subject = 'math'|'science'|'english'|'chinese';
export const subjects: Subject[] = ['math','science','english','chinese'];
export const labels = {math:'數學',science:'自然',english:'英文',chinese:'國文'};
export const weekly = {math:3,science:3,english:1,chinese:1};
export type Progress = {written:boolean;corrected:boolean;note:string;updatedAt?:string};
export type Plan = {start:string;target:string;weeklyMinutes:number;totals:Record<Subject,number>;books:Record<Subject,string>;papers:Record<string,Progress>;daily:Record<string,boolean>;extras:{id:string;week:number;title:string;minutes:number}[]};
export const defaults:Plan = {start:'2026-11-20',target:'2027-01-22',weeklyMinutes:1680,totals:{math:27,science:27,english:9,chinese:9},books:{math:'數學題本',science:'自然題本',english:'英文題本',chinese:'國文題本'},papers:{},daily:{},extras:[]};
export function addDays(s:string,n:number){return new Date(Date.parse(s+'T00:00:00Z')+n*86400000).toISOString().slice(0,10)}
export function diff(a:string,b:string){return Math.round((Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000)}
export function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
export function duration(m:number){return (Math.floor(m/60)?Math.floor(m/60)+' 小時':'')+(m%60?' '+m%60+' 分鐘':'') || '0 分鐘'}
export function done(p:Plan,s:Subject,n:number){const v=p.papers[s+'-'+n];return !!(v?.written&&v?.corrected)}
export function weeks(p:Plan){return Math.ceil(diff(p.target,p.start)/7)}
export function roundList(p:Plan,s:Subject,w:number){return Array.from({length:weekly[s]},(_,i)=>w*weekly[s]+i+1).filter(n=>n<=p.totals[s])}
export function dayList(p:Plan,w:number){return Array.from({length:7},(_,i)=>addDays(p.start,w*7+i)).filter(d=>d<p.target)}
export function weekStats(p:Plan,w:number){const dates=dayList(p,w);let completed=0,total=0;for(const s of subjects)for(const n of roundList(p,s,w)){total++;if(done(p,s,n))completed++}let dailyMinutes=0;for(const d of dates){if(p.daily['english-'+d])dailyMinutes+=30;if(p.daily['chinese-'+d])dailyMinutes+=20}const planned=total*120+dates.length*50;const extra=p.extras.filter(e=>e.week===w).reduce((a,e)=>a+e.minutes,0);return {completed,total,dailyMinutes,planned,credited:completed*120+dailyMinutes,extra,buffer:Math.round(p.weeklyMinutes*dates.length/7)-planned};}

