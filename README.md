parseuri
========

A fork of Steven Levithan's parseuri (v1.2.2).

Based on holywarez's fork (https://github.com/holywarez/parseuri) which adds methods to reconstruct the URI based on the parsed URI object.


# Implementaion

Exposes the `window.URI` object:

```javascript
window.URI = {
    parse: function(str): UriDescriptor{
        // Parse the string and return a URI descriptor object.
    },
    options: {
        // Default parsing options:
        strictMode: false
    }
}
```


## UriDescriptor

Example output of the UriDescriptor based on this test URL:

`https://s3-ap-southeast-2.amazonaws.com/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show`

UriDescriptor:

```javascript
window.URI.parse('https://s3-ap-southeast-2.amazonaws.com/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show');

// Returns:
{
		"anchor": "/results/show",
		"query": "hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome",
		"file": "index.html",
		"directory": "/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/",
		"path": "/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html",
		"relative": "/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show",
		"port": "",
		"host": "s3-ap-southeast-2.amazonaws.com",
		"password": "",
		"user": "",
		"userInfo": "",
		"authority": "s3-ap-southeast-2.amazonaws.com",
		"protocol": "https",
		"source": "https://s3-ap-southeast-2.amazonaws.com/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show",
		"queryKey": {
				"hostUrl": "https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa",
				"configUrl": "https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa",
				"frameId": "wiwo-buyome"
		}
}
```


## Extension methods:

The returned `Uridescriptor` instance has these methods available:

```javascript
{
	/**
	 * Copy the host, port, protocol, user, password
	 * from `pattern` and call `toString` on this UriDescriptor.
	 * 
	 * i.e. converts this relative UriDescriptor to an absolute
	 * Uri based on the values from `pattern`.
	 * 
	 * __Note:__ The UriDescriptor will be updated with the new absolute values.
	 */
	toAbsolute(pattern: UriDescriptor): string;

	/**
	 * Return true if the UriDescriptor has a valid host property.
	 */
	isAbsolute(): boolean;

	/**
	 * Return true if the UriDescriptor has an empty host.
	 */
	isRelative(): boolean;

	/**
	 * Convert this UriDescriptor to a string, excluding
	 * any properties that appear in the `except` array.
	 * 
	 * __Note:__ The URL string is reparsed so the values on the UriDescriptor might change.
	 */
	toString(except: string[]): string;
}

```
