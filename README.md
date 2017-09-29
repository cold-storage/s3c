# s3c(r3ts)

Node command line application for managing secrets files in S3.

s3c will prompt you for a password to encrypt/decrypt your file. The password
will be stored in the macOS Keychain so you don't have to enter it every time.
The password is stored per S3 bucket + S3 file path.

Obviously only use this on your own trusted, secure computer. It's only as safe
as your Keychain.

## Installation

```
npm install -g s3c
```

## ~/.aws/credentials

```
[default]
aws_access_key_id = ***
aws_secret_access_key = ***
```

## S3C_BUCKET Environment Variable

```
export S3C_BUCKET=some-s3-bucket
```

## Encrypt file and push to S3

```
s3cput ../some-file.json some/s3/path
```

## Get file from S3 and decrypt

```
s3cget some/s3/path/some-file.json ~/local/path
```

## Delete remote file and password

This deletes the file in S3 and the password from your Keychain.

```
s3crm some/s3/path/some-file.json
```
