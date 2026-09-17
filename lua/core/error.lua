-- HubspotEvents SDK error

local HubspotEventsError = {}
HubspotEventsError.__index = HubspotEventsError


function HubspotEventsError.new(code, msg, ctx)
  local self = setmetatable({}, HubspotEventsError)
  self.is_sdk_error = true
  self.sdk = "HubspotEvents"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HubspotEventsError:error()
  return self.msg
end


function HubspotEventsError:__tostring()
  return self.msg
end


return HubspotEventsError
