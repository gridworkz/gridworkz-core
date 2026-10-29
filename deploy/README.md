# Deploying gridworkz.com

Every push to `main` that touches `website/` or `docs/` builds the site and copies it to the web server via GitHub Actions (`.github/workflows/deploy-website.yml`). You can also run it by hand from the repo's **Actions** tab ("Deploy website" → "Run workflow").

## One-time server setup (Ubuntu)

Run these on the server as the `ubuntu` user.

**1. Install nginx and certbot**

```bash
sudo apt-get update && sudo apt-get install -y nginx certbot python3-certbot-nginx rsync
```

**2. Create the web folder, owned by the deploy user**

```bash
sudo mkdir -p /var/www/gridworkz.com && sudo chown ubuntu:ubuntu /var/www/gridworkz.com
```

**3. Add the nginx site** (copy `deploy/nginx-gridworkz.com.conf` from this repo to the server first)

```bash
sudo cp nginx-gridworkz.com.conf /etc/nginx/sites-available/gridworkz.com
sudo ln -sf /etc/nginx/sites-available/gridworkz.com /etc/nginx/sites-enabled/gridworkz.com
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

**4. Create a deploy key** used only by GitHub Actions

```bash
ssh-keygen -t ed25519 -N "" -C "github-actions-deploy" -f ~/.ssh/gridworkz_deploy
cat ~/.ssh/gridworkz_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/gridworkz_deploy   # private key: goes into the DEPLOY_SSH_KEY secret
```

**5. Point DNS at the server:** `A` records for `gridworkz.com` and `www.gridworkz.com` → the server's IP.

**6. Turn on HTTPS** (after DNS has updated)

```bash
sudo certbot --nginx -d gridworkz.com -d www.gridworkz.com
```

## GitHub secrets

In the repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|---|---|
| `DEPLOY_HOST` | Server IP address |
| `DEPLOY_USER` | `ubuntu` |
| `DEPLOY_SSH_KEY` | Contents of `~/.ssh/gridworkz_deploy` (the private key) |
| `DEPLOY_KNOWN_HOSTS` | Output of `ssh-keyscan <server-ip>`, run from your own computer |

Once the secrets are set, run the workflow from the Actions tab to do the first deploy.
