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

    it("should generate markdown from comments", function (done) {
      let expected = [
          "Title"
        , "====="
        , ""
        , "Write description about this markdown"
        , ""
      ].join("\n");

      gulp.src(fixture("first.js"))
        .pipe(comment2md())
        .pipe(streamAssert.length(1))
        .pipe(streamAssert.first((file) => {
          assert(file.contents.toString() === expected);
          assert(path.basename(file.path) === "first.md");
        }))
        .pipe(streamAssert.end(done));
    });
  });
});
