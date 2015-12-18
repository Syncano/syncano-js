"use strict";

function DummyFormData() {
    this.fake = true;
    this.boundary = "------SyncanoFormBoundary" + Math.random().toString(36).substring(7);
    this._fields = [];
}

DummyFormData.prototype.append = function (key, value, filename) {
    this._fields.push([key, value, filename]);
};

DummyFormData.prototype.toString = function () {
    var boundary = this.boundary;
    var body = "";

    this._fields.forEach(function (field) {
        var key = field[0];
        var value = field[1];

        body += "--" + boundary + "\r\n";

        // file upload
        if (value instanceof File) {
            body += "Content-Disposition: form-data; name=\"" + key + "\"; filename=\"" + value.name + "\"\r\n";
            body += "Content-Type: " + value.type + "\r\n\r\n";
            body += value.getAsBinary() + "\r\n";
        } else {
            body += "Content-Disposition: form-data; name=\"" + key + "\";\r\n\r\n";
            body += value + "\r\n";
        }
    });

    body += "--" + boundary + "--";
    return body;
};

module.exports = window.FormData || DummyFormData;