# rook

> A simple elo ranking site built using [svelte](https://github.com/sveltejs/svelte) and bootstrapped with [SvelteKit](https://github.com/sveltejs/kit).

## Deploying

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/chiptopher/rook"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

If you want to deploy your own instance, great! Right now, this project is configured to work with [Netlify](https://www.netlify.com/), and uses [fauna](https://fauna.com/) for it's database. However, if you can eaily use any of [SvelteKit's adapter](https://kit.svelte.dev/docs#adapters). Simply change [this line](https://github.com/chiptopher/rook/blob/5e64e4d3ae62fc4a39beb9d350d3cb8704c14d43/svelte.config.cjs#L15).

### Environment Variabled

Get a key from fauna, and include `DB_KEY` an an environement variable.
