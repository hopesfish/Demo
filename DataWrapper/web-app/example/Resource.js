define([
    "dojo/_base/declare",
    "dojo/Stateful",
    "dojo/_base/json",
    "dojo/_base/xhr"
], function(declare, stateful) {
    var contextPath = dojoConfig.contextPath;
    var resourceModule = declare("example.Resource", [stateful], {
        create: function( /*Boolean*/ sync) {
            var instance, resourceError;
            var deferred = dojo.xhrPost({
                url: contextPath + this.constructor.URI,
                headers: { 'Content-Type': "application/json" },
                postData: dojo.toJson(this),
                sync: sync === true,
                handle: dojo.hitch(this, function(response, ioArgs) {
                    if (ioArgs.xhr.status != 201) {
                        resourceError = new Error("Failed");
                        if (sync !== true) { return resourceError; }
                    } else {
                        this.set('id', response);
                        instance = this;
                        if (sync !== true) { return this; }
                    }
                })
            });

            if (resourceError && sync) { throw resourceError; }

            return (sync) ? instance : deferred;
        },

        update: function( /*Boolean*/ sync) {
            var instance, resourceError;

            var deferred = dojo.xhrPut({
                url: contextPath + this.constructor.URI + "/" + this.get("id"),
                headers: { 'Content-Type': "application/json" },
                putData: dojo.toJson(this),
                sync: sync === true,
                handle: dojo.hitch(this, function(response, ioArgs) {
                    if (ioArgs.xhr.status === 200) {
                        instance = this;
                        if (sync !== true) { return this; }
                    } else {
                        resourceError = new Error("Failed");
                        if (sync !== true) { return resourceError; }
                    }
                })
            });

            if (resourceError && sync) { throw resourceError; }

            return (sync) ? instance : deferred;
        },

        delete: function( /*Boolean*/ sync) {
            var instance, resourceError;

            var deferred = dojo.xhrDelete({
                url: contextPath + this.constructor.URI + "/" + this.get("id"),
                headers: { 'Content-Type': "application/json" },
                sync: sync === true,
                handle: dojo.hitch(this, function(response, ioArgs) {
                    if (ioArgs.xhr.status !== 200) {
                        resourceError = new Error("Failed");
                        if (sync !== true) { return resourceError; }
                    }
                })
            });

            if (resourceError && sync) { throw resourceError; }
            return (sync) ? instance : deferred;
        }
    });

    example.Resource.URI = null;
    
    example.Resource.list = function(/*Boolean*/ sync) {
        var instances, resourceError;

        var deferred = dojo.xhrGet({
            url: contextPath + this.URI,
            headers: { 'Content-Type': "application/json" },
            sync: sync === true,
            handleAs: 'json',
            handle: dojo.hitch(this, function(response, ioArgs) {
                if (ioArgs.xhr.status != 200) {
                    resourceError = new Error("Failed");
                    if (sync !== true) { return resourceError; }
                } else {
                    instances = dojo.map(response, function(item) {
                        return this._meta.bases[0](item)
                    }, this);
                    if (sync !== true) { return instances; }
                }
            })
        });

        if (resourceError && sync) { throw resourceError; }
        return (sync) ? instances : deferred;
    }

    example.Resource.retrieve = function( /*Number*/ id, /*Boolean*/ sync) {
        var instance, resourceError;

        var deferred = dojo.xhrGet({
            url: contextPath + this.URI + '/' + id,
            headers: { 'Content-Type': "application/json" },
            sync: sync === true,
            handleAs: 'json',
            handle: dojo.hitch(this, function(response, ioArgs) {
                if (ioArgs.xhr.status != 200) {
                    resourceError = new Error("Failed");
                    if (sync !== true) { return resourceError; }
                } else {
                    instance = this._meta.bases[0](response);
                    if (sync !== true) { return instance; }
                }
            })
        });

        if (resourceError && sync) { throw resourceError; }
        return (sync) ? instance : deferred;
    }

    return resourceModule;
});