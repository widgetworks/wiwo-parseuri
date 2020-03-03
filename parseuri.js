// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// http://blog.stevenlevithan.com/archives/parseuri
//
// Upgraded by Anatoly Lapshin (https://github.com/holywarez/parseuri)
function contains(list, obj) {
    var i = list.length;
    while (i--) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}
function extend(dest, src) {
    // Non-recursive copy from src to dest.
    for (var i in src) {
        if (src.hasOwnProperty(i)) {
            dest[i] = src[i];
        }
    }
    return dest;
}
export var URI = {
    options: {
        strictMode: true,
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    },
    parse: function (str, strictMode) {
        if (typeof strictMode === 'undefined') {
            strictMode = URI.options.strictMode;
        }
        var o = URI.options;
        var m = o.parser[strictMode ? "strict" : "loose"].exec(str);
        var uri = {};
        var i = 14;
        while (i--)
            uri[o.key[i]] = m[i] || "";
        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1)
                uri[o.q.name][$1] = $2;
        });
        return extend(uri, extensionPack);
    },
};
var extensionPack = {
    toAbsolute: function (pattern) {
        if (pattern.isRelative())
            return;
        this.host = pattern.host;
        this.port = pattern.port;
        this.protocol = pattern.protocol;
        this.user = pattern.user;
        this.password = pattern.password;
        return this.toUriString();
    },
    isAbsolute: function () {
        return !this.isRelative();
    },
    isRelative: function () {
        return !this.host;
    },
    /**
     * Set the protocol for this instance if it
     * hasn't already been set.
     *
     * For protocol-relative URIs ('//example.com') this
     * will set the protocol from the given `uri` parameter.
     *
     * @param  {Uri} uri - An absolute Uri object that has a `protocol` value.
     * @return {Uri} Returns this instance for chaining
     */
    normalizeProtocol: function (uri) {
        if (uri.isAbsolute()) {
            this.protocol = this.protocol || uri.protocol;
        }
        return this;
    },
    /**
     * Return the origin of this URI or
     * null if it is a relative URI.
     *
     * This should match the style of `window.location.origin`
     * as closely as possible and return:
     *
     *     'protocol://host:port'
     *
     * If protocol or port are not set then they will be excluded:
     *
     *     '//host'
     *     '//host:80'
     *     'https://host'
     *
     * NOTE: We don't handle `user` or `password` properties.
     *
     * @return {[type]} [description]
     */
    origin: function () {
        // Start with `host`.
        var origin = '//' + this.host;
        if (this.protocol) {
            // Add `protocol`.
            origin = this.protocol + ':' + origin;
        }
        if (this.port) {
            // Add `port`.
            origin = origin + ':' + this.port;
        }
        return origin;
    },
    toString: function (except) {
        return this.toUriString(except);
    },
    toUriString: function (except) {
        var except = except || [];
        var result = "";
        var original = "";
        if (this.protocol) {
            if (!contains(except, 'protocol'))
                result += this.protocol + "://";
            original += this.protocol + "://";
            if (this.user) {
                if (!contains(except, 'userInfo'))
                    result += this.user;
                original += this.user;
                if (this.password) {
                    if (!contains(except, 'userInfo'))
                        result += ":" + this.password;
                    original += ":" + this.password;
                }
                if (!contains(except, 'userInfo'))
                    result += "@";
                original += "@";
            }
            if (this.host) {
                if (!contains(except, 'host'))
                    result += this.host;
                original += this.host;
            }
            if (this.port) {
                if (!contains(except, 'port'))
                    result += ":" + this.port;
                original += ":" + this.port;
            }
        }
        if (this.path) {
            if (!contains(except, 'path'))
                result += this.path;
            original += this.path;
        }
        if (this.queryKey) {
            var queryString = "";
            var first = true;
            for (var key in this.queryKey) {
                if (!this.queryKey.hasOwnProperty(key))
                    continue;
                if (!first)
                    queryString += "&";
                queryString += key + "=" + this.queryKey[key];
                first = false;
            }
            if (queryString.length > 0) {
                if (!contains(except, 'queryKey'))
                    result += "?" + queryString;
                original += "?" + queryString;
            }
        }
        if (this.anchor) {
            if (!contains(except, 'anchor'))
                result += "#" + this.anchor;
            original += "#" + this.anchor;
        }
        extend(this, URI.parse(original));
        return result;
    }
};
export default URI;
//# sourceMappingURL=parseuri.js.map