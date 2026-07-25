export interface DownloadResult {
  success: boolean;
  provider: string;
  title?: string;
  downloadUrl?: string;
  error?: string;
}

export interface Provider {
  /**
   * Friendly provider name
   * Example: "yt-dlp"
   */
  readonly name: string;

  /**
   * Can this provider handle this URL?
   */
  supports(url: string): boolean;

  /**
   * Download the media
   */
  download(url: string): Promise<DownloadResult>;
}