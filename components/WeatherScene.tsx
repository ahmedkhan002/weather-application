'use client';
import { useEffect, useRef } from 'react';
import type { WeatherData } from '@/lib/weather';

export default function WeatherScene({weather,visual}:{weather:WeatherData;visual:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{let alive=true,frame=0,renderer:import('three').WebGLRenderer|undefined;let scene:import('three').Scene|undefined,camera:import('three').PerspectiveCamera|undefined;let objects:import('three').Object3D[]=[];
  import('three').then(T=>{if(!alive||!ref.current)return;scene=new T.Scene();camera=new T.PerspectiveCamera(48,1,.1,100);camera.position.z=5;renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));ref.current.appendChild(renderer.domElement);
   const group=new T.Group();scene.add(group);objects.push(group);
   const palettes:{[key:string]:number}={clear:0xf2b95f,cloud:0x9bb7c8,rain:0x668da8,snow:0xdde7ef,storm:0x596274,fog:0xb9c2c7};const color=palettes[visual]??palettes.clear;
   const orb=new T.Mesh(new T.IcosahedronGeometry(1.15,5),new T.MeshPhysicalMaterial({color,roughness:.24,metalness:.05,transmission:.28,transparent:true,opacity:.78}));group.add(orb);
   const ring=new T.Mesh(new T.TorusGeometry(1.55,.014,8,128),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.3}));ring.rotation.x=1.0;group.add(ring);
   const count=visual==='rain'||visual==='storm'?900:visual==='snow'?520:300;const positions=new Float32Array(count*3),velocities=new Float32Array(count);for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*7;positions[i*3+1]=(Math.random()-.5)*5;positions[i*3+2]=(Math.random()-.5)*4;velocities[i]=.004+Math.random()*.012;}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(positions,3));const points=new T.Points(geo,new T.PointsMaterial({color:0xffffff,size:visual==='rain'||visual==='storm'?.025:.035,transparent:true,opacity:visual==='clear'?.25:.48,depthWrite:false}));scene.add(points);
   const resize=()=>{if(!renderer||!camera||!ref.current)return;const r=ref.current.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix()};resize();addEventListener('resize',resize);
   const tick=()=>{if(!alive||!renderer||!scene||!camera)return;orb.rotation.y+=.0018;orb.rotation.x+=.00045;ring.rotation.z-=.0012;const a=geo.getAttribute('position') as import('three').BufferAttribute;for(let i=0;i<count;i++){let y=a.getY(i);y-=velocities[i]*(visual==='snow'?.55:1);if(y<-2.8)y=2.8;a.setY(i,y);if(visual==='rain'||visual==='storm')a.setX(i,a.getX(i)+.0015);}a.needsUpdate=true;group.rotation.y=Math.sin(performance.now()*.00025)*.12;renderer.render(scene,camera);frame=requestAnimationFrame(tick)};tick();
   return()=>{removeEventListener('resize',resize);cancelAnimationFrame(frame);renderer?.dispose();geo.dispose();(points.material as import('three').Material).dispose();orb.geometry.dispose();(orb.material as import('three').Material).dispose();ring.geometry.dispose();(ring.material as import('three').Material).dispose()};
  }).catch(()=>{});return()=>{alive=false;cancelAnimationFrame(frame);if(ref.current)ref.current.innerHTML='';};
 },[visual,weather.current.weatherCode]);
 return <div ref={ref} className="webgl-scene" aria-label={`Interactive ${visual} weather atmosphere`}/>;
}
