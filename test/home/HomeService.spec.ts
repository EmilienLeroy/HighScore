import { PlatformTest } from '@tsed/common';
import { HomeService } from '../../src/home';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    await PlatformTest.create({
      highscore: {
        download: {
          default: 'http://fake.url.com',
          android: 'http://playstore.url.com',
          ios: 'http://appstore.url.com',
          windows: 'http://steam.url.com',
          linux: 'http://snap.url.com',
          macos: 'http://macos.url.com',
        },
      },
    });

    service = PlatformTest.get<HomeService>(HomeService);
  });

  afterEach(PlatformTest.reset);

  describe('#getDownloadLink()', () => {
    it('should return the default link if not os is pass as param', () => {
      expect(service.getDownloadLink()).toEqual('http://fake.url.com');
    });

    it('should return the windows link', () => {
      expect(service.getDownloadLink('windows')).toEqual('http://steam.url.com');
    });

    it('should return the linux link', () => {
      expect(service.getDownloadLink('linux')).toEqual('http://snap.url.com');
    });

    it('should return the macos link', () => {
      expect(service.getDownloadLink('macos')).toEqual('http://macos.url.com');
    });

    it('should return the android link', () => {
      expect(service.getDownloadLink('android')).toEqual('http://playstore.url.com');
    });

    it('should return the iOS link', () => {
      expect(service.getDownloadLink('iOS')).toEqual('http://appstore.url.com');
    });
  });
});
