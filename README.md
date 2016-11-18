# Dev-Updater
This is a utility to automatically update a repository (in my case dev server on aws), to track the master branch of a Github repo using Github's custom webhooks

## Getting Started
First, clone the repository:
```
git clone https://github.com/brollb/dev-updater
cd dev-updater
```
Create an `update.sh` bash file (in dev-updater's root) to run when the `master` branch is updated on Github!


## Details
If you want to store the `update.sh` file w/ the project to update, you can create an `.env` file in the dev-updater root referencing the project-to-update's root (optional):
```
PROCESS_ROOT=../netsblox-dev
```

This will result in dev-updater running from that directory (and searching for `update.sh` there instead of in its root).
