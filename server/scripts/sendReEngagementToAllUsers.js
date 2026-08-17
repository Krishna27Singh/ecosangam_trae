require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { sendReEngagementEmail } = require('../services/mailService');

async function run() {
  const rawUri = process.env.MONGO_URI;
  if (!rawUri) {
    throw new Error('MONGO_URI is missing in environment variables');
  }

  const mongoUri = rawUri.endsWith('/') ? `${rawUri}ecosangam` : rawUri;
  await mongoose.connect(mongoUri);
  console.log('Connected to DB for reminder campaign');

  const users = await User.find({}, { name: 1, email: 1 }).lean();
  if (!users.length) {
    console.log('No users found. Nothing to send.');
    return;
  }

  let sent = 0;
  let failed = 0;

  for (const user of users) {
    try {
      await sendReEngagementEmail({ name: user.name, email: user.email });
      sent += 1;
      console.log(`Sent (${sent}/${users.length}) -> ${user.email}`);
    } catch (err) {
      failed += 1;
      console.error(`Failed -> ${user.email}: ${err.message}`);
    }
  }

  console.log(`Campaign finished. Sent: ${sent}, Failed: ${failed}, Total: ${users.length}`);
}

run()
  .catch((err) => {
    console.error('Campaign failed:', err.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
