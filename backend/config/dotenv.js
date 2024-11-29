const dotenv = require('dotenv');

const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'UPLOAD_DIR', 'ADMIN_EMAIL'];

const loadEnv = () => {
  dotenv.config();

  // Check for missing environment variables
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
  if (missingVars.length) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  console.log('Environment variables loaded successfully.');
};

module.exports = loadEnv;
