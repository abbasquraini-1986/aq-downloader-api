import axios from "axios";
import { Provider, DownloadResult } from "./provider";
import { Platform } from "../platformDetector";

export class CobaltProvider implements Provider {

  readonly name = "cobalt";
  readonly priority = 90;

  readonly supportedPlatforms = [
    Platform.YouTube,
    Platform.X,
    Platform.Reddit,
    Platform.TikTok,
    Platform.Instagram,
    Platform.Facebook,
    Platform.Vimeo
  ];

  supports(platform: Platform): boolean {
    return this.supportedPlatforms.includes(platform);
  }

async download(

  url: string,

  _format?: string

): Promise<DownloadResult> {

    const endpoint = process.env.COBALT_API_URL;

    if (!endpoint) {
      throw new Error("COBALT_API_URL is not configured.");
    }

    try {

      const response = await axios.post(
        endpoint,
        { url },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          timeout: 30000
        }
      );

      if (response.data.status !== "tunnel") {
        throw new Error(
          response.data?.error?.code ??
          "Unknown Cobalt error"
        );
      }

      return {
        success: true,
        provider: this.name,
        title: response.data.filename,
        downloadUrl: response.data.url
      };

    } catch (error) {

      if (axios.isAxiosError(error)) {

        throw new Error(
          `Cobalt request failed: ${
            error.response?.data?.error?.code ??
            error.message
          }`
        );

      }

      throw error;

    }

  }

}