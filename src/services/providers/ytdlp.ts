import { Provider, DownloadResult, MediaFormat } from "./provider";
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

      // Metadata
      const metadataOutput = await this.runner.run(
        "python3",
        [
          "-m",
          "yt_dlp",
          "--dump-single-json",
          "--no-playlist",
          url
        ]
      );

      const info = JSON.parse(metadataOutput);

      // Direct URL
      const mediaUrl = await this.runner.run(
        "python3",
        [
          "-m",
          "yt_dlp",
          "-g",
          "--no-playlist",
          url
        ]
      );

      // Available formats
      const formats: MediaFormat[] = [];

      if (Array.isArray(info.formats)) {

        for (const format of info.formats) {

          formats.push({
            id: String(format.format_id),
            quality: format.format_note ?? format.format ?? "Unknown",
            extension: format.ext ?? "unknown",
            hasAudio: format.acodec !== "none",
            hasVideo: format.vcodec !== "none"
          });

        }

      }

      return {
        success: true,
        provider: this.name,
        title: info.title,
        uploader: info.uploader,
        duration: info.duration,
        thumbnail: info.thumbnail,
        downloadUrl: mediaUrl.trim(),
        formats
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