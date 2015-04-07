"use strict";

import path from "path";
import assert from "power-assert";
import streamAssert from "stream-assert";
import comment2md from "../lib/gulp-comment2md";
import gulp from "gulp";

function fixture(filename) {
  return path.join(__dirname, "fixtures", filename);
}

describe("gulp-comment2md", function () {
  describe("comment2md()", function () {
    before(function () {
    });

    let expected = {
      "first.js": [
                      "Title"
                    , "====="
                    , ""
                    , "Write description about this markdown"
                    , ""
                  ].join("\n")
    };

    it("should generate markdown from comments", function (done) {
      let filename = "first.js";

      gulp.src(fixture(filename))
        .pipe(comment2md())
        .pipe(streamAssert.length(1))
        .pipe(streamAssert.first((file) => {
          assert(file.contents.toString() === expected[filename]);
          assert(path.basename(file.path) === "first.md");
        }))
        .pipe(streamAssert.end(done));
    });

    describe("option", function () {

      describe("when String", function () {

        it("should rename output file to the string", function (done) {
          let filename = "first.js";
          let newName = "new-name.md";

          gulp.src(fixture(filename))
            .pipe(comment2md(newName))
            .pipe(streamAssert.length(1))
            .pipe(streamAssert.first((file) => {
              assert(file.contents.toString() === expected[filename]);
              assert(path.basename(file.path) === newName);
            }))
            .pipe(streamAssert.end(done));
        });

      });

      describe("when Function", function () {

        it("should rename output file to return value of the function", function (done) {
          let filename = "first.js";
          let newName = "return-value-of-function.md";
          let renameFn = function () {
            return newName;
          };

          gulp.src(fixture(filename))
            .pipe(comment2md(renameFn))
            .pipe(streamAssert.length(1))
            .pipe(streamAssert.first((file) => {
              assert(file.contents.toString() === expected[filename]);
              assert(path.basename(file.path) === newName);
            }))
            .pipe(streamAssert.end(done));
        });

      });

    });
  });
});
