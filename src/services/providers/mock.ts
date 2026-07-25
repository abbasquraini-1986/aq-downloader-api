import { Provider, DownloadResult } from "./provider";

export class MockProvider implements Provider {
  readonly name = "mock";

  supports(_url: string): boolean {
    return true;
  }

  async download(url: string): Promise<DownloadResult> {
    return {
      success: true,
      provider: this.name,
      title: "Mock Video",
      downloadUrl: url
    };
  }
}