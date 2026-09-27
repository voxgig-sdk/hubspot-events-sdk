<?php
declare(strict_types=1);

// Property entity test

require_once __DIR__ . '/../hubspotevents_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PropertyEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HubspotEventsSDK::test(null, null);
        $ent = $testsdk->Property(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = property_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "property." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HUBSPOT_EVENTS_TEST_PROPERTY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $property_ref01_ent = $client->Property(null);
        $property_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.property"), "property_ref01"));
        $property_ref01_data["event_definition_id"] = $setup["idmap"]["event_definition01"];
        $property_ref01_data["event_name"] = $setup["idmap"]["event_name01"];

        $property_ref01_data_result = $property_ref01_ent->create($property_ref01_data, null);
        $property_ref01_data = Helpers::to_map(is_object($property_ref01_data_result) && method_exists($property_ref01_data_result, 'data_get') ? $property_ref01_data_result->data_get() : $property_ref01_data_result);
        $this->assertNotNull($property_ref01_data);
        $this->assertNotNull($property_ref01_data["id"]);

        // UPDATE
        $property_ref01_data_up0_up = [
            "id" => $property_ref01_data["id"],
            "event_definition_id" => $setup["idmap"]["event_definition_id"],
        ];

        $property_ref01_markdef_up0_name = "description";
        $property_ref01_markdef_up0_value = "Mark01-property_ref01_" . $setup["now"];
        $property_ref01_data_up0_up[$property_ref01_markdef_up0_name] = $property_ref01_markdef_up0_value;

        $property_ref01_resdata_up0_result = $property_ref01_ent->update($property_ref01_data_up0_up, null);
        $property_ref01_resdata_up0 = Helpers::to_map(is_object($property_ref01_resdata_up0_result) && method_exists($property_ref01_resdata_up0_result, 'data_get') ? $property_ref01_resdata_up0_result->data_get() : $property_ref01_resdata_up0_result);
        $this->assertNotNull($property_ref01_resdata_up0);
        $this->assertEquals($property_ref01_resdata_up0["id"], $property_ref01_data_up0_up["id"]);
        $this->assertEquals($property_ref01_resdata_up0[$property_ref01_markdef_up0_name], $property_ref01_markdef_up0_value);

    }
}

function property_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/property/PropertyTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HubspotEventsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["property01", "property02", "property03", "event_definition01", "event_definition02", "event_definition03", "event_name01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HUBSPOT_EVENTS_TEST_PROPERTY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HUBSPOT_EVENTS_TEST_PROPERTY_ENTID" => $idmap,
        "HUBSPOT_EVENTS_TEST_LIVE" => "FALSE",
        "HUBSPOT_EVENTS_TEST_EXPLAIN" => "FALSE",
        "HUBSPOT_EVENTS_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HUBSPOT_EVENTS_TEST_PROPERTY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["event_definition_id"])) {
        $idmap_resolved["event_definition_id"] = $idmap_resolved["event_definition01"];
    }

    if ($env["HUBSPOT_EVENTS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["HUBSPOT_EVENTS_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new HubspotEventsSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["HUBSPOT_EVENTS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HUBSPOT_EVENTS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
