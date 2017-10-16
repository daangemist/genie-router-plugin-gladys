# genie-router-plugin-gladys

A genie-router brain plugin that allows the user to use [Gladys](https://github.com/GladysProject/Gladys)
as the brain to process input.

You can use [genie-router brains docker](https://github.com/matueranet/genie-brains-docker/tree/master/gladys)
for a simple method to run Gladys via Docker.

## Configuration

To enable this plugin, at an attribute called `gladys` to the `plugins` section
of the _genie-router_ `config.json`. This plugin has two required properties:

1. accessToken
2. endpoint

### accessToken

Navigate to Parameters (can be found at the bottom of the left sidebar). Then open Security, this will display the Gladys API tokens. In order to be able to use Gladys with genie-router, create an API token here, and configure it in the genie-router config.

### endpoint

The url on which Gladys listens, without a trailing /.

#### Example

```
{
  "plugins": {
    "accessToken": "xxx",
    "endpoint": "https://gladys-url.example.com"
  }
}
```
