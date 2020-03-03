import URI from '../parseuri';


/**
 * URI:
 */
describe('URI:', function(){
    
    it('parses URL', function(){
        let result = URI.parse('https://example-url.example.com/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show');
        
    	// expect(result).toEqual(null);
        expect(result).toEqual(expect.objectContaining({
            "anchor": "/results/show",
            "query": "hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome",
            "file": "index.html",
            "directory": "/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/",
            "path": "/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html",
            "relative": "/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show",
            "port": "",
            "host": "example-url.example.com",
            "password": "",
            "user": "",
            "userInfo": "",
            "authority": "example-url.example.com",
            "protocol": "https",
            "source": "https://example-url.example.com/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show",
            "queryKey": {
                "hostUrl": "https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa",
                "configUrl": "https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa",
                "frameId": "wiwo-buyome"
            }
        }));
    });
    
    
    it('has extra methods', function(){
    	let result = URI.parse('https://example-url.example.com/w-widgetworks-com-au/wiwo/wiwo-startupcosts/1.0.5/index.html?hostUrl=https%3A%2F%2Fwm.widgetworks.com.au%2Fwidget%2Fbuyome%2Fqa&configUrl=https%3A%2F%2Fw.widgetworks.com.au%2Fc%2Fbuyome%2Fqa&frameId=wiwo-buyome#/results/show');
    	
    	// expect(result).toEqual(null);
    	expect(result).toEqual(expect.objectContaining({
            toAbsolute: expect.any(Function),
            isAbsolute: expect.any(Function),
            isRelative: expect.any(Function),
            toUriString: expect.any(Function),
        }));
    });
    
});
// End of 'URI:'.
