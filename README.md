# BrandBastion code challenge

## Description

Used Vite+Typescript+React to create the code challenge repository

UI Framework: ShadCDN-UI

- Preview page: https://brandbastion-cc.vercel.app/
- Kanban Board (with estimations and times): https://github.com/users/german-bortoli/projects/3

## Installation

Clone this repository and then run the following command in your terminal to configure and install all of the dependencies

Copy and configure the environment variable

```bash
cp .env.example .env
```

Install deps

```bash
yarn install
```

## Usage

```bash
yarn dev
```

## Testing

Regarding testing I had to use `.jsx` for now because I was having an issue with tanstack router, it was throwing some errors on build because some typesafe.

Unit tests runs automatically by a GitHub action, but if you want to run them manually you can use the command below:

```bash
yarn test
```

