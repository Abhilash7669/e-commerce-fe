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

interface ApiRequestConfig<U = undefined, X = undefined> {
  endpoint: string;
  options?: RequestInit;
  urlParams?: U;
  data?: X;
  signal?: AbortSignal;
}

// todo: handle APIFailure and APISuccess interface
interface ApiFailure {
  error?: string;
  message?: string;
  statusCode?: number;
}

export class ApiError extends Error {
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

  private async initRequest<T, U = undefined, X = undefined>(
    apiReqConfig: ApiRequestConfig<U, X>,
  ) {
    const { endpoint, data, options } = apiReqConfig;
    const url = this.buildUrl(endpoint);

    const requestOptions = await this.buildRequestOptions(options!, data as X);

    try {
      const response = await fetch(url, {
        ...requestOptions,
      });

      const parsedResponse: Awaited<T> = await this.parseResponse<T>(response);

      if (!response.ok) {
        // type cast parsedResponse as ApiFailure
        const err = parsedResponse as ApiFailure;
        throw new ApiError(
          err.message || "Something went wrong",
          err.statusCode! || 500,
        );
      }
      return parsedResponse as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError(error.message, error.status);
      }
    }
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

  private buildUrlParams(urlParams: Record<string, unknown>) {
    let query = "";
    const params = new URLSearchParams();
    Object.entries(urlParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else {
        params.append(key, String(value));
      }
    });
    query = params.toString();
    return query;
  }

  public async get<T, U = undefined>(
    apiReqConfig: Omit<ApiRequestConfig<U>, "data">,
  ) {
    const { endpoint, options, urlParams } = apiReqConfig;

    let query = "";

    if (urlParams) {
      query = this.buildUrlParams(urlParams);
    }

    return await this.initRequest<T>({
      endpoint: `${endpoint}${query ? `?${query}` : ""}`,
      options: {
        method: "GET",
        ...options,
      },
    });
  }

  public async post<T>(apiReqConfig: ApiRequestConfig) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T>({
      endpoint,
      options,
      data,
    });
  }

  public async patch<T, U>(
    apiReqConfig: Omit<ApiRequestConfig<undefined, U>, "urlParams">,
  ) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T, undefined, U>({
      endpoint,
      options,
      data,
    });
  }

  public async put<T, U>(
    apiReqConfig: Omit<ApiRequestConfig<undefined, U>, "urlParams">,
  ) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T, undefined, U>({
      endpoint,
      options: {
        ...options,
        method: "PUT",
      },
      data,
    });
  }

  public async delete<T>(apiReqConfig: ApiRequestConfig) {
    const { endpoint, options, data } = apiReqConfig;
    return await this.initRequest<T>({
      endpoint,
      options,
      data,
    });
  }
}

export const api = new ApiClass({ baseUrl: "http://localhost:5000" }, {});
