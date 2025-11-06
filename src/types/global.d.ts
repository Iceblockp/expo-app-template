// Global type declarations for React Native environment

declare global {
  // FormData is available in React Native
  interface FormData {
    append(name: string, value: string | Blob | File, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob | File, fileName?: string): void;
    forEach(
      callbackfn: (
        value: FormDataEntryValue,
        key: string,
        parent: FormData
      ) => void,
      thisArg?: unknown
    ): void;
  }

  // File and Blob types for React Native
  interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }

  interface Blob {
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): ReadableStream<Uint8Array>;
    text(): Promise<string>;
  }

  // URLSearchParams for React Native
  interface URLSearchParams {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    getAll(name: string): string[];
    has(name: string): boolean;
    set(name: string, value: string): void;
    sort(): void;
    toString(): string;
    forEach(
      callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
      thisArg?: unknown
    ): void;
  }

  // Development flag
  const __DEV__: boolean;

  // Global fetch (available in React Native)
  function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response>;

  // FormData constructor
  const FormData: {
    new (): FormData;
    prototype: FormData;
  };

  // URLSearchParams constructor
  const URLSearchParams: {
    new (
      init?: string | string[][] | Record<string, string> | URLSearchParams
    ): URLSearchParams;
    prototype: URLSearchParams;
  };
}

export {};
