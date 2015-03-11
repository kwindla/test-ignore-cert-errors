
module.exports = {
  entry: "./app/dummy.js",
  output: {
    path: __dirname + "/app",
    filename: "no-such-file",
  },
  externals: {
    "ipc" : "commonjs ipc"
  },
}

