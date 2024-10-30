declare module "js-cookie" {
  interface CookieAttributes {
    expires?:  Date | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    [property: string]: object | undefined;
  }

  interface CookiesStatic {
    get(name: string): string | undefined;
    getJSON(name: string): object | undefined;
    set(name: string, value: string | object, options?: CookieAttributes): void;
    remove(name: string, options?: CookieAttributes): void;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
