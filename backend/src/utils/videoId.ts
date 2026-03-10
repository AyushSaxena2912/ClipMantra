export function extractVideoId(url: string) {

 const match = url.match(
  /(?:youtube\.com.*v=|youtu\.be\/)([^&\n?#]+)/
 );

 return match ? match[1] : null;
}
