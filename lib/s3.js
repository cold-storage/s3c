#!/usr/bin/env node

'use strict';

// Provides access to data in S3. Pull data down, push data up.

const s3sdk = new(require('aws-sdk')).S3();

class S3 {
  constructor(opts) {
    this.opts = opts;
  }
  get(remotePath, cb) {
    s3sdk.getObject({
        Bucket: this.opts.bucket,
        Key: this.cleanRemotePath(remotePath),
      },
      function(err, data) {
        if (err) return cb(err);
        cb(null, data.Body.toString());
      });
  }
  delete(remotePath, cb) {
    s3sdk.deleteObject({
        Bucket: this.opts.bucket,
        Key: this.cleanRemotePath(remotePath),
      },
      cb
    );
  }
  put(text, remotePath, cb) {
    s3sdk.putObject({
        Bucket: this.opts.bucket,
        Key: this.cleanRemotePath(remotePath),
        Body: text,
        ContentType: 'text/plain'
      },
      cb
    );
  }
  // Remote path must NOT start with /. So we make sure it doesn't and we
  // also trim it.
  cleanRemotePath(remotePath) {
    remotePath = remotePath.trim();
    if (remotePath.startsWith('/')) {
      remotePath = remotePath.substr(1);
    }
    return remotePath;
  }
}

exports = module.exports = S3;

if (require.main === module) {
  const s3 = new S3({
    bucket: 'share-candoris-com'
  });
  s3.put('hi there!', '/foo/hi-there.txt', function(err, results) {
    console.log(results);
    s3.get('/foo/hi-there.txt', function(err, text) {
      console.log(text);
    });
  });
}