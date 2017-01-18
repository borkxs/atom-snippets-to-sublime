Convert your Atom snippets into SublimeText snippets

Usage:

1. clone the repo
- copy your snippets.cson file in the directory
- specify a group name that will prefix all of the files generated
- `mkdir out`
- `node index.js name-of-snippets.cson group-name`
- copy the file from out to your sublime user folder
 - ex `~/Library/Application Support/Sublime Text 3/Packages/User`

Example:

```cson
'.source.ts':
  'Console Log':
    'prefix': 'l'
    'body': 'console.log($1)'
...
```

```xml
# out/groupname-source-ts-console-log.sublime-snippet
<snippet>
    <content><![CDATA[
console.log(${1})
]]></content>
    <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
    <tabTrigger>l</tabTrigger>
    <!-- Optional: Set a scope to limit where the snippet will trigger -->
    <scope>source.ts</scope>
</snippet>
```

ToDo:
- publish
- export string-to-string conversion function
- check for `require.main === module` to treat as CLI
