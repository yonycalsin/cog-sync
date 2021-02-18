export const REPOSITORY_DEFAULT_NAME = 'cog-sync-cloud';

export const SERVER_PORT = 4445;

export const githubStack = {
   oauthUrl: 'https://github.com/login/oauth/authorize',
   oauthCallback: `http://localhost:${SERVER_PORT}/github/oauth/callback`,
};
