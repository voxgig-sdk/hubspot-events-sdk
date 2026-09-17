<?php
declare(strict_types=1);

// HubspotEvents SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HubspotEventsMakeContext
{
    public static function call(array $ctxmap, ?HubspotEventsContext $basectx): HubspotEventsContext
    {
        return new HubspotEventsContext($ctxmap, $basectx);
    }
}
