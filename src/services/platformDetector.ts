export enum Platform {
  YouTube = "youtube",
  X = "x",
  Instagram = "instagram",
  TikTok = "tiktok",
  Reddit = "reddit",
  Facebook = "facebook",
  Vimeo = "vimeo",
  Unknown = "unknown"
}

export class PlatformDetector {

  static detect(url: string): Platform {

    const u = url.toLowerCase();

    if (
      u.includes("youtube.com") ||
      u.includes("youtu.be")
    ) {
      return Platform.YouTube;
    }

    if (
      u.includes("twitter.com") ||
      u.includes("x.com")
    ) {
      return Platform.X;
    }

    if (
      u.includes("instagram.com")
    ) {
      return Platform.Instagram;
    }

    if (
      u.includes("tiktok.com")
    ) {
      return Platform.TikTok;
    }

    if (
      u.includes("reddit.com")
    ) {
      return Platform.Reddit;
    }

    if (
      u.includes("facebook.com") ||
      u.includes("fb.watch")
    ) {
      return Platform.Facebook;
    }

    if (
      u.includes("vimeo.com")
    ) {
      return Platform.Vimeo;
    }

    return Platform.Unknown;
  }
}