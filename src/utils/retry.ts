interface RetryConfig {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 1000, backoff = true } = config;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      if (attempts === maxAttempts) throw error;

      const waitTime = backoff ? delay * Math.pow(2, attempts - 1) : delay;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw new Error('Max retry attempts reached');
}