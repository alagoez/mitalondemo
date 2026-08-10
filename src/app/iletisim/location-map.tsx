"use client";

import type { StyleSpecification } from "maplibre-gl";
import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/mapcn";

// Alaaddinbey Mah. Pazar Cad. Pega 2 Plaza No: 5/A — Nilüfer / Bursa
const MITALON = { lng: 28.9365, lat: 40.2215 };

// Raster katman: vektör stilin font/glyph zincirine bağımlı olmadığı için
// her makinede garantili çizilir; görünüm Positron ile aynı ailede (CARTO light).
const LIGHT_RASTER: StyleSpecification = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [{ id: "carto", type: "raster", source: "carto" }],
};

export function LocationMap() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-xl border border-line">
      <Map
        theme="light"
        styles={{ light: LIGHT_RASTER }}
        center={[MITALON.lng, MITALON.lat]}
        zoom={13.5}
        scrollZoom={false}
      >
        <MapMarker longitude={MITALON.lng} latitude={MITALON.lat}>
          <MarkerContent>
            <div className="relative grid place-items-center">
              {/* Nabız halkası */}
              <span className="absolute size-10 animate-ping rounded-full bg-scan/25" />
              <span className="absolute size-7 rounded-full bg-scan/15" />
              <div className="relative size-5 rounded-full border-2 border-white bg-scan shadow-lg transition-transform hover:scale-110" />
            </div>
          </MarkerContent>
          <MarkerTooltip className="rounded-lg px-3 py-2">
            <p className="text-[12px] font-semibold">Mitalon — Pega 2 Plaza</p>
            <p className="mt-0.5 text-[11px] opacity-80">
              Alaaddinbey Mah. Pazar Cad. No: 5/A, Nilüfer / Bursa
            </p>
          </MarkerTooltip>
        </MapMarker>
      </Map>
    </div>
  );
}
