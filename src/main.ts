// organize-imports-ignore
import './init';
import GithubOAuthClient from './clients/github-oauth.client';

const githubOauth = new GithubOAuthClient();

githubOauth.SignIn();
