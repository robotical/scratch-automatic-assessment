prepare will run both BEFORE the package is packed and published, and on local npm install. Perfect for running building the code
in package.json: "prepare" : "npm run build"

prepublishOnly will run BEFORE prepare and ONLY on npm publish. Here we will run our test and lint to make sure we don’t publish bad code:
in package.json: "prepublishOnly" : "npm test && npm run lint"

preversion will run before bumping a new package version. To be extra sure that we’re not bumping a version with bad code, why not run lint here as well? 😃
in package.json: "preversion" : "npm run lint"

version will run after a new version has been bumped. If your package has a git repository, like in our case, a commit and a new version-tag will be made every time you bump a new version. This command will run BEFORE the commit is made. One idea is to run the formatter here and so no ugly code will pass into the new version:
in package.json: "version" : "npm run format && git add -A src"

postversion will run after the commit has been made. A perfect place for pushing the commit as well as the tag.
in package.json: "postversion" : "git push && git push --tags"


npm publish