import { Fitch, HttpResponse, JsonObject } from "@fiizy/fitch";

export class FitchCredentialsWrapper {
  private token: string = '';
  private apiService: Fitch;
  private redirectCallback: { (): void };

  constructor(apiEndpoint: string, redirectCallback: { (): void }) {
    const authHeader = (request: JsonObject): JsonObject => { return this.authHeader(request)};
    this.apiService = new Fitch({
      baseURL: apiEndpoint,
      transformRequest: [authHeader],
      transformResponse: [],
      headers: { 'accept-encoding': 'gzip' }
    });
    this.redirectCallback = redirectCallback;
  }

  private authHeader(request: JsonObject): JsonObject {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${this.token}`,
    };
    return request;
  }

  public async get<T>(path: string, token: string): Promise<T> {
    this.token = token;
    return new Promise<T>((resolve, reject) => {
      this.apiService.get<T>(path).then((data: T) => {
        resolve(data);
      }, (response: HttpResponse<T>) => {
        if (response.status === 403) {
          this.redirectCallback();
        }
        reject(response);
      });
    });
  }

  public async delete<T>(path: string, token: string) {
    return new Promise<T>((resolve, reject) => {
      this.apiService.delete<T>(path).then((data: T) => {
        resolve(data);
      }, (response: HttpResponse<T>) => {
        if (response.status === 403) {
          this.redirectCallback();
        }
        reject(response);
      });
    });
  }

  public async post<T>(path: string, body: any, token: string) {
    return new Promise<T>((resolve, reject) => {
      this.apiService.post<T>(path, body).then((data: T) => {
        resolve(data);
      }, (response: HttpResponse<T>) => {
        if (response.status === 403) {
          this.redirectCallback();
        }
        reject(response);
      });
    });
  }

  public async put<T>(path: string, body: any, token: string) {
    return new Promise<T>((resolve, reject) => {
      this.apiService.put<T>(path, body).then((data: T) => {
        resolve(data);
      }, (response: HttpResponse<T>) => {
        if (response.status === 403) {
          this.redirectCallback();
        }
        reject(response);
      });
    });
  }

  public async patch<T>(path: string, body: any, token): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.apiService.patch<T>(path, body).then((data: T) => {
        resolve(data);
      }, (response: HttpResponse<T>) => {
        if (response.status === 403) {
          this.redirectCallback();
        }
        reject(response);
      });
    });
  }
};

export default FitchCredentialsWrapper;