package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/hubspot-events-sdk/go"
	"github.com/voxgig-sdk/hubspot-events-sdk/go/core"

	vs "github.com/voxgig-sdk/hubspot-events-sdk/go/utility/struct"
)

func TestManageEventDefinitionsPropertyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ManageEventDefinitionsProperty(nil)
		if ent == nil {
			t.Fatal("expected non-nil ManageEventDefinitionsPropertyEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := manage_event_definitions_propertyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "manage_event_definitions_property." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		manageEventDefinitionsPropertyRef01Ent := client.ManageEventDefinitionsProperty(nil)
		manageEventDefinitionsPropertyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "manage_event_definitions_property"}), "manage_event_definitions_property_ref01"))
		manageEventDefinitionsPropertyRef01Data["event_definition_id"] = setup.idmap["event_definition01"]
		manageEventDefinitionsPropertyRef01Data["event_name"] = setup.idmap["event_name01"]

		manageEventDefinitionsPropertyRef01DataResult, err := manageEventDefinitionsPropertyRef01Ent.Create(manageEventDefinitionsPropertyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		manageEventDefinitionsPropertyRef01Data = core.ToMapAny(entityData(manageEventDefinitionsPropertyRef01DataResult))
		if manageEventDefinitionsPropertyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if manageEventDefinitionsPropertyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		manageEventDefinitionsPropertyRef01DataUp0Up := map[string]any{
			"id": manageEventDefinitionsPropertyRef01Data["id"],
			"event_definition_id": setup.idmap["event_definition_id"],
		}

		manageEventDefinitionsPropertyRef01MarkdefUp0Name := "description"
		manageEventDefinitionsPropertyRef01MarkdefUp0Value := fmt.Sprintf("Mark01-manage_event_definitions_property_ref01_%d", setup.now)
		manageEventDefinitionsPropertyRef01DataUp0Up[manageEventDefinitionsPropertyRef01MarkdefUp0Name] = manageEventDefinitionsPropertyRef01MarkdefUp0Value

		manageEventDefinitionsPropertyRef01ResdataUp0Result, err := manageEventDefinitionsPropertyRef01Ent.Update(manageEventDefinitionsPropertyRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		manageEventDefinitionsPropertyRef01ResdataUp0 := core.ToMapAny(entityData(manageEventDefinitionsPropertyRef01ResdataUp0Result))
		if manageEventDefinitionsPropertyRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if manageEventDefinitionsPropertyRef01ResdataUp0["id"] != manageEventDefinitionsPropertyRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if manageEventDefinitionsPropertyRef01ResdataUp0[manageEventDefinitionsPropertyRef01MarkdefUp0Name] != manageEventDefinitionsPropertyRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", manageEventDefinitionsPropertyRef01MarkdefUp0Name, manageEventDefinitionsPropertyRef01ResdataUp0[manageEventDefinitionsPropertyRef01MarkdefUp0Name])
		}

	})
}

func manage_event_definitions_propertyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "manage_event_definitions_property", "ManageEventDefinitionsPropertyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read manage_event_definitions_property test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse manage_event_definitions_property test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"manage_event_definitions_property01", "manage_event_definitions_property02", "manage_event_definitions_property03", "event_definition01", "event_definition02", "event_definition03", "event_name01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID": idmap,
		"HUBSPOT_EVENTS_TEST_LIVE":      "FALSE",
		"HUBSPOT_EVENTS_TEST_EXPLAIN":   "FALSE",
		"HUBSPOT_EVENTS_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HUBSPOT_EVENTS_TEST_MANAGE_EVENT_DEFINITIONS_PROPERTY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add event_definition_id alias for update test.
	if idmapResolved["event_definition_id"] == nil {
		idmapResolved["event_definition_id"] = idmapResolved["event_definition01"]
	}

	if env["HUBSPOT_EVENTS_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["HUBSPOT_EVENTS_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewHubspotEventsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HUBSPOT_EVENTS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HUBSPOT_EVENTS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
