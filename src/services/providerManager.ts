import { Provider, DownloadResult } from "./providers/provider";
import { YtDlpProvider } from "./providers/ytdlp";
import { CobaltProvider } from "./providers/cobalt";
import { PlatformDetector, Platform } from "./platformDetector";

export class ProviderManager {

  private readonly providers: Provider[];

  constructor() {

    this.providers = [
      new YtDlpProvider(),
      new CobaltProvider()
    ];

    // Highest priority provider first
    this.providers.sort((a, b) => b.priority - a.priority);

  }

  async download(url: string): Promise<DownloadResult> {

    const platform: Platform = PlatformDetector.detect(url);

    console.log(`Detected platform: ${platform}`);

    for (const provider of this.providers) {

      if (!provider.supports(platform)) {
        continue;
      }

      try {

        console.log(`Trying provider: ${provider.name}`);

        const result = await provider.download(url);

        if (result.success) {

          console.log(`✔ Provider ${provider.name} succeeded`);

          return result;
        }

        console.log(`✘ Provider ${provider.name} returned unsuccessful result`);

      } catch (error) {

        console.error(`✘ Provider ${provider.name} failed`, error);

      }

    }

    return {
      success: false,
      provider: "none",
      error: `No provider available for platform '${platform}'.`
    };

  }

}