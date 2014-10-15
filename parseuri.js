// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
//
// Upgraded by Anatoly Lapshin (https://github.com/holywarez/parseuri)

(function() {

    function contains(list, obj) {
        var i = list.length;
        while (i--) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    };

    var URI = window.URI = {};

    var extensionPack = {

        toAbsolute: function(pattern) {
            if (pattern.isRelative()) return;

            this.host = pattern.host;
            this.port = pattern.port;
            this.protocol = pattern.protocol;
            this.user = pattern.user;
            this.password = pattern.password;
            return this.toString();
        },

        isAbsolute: function() {
            return !this.isRelative();
        },

        isRelative: function() {
            return !this.host;
        },

        toString: function(except) {
            var except = except || [];
            var result = "";
            var original = "";
            if (this.protocol) {
                if (!contains(except, 'protocol')) result += this.protocol + "://";
                original += this.protocol + "://";
                if (this.user) {
                    if (!contains(except, 'userInfo')) result += this.user;
                    original += this.user;
                    if (this.password) {
                        if (!contains(except, 'userInfo')) result += ":" + this.password;
                        original += ":" + this.password;
                    }

                    if (!contains(except, 'userInfo')) result += "@";
                    original += "@";
                }

                if (this.host) {
                    if (!contains(except, 'host')) result += this.host;
                    original += this.host;
                }

                if (this.port) {
                    if (!contains(except, 'port'))  result += ":" + this.port;
                    original += ":" + this.port;
                }
            }

            if (this.path) {
                if (!contains(except, 'path')) result += this.path;
                original += this.path;
            }

            if (this.queryKey) {
                var queryString = "";
                var first = true;
                for (var key in this.queryKey) {
                    if (!this.queryKey.hasOwnProperty(key)) continue;

                    if (!first) queryString += "&";
                    queryString += key + "=" + this.queryKey[key];
                    first = false;
                }

                if (queryString.length > 0) {
                    if (!contains(except, 'queryKey')) result += "?" + queryString;
                    original += "?" + queryString;
                }
            }

            if (this.anchor) {
                if (!contains(except, 'anchor')) result += "#" + this.anchor;
                original += "#" + this.anchor;
            }

            jQuery.extend(this, URI.parse(original));

            return result;
        }
    };


    URI.parse = function (str) {
        var o = URI.options,
                m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i = 14;

        while (i--) uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) uri[o.q.name][$1] = $2;
        });

        return jQuery.extend(uri, extensionPack);
    };


    URI.options = {
        strictMode: false,
        key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:   {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };
})();