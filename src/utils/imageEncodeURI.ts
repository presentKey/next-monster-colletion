/**
 * @desc next 14.2.3 버전으로 업그레이드 후,
 * 일부 이미지 파일 이름이 한글+띄어쓰기 조합인 경우 (ex. 호브 헥터.png)
 * @example
 * The requested resource isn't a valid image for /images/monsters/호브  헥터.png received text/html; charset=utf-8
 * 위 오류 메시지가 발생하면서 이미지를 불러오지 못함. (메시지만 뜨고 이미지를 받아오는 경우도 있음)
 * @desc 파일 이름을 인코딩하여 위 오류를 해결
 */
export default function imageEncodeURI(filename: string) {
  return encodeURI(filename);
}
