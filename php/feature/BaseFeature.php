<?php
declare(strict_types=1);

// HubspotEvents SDK base feature

class HubspotEventsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HubspotEventsContext $ctx, array $options): void {}
    public function PostConstruct(HubspotEventsContext $ctx): void {}
    public function PostConstructEntity(HubspotEventsContext $ctx): void {}
    public function SetData(HubspotEventsContext $ctx): void {}
    public function GetData(HubspotEventsContext $ctx): void {}
    public function GetMatch(HubspotEventsContext $ctx): void {}
    public function SetMatch(HubspotEventsContext $ctx): void {}
    public function PrePoint(HubspotEventsContext $ctx): void {}
    public function PreSpec(HubspotEventsContext $ctx): void {}
    public function PreRequest(HubspotEventsContext $ctx): void {}
    public function PreResponse(HubspotEventsContext $ctx): void {}
    public function PreResult(HubspotEventsContext $ctx): void {}
    public function PreDone(HubspotEventsContext $ctx): void {}
    public function PreUnexpected(HubspotEventsContext $ctx): void {}
}
