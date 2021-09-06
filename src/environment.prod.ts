export class environment {
    constructor() {
        this.apiEndpoint = window["env"]["apiEndpoint"] || "default";
    }
  production: boolean = true;
  apiEndpoint: string = '';
  authenticationEnabled: boolean = true;
};

