## Monster Collection v2.0

개발 기간: 2023.06.08 ~ 2023.08.09  
개발 인원: 1인  
배포 주소: https://www.moncol.kr/

## 프로젝트 소개

온라인 게임 '메이플스토리'의 컨텐츠인 '몬스터 컬렉션' 이용자들에게 몬스터 등록 정보 및 편의 기능을 제공하는 사이트입니다.

- 몬스터 등록 정보 제공
- 정보 북마크 기능
- 몬스터 리젠 타이머 기능
- 엘리트 몬스터 등록 관리 기능

HTML, CSS, JavaScript로 만들어진 [Monster Collection v1.0](https://github.com/presentKey/monster-collection) 프로젝트를 새로운 기술 스택을 이용하여 v2.0 프로젝트를 만들었습니다.

## Stacks

### Frontend

<img src="https://img.shields.io/badge/React 18-6CDBFD"/> <img src="https://img.shields.io/badge/Next.js 13-20232A"/> <img src="https://img.shields.io/badge/TypeScript-3278C7"/> <img src="https://img.shields.io/badge/Recoil-3C7CE6"/>

### Backend

<img src="https://img.shields.io/badge/SANITY-F04436"/>

### Tools

<img src="https://img.shields.io/badge/Visual Studio Code-297ACC"/> <img src="https://img.shields.io/badge/git-E84E31"/> <img src="https://img.shields.io/badge/GitHub-20232A"/>

## 주요 기능

### ▶ 로그인

NextAuth 라이브러리를 이용하여 로그인 기능 구현

- 로그인
  - 구글 로그인
  - 비회원 로그인
- 로그인 시, 사용자가 보고있던 이전 페이지로 이동

|                                                                로그인                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------: |
| <img width="600px" src="https://github.com/presentKey/next-monster-colletion/assets/115006670/211ac578-843f-4796-a7bf-01d5a2277bda"> |

---

### ▶ 몬스터 검색

- 검색어와 일치하는 몬스터 목록 생성
- 몬스터를 검색하여 해당 페이지의 위치로 이동
- 위, 아래 키보드를 이용하여 검색 목록 이동

|                                                             몬스터 검색                                                              |
| :----------------------------------------------------------------------------------------------------------------------------------: |
| <img width="600px" src="https://github.com/presentKey/next-monster-colletion/assets/115006670/054573c2-a859-40a0-9125-22cf27836280"> |

---

### ▶ 북마크

- 북마크 버튼 클릭 시, 북마크를 등록/해제 할 수 있습니다.
- 북마크 정보는 bookmark 페이지에서 확인할 수 있습니다.

|                                                                북마크                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------: |
| <img width="600px" src="https://github.com/presentKey/next-monster-colletion/assets/115006670/05d8475f-df39-4a90-a6e8-3c554ed038bd"> |

---

### ▶ 타이머

- 몬스터 리젠 타이머 등록/삭제/시간 초기화

|                                                                타이머                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------: |
| <img width="600px" src="https://github.com/presentKey/next-monster-colletion/assets/115006670/51c98fa9-e114-48c9-beb1-32a3149e43d6"> |

---

### ▶ 엘리트 몬스터 등록 관리

- 엘리트 몬스터 카드를 클릭하여 사용자의 등록 여부 설정
- 드래그 앤 드랍으로 카드 위치 변경 (React-DnD 라이브러리 이용)
- 등록 여부 및 위치 변경 발생 시, 저장 버튼 활성화

|                                                       엘리트 몬스터 등록 관리                                                        |
| :----------------------------------------------------------------------------------------------------------------------------------: |
| <img width="600px" src="https://github.com/presentKey/next-monster-colletion/assets/115006670/d92d2b01-1ea7-41dc-9742-26aaa9bd36a3"> |

---

### ▶ 다크 모드/라이트 모드

- 화면 테마 설정

|                                                            화면 테마 설정                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------: |
| <img width="600px" src="https://github.com/presentKey/next-monster-colletion/assets/115006670/f8c9db9c-ab6a-413d-a15a-b827b1cdb8b3"> |

---

### ▶ 반응형 모바일 화면

|                                                     메인 페이지                                                      |                                                   카테고리 페이지                                                    |                                                    북마크 페이지                                                     |
| :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/presentKey/next-monster-colletion/assets/115006670/e6888bf8-b560-42e1-9dcc-9d482520941a) | ![image](https://github.com/presentKey/next-monster-colletion/assets/115006670/ff1b5a48-26a6-469c-a018-7b461d585186) | ![image](https://github.com/presentKey/next-monster-colletion/assets/115006670/bedf3e5d-fe47-4f50-a1b4-fa3c89377ef5) |

|                                                     엘몬 페이지                                                      |                                                        검색창                                                        |                                                       타이머창                                                       |                                                      카테고리창                                                      |
| :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/presentKey/next-monster-colletion/assets/115006670/a9e02795-1c16-4dbb-bfa8-f1daa46699af) | ![image](https://github.com/presentKey/next-monster-colletion/assets/115006670/1c7e6d13-cf1d-44c8-ab35-89749debbfc3) | ![image](https://github.com/presentKey/next-monster-colletion/assets/115006670/19a5781c-5fb9-4857-bfcf-d5033b68f134) | ![image](https://github.com/presentKey/next-monster-colletion/assets/115006670/1eaf434e-6932-4fd1-9c3b-3459d3e5454b) |
