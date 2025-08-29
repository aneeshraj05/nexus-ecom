import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // avoid buffering until connected
      // useUnifiedTopology and useNewUrlParser are default in latest mongoose
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI + "/nexus", opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
