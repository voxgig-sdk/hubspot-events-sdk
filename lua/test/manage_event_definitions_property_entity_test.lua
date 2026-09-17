-- ManageEventDefinitionsProperty entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hubspot-events_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ManageEventDefinitionsPropertyEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ManageEventDefinitionsProperty(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = manage_event_definitions_property_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "manage_event_definitions_property." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local manage_event_definitions_property_ref01_ent = client:ManageEventDefinitionsProperty(nil)
    local manage_event_definitions_property_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.manage_event_definitions_property"), "manage_event_definitions_property_ref01"))
    manage_event_definitions_property_ref01_data["event_definition_id"] = setup.idmap["event_definition01"]
    manage_event_definitions_property_ref01_data["event_name"] = setup.idmap["event_name01"]

    local manage_event_definitions_property_ref01_data_result, err = manage_event_definitions_property_ref01_ent:create(manage_event_definitions_property_ref01_data, nil)
    assert.is_nil(err)
    manage_event_definitions_property_ref01_data = helpers.to_map(type(manage_event_definitions_property_ref01_data_result) == 'table' and manage_event_definitions_property_ref01_data_result.data_get and manage_event_definitions_property_ref01_data_result:data_get() or manage_event_definitions_property_ref01_data_result)
    assert.is_not_nil(manage_event_definitions_property_ref01_data)
    assert.is_not_nil(manage_event_definitions_property_ref01_data["id"])

    -- UPDATE
    local manage_event_definitions_property_ref01_data_up0_up = {
      id = manage_event_definitions_property_ref01_data["id"],
      ["event_definition_id"] = setup.idmap["event_definition_id"],
    }

    local manage_event_definitions_property_ref01_markdef_up0_name = "description"
    local manage_event_definitions_property_ref01_markdef_up0_value = "Mark01-manage_event_definitions_property_ref01_" .. tostring(setup.now)
    manage_event_definitions_property_ref01_data_up0_up[manage_event_definitions_property_ref01_markdef_up0_name] = manage_event_definitions_property_ref01_markdef_up0_value

    local manage_event_definitions_property_ref01_resdata_up0_result, err = manage_event_definitions_property_ref01_ent:update(manage_event_definitions_property_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local manage_event_definitions_property_ref01_resdata_up0 = helpers.to_map(type(manage_event_definitions_property_ref01_resdata_up0_result) == 'table' and manage_event_definitions_property_ref01_resdata_up0_result.data_get and manage_event_definitions_property_ref01_resdata_up0_result:data_get() or manage_event_definitions_property_ref01_resdata_up0_result)
    assert.is_not_nil(manage_event_definitions_property_ref01_resdata_up0)
    assert.are.equal(manage_event_definitions_property_ref01_resdata_up0["id"], manage_event_definitions_property_ref01_data_up0_up["id"])
    assert.are.equal(manage_event_definitions_property_ref01_resdata_up0[manage_event_definitions_property_ref01_markdef_up0_name], manage_event_definitions_property_ref01_markdef_up0_value)

  end)
end)

function manage_event_definitions_property_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/manage_event_definitions_property/ManageEventDefinitionsPropertyTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read manage_event_definitions_property test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "manage_event_definitions_property01", "manage_event_definitions_property02", "manage_event_definitions_property03", "event_definition01", "event_definition02", "event_definition03", "event_name01" },
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
  local entid_env_raw = os.getenv("HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID"] = idmap,
    ["HUBSPOT_EVENTS_TEST_LIVE"] = "FALSE",
    ["HUBSPOT_EVENTS_TEST_EXPLAIN"] = "FALSE",
    ["HUBSPOT_EVENTS_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["event_definition_id"] == nil then
    idmap_resolved["event_definition_id"] = idmap_resolved["event_definition01"]
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
