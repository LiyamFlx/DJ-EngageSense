interface CacheConfig {
  maxSize: number;
  ttl: number;
}

export class AudioCache {
  private cache: Map<string, { data: any; timestamp: number }>;
  private config: CacheConfig;

  constructor(config: CacheConfig = { maxSize: 100, ttl: 1800000 }) {
    this.cache = new Map();
    this.config = config;
  }

  set(key: string, data: any): void {
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.config.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  private evictOldest(): void {
    const oldest = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0];
      
    if (oldest) {
      this.cache.delete(oldest[0]);
    }
  }

  clear(): void {
    this.cache.clear();
  }
}