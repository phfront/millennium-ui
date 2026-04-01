import type { Config } from 'tailwindcss';
import { nexusUiPreset } from '@nexus/ui/tailwind-preset';

const config: Config = {
  presets: [nexusUiPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../src/**/*.{ts,tsx}', // Importa classes dos componentes do pacote
  ],
};

export default config;
