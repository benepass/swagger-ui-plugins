Swagger UI 'Hierarchical Tags' Plugin
==================================================================

This plugin produces a layout with endpoints grouped into a hierarhical list based on tags with
(optional) special delimiter characters to denote hierarchy. Delimiter characters are `|` and `:`.

> :warning: **This plugin has not yet been officially adopted by the upstream project. It is safe
> and stable, but it cannot (yet) be installed in the way other "standard" swagger-ui plugins can
> be. See instructions below.**


## Usage

Because this plugin has not yet been incorporated into the standard library, you'll have to obtain
it from my personal github repo. To do so, you should create a package-local `.npmrc` file, if not
already created, and add the following to it:

```
@kael-shipman:registry=https://npm.pkg.github.com/kael-shipman
```

Next, if you have not already set up your system to use npm packages from github, you'll have to set
up github authentication for npm:

1. Create a github personal access token for your account ([tutorial](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)).
   I believe the only scope you'll need for your token is `read:packages` (which is _underneath_
   `write:packages` - you don't have to check them both).
2. Add `//npm.pkg.github.com/:_authToken=YOUR-TOKEN` to your user-specific `.npmrc` file. (The one
   at `~/.npmrc`, NOT the one in your package repo. If that file doesn't exist, then create it.)
   Make sure to put the value of your token in instead of the string `YOUR-TOKEN`.


Once you've done that, you should be able to install it as normal like so:

```
npm install --save @kael-shipman/swagger-ui-plugin-hierarchical-tags
```

Finally, require it in your client-side application and apply it to your swagger instance:

```js
const HierarchicalTagsPlugin = require('@kael-shipman/swagger-ui-plugin-hierarchical-tags');

SwaggerUI({
  // your options here...
  plugins: [
    HierarchicalTagsPlugin
  ]
})
```

## Hierarchical Tags Plugin Options

There are no additional options for this plugin. If the plugin is included on initialization, then
it is enabled and will split tags on any colon (`:`) or pipe (`|`) character.


## Direct linking using unpkg and `<script>` tags

You can also quickly and easily direct-link the file using unpkg.com. Below is a full working
html document that you can use as a starting point:

```html
<!doctype html>
<html>
  <head>
    <!-- Load Swagger UI -->
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script> 

    <!-- Load the HierarchicalTags Plugin -->
    <script src="https://unpkg.com/swagger-ui-plugin-hierarchical-tags"></script>

    <!-- Load styles -->
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />

    <script>
      window.onload = function() {
        SwaggerUIBundle({
          url: "https://unpkg.com/swagger-ui-plugin-hierarchical-tags/example/pet-store.json",
          dom_id: "#swagger",
          plugins: [
            HierarchicalTagsPlugin
          ]
        })
      }
    </script>
  </head>
  <body>
    <div id="swagger"></div>
  </body>
</html> 
```

