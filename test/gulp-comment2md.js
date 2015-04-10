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
      ].join("\n"),
      "second.js": [
          "# First Block"
        , ""
        , "- one"
        , "- two"
        , "- three"
        , ""
        , "# Second Block"
        , ""
        , "- one"
        , "- two"
        , "- three"
      ].join("\n")
    };

    expected.third = expected["first.js"];

    it("should generate markdown from comment", function (done) {
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

    describe("when file has multiple comment blocks", function () {

      it("should generage markdown from comments", function (done) {
        let filename = "second.js";

        gulp.src(fixture(filename))
          .pipe(comment2md())
          .pipe(streamAssert.length(1))
          .pipe(streamAssert.second((file) => {
            assert(file.contents.toString() === expected[filename]);
            assert(path.basename(file.path) === "second.md");
          }))
          .pipe(streamAssert.end(done));
      });

    });

    describe("when file has no extention", function () {

      it("should add default extention to markdown file", function (done) {
        let filename = "third";

        gulp.src(fixture(filename))
          .pipe(comment2md())
          .pipe(streamAssert.length(1))
          .pipe(streamAssert.second((file) => {
            assert(file.contents.toString() === expected[filename]);
            assert(path.basename(file.path) === filename + ".md");
          }))
          .pipe(streamAssert.end(done));
      });
    });


  });
});
