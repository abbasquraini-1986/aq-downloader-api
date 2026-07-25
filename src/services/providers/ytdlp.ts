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

  async download(
    url: string,
    format?: string
  ): Promise<DownloadResult> {

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

      // Build command for direct URL
      const command = [
        "-m",
        "yt_dlp"
      ];

      if (format) {
        command.push("-f", format);
      }

      command.push(
        "-g",
        "--no-playlist",
        url
      );

      const mediaUrl = await this.runner.run(
        "python3",
        command
      );

      // Build formats list
      const formats: MediaFormat[] = [];

      if (Array.isArray(info.formats)) {

        for (const item of info.formats) {

          // Ignore storyboards
          if (
            item.format_id?.startsWith("sb")
          ) {
            continue;
          }

          formats.push({
            id: String(item.format_id),
            quality: item.format_note ?? item.format ?? "Unknown",
            extension: item.ext ?? "unknown",
            hasAudio: item.acodec !== "none",
            hasVideo: item.vcodec !== "none"
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
          error instanceof Error
            ? error.message
            : String(error)
        }`
      );

    }

  }

}