import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZaoCycle — Zero Poison. Zero Waste.',
    short_name: 'ZaoCycle',
    description:
      'Circular agri-tech platform paying Kirinyaga farmers to farm safely by monetizing agricultural waste into clean-energy eco-briquettes.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#020617',
    theme_color: '#16a34a',
    categories: ['agriculture', 'environment', 'food'],
    icons: [
      {
        src: '/zaocycle-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/zaocycle-icon-maskable.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    screenshots: [],
    shortcuts: [
      {
        name: 'Verify Food Safety',
        url: '/scan/demo',
        description: 'Scan a QR code to check PHI compliance',
      },
      {
        name: 'Order Briquettes',
        url: '/buy',
        description: 'Order eco-briquettes for your school',
      },
    ],
  };
}
