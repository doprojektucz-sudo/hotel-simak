'use client';

import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  className?: string;
}

export default function LocationMap({ className = '' }: LocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Dynamically import Leaflet only on client side
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      
      // Import Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      if (!mapContainerRef.current || mapRef.current) return;

      // Hotel coordinates
      const hotelLat = 49.654744;
      const hotelLng = 15.874650;

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [hotelLat, hotelLng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      // Add gray-scale tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Create custom icon with primary color
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="absolute -top-12 -left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [24, 48],
        iconAnchor: [12, 48],
        popupAnchor: [0, -48],
      });

      // Add marker with popup
      const marker = L.marker([hotelLat, hotelLng], { icon: customIcon }).addTo(map);

      // Create and open popup
      const popupContent = `
        <div class="text-center py-2 px-1 min-w-[200px]">
          <h3 class="font-bold text-lg text-gray-900 mb-1">Hotel a Restaurace U Šimáka</h3>
          <p class="text-sm text-gray-600 mb-2">Radostín 95</p>
          <p class="text-sm text-gray-600 mb-3">591 01 Žďár nad Sázavou</p>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=49.654744,15.874650" 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 11 18-5v12L3 14v-3z"/>
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
            </svg>
            Navigovat
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        autoClose: false,
        closeOnClick: false,
        className: 'custom-popup',
      }).openPopup();

      // Enable scroll zoom after click
      map.on('click', () => {
        map.scrollWheelZoom.enable();
      });

      // Disable scroll zoom when mouse leaves
      map.on('mouseout', () => {
        map.scrollWheelZoom.disable();
      });
    };

    initMap();

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100 rounded-2xl overflow-hidden shadow-xl"
      />
      
      {/* Scroll hint overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg text-sm text-white font-medium pointer-events-none">
        Klikněte pro interaktivní mapu
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          padding: 0;
        }

        .custom-popup .leaflet-popup-content {
          margin: 16px;
          font-family: inherit;
        }

        .custom-popup .leaflet-popup-tip {
          background: white;
        }

        .leaflet-container {
          font-family: inherit;
        }

        .leaflet-popup-close-button {
          font-size: 24px !important;
          padding: 8px 12px !important;
          color: #666 !important;
        }

        .leaflet-popup-close-button:hover {
          color: #333 !important;
        }

        /* Zoom controls styling */
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }

        .leaflet-control-zoom a {
          width: 40px !important;
          height: 40px !important;
          line-height: 40px !important;
          font-size: 20px !important;
          border: none !important;
          background: white !important;
          color: #333 !important;
        }

        .leaflet-control-zoom a:hover {
          background: #f3f4f6 !important;
        }
      `}</style>
    </div>
  );
}