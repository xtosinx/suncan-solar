import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

const dynamicModules = {};

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const modules = {
  [Modules.CACHE]: {
    resolve: '@medusajs/medusa/cache-redis',
    options: {
      redisUrl: process.env.REDIS_URL,
    },
  },
  [Modules.EVENT_BUS]: {
    resolve: '@medusajs/medusa/event-bus-redis',
    options: {
      redisUrl: process.env.REDIS_URL,
    },
  },
  [Modules.WORKFLOW_ENGINE]: {
    resolve: '@medusajs/medusa/workflow-engine-redis',
    options: {
      redis: {
        url: process.env.REDIS_URL,
      },
    },
  },
  [Modules.FILE]: {
    resolve: '@medusajs/medusa/file',
    options: {
      providers: [
        {
          resolve: '@medusajs/file-s3',
          id: 's3',
          options: {
            file_url: process.env.S3_FILE_URL,
            access_key_id: process.env.S3_ACCESS_KEY_ID,
            secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
            region: process.env.S3_REGION,
            bucket: process.env.S3_BUCKET,
            endpoint: process.env.S3_ENDPOINT,
          },
        },
      ],
    },
  },

};

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || '',
      adminCors: process.env.ADMIN_CORS || '',
      authCors: process.env.AUTH_CORS || '',
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
    redisUrl: process.env.REDIS_URL,
  },
  admin: {
    backendUrl: process.env.BACKEND_URL || 'http://localhost:9000',
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'false',
  },
  modules: {
    ...modules,
    ...dynamicModules,
  },
});