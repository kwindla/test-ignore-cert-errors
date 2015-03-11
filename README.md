# test-ignore-cert-errors
standalone test for atom-shell --ignore-certificate-errors switch

## clone, then install and run like so

```
npm install
gulp webservers    # in one terminal
gulp tests         # in a second terminal
```

You'll need an `atom` atom-shell binary somewhere in your path, or you'll need to modify the `atom-bin` var at the top of gulpfile.js.

## running individual tests

cd to the app directory and run the atom-shell test app directly:

```
atom . http 8004 true 2> /dev/null
atom . https 8005 true 2> /dev/null
atom . https 8006 true 2> /dev/null
```

(You will need the `gulp webservers` task running for any of the tests to succeed.)

Each test prints out the URL it's trying to fetch. For example: `https://localhost:8006/app/test.html`. You can also, of course, grab that URL in Chrome directly, which is an easy way to look at the certificate each server is using.



