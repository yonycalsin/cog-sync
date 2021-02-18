import { Octokit } from '@octokit/rest';

class GithubClient {
   public USERNAME: string;
   public NAME: string;

   private INSTANCE: Octokit;
   private PERSONAL_TOKEN: string;
   private GITHUB_CONFIG: More;

   constructor() {
      this.beforeHook();

      this.initializeInstance();
   }

   private beforeHook() {
      const envPersonalToken = process.env.GITHUB_PERSONAL_TOKEN;

      if (!envPersonalToken) {
         throw new Error('Personal Token is required!');
      }

      this.PERSONAL_TOKEN = envPersonalToken;

      this.GITHUB_CONFIG = {
         baseUrl: 'https://api.github.com',
         auth: `token ${this.PERSONAL_TOKEN}`,
      };
   }

   private async initializeInstance() {
      try {
         const instance = new Octokit(this.GITHUB_CONFIG);

         this.INSTANCE = instance;

         console.log('Instance was initialized !');
      } catch (error) {
         console.error(error);
      }
   }

   public async getRepository(query: string) {
      const response = await this.INSTANCE.search.repos({
         q: query,
      });

      return response.data;
   }

   public async createDefaultRepository() {
      try {
         const data = await this.INSTANCE.request('POST /user/repos', {
            name: 'none',
            auto_init: true,
            private: true,
         });

         console.log(data);
      } catch (error) {
         console.log(error);
      }
   }
}

export default GithubClient;
