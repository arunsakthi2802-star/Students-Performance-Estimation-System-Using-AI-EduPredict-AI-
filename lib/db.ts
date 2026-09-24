import mongoose from 'mongoose';
import dns from 'dns';

// Fix Node.js DNS resolution issues on Windows for mongodb+srv://
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore if not supported in environment
}

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.warn('MONGODB_URL environment variable is not defined in .env.local');
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: GlobalMongoose | undefined;
}

let cached: GlobalMongoose = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fast timeout for responsive fallback
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then(m => {
      console.log('Successfully connected to MongoDB Atlas');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
