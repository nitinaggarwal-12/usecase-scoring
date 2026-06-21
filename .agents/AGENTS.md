# Custom Rules for Antigravity

## Sync Mandate
- Always keep the local Mac repository, the Cloudtop environment (`nitinagga.c.googlers.com`), and the remote GitHub repository in perfect synchronization.
- When any file is created, modified, or deleted locally on the Mac or remotely on the Cloudtop, ensure the changes are mirrored to the other environment.
- When committing changes, make sure they are pushed to the GitHub repository so that all three environments (Mac, Cloudtop, Git) remain aligned.
- Never commit secrets, credentials, or keys (e.g. `gcp-key.json`, `.env` files). Always verify `.gitignore` before syncing or committing.
