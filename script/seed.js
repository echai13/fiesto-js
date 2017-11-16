/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Party} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', firstName: 'Cody', lastName: 'Miller', passcode: '9876', customerId: 'cus_BmC37xXXwcmcH3' }),
    User.create({ email: 'murphy@email.com', password: '123', firstName: 'Murphy', lastName: 'White', passcode: '2468', customerId: 'cus_BmC7slPHdjrUkr' }),
    User.create({ email: 'cherry@email.com', password: '123', firstName: 'Cherry', lastName: 'Lee', passcode: 'rose2017', customerId: 'cus_BmCDamouorpCKE' }),
    User.create({ email: 'jacqueline@email.com', password: '123', firstName: 'Jacqueline', lastName: 'Terran', passcode: 'jt2017', customerId: 'cus_BmCDNcV2NZQc1x' }),
    User.create({ email: 'kelly@email.com', password: '123', firstName: 'Kelly', lastName: 'James', passcode: 'kelly101', customerId: 'cus_BmCEVEbeEEKwMD' }),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)


  const parties = await Promise.all([
    Party.create({ name: 'Thanksgiving Banquet', price: 12.99, description: 'banquet after a parade to celebrate Thanksgiving', userId: 3 }),
    Party.create({ name: 'Barbeque Retiree Party', price: 7.99, description: 'a barbeque party to celebrate the retirements of our police force', userId: 3 }),
    Party.create({ name: 'PBS Kids Costume Party', price: 4.99, description: 'to commemorate the characters of PBS Kids channel', userId: 1 })
  ])
  console.log(`seeded ${parties.length} parties`)
  console.log(`seeded successfully`)

}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
