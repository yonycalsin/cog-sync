import * as express from 'express';
import { Server } from 'http';
import { SERVER_PORT } from 'src/utils/constants';
import { URL } from 'url';

class GithubOAuthClient {
   public app: express.Express;
   public server: Server;

   constructor() {
      this.app = express();

      this.app.use(express.json(), express.urlencoded({ extended: false }));
   }

   public async SignIn() {
      this.server = this.app.listen(SERVER_PORT, () => {
         console.log(`Server started in http://localhost:${SERVER_PORT}`);
      });

      const oauthHost = new URL('https://github.com/login/oauth/authorize');

      oauthHost.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID);
      oauthHost.searchParams.append(
         'redirect_uri',
         'http://localhost:4445/github/oauth/callback',
      );

      this.app.get('/', (req, res) => {
         res.send(`
         <a target="_blank" href="${oauthHost.href}"> Sign In with Github</a>
         `);
      });

      this.app.get('/github/oauth/callback', (req, res) => {
         console.log(req.param('code'));

         console.log(req.originalUrl);

         res.send('Success !');
      });
   }
}

export default GithubOAuthClient;
