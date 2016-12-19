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

[AMP](https://www.ampproject.org/ko/)는 모바일 웹에서 최상의 사용성을 제공하기 위한 구글의 새로운 프로젝트입니다.
AMP에서는 성능에 영향을 줄 수 있는 요인들을 최소화하고 Google AMP Cache를 이용해서 웹사이트의 빠른 로딩을 추구합니다.

### 왜 AMP는 빠른가?
AMP는 성능에 영향을 줄 수 있는 몇가지 요인들을 완전히 배제하는 걸 목표로 두고 있습니다.
AMP 공식 홈페이지의 (AMP가 성능을 향상시키는 방식)[https://www.ampproject.org/ko/learn/how-amp-works/]에 따르면,

- 비동기 스크립트만 허용
- 모든 리소스의 크기를 정적으로 지정
- 확장 메커니즘이 렌더링을 차단하지 않도록 함
- 타사 JavaScript 제거
- CSS의 인라인 지정 및 크기 한정
- 웹 폰트 효율화
- GPU 가속 애니메이션만 실행
- 리소스 로드 우선순위 지정
- 즉시 페이지 로드

등 단순히 AMP라서 빠르다기보단 기존 형태로 모바일 페이지를 만듦에 있어서도 지키면 페이지 로딩 속도를 보장받을 수 있는 내용을 담고 있습니다.

### 기본 AMP 페이지 작성하기

AMP 페이지 작성은 매우 단순합니다.

```html
<!doctype html>
<html amp lang="ko">
 <head>
	 <meta charset="utf-8">
	 <title>Hello, AMPs</title>
	 <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
	 <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
	 <!-- ld+json 영역은 AMP에서 필수영역은 아닙니다 -->
	 <script type="application/ld+json">
		 {
			 "@context": "http://schema.org",
			 "@type": "NewsArticle",
			 "headline": "Open-source framework for publishing content",
			 "datePublished": "2015-10-07T12:02:41Z",
			 "image": [
				 "logo.jpg"
			 ]
		 }
	 </script>
	 <!-- AMP 실행시 기본으로 필요한 CSS입니다 -->
	 <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
	 <style amp-custom> /* 내가 작성할 CSS */ </style>
	 <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>
	 <h1>Welcome to the mobile web</h1>
 </body>
</html>
```

### AMP 페이지 검증하기
AMP 페이지의 검증단계 또한 매우 단순합니다.
브라우저 경로에서 `#development=1` 이라 추가하기만 하면 됩니다.

## PWA: 서비스워커(Service Worker)

[서비스 워커](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/)는 [웹 워커](https://www.w3.org/TR/workers/)의 한 종류입니다. 웹워커는 기본적으로 메인 페이지와 병렬로 실행되는 **스크립트 백그라운드 실행기(Worker)를 생성**하는 API로 **메세지 전송 기반의 Thread와 유사한 동작**을 가능하게 하는 역할을 수행합니다.

서비스 워커는 워커의 특징을 그대로 계승하지만, 브라우저에 설치되어 지속적으로 동작하는 형태로 다음과 같이 시스템 컴포넌트와 유사한 특징을 추가로 가지고 있습니다. 페이지가 실행 중이지 않더라도 브라우저에 의해 동작하며, [원격 푸시 알림](https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/)이나 [백그라운드 동기화](https://developers.google.com/web/updates/2015/12/background-sync)와 같은 페이지 외부에 존재하는 기능들의 제어를 위한 이벤트 모델을 제공합니다.

> 본래 서비스 워커는 HTTPS 프로토콜 하에서만 동작합니다만, 개발 편의성을 위해 localhost를 통해서 테스트가 가능합니다.

### 오프라인 캐시를 위한 서비스 워커 작성

오프라인 웹앱을 지원하기 위해 `index.html`과 동일한 레벨(`src/`)에 `sw.js`라는 이름으로 서비스 워커 로직을 생성하고 다음과 같이 작성합니다.

```javascript
var CACHE_NAME = 'pwa-workshop.github.id-namp-card-cache-v1';
var urlsToCache = [
	'/namp-card'
];

self.addEventListener('install', function(event) {
	// 캐싱 도중 서비스워커가 종료되지 않도록 이벤트의 라이프 사이클을 연장합니다.
	event.waitUntil(
		// Cache Storage를 생성하고,
		caches.open(CACHE_NAME).then(function(cache) {
			console.log(`Opened cache for namp-card ${new Date()}`);
			// 기술된 모든 리소스를 미리 fetch해서 캐시에 저장해둡니다.
			return cache.addAll(urlsToCache);
		})
	);
	console.log('SW installed', event);
});

// fetch 이벤트는 URL scope에 해당하는 요청이 발생 시 이벤트로 전달됩니다.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // 현재 요청과 매치되는 캐시 데이터가 있는지 확인해서
    caches.match(event.request.url).then(function(response) {
      // 있다면 해당 캐시 데이터를 전달하고,
      return response
        // 없다면 네트워크 fetch를 통해 전달합니다.
        || fetch(event.request);
    })
  );
});
```

### 서비스 워커의 등록

서비스 워커는 `navigator.serviceWorker.register()`를 통해 등록할 수 있습니다만, AMP는 스크립트를 직접 작성하는 것을 허용하지 않습니다. 대신 [`amp-install-serviceworker`](https://www.ampproject.org/docs/reference/components/amp-install-serviceworker)를 통해 서비스 워커를 등록할 수 있습니다. 이 컴포넌트를 사용하기 위해 다음과 같이 스크립트 태그를 html 페이지에 작성합니다.

```html
<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
```

이제 서비스 워커를 등록하기 위해 다음과 같이 컴포넌트를 html 문서 내에 작성합니다.

```html
  <amp-install-serviceworker
      src="./sw.js"
      layout="nodisplay">
  </amp-install-serviceworker>
```

서비스 워커에 대해 더 알고 싶으시다면 다음 링크를 참조하세요.

* [서비스워커 101](http://www.slideshare.net/cwdoh/service-worker-101)
* [서비스워커 201](http://www.slideshare.net/cwdoh/service-worker-201)

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
