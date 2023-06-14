# Architecture

The TZombies dApp has two main components:&#x20;

* Two on-chain contracts: one that manages the NFT properties, minting, ownership, transfer rules, and another that implements a simple marketplace
* The front-end: a webapp where users can interact with the on-chain contracts

It is important to note that in decentralised applications, the core of the application is the logic and data of the on chain contracts. These contracts must be seen as the ultimate source of truth for the dApp. All other components (front-end, indexers) are peripheral services. As the developer of our application, we provide these as services to enable or enhance the user experience, but we must consider that other parties could build a front end to access our smart contracts, and we cannot assume these parties are trustworthy. &#x20;

This tutorial will not cover building an indexing service for this dApp. Parts that would benefit from external indexing will be pointed out during the tutorial.&#x20;

## Contracts

Our dApp will use three contracts
- A multi-asset contract, following the FA2 standard, for tracking ownership of brainz and zombies NFTs
- A marketplace contract, to enable the buying and selling of NFTs
- A permits contract

### The FA2 Standard

The FA2 (Financial Asset v2), also known as the [multi-asset standard (tzip-12)](https://tzip.tezosagora.org/proposal/tzip-12/) is a token standard on the Tezos blockchain. It supports three types of token assets:

* Fungible tokens (FT) - Used as currency tokens. Each token id has a finite supply.
* Non-fungible tokens - The quintessential NFT. Each token id exists as a single instance.
* Multi-asset - A mix of the above. Also known as "Semi-fungible" tokens, or "Fungible NFT", because they are actually fungible. Usually the difference is in the usage, as they are more commonly used as collectibles, where the supply is limited (now, define _limited_) and have media attached to it.&#x20;

Seen differently: the multi-asset is the general case, NFT is a multi-asset where each token id has a supply of 1, and FT is a multi-asset where there is only one token id per contract (0).

We will employ the multi-asset standard in the tZombies dApp. Mastering the multi-asset token will enable all other use-cases.

As the FA2 is a standard that defines a common interface, there exist a default implementation in all the smart contract languages available on Tezos. We will start with the default archetype implementation and augment it to suit our needs

The default FA2 contract comes with a `permits` contract which provides an important utility - it allows owners to grant permission to marketplaces to handle the sale of their tokens. We will deploy this default contract as-is.