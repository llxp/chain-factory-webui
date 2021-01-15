import { Fitch, JsonObject } from "@fiizy/fitch";

export class FitchCredentialsWrapper {
  private token: string = '';
  private static token2: string = '';
  private apiService: Fitch;

  constructor(apiEndpoint: string) {
    const authHeader = (request: JsonObject): JsonObject => { return this.authHeader(request)};
    this.apiService = new Fitch({
      baseURL: apiEndpoint,
      transformRequest: [authHeader],
      headers: { 'accept-encoding': 'gzip' }
    });
  }

  private authHeader(request: JsonObject): JsonObject {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${this.token}`,
    };
    return request;
  }

  public get<T>(path: string, token: string) {
    console.log('performing get request');
    FitchCredentialsWrapper.token2 = token;
    this.token = token;
    console.log(FitchCredentialsWrapper.token2);
    return this.apiService.get<T>(path);
  }

  public delete<T>(path: string, token: string) {
    FitchCredentialsWrapper.token2 = token;
    return this.apiService.delete<T>(path);
  }

  public post<T>(path: string, body: any, token: string) {
    FitchCredentialsWrapper.token2 = token;
    return this.apiService.post<T>(path, body);
  }

  public put<T>(path: string, body: any, token: string) {
    FitchCredentialsWrapper.token2 = token;
    return this.apiService.put<T>(path, body);
  }

  public patch<T>(path: string, body: any, token): Promise<T> {
    FitchCredentialsWrapper.token2 = token;
    return this.apiService.patch<T>(path, body);
  }
};
