import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { envs } from '../../src/config/envs';
import { HomeService } from '../../src/home';

describe('HomeService', () => {
  let service: HomeService;

  beforeAll(async () => {
    await PlatformTest.create();
    await TestMongooseContext.create();

    service = PlatformTest.get<HomeService>(HomeService);
    envs.HIGHSCORE_DOWNLOAD_URL = undefined;
    envs.HIGHSCORE_WINDOWS_DOWNLOAD_URL = undefined;
    envs.HIGHSCORE_LINUX_DOWNLOAD_URL = undefined;
    envs.HIGHSCORE_MACOS_DOWNLOAD_URL = undefined;
    envs.HIGHSCORE_ANDROID_DOWNLOAD_URL = undefined;
    envs.HIGHSCORE_IOS_DOWNLOAD_URL = undefined;
  });

  describe('#getDownloadLink()', () => {
    it('should return nothing if no env variable is configured', () => {
      expect(service.getDownloadLink()).toBeUndefined();
    });

    it('should return the default link if not os is pass as param', () => {
      envs.HIGHSCORE_DOWNLOAD_URL = 'http://fake.url.com';
      expect(service.getDownloadLink()).toEqual('http://fake.url.com');
    });

    it('should return the default link if the os is not configured', () => {
      envs.HIGHSCORE_DOWNLOAD_URL = 'http://fake.url.com';
      expect(service.getDownloadLink('Android')).toEqual('http://fake.url.com');
    });

    it('should return the windows link', () => {
      envs.HIGHSCORE_WINDOWS_DOWNLOAD_URL = 'http://steam.url.com';
      expect(service.getDownloadLink('Windows')).toEqual('http://steam.url.com');
    });

    it('should return the linux link', () => {
      envs.HIGHSCORE_LINUX_DOWNLOAD_URL = 'http://snap.url.com';
      expect(service.getDownloadLink('Linux')).toEqual('http://snap.url.com');
    });

    it('should return the macos link', () => {
      envs.HIGHSCORE_MACOS_DOWNLOAD_URL = 'http://macos.url.com';
      expect(service.getDownloadLink('Mac')).toEqual('http://macos.url.com');
    });

    it('should return the android link', () => {
      envs.HIGHSCORE_ANDROID_DOWNLOAD_URL = 'http://playstore.url.com';
      expect(service.getDownloadLink('Android')).toEqual('http://playstore.url.com');
    });

    it('should return the iOS link', () => {
      envs.HIGHSCORE_IOS_DOWNLOAD_URL = 'http://appstore.url.com';
      expect(service.getDownloadLink('iOS')).toEqual('http://appstore.url.com');
    });
  });
});
