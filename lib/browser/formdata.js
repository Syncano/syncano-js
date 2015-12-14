// Based on https://gist.github.com/Rob--W/8b5adedd84c0d36aba64

'use strict';

var _send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function (data) {
    if (data instanceof DummyFormData) {
        if (!data.__endedMultipart) data.__append('--' + data.boundary + '--\r\n');
        data.__endedMultipart = true;
        this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
        data = new Uint8Array(data.data);
    }
    // Invoke original XHR.send
    return _send.call(this, data);
};

function DummyFormData() {
    // Force a Constructor
    if (!(this instanceof DummyFormData)) return new DummyFormData();
    // Generate a random boundary - This must be unique with respect to the form's contents.
    this.boundary = '------DataBoundary' + Math.random().toString(36);
    var internal_data = this.data = [];
    /**
    * Internal method.
    * @param inp String | ArrayBuffer | Uint8Array  Input
    */
    this.__append = function (inp) {
        var i = 0,
            len;
        if (typeof inp == 'string') {
            for (len = inp.length; i < len; ++i) internal_data.push(inp.charCodeAt(i) & 0xff);
        } else if (inp && inp.byteLength) {
            /*If ArrayBuffer or typed array */
            if (!('byteOffset' in inp)) /* If ArrayBuffer, wrap in view */
                inp = new Uint8Array(inp);
            for (len = inp.byteLength; i < len; ++i) internal_data.push(inp[i] & 0xff);
        }
    };
}

DummyFormData.prototype.append = function (name, value, filename) {
    if (this.__endedMultipart) {
        // Truncate the closing boundary
        this.data.length -= this.boundary.length + 6;
        this.__endedMultipart = false;
    }
    if (arguments.length < 2) {
        throw new SyntaxError('Not enough arguments');
    }
    var part = '--' + this.boundary + '\r\n' + 'Content-Disposition: form-data; name="' + name + '"';

    if (value instanceof File || value instanceof Blob) {
        return this.append(name, new Uint8Array(new FileReaderSync().readAsArrayBuffer(value)), filename || value.name);
    } else if (typeof value.byteLength == 'number') {
        // Duck-typed typed array or array buffer
        part += '; filename="' + (filename || 'blob').replace(/"/g, '%22') + '"\r\n';
        part += 'Content-Type: application/octet-stream\r\n\r\n';
        this.__append(part);
        this.__append(value);
        part = '\r\n';
    } else {
        part += '\r\n\r\n' + value + '\r\n';
    }
    this.__append(part);
};

module.exports = FormData || DummyFormData;