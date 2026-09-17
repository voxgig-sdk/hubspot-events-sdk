package core

type HubspotEventsError struct {
	IsHubspotEventsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHubspotEventsError(code string, msg string, ctx *Context) *HubspotEventsError {
	return &HubspotEventsError{
		IsHubspotEventsError: true,
		Sdk:              "HubspotEvents",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HubspotEventsError) Error() string {
	return e.Msg
}
