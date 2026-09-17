# ManageEventDefinitionsProperty entity test

import json
import os
import time

import pytest

from hubspotevents_sdk.utility.voxgig_struct import voxgig_struct as vs
from hubspotevents_sdk import HubspotEventsSDK
from hubspotevents_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestManageEventDefinitionsPropertyEntity:

    def test_should_create_instance(self):
        testsdk = HubspotEventsSDK.test(None, None)
        ent = testsdk.ManageEventDefinitionsProperty(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _manage_event_definitions_property_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "manage_event_definitions_property." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        manage_event_definitions_property_ref01_ent = client.ManageEventDefinitionsProperty(None)
        manage_event_definitions_property_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.manage_event_definitions_property"), "manage_event_definitions_property_ref01"))
        manage_event_definitions_property_ref01_data["event_definition_id"] = setup["idmap"]["event_definition01"]
        manage_event_definitions_property_ref01_data["event_name"] = setup["idmap"]["event_name01"]

        manage_event_definitions_property_ref01_data = helpers.to_map(runner.entity_data(manage_event_definitions_property_ref01_ent.create(manage_event_definitions_property_ref01_data, None)))
        assert manage_event_definitions_property_ref01_data is not None
        assert manage_event_definitions_property_ref01_data["id"] is not None

        # UPDATE
        manage_event_definitions_property_ref01_data_up0_up = {
            "id": manage_event_definitions_property_ref01_data["id"],
            "event_definition_id": setup["idmap"]["event_definition_id"],
        }

        manage_event_definitions_property_ref01_markdef_up0_name = "description"
        manage_event_definitions_property_ref01_markdef_up0_value = "Mark01-manage_event_definitions_property_ref01_" + str(setup["now"])
        manage_event_definitions_property_ref01_data_up0_up[manage_event_definitions_property_ref01_markdef_up0_name] = manage_event_definitions_property_ref01_markdef_up0_value

        manage_event_definitions_property_ref01_resdata_up0 = helpers.to_map(runner.entity_data(manage_event_definitions_property_ref01_ent.update(manage_event_definitions_property_ref01_data_up0_up, None)))
        assert manage_event_definitions_property_ref01_resdata_up0 is not None
        assert manage_event_definitions_property_ref01_resdata_up0["id"] == manage_event_definitions_property_ref01_data_up0_up["id"]
        assert manage_event_definitions_property_ref01_resdata_up0[manage_event_definitions_property_ref01_markdef_up0_name] == manage_event_definitions_property_ref01_markdef_up0_value



def _manage_event_definitions_property_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/manage_event_definitions_property/ManageEventDefinitionsPropertyTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = HubspotEventsSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["manage_event_definitions_property01", "manage_event_definitions_property02", "manage_event_definitions_property03", "event_definition01", "event_definition02", "event_definition03", "event_name01"],
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
        "HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID": idmap,
        "HUBSPOT_EVENTS_TEST_LIVE": "FALSE",
        "HUBSPOT_EVENTS_TEST_EXPLAIN": "FALSE",
        "HUBSPOT_EVENTS_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("event_definition_id") is None:
        idmap_resolved["event_definition_id"] = idmap_resolved.get("event_definition01")

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
