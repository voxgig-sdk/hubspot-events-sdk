-- EventDefinition entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hubspot-events_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("EventDefinitionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:EventDefinition(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = event_definition_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "event_definition." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local event_definition_ref01_ent = client:EventDefinition(nil)
    local event_definition_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.event_definition"), "event_definition_ref01"))

    local event_definition_ref01_data_result, err = event_definition_ref01_ent:create(event_definition_ref01_data, nil)
    assert.is_nil(err)
    event_definition_ref01_data = helpers.to_map(type(event_definition_ref01_data_result) == 'table' and event_definition_ref01_data_result.data_get and event_definition_ref01_data_result:data_get() or event_definition_ref01_data_result)
    assert.is_not_nil(event_definition_ref01_data)
    assert.is_not_nil(event_definition_ref01_data["id"])

    -- UPDATE
    local event_definition_ref01_data_up0_up = {
      id = event_definition_ref01_data["id"],
    }

    local event_definition_ref01_markdef_up0_name = "createdAt"
    local event_definition_ref01_markdef_up0_value = "Mark01-event_definition_ref01_" .. tostring(setup.now)
    event_definition_ref01_data_up0_up[event_definition_ref01_markdef_up0_name] = event_definition_ref01_markdef_up0_value

    local event_definition_ref01_resdata_up0_result, err = event_definition_ref01_ent:update(event_definition_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local event_definition_ref01_resdata_up0 = helpers.to_map(type(event_definition_ref01_resdata_up0_result) == 'table' and event_definition_ref01_resdata_up0_result.data_get and event_definition_ref01_resdata_up0_result:data_get() or event_definition_ref01_resdata_up0_result)
    assert.is_not_nil(event_definition_ref01_resdata_up0)
    assert.are.equal(event_definition_ref01_resdata_up0["id"], event_definition_ref01_data_up0_up["id"])
    assert.are.equal(event_definition_ref01_resdata_up0[event_definition_ref01_markdef_up0_name], event_definition_ref01_markdef_up0_value)

    -- LOAD
    local event_definition_ref01_match_dt0 = {
      id = event_definition_ref01_data["id"],
    }
    local event_definition_ref01_data_dt0_loaded, err = event_definition_ref01_ent:load(event_definition_ref01_match_dt0, nil)
    assert.is_nil(err)
    local event_definition_ref01_data_dt0_load_result = helpers.to_map(type(event_definition_ref01_data_dt0_loaded) == 'table' and event_definition_ref01_data_dt0_loaded.data_get and event_definition_ref01_data_dt0_loaded:data_get() or event_definition_ref01_data_dt0_loaded)
    assert.is_not_nil(event_definition_ref01_data_dt0_load_result)
    assert.are.equal(event_definition_ref01_data_dt0_load_result["id"], event_definition_ref01_data["id"])

  end)
end)

function event_definition_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/event_definition/EventDefinitionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read event_definition test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "event_definition01", "event_definition02", "event_definition03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID"] = idmap,
    ["HUBSPOT_EVENTS_TEST_LIVE"] = "FALSE",
    ["HUBSPOT_EVENTS_TEST_EXPLAIN"] = "FALSE",
    ["HUBSPOT_EVENTS_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["HUBSPOT_EVENTS_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["HUBSPOT_EVENTS_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["HUBSPOT_EVENTS_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["HUBSPOT_EVENTS_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
