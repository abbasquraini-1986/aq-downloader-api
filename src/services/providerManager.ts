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

async download(
  url: string,
  format?: string
): Promise<DownloadResult> {

  const platform = PlatformDetector.detect(url);

  console.log("================================");
  console.log("Detected platform:", platform);
  console.log("================================");

  for (const provider of this.providers) {

    console.log("Provider:", provider.name);
    console.log("Supported platforms:", provider.supportedPlatforms);
    console.log("Supports detected platform?", provider.supports(platform));

    if (!provider.supports(platform)) {
      continue;
    }

    try {

      const result = await provider.download(url, format);

      if (result.success) {
        return result;
      }

    } catch (err) {
      console.error(err);
    }
  }

  return {
    success: false,
    provider: "none",
    error: `No provider available for platform '${platform}'.`
  };
} 
}