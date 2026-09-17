# Basic entity test

import json
import os
import time

import pytest

from hubspotevents_sdk.utility.voxgig_struct import voxgig_struct as vs
from hubspotevents_sdk import HubspotEventsSDK
from hubspotevents_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestBasicEntity:

    def test_should_create_instance(self):
        testsdk = HubspotEventsSDK.test(None, None)
        ent = testsdk.Basic(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _basic_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "basic." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HUBSPOT_EVENTS_TEST_BASIC_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        basic_ref01_ent = client.Basic(None)
        basic_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.basic"), "basic_ref01"))
        basic_ref01_data["event_definition_id"] = setup["idmap"]["event_definition01"]

        basic_ref01_data = helpers.to_map(runner.entity_data(basic_ref01_ent.create(basic_ref01_data, None)))
        assert basic_ref01_data is not None




def _basic_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/basic/BasicTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HubspotEventsSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["basic01", "basic02", "basic03", "event_definition01", "event_definition02", "event_definition03", "property01", "property02", "property03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "HUBSPOT_EVENTS_TEST_BASIC_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HUBSPOT_EVENTS_TEST_BASIC_ENTID": idmap,
        "HUBSPOT_EVENTS_TEST_LIVE": "FALSE",
        "HUBSPOT_EVENTS_TEST_EXPLAIN": "FALSE",
        "HUBSPOT_EVENTS_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HUBSPOT_EVENTS_TEST_BASIC_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HUBSPOT_EVENTS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("HUBSPOT_EVENTS_APIKEY"),
            },
            extra or {},
        ])
        client = HubspotEventsSDK(helpers.to_map(merged_opts))

    _live = env.get("HUBSPOT_EVENTS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("HUBSPOT_EVENTS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
