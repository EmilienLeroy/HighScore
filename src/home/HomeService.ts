import { Constant, Service } from '@tsed/di';

@Service()
export class HomeService {
  @Constant('highscore.download', '')
  private download: Record<string, string>;

  private get platform(): Record<string, string> {
    return {
      default: 'default',
      android: 'android',
      windows: 'windows',
      linux: 'linux',
      macos: 'macos',
      ios: 'ios',
      ipad: 'ios',
      ipod: 'ios',
      iphone: 'ios',
      'apple mac': 'macos',
      'microsoft windows': 'windows',
    };
  }

  public getDownloadLink(os?: string) {
    const platform = this.platform[os?.toLocaleLowerCase() || 'default'];
    return this.download[platform] || this.download.default;
  }
}
