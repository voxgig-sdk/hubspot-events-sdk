# HubspotEvents SDK exists test

import pytest
from hubspotevents_sdk import HubspotEventsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HubspotEventsSDK.test(None, None)
        assert testsdk is not None
