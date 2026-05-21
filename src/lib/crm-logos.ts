import acme from "@/assets/logos/acme.png";
import northwind from "@/assets/logos/northwind.png";
import helios from "@/assets/logos/helios.png";
import brightline from "@/assets/logos/brightline.png";
import kestrel from "@/assets/logos/kestrel.png";
import lumen from "@/assets/logos/lumen.png";

export const dealLogos: Record<string, string> = {
  "acme-corp": acme,
  "northwind-labs": northwind,
  "helios-manufacturing": helios,
  "brightline-health": brightline,
  "kestrel-robotics": kestrel,
  "lumen-financial": lumen,
};

export function getDealLogo(dealId: string): string | undefined {
  return dealLogos[dealId];
}
