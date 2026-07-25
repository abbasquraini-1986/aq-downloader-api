import { Provider, DownloadResult } from "./providers/provider";
import { MockProvider } from "./providers/mock";

export class ProviderManager {
  private readonly providers: Provider[];

  constructor() {
    this.providers = [
      new MockProvider()
    ];
  }

  async download(url: string): Promise<DownloadResult> {
    for (const provider of this.providers) {
      if (!provider.supports(url)) {
        continue;
      }

      try {
        return await provider.download(url);
      } catch (error) {
        console.error(`${provider.name} failed`, error);
      }
    }

    return {
      success: false,
      provider: "none",
      error: "No provider available."
    };
  }
}