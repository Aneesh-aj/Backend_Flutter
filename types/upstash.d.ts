declare module '@upstash/redis' {
    class Redis {
      constructor(config: { url: string; token: string });
      get(key: string): Promise<any>;
      set(key: string, value: any, options?: { ex: number }): Promise<void>;
      del(key: string): Promise<void>;
      // Add more Redis methods as needed
    }
  
    export { Redis };
  }
  