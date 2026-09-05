import { describe,expect,it } from 'vitest';
import { condition,label,temp,wind } from './weather';

describe('weather utilities',()=>{
 it('maps WMO conditions',()=>{expect(label(0)).toBe('Clear sky');expect(label(63)).toBe('Rain');expect(condition(71)).toBe('snow');expect(condition(95)).toBe('storm');});
 it('converts temperature',()=>{expect(temp(0,'C')).toBe(0);expect(temp(0,'F')).toBe(32);expect(temp(25,'F')).toBe(77);});
 it('converts wind units',()=>{expect(wind(10,'km/h')).toBe(10);expect(wind(10,'mph')).toBe(6);expect(wind(36,'m/s')).toBe(10);});
});
