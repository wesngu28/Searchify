// import { parse } from 'node-html-parser'
// import fetch from 'node-fetch'
// import express from 'express'

// const app = express();

// app.get('/youtubeurls/:stringified', async (req, res) => {
//     const t0 = performance.now();
//     const jsons = JSON.parse(req.params.stringified);
//     const tracks = Object.values(jsons);
//     console.log(tracks)
//     const artists = Object.keys(jsons);
//     console.log(artists)
//     const urls = [];
//     for (let i = 0; i < tracks.length; i++) {
//       const response = await fetch(
//         `https://www.youtube.com/results?search_query=${tracks[i]} - ${artists[i]}`);
//       const text = await response.text();
//       const html = parse(text);
//       const scriptList = html.querySelectorAll("script");
//       let json = ''
//       for (const script of scriptList) {
//         if (script.text.includes("ytInitialData")) {
//           const removedVar = script.text.replace("var ytInitialData = ", "");
//           const removeSemiColons = removedVar.replace(/;/g, "");
//           json = JSON.parse(removeSemiColons);
//           break;
//         }
//       }
//       const videoLocation =
//         json["contents"]["twoColumnSearchResultsRenderer"]["primaryContents"][
//           "sectionListRenderer"
//         ]["contents"]
//       let id = '';
//       for (const item of videoLocation) {
//         if (item.itemSectionRenderer) {
//             for (const news of item.itemSectionRenderer.contents) {
//                 if(news.videoRenderer) {
//                     id = news.videoRenderer.videoId
//                 }
//             }
//         }
//       }
//       urls.push('https://www.youtube.com/watch?v=' + id)
//     }
//     const t1 = performance.now();
//     console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
//     return urls;
// })

// app.use(express.static('public'));
// const PORT = process.env.PORT || 8000;
// app.listen(PORT);
// console.log('listening')