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

func TestEventDefinitionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EventDefinition(nil)
		if ent == nil {
			t.Fatal("expected non-nil EventDefinitionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := event_definitionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "event_definition." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		eventDefinitionRef01Ent := client.EventDefinition(nil)
		eventDefinitionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "event_definition"}), "event_definition_ref01"))

		eventDefinitionRef01DataResult, err := eventDefinitionRef01Ent.Create(eventDefinitionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		eventDefinitionRef01Data = core.ToMapAny(entityData(eventDefinitionRef01DataResult))
		if eventDefinitionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if eventDefinitionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		eventDefinitionRef01DataUp0Up := map[string]any{
			"id": eventDefinitionRef01Data["id"],
		}

		eventDefinitionRef01MarkdefUp0Name := "createdAt"
		eventDefinitionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-event_definition_ref01_%d", setup.now)
		eventDefinitionRef01DataUp0Up[eventDefinitionRef01MarkdefUp0Name] = eventDefinitionRef01MarkdefUp0Value

		eventDefinitionRef01ResdataUp0Result, err := eventDefinitionRef01Ent.Update(eventDefinitionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		eventDefinitionRef01ResdataUp0 := core.ToMapAny(entityData(eventDefinitionRef01ResdataUp0Result))
		if eventDefinitionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if eventDefinitionRef01ResdataUp0["id"] != eventDefinitionRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if eventDefinitionRef01ResdataUp0[eventDefinitionRef01MarkdefUp0Name] != eventDefinitionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", eventDefinitionRef01MarkdefUp0Name, eventDefinitionRef01ResdataUp0[eventDefinitionRef01MarkdefUp0Name])
		}

		// LOAD
		eventDefinitionRef01MatchDt0 := map[string]any{
			"id": eventDefinitionRef01Data["id"],
		}
		eventDefinitionRef01DataDt0Loaded, err := eventDefinitionRef01Ent.Load(eventDefinitionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		eventDefinitionRef01DataDt0LoadResult := core.ToMapAny(entityData(eventDefinitionRef01DataDt0Loaded))
		if eventDefinitionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if eventDefinitionRef01DataDt0LoadResult["id"] != eventDefinitionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func event_definitionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "event_definition", "EventDefinitionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read event_definition test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse event_definition test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"event_definition01", "event_definition02", "event_definition03"},
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
	entidEnvRaw := os.Getenv("HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID": idmap,
		"HUBSPOT_EVENTS_TEST_LIVE":      "FALSE",
		"HUBSPOT_EVENTS_TEST_EXPLAIN":   "FALSE",
		"HUBSPOT_EVENTS_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["HUBSPOT_EVENTS_TEST_EVENT_DEFINITION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
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
