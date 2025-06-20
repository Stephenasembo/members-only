const db = require('./queries');

const users = [
  {
    fullName: 'John Doe',
    username: 'JD123',
    password: 'hello',
    membershipStatus: 'member',
    isAdmin: false,
  },
  {
    fullName: 'Jane Smith',
    username: 'JS456',
    password: '1234',
    membershipStatus: 'member',
    isAdmin: true,
  },
  {
    fullName: 'James Smith',
    username: 'bond123',
    password: 'bond123',
    membershipStatus: 'fresh',
    isAdmin: false,
  },
]

const messages = [
  {
    title: 'Hello guys',
    time: new Date(),
    text: 'This message was created by JD123',
    user_id: 1,
  },
  {
    title: 'Admin introduction',
    time: new Date(),
    text: 'This message was created by the admin bond123',
    user_id: 2,
  }
]

async function main () {
  await db.resetDb();
  console.log('Database reset successful...')
  console.log('Populating database...')
  for (const user of users) {
    await db.createUser(user);
  }
  for (const message of messages) {
    await db.createMessage(message);
  }
  console.log('Database populated successfully.');
}

main();
