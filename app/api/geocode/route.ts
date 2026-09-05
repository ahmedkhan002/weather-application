import { NextResponse } from 'next/server';
import { z } from 'zod';

const resultSchema = z.object({ name:z.string(), country:z.string().optional(), admin1:z.string().optional(), latitude:z.number(), longitude:z.number() });
const responseSchema = z.object({ results:z.array(z.unknown()).optional() });

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ results: [] });
  const upstream = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=en&format=json`, { next: { revalidate: 86400 } });
  if (!upstream.ok) return NextResponse.json({ error:'Geocoding unavailable' }, { status:502 });
  const parsed = responseSchema.parse(await upstream.json());
  const results = (parsed.results ?? []).flatMap((item) => { const value=resultSchema.safeParse(item); return value.success ? [value.data] : []; });
  return NextResponse.json({ results });
}
