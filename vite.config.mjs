import {defineConfig,loadEnv} from "vite";
import {transform} from "esbuild";

export default defineConfig(({mode})=>{
  // Preserve existing public configuration names; never expose server secrets.
  const env=loadEnv(mode,process.cwd(),"REACT_APP_");
  const base=process.env.PUBLIC_URL || "/sparkcxc/";
  const publicUrl=base.replace(/\/$/,"");
  return {
    base:base.endsWith("/")?base:`${base}/`,
    define:{"process.env":JSON.stringify({...env,PUBLIC_URL:publicUrl,NODE_ENV:mode==="production"?"production":"development"})},
    plugins:[{
      name:"spark-jsx-source",enforce:"pre",
      async transform(code,id){
        if(!/[\\/]src[\\/].*\.[jt]sx?$/.test(id)) return null;
        return transform(code,{loader:id.endsWith(".tsx")?"tsx":id.endsWith(".ts")?"ts":"jsx",jsx:"automatic",sourcemap:true,sourcefile:id});
      },
    }],
    optimizeDeps:{noDiscovery:true,include:["react","react/jsx-runtime","react-dom","react-dom/client","@supabase/supabase-js"]},
    build:{outDir:"build",sourcemap:false,chunkSizeWarningLimit:1500},
    server:{port:3000,strictPort:true},
  };
});
