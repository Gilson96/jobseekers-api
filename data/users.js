"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var fs = require("fs");
var path = require("path");
var filePath = path.join("../assets", "Rob_Thompson_CV_v2.pdf");
console.log('filePath');
exports.users = [
    {
        name: "",
        email: "",
        password: "user123",
        number: "",
        address: "",
        cv: "",
        role: "user"
    },
    {
        name: "User",
        email: "user@user.com",
        password: "user123",
        number: "+44 7480 223 615",
        address: "Chorlton, Manchester M21 8AZ, UK",
        cv: fs.readFileSync(filePath),
        role: "user"
    },
];
