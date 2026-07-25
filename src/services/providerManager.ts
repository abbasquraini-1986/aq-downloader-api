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

  let matchedProvider = false;
  const failures: string[] = [];

  for (const provider of this.providers) {

    console.log("Checking provider:", provider.name);

    if (!provider.supports(platform)) {
      console.log("❌ Doesn't support");
      continue;
    }

    matchedProvider = true;

    console.log("✅ Supports platform");

    try {

      const result = await provider.download(url, format);

      console.log(`SUCCESS: ${provider.name}`);

      return result;

    } catch (error) {

      const message =
        error instanceof Error
          ? error.message
          : String(error);

      console.error(`${provider.name} FAILED`);
      console.error(message);

      failures.push(`${provider.name}: ${message}`);

    }

  }

  if (!matchedProvider) {

    return {
      success: false,
      provider: "none",
      error: `No provider supports '${platform}'.`
    };

  }

  return {
    success: false,
    provider: "none",
    error: failures.join("\n")
  };

}
}