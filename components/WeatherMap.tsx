'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const MapContainer=dynamic(()=>import('react-leaflet').then(m=>m.MapContainer),{ssr:false});
const TileLayer=dynamic(()=>import('react-leaflet').then(m=>m.TileLayer),{ssr:false});
const Circle=dynamic(()=>import('react-leaflet').then(m=>m.Circle),{ssr:false});
export default function WeatherMap({lat,lon}:{lat:number;lon:number}){const[layer,setLayer]=useState<'temperature'|'rain'|'wind'|'cloud'>('temperature');const labels={temperature:'Temperature',rain:'Precipitation',wind:'Wind',cloud:'Cloud cover'};return <div className="map-wrap"><div className="map-layer-switch">{Object.entries(labels).map(([key,value])=><button key={key} className={layer===key?'on':''} onClick={()=>setLayer(key as typeof layer)}>{value}</button>)}</div><MapContainer center={[lat,lon]} zoom={9} scrollWheelZoom className="leaflet-map"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Circle center={[lat,lon]} radius={layer==='temperature'?18000:layer==='rain'?12000:layer==='wind'?15000:9000} pathOptions={{fillOpacity:.12,weight:1}}/></MapContainer><div className="map-caption">Layer: <b>{labels[layer]}</b> · {lat.toFixed(3)}°, {lon.toFixed(3)}°</div></div>}
