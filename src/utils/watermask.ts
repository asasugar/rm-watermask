/*
 * @Description: 去水印（抖音）
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-23 16:35:11
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-23 17:06:05
 */

// import path from 'path';
// import fs from 'fs';
import request from 'request';

class WM {
  url = 'https://v.douyin.com/NPrpRCm/';

  async run(): Promise<string> {
    const apiUrl: string = await this.getApiUrl(this.url);
    const videoUrl: string = await this.getVideoUrl(apiUrl);
    return videoUrl;
  }
  /**
   * @description: 获取api地址
   * @param {string} url
   * @return {*}
   */
  getApiUrl(url: string): Promise<string> {
    //前端传过来的地址 进行重定向拿到 item_ids 并且返回
    return new Promise((resolve) => {
      request(url, (error: any, response: any) => {
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
  getVideoUrl(url: string): Promise<string> {
    return new Promise((resolve) => {
      request(url, (error: any, response: any) => {
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
  downloadVideo() {}
}

export default new WM();
/** * 下载视频 */
// function getVideoUrl(url: string): string {
//   request(url, (error: any, response: any) => {
//     if (!error && response.statusCode == 200) {
//       let body = response.request.req.res.body;
//       if (typeof body === 'string') {
//         body = JSON.parse(body);
//         const item = body?.item_list?.[0];
//         if (item?.video?.play_addr) {
//           // 带水印的video url: https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fg10000c6cg3mbc77u1rq0630jg&ratio=720p&line=0
//           url = item.video.play_addr.url_list[0];
//           // 替换成不带水印url: https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fg10000c6cg3mbc77u1rq0630jg&ratio=720p&line=0
//           url = url.replace('playwm', 'play');
//           var dirPath = path.join(__dirname, 'file');
//           if (!fs.existsSync(dirPath)) {
//             fs.mkdirSync(dirPath);
//             console.log('文件夹创建成功');
//           } else {
//             console.log('文件夹已存在');
//           }
//           var fileName = `${+new Date()}.mp4`;

//           const stream = fs.createWriteStream(path.join(dirPath, fileName));

//           console.log('开始下载视频：', fileName);
//           request(url)
//             .pipe(stream)
//             .on('error', function(err: any) {
//               console.log(err);
//             })
//             .on('finish', () => {
//               console.log('视频下载成功');
//             });
//         }
//       }
//     }
//   });
// }
//获取api地址
