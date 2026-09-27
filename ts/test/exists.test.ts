
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HubspotEventsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HubspotEventsSDK.test()
    equal(testsdk instanceof HubspotEventsSDK, true,
      'HubspotEventsSDK.test() must return a client synchronously')
  })

})
