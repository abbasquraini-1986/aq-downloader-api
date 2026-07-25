import { Platform } from "../platformDetector";

export interface DownloadResult {
  success: boolean;
  provider: string;

  title?: string;
  uploader?: string;
  duration?: number;
 thumbnail?: string;

  downloadUrl?: string;

  error?: string;
}

export interface Provider {

  readonly name: string;

  readonly priority: number;

  readonly supportedPlatforms: Platform[];

  supports(platform: Platform): boolean;

  download(url: string): Promise<DownloadResult>;
}