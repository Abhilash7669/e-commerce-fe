interface ApiConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
}

interface AuthConfig {
  tokenProvider?: () => Promise<string | null> | string | null;
  tokenHeader?: string;
  tokenPrefix?: string;
}

interface ApiRequestConfig<T = undefined> {
  endpoint: string;
  options?: RequestInit;
  data?: T | unknown;
  signal?: AbortSignal;
}

class ApiError extends Error {
  name: string;

  constructor(
    message: string,
    public status: number,
    public response?: Response,
  ) {
    super(message);
    this.name = "Api Error";
  }
}

class ApiClass {
  private apiConfig: Required<ApiConfig>;
  private authConfig: AuthConfig;
  constructor(apiConfig: ApiConfig, authConfig: AuthConfig) {
    this.apiConfig = {
      baseUrl: apiConfig.baseUrl,
      defaultHeaders: {
        "Content-Type": "application/json",
        ...apiConfig.defaultHeaders,
      },
      timeout: apiConfig.timeout || 5000,
    };
    this.authConfig = {
      tokenHeader: "Authorization",
      tokenPrefix: "Bearer",
      ...authConfig,
    };
  }

  async initRequest<T, U = undefined>(apiReqConfig: ApiRequestConfig<U>) {
    const { endpoint, data, options } = apiReqConfig;
    const url = this.buildUrl(endpoint);

    const requestOptions = await this.buildRequestOptions(options!, data);

    const response = await fetch(url, {
      ...requestOptions,
    });

    if (!response.ok) {
      throw new ApiError("Something went wrong", 500);
    }

    const parsedResponse = await this.parseResponse<T>(response);

    return parsedResponse as T;
  }

  private buildUrl(endpoint: string) {
    if (endpoint.startsWith("http")) return endpoint;
    return `${this.apiConfig.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  }

  private async buildRequestOptions(options: RequestInit, data?: unknown) {
    const headers = { ...this.apiConfig.defaultHeaders };

    if (this.authConfig.tokenProvider) {
      const token = await this.authConfig.tokenProvider();

      if (token) {
        headers[this.authConfig.tokenHeader!] =
          `${this.authConfig.tokenPrefix} ${token}`;
      }
    }

    let body: BodyInit | undefined;

    if (data instanceof FormData) {
      delete headers["Content-Type"];
      body = data;
    } else {
      body = JSON.stringify(data);
    }

    return {
      ...options,
      body,
      headers: {
        ...headers,
        ...options.headers,
      },
    };
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      try {
        return (await response.json()) as T;
      } catch {
        throw new ApiError("Error parsing response", 500);
      }
    }

    return (await response.text()) as unknown as T;
  }

  async get<T>(apiReqConfig: Omit<ApiRequestConfig, "data">) {
    const { endpoint, options } = apiReqConfig;
    return await this.initRequest<T>({
      endpoint,
      options: {
        method: "GET",
        ...options,
      },
    });
  }

  async post<T>(apiReqConfig: ApiRequestConfig) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T>({
      endpoint,
      options,
      data,
    });
  }

  async patch<T, U>(apiReqConfig: ApiRequestConfig) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T, U>({
      endpoint,
      options,
      data,
    });
  }

  async put<T, U>(apiReqConfig: ApiRequestConfig) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T, U>({
      endpoint,
      options,
      data,
    });
  }

  async delete<T>(apiReqConfig: ApiRequestConfig) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T>({
      endpoint,
      options,
      data,
    });
  }
}

export const api = new ApiClass({ baseUrl: "http://localhost:5000" }, {});
