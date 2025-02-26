![Screenshot from 2025-02-26 21-58-15](https://github.com/user-attachments/assets/8f74a925-e247-4bca-8c52-f6c80e394428)Nex Mint
========

**Nex Mint** is a Solana program built with [Anchor](https://www.anchor-lang.com/) that demonstrates how to create and mint tokens using the SPL Token program. This project shows how to:

-   Initialize a new token mint (with metadata)
-   Create associated token accounts
-   Mint tokens to a destination account

It also includes a complete test suite written in TypeScript using Anchor's testing framework.

<img src="https://github.com/user-attachments/assets/2f87874a-d38c-45fc-92fd-2f8b1cf6d230" width="500">


Features
--------

-   **Token Initialization:** Create a new SPL token mint with metadata.
-   **Minting:** Mint new tokens to an associated token account.
-   **Anchor Framework:** Simplified development, testing, and deployment of Solana programs.
-   **Comprehensive Testing:** Automated tests ensure that the minting process works as expected.

Prerequisites
-------------

Before you begin, make sure you have the following installed:

-   [Rust](https://www.rust-lang.org/tools/install)
-   [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
-   [Anchor CLI](https://www.anchor-lang.com/docs/installation)
-   [Node.js](https://nodejs.org/)
-   [Yarn](https://yarnpkg.com/)

Getting Started
---------------

Clone the repository:

```
git clone https://github.com/anubhav-auth/nex-mint.git
cd nex-mint

```

Install dependencies:

```
yarn install

```

Building the Program
--------------------

To build the program, run:

```
anchor build

```

This command compiles the Rust program located in the `programs/nex-mint` directory.

Running Tests
-------------

Run the test suite with:

```
anchor test

```

You should see output indicating a successful test run (e.g., "mints tokens successfully"). Note that you might see some Node.js warnings (e.g., regarding experimental features or module type); these can generally be ignored or resolved by updating your `package.json` as described below.


<img src="https://github.com/user-attachments/assets/30ec328d-2735-4e61-abf3-e72593460245" width="500">

Deploying the Program
---------------------

To deploy your program on a local validator, run:

```
anchor deploy

```

For deployment on Devnet or Mainnet, update your `Anchor.toml` with the appropriate provider endpoint and configuration.

Project Structure
-----------------

-   **programs/nex-mint/**\
    Contains the Rust source code for your Solana program built with Anchor.

-   **tests/**\
    Contains TypeScript tests for the program. These tests mint tokens and verify account balances.

-   **Anchor.toml**\
    Anchor configuration file, which includes settings for your provider, wallet, and program ID.

-   **package.json**\
    Contains your Node.js dependencies and scripts (e.g., for running tests).

Troubleshooting
---------------

-   **Module Type Warning:**\
    If you see a warning like "Module type of ... is not specified", add `"type": "module"` to your `package.json`:

    ```
    {
      "name": "nex-mint",
      "version": "1.0.0",
      "type": "module",
      ...
    }

    ```

-   **Experimental Warnings:**\
    Node.js may warn about experimental features (e.g., type stripping). These warnings are generally safe to ignore during development.

Contributing
------------

Contributions are welcome! If you have suggestions or bug fixes, please open an issue or submit a pull request.

License
-------

This project is licensed under the [MIT License](https://github.com/anubhav-auth/nex-mint/blob/main/LICENSE.txt).

Acknowledgements
----------------

-   [Anchor Framework](https://www.anchor-lang.com/)
-   [Solana](https://solana.com/)
-   [SPL Token Program](https://spl.solana.com/token)

* * * * *
