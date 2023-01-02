import { Service } from '@tsed/di';
import { envs } from '../config/envs';

@Service()
export class HomeService {
  public getDownloadLink(os?: string) {
    const download = envs.HIGHSCORE_DOWNLOAD_URL;
    const android = envs.HIGHSCORE_ANDROID_DOWNLOAD_URL;
    const ios = envs.HIGHSCORE_IOS_DOWNLOAD_URL;
    const windows = envs.HIGHSCORE_WINDOWS_DOWNLOAD_URL;
    const linux = envs.HIGHSCORE_LINUX_DOWNLOAD_URL;
    const macos = envs.HIGHSCORE_MACOS_DOWNLOAD_URL;

    if (os === 'Android' && android) {
      return android;
    }

    if (os === 'iOS' && ios) {
      return ios;
    }

    if (os === 'Windows' && windows) {
      return windows;
    }

    if (os === 'Linux' && linux) {
      return linux;
    }

    if (os === 'Mac' && macos) {
      return macos;
    }

    return download;
  }
}
