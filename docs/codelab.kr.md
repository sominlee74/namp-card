# 코드랩(Codelab) 가이드 문서

## 오버뷰(Overview)

이 코드랩 예제는 AMP 과 PWA의 기술들로 만들어진 아주 간단한 명함 웹앱입니다. 여러분들이 AMP 과 PWA 기술들을 집중해서 이해 할 수 있도록 간단한 구조로 구성되어 있습니다. 이 코드랩을 통해서 여러분들은 다음과 같은 것을 습득할 수 있습니다.

- AMP 의 기본 지식과 요소의 사용 방법
- PWA 의 서비스워커의 기본 지식과 기초적인 사용 예제
- PWA 의 설치형 웹앱 구현 방법
- https 를 지원하는 github 의 page 를 사용하여 자신의 앱을 배포하고 모바일 설치 방법

### 개발 환경

원할한 개발이 위해서는 Unix 호환 시스템에서 터미널을 통한 쉘 명령을 사용할 수 있는 개발환경이 되어 있어야 합니다. 대부분 윈도우즈에서 터미널/쉘 사용이 제약이 있는 경우가 있습니다. 자신의 시스템이 아래 요구사항을 모두 지원하는지 확인하세요.

- git: git/github 를 통해서 코드랩은 진행됩니다. git 으로 프로젝트를 운영하고 이 프로젝트를 각 github 사용자의 리퍼지토리로 모두 fork 후에 github 의 pages 를 통해서 배포합니다.
- Node.js: 이 코드랩 프로젝트의 디펜던시(Depdencies) 설치를 포함하여 실행, 테스트 그리고 배포작업은 모두 node 를 기반으로 동작합니다.
- yarn[옵션]: 이 프로젝트는 현재 yarn 명령을 지원합니다. 빠른 설치를 위해서 yarn 을 설치하시기를 권장합니다.
- editorconfig[옵션]: 이 프로젝트는 editorconfig 를 사용하여 문서의 들여쓰기와 트림(trim) 스타일을 관리합니다. 만약 master 에 업데이트를 원한다면 설치를 권장합니다.


## AMP

## PWA: 서비스워커(Service Worker)

## PWA: 설치형 웹앱(Installable Web App) / Web Manifest

먼저 명함에 사용될 이미지를 준비합니다. 그 이미지를 그대로 앱의 아이콘으로 활용할 것임으로 192/384 해상도가 되어도 잘 식별 할 수 있는 이미지를 고르세요. 또는 별도의 단순한 모양의 아이콘을 하셔도 됩니다. 아이콘을 준비하셨다면 이제 그 아이콘을 두가지 크기의 버전으로 준비합니다. 홈스크린과 테스크 스위처에서 사용될 192x192 사이즈와 스플래쉬 스크린에 사용될 384x384 사이즈로 준비합니다. 각각의 이름을 아래와 같이 설정하고 src/ 파일 밑에 복사합니다.

- icon-192x192.png
- icon-384x384.png

마지막으로 manifest.json 파일을 생성하고 아래 코드를 추가합니다. 아래 프로퍼티에서 `name`, `short_name`, `background_color` 그리고 `theme_color` 를 원하시는 값으로 적절히 설정하면 됩니다. 각 프로퍼티에 대한 자세한 내용은 PWA Workshop 로스쇼 자료, [Turn into an Installable Webapp](https://goo.gl/owjJ7R) 을 참고하세요 

```js
{
	"name": "namp-card",
	"short_name": "namp-card",
	"icons": [
		{
			"src": "icon-192x192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "icon-384x384.png",
			"sizes": "384x384",
			"type": "image/png"
		}
	],
	"start_url": "./?utm_source=web_app_manifest",
	"display": "standalone",
	"orientation": "portrait",
	"background_color": "#FFFFFF",
	"theme_color": "#3F51B5"
}
```
