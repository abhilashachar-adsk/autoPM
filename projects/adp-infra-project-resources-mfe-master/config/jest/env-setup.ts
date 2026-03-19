/**
 * Jest environment setup that runs BEFORE module imports
 * This ensures environment variables are set before any code is loaded
 */

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Mock LOCAL_TOKEN to force DEV environment in tests
process.env.LOCAL_TOKEN = 'mock-token-for-testing';

