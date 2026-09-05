import type { Metadata } from 'next';
import Home from '@/app/page';

export async function generateMetadata({params}:{params:Promise<{location:string}>}):Promise<Metadata>{const {location}=await params;const city=decodeURIComponent(location).replaceAll('-',' ').replace(/\b\w/g,c=>c.toUpperCase());return{title:`Weather in ${city} — Current Conditions & Forecast`,description:`Live atmospheric conditions and forecast for ${city}.`};}
export default function WeatherLocationPage(){return <Home/>;}
