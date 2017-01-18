const path = require("path")
const {each, kebabCase} = require("lodash")
const CSON = require("cson-parser")
const promisify = require("promisify-node")

const fs = promisify("fs")

function sublimeTemplate(...values) {
  return `<snippet>
    <content><![CDATA[
${values[0]}
]]></content>
    <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
    <tabTrigger>${values[1]}</tabTrigger>
    <!-- Optional: Set a scope to limit where the snippet will trigger -->
    <scope>${values[2]}</scope>
</snippet>
`
}

if (!process.argv[2] || !process.argv[3]) {
  return console.log(`
    Usage: node index.js location-of-snippets-file.cson group-name
  `)
}

fs.readFile(process.argv[2])
  .then(data => data.toString())
  .then(string => CSON.parse(string))
  // .then(parsed => console.log(parsed))
  .then(convertAtomToSublime)
  .catch(console.error)

function convertAtomToSublime(parsedCson) {
  each(parsedCson, (fileType, fileSuffix) => {
    // console.log("fileSuffix", fileSuffix)
    each(fileType, (snippet, snippetName) => {
      // console.log("snippetName", snippet.prefix)
      const newTemplate = sublimeTemplate(parseVariables(snippet.body), snippet.prefix, fileSuffix.slice(1))
      const fileName = path.resolve("out/", process.argv[3] + "-" + kebabCase(snippetName) + ".sublime-snippet")
      // console.log("fileName", fileName)
      fs.writeFile(fileName, newTemplate, err => console.error(err))
    })
  })
}

function parseVariables(string) {
  return string.replace(/\$(\d)/g, "${$1}")
}