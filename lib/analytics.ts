export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export function parseUtmFromSearch(searchParams: Record<string, string | string[] | undefined>): UtmParams {
  const getSingle = (val: string | string[] | undefined): string | undefined => {
    if (!val) return undefined;
    return Array.isArray(val) ? val[0] : val;
  };

  return {
    utm_source: getSingle(searchParams.utm_source),
    utm_medium: getSingle(searchParams.utm_medium),
    utm_campaign: getSingle(searchParams.utm_campaign),
    utm_content: getSingle(searchParams.utm_content),
    utm_term: getSingle(searchParams.utm_term),
  };
}

export function stringifyUtm(utm: UtmParams): string {
  const activeEntries = Object.entries(utm).filter(([, val]) => Boolean(val));
  if (activeEntries.length === 0) return "Direct / None";
  return activeEntries.map(([k, v]) => `${k.replace("utm_", "")}:${v}`).join(" | ");
}
