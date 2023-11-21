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

- `manydots app <command>`

  - `manydots app start`
    Starts the development server at `localhost:8080`.

  - `manydots app build`
    Builds the app for the POS.

- `manydots pos <command>`
  - `manydots pos ssh-init [--tty Pos0]` - Initializes the POS SSH server
  - `manydots pos start` - Starts the Arpon System
  - `manydots pos stop` - Kills the Arpon System
  - `manydots pos restart` - Restarts the Arpon System
