<?php
declare(strict_types=1);

// HubspotEvents SDK utility: result_body

class HubspotEventsResultBody
{
    public static function call(HubspotEventsContext $ctx): ?HubspotEventsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
