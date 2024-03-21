/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AssignRoleRequestDto {
  email?: string | null;
  role?: string | null;
}

export interface Client {
  /** @format int32 */
  id?: number;
  firstname?: string | null;
  lastname?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  companyName?: string | null;
  users?: User[] | null;
  timeTrackings?: TimeTracking[] | null;
}

export interface LoginRequestDto {
  username?: string | null;
  password?: string | null;
}

export interface RefreshTokenDto {
  refreshToken?: string | null;
  jwtToken?: string | null;
}

export interface RegistrationRequestDto {
  email?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  password?: string | null;
  role?: string | null;
}

export interface Survey {
  id?: string | null;
  /** @format int32 */
  webId?: number;
  listId?: string | null;
  listName?: string | null;
  title?: string | null;
  url?: string | null;
  status?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  /** @format int32 */
  totalResponses?: number;
}

export interface SurveyReporting {
  surveys?: Survey[] | null;
  /** @format int32 */
  totalItems?: number;
}

export interface TimeTracking {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  title?: string | null;
  description?: string | null;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  clientId?: number;
  user?: User;
  client?: Client;
}

export interface TimeTrackingDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  title?: string | null;
  description?: string | null;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  clientId?: number;
}

export interface User {
  /** @format int32 */
  id?: number;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  clients?: Client[] | null;
  timeTrackings?: TimeTracking[] | null;
}

export interface WebhookRegistration {
  /** @format int32 */
  id?: number;
  url?: string | null;
  contentType?: string | null;
  secret?: string | null;
  eventType?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title WebMVCApp
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name Signup
     * @request POST:/api/Auth/Signup
     */
    signup: (data: RegistrationRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Auth/Signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @request POST:/api/Auth/Login
     */
    login: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Auth/Login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AssignRole
     * @request POST:/api/Auth/AssignRole
     */
    assignRole: (data: AssignRoleRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Auth/AssignRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name RefreshToken
     * @request POST:/api/Auth/RefreshToken
     */
    refreshToken: (data: RefreshTokenDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Auth/RefreshToken`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client
     * @name GetAllClients
     * @request GET:/api/Client
     */
    getAllClients: (params: RequestParams = {}) =>
      this.request<Client[], any>({
        path: `/api/Client`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client
     * @name ClientAddMultipleCreate
     * @request POST:/api/Client/AddMultiple
     */
    clientAddMultipleCreate: (data: Client[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Client/AddMultiple`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client
     * @name ClientAddSingleCreate
     * @request POST:/api/Client/AddSingle
     */
    clientAddSingleCreate: (data: Client, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Client/AddSingle`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Survey
     * @name SurveyList
     * @request GET:/api/Survey
     */
    surveyList: (params: RequestParams = {}) =>
      this.request<SurveyReporting, any>({
        path: `/api/Survey`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TimeTracking
     * @name GetTimeTrackingsById
     * @request GET:/api/TimeTracking/{id}
     */
    getTimeTrackingsById: (id: number, params: RequestParams = {}) =>
      this.request<TimeTrackingDto[], any>({
        path: `/api/TimeTracking/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TimeTracking
     * @name UpdateTimeTracking
     * @request PUT:/api/TimeTracking/{id}
     */
    updateTimeTracking: (id: number, data: TimeTrackingDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/TimeTracking/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TimeTracking
     * @name DeleteTimeTracking
     * @request DELETE:/api/TimeTracking/{id}
     */
    deleteTimeTracking: (id: number, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/TimeTracking/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TimeTracking
     * @name GetAllTimeTrackings
     * @request GET:/api/TimeTracking
     */
    getAllTimeTrackings: (params: RequestParams = {}) =>
      this.request<TimeTrackingDto[], any>({
        path: `/api/TimeTracking`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TimeTracking
     * @name AddTimeTracking
     * @request POST:/api/TimeTracking
     */
    addTimeTracking: (data: TimeTrackingDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/TimeTracking`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetUserById
     * @request GET:/api/User/{id}
     */
    getUserById: (id: number, params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/User/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetAllUsers
     * @request GET:/api/User
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/User`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name AddUser
     * @request POST:/api/User
     */
    addUser: (data: User, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/User`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetTimeTrackingsByUserId
     * @request GET:/api/User/{id}/timetrackings
     */
    getTimeTrackingsByUserId: (id: number, params: RequestParams = {}) =>
      this.request<TimeTracking[], any>({
        path: `/api/User/${id}/timetrackings`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetClientsByUserId
     * @request GET:/api/User/{id}/clients
     */
    getClientsByUserId: (id: number, params: RequestParams = {}) =>
      this.request<Client[], any>({
        path: `/api/User/${id}/clients`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhook
     * @name RegisterWebhook
     * @request POST:/api/Webhook
     */
    registerWebhook: (data: WebhookRegistration, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Webhook`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhook
     * @name Ping
     * @request GET:/api/Webhook
     */
    ping: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Webhook`,
        method: "GET",
        ...params,
      }),
  };
}
