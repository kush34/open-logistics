# IthinkDocumentResponse

Raw label or manifest response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | [optional] 
**status_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**html_message** | **str** |  | [optional] 
**message** | **str** |  | [optional] 
**file_name** | **str** |  | [optional] 
**file_url** | **str** |  | [optional] 
**url** | **str** |  | [optional] 
**data** | **object** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_document_response import IthinkDocumentResponse

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkDocumentResponse from a JSON string
ithink_document_response_instance = IthinkDocumentResponse.from_json(json)
# print the JSON string representation of the object
print(ithink_document_response_instance.to_json())

# convert the object into a dict
ithink_document_response_dict = ithink_document_response_instance.to_dict()
# create an instance of IthinkDocumentResponse from a dict
ithink_document_response_from_dict = IthinkDocumentResponse.from_dict(ithink_document_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


