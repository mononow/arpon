# @arpon/cli

> A CLI to help developing Arpon Applications

## Requirements

- [Node.js](http://nodejs.org/) >= 8.11.3
- POSTools

  > You must have the `.postools` installed and in your shell's `$PATH`

## Recommended

- ssh `config` (`$HOME/.ssh/config`) file with a `POS` host

  ```text
    Host POS
      HostName 127.0.0.1
      Port 51000
      User MAINAPP
      IdentityFile ~/.ssh/id_rsa_pax
  ```

## Commands

- `mononow app <command>`

  - `mononow app start`
    Starts the development server at `localhost:8080`.

  - `mononow app build`
    Builds the app for the POS.

- `mononow pos <command>`
  - `mononow pos ssh-init [--tty Pos0]` - Initializes the POS SSH server
  - `mononow pos start` - Starts the Arpon System
  - `mononow pos stop` - Kills the Arpon System
  - `mononow pos restart` - Restarts the Arpon System
