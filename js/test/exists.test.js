
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { HubspotEventsSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HubspotEventsSDK.test()
    equal(null !== testsdk, true)
  })

})
