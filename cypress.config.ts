import { defineConfig } from 'cypress';
import 'dotenv/config';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8082', 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

