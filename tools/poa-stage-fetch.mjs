/** Disposable rehearsal transport. Retry only explicit throttling; an unknown
 * network failure or server error must not replay a mutation. */
export function createPoaStageFetch({fetchImpl=globalThis.fetch,wait=ms=>new Promise(resolve=>setTimeout(resolve,ms)),clock=()=>Date.now(),intervalMs=200}={}){
 let nextAt=0;
 return async(input,init)=>{
  const request=new Request(input,init);
  for(let attempt=0;attempt<4;attempt++){
   if(nextAt>clock())await wait(nextAt-clock());
   nextAt=clock()+intervalMs;
   let response;
   try{response=await fetchImpl(request.clone());}
   catch(error){
    const throttle=/^Rate limit exceeded[\s\S]*?Retry after (\d+)ms[.]?$/i.exec(error.message||"");
    if(!throttle||attempt===3||Number(throttle[1])>10000)throw error;
    await wait(Number(throttle[1])+200);continue;
   }
   if(response.status!==429||attempt===3)return response;
   const seconds=Number(response.headers.get("retry-after"));
   const delay=Number.isFinite(seconds)&&seconds>0?Math.min(seconds*1000,10000):Math.min(1200*2**attempt,5000);
   await response.arrayBuffer();await wait(delay);
  }
  throw Error("Staging transport exhausted its throttle retries");
 };
}
