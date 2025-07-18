import axios from 'axios';

// Create separate clients for each API endpoint
const ormApiClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000, // 5 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

const sequelizeApiClient = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const prismaApiClient = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for ORM API - runs before every request
ormApiClient.interceptors.request.use(
  (config) => {
    // Add timestamp to see when requests are made
    console.log(`[ORM API] Making request to ${config.url} at ${new Date().toISOString()}`);
    
    // You could add authentication headers here if needed
    // config.headers.Authorization = `Bearer ${getAuthToken()}`;
    
    return config;
  },
  (error) => {
    console.error('[ORM API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for ORM API - runs after every response
ormApiClient.interceptors.response.use(
  (response) => {
    console.log(`[ORM API] Received response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('[ORM API] Response error:', error.message);
    
    // Handle specific error cases
    if (error.code === 'ECONNREFUSED') {
      console.error('[ORM API] Server appears to be down');
    } else if (error.response?.status === 404) {
      console.error('[ORM API] Endpoint not found');
    }
    
    return Promise.reject(error);
  }
);

// Similar interceptors for Sequelize API
sequelizeApiClient.interceptors.request.use(
  (config) => {
    console.log(`[Sequelize API] Making request to ${config.url} at ${new Date().toISOString()}`);
    return config;
  },
  (error) => {
    console.error('[Sequelize API] Request error:', error);
    return Promise.reject(error);
  }
);

sequelizeApiClient.interceptors.response.use(
  (response) => {
    console.log(`[Sequelize API] Received response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('[Sequelize API] Response error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('[Sequelize API] Server appears to be down');
    } else if (error.response?.status === 404) {
      console.error('[Sequelize API] Endpoint not found');
    }
    
    return Promise.reject(error);
  }
);

prismaApiClient.interceptors.request.use(
  (config) => {
    console.log(`[Prisma API] Making request to ${config.url} at ${new Date().toISOString()}`);
    return config;
  },
  (error) => {
    console.error('[Prisma API] Request error:', error);
    return Promise.reject(error);
  }
);

prismaApiClient.interceptors.response.use(
  (response) => {
    console.log(`[Prisma API] Received response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('[Prisma API] Response error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('[Prisma API] Server appears to be down');
    } else if (error.response?.status === 404) {
      console.error('[Prisma API] Endpoint not found');
    }
    
    return Promise.reject(error);
  }
);

export { ormApiClient, sequelizeApiClient, prismaApiClient };
