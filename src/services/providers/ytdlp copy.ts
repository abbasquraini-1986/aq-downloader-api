import { Provider, DownloadResult } from "./provider";
import { CommandRunner } from "../commandRunner";
import { Platform } from "../platformDetector";

export class YtDlpProvider implements Provider {

  readonly name = "yt-dlp";
  readonly priority = 100;

  readonly supportedPlatforms = [
    Platform.YouTube,
    Platform.X,
    Platform.Instagram,
    Platform.TikTok,
    Platform.Reddit,
    Platform.Facebook,
    Platform.Vimeo
  ];

  private readonly runner = new CommandRunner();

  supports(platform: Platform): boolean {
    return this.supportedPlatforms.includes(platform);
  }

  async download(url: string): Promise<DownloadResult> {

    try {

      const output = await this.runner.run(
        "python3",
        [
          "-m",
          "yt_dlp",
          "-g",
          "--no-playlist",
          url
        ]
      );

      const info = JSON.parse(output);

      return {
        success: true,
        provider: this.name,
        title: info.title,
        uploader: info.uploader,
        duration: info.duration,
        thumbnail: info.thumbnail,
        downloadUrl: info.webpage_url
      };

    } catch (error) {

      throw new Error(
        `yt-dlp failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

    }

  }

}