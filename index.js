/*
 * @Description: 去水印（抖音）
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-23 16:35:11
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-24 15:10:58
 */

const request = require('request');

class WM {
  url = 'https://v.douyin.com/NPrpRCm/'; // 替换成你需要解析的分享链接

  async run() {
    const apiUrl = await this.getApiUrl(this.url);
    const videoUrl = await this.getVideoUrl(apiUrl);
    return videoUrl;
  }
  /**
   * @description: 获取api地址
   * @param {string} url
   * @return {*}
   */
  getApiUrl(url) {
    //前端传过来的地址 进行重定向拿到 item_ids 并且返回
    return new Promise((resolve) => {
      request(url, (error, response) => {
        if (!error && response?.statusCode == 200) {
          const href = response?.request?.href;
          const id = href.match(/(?<=video\/).+(?=\?)/)?.[0];
          resolve(
            `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`
          );
        } else {
          resolve('');
        }
      });
    });
  }

  /**
   * @description: 获得不带水印的video链接
   * @param {string} url
   * @return {*}
   */
  getVideoUrl(url) {
    return new Promise((resolve) => {
      request(url, (error, response) => {
        if (!error && response.statusCode == 200) {
          let body = response.request.req.res.body;
          if (typeof body === 'string') {
            body = JSON.parse(body);
            const item = body?.item_list?.[0];
            if (item?.video?.play_addr) {
              // 带水印的video url: https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fg10000c6cg3mbc77u1rq0630jg&ratio=720p&line=0
              url = item.video.play_addr.url_list[0];
              // 替换成不带水印url: https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fg10000c6cg3mbc77u1rq0630jg&ratio=720p&line=0
              url = url.replace('playwm', 'play');
              resolve(url);
            }
          }
        } else {
          resolve(url);
        }
      });
    });
  }
}

new WM().run().then(url => {

  console.info('-----------------------------------------------------');
  console.info('');
  console.info(
    '无水印链接: ', url
  );
  console.info(` -  复制链接，通过手机浏览器打开`);
  console.info(` -  下载到本地`);
  console.info('');
  console.info('-----------------------------------------------------');
});