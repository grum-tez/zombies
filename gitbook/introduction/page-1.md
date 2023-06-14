---
description: Completium-cli installation and usage
---

# Completium

Completium is a set of tools to support smart contract development with the [Archetype language](https://archetype-lang.org/). We installed completium in the previous section, but it must be initialised.

{% hint style="info" %}
Running `npx completium-cli` will run the locally installed completium client interface package. For convenience, the command can be aliased with:

```bash
alias ccli="npx completium-cli"
```

Then, subsequent calls to `ccli` are shorthands for `npx completium-cli`
{% endhint %}

```bash
ccli init
```

This will create the local configuration and default accounts.&#x20;

## Sandbox
A sandbox is a local simulated blockchain for testing and development purposes. &#x20;

With Docker running, you can start a blockchain sandbox using the command:

```bash
ccli start sandbox
```

This will start a `oxheadalpha/flextesa` container with a single node and bootstrapped accounts. If the startup fails, make sure that you have the latest container locally available with:

```bash
docker pull oxheadalpha/flextesa:latest
```

## Useful commands

Start/stop the sandbox container (a new blockchain will be created at each restart)

```bash
ccli start sandbox
ccli stop sandbox
```

Switch environments (sandbox, ghostnet...)

```bash
ccli switch endpoint
```

Switch account (used for next call):

```bash
ccli switch account
```

Other commands will explained throughout the tutorial as needed. You can always refresh your memory of the commands with:
```bash
completium-cli help
```
