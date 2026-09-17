<?php
declare(strict_types=1);

// HubspotEvents SDK utility: result_headers

class HubspotEventsResultHeaders
{
    public static function call(HubspotEventsContext $ctx): ?HubspotEventsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
