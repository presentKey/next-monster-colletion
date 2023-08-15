import { TabPanelPositionStorage } from '@/recoil/SubCategoryTab/atoms';

export default function tabByCategory(
  pathname: string,
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  if (pathname === 'job') {
    return jobPage(scrolledAmount, panelPosition);
  }
  if (pathname === 'filedboss') {
    return filedbossPage();
  }
  if (pathname === 'victoria-island') {
    return victoriaIslandPage(scrolledAmount, panelPosition);
  }
  if (pathname === 'victoria-isles') {
    return victoriaIslesPage();
  }
  if (pathname === 'edlstein') {
    return edlsteinPage();
  }
  if (pathname === 'elnath') {
    return elnathPage(scrolledAmount, panelPosition);
  }
  if (pathname === 'ludus-lake') {
    return ludusLakePage(scrolledAmount, panelPosition);
  }
  if (pathname === 'aqua-road') {
    return aquaRoadPage();
  }
  if (pathname === 'nihal-desert') {
    return nihalDesertPage(scrolledAmount, panelPosition);
  }
  if (pathname === 'mu-lung') {
    return muLungPage();
  }
  if (pathname === 'minar-forest') {
    return minarForestPage(scrolledAmount, panelPosition);
  }
  if (pathname === 'temple-of-time') {
    return templeOfTimePage(scrolledAmount, panelPosition);
  }
  if (pathname === 'grandis') {
    return grandisPage(scrolledAmount, panelPosition);
  }
  if (pathname === 'arcane-river') {
    return arcaneRiverPage();
  }
  if (pathname === 'friends') {
    return friendsPage(scrolledAmount, panelPosition);
  }
  return 0;
}

function jobPage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;
  if (scrolledAmount >= panelPosition['캐논슈터']) {
    newActiveTab = 11;
  } else if (scrolledAmount >= panelPosition['키네시스']) {
    newActiveTab = 10;
  } else if (scrolledAmount >= panelPosition['미하일']) {
    newActiveTab = 9;
  } else if (scrolledAmount >= panelPosition['데몬슬레이어']) {
    newActiveTab = 8;
  } else if (scrolledAmount >= panelPosition['제로']) {
    newActiveTab = 7;
  } else if (scrolledAmount >= panelPosition['카인']) {
    newActiveTab = 6;
  } else if (scrolledAmount >= panelPosition['라라']) {
    newActiveTab = 5;
  } else if (scrolledAmount >= panelPosition['호영']) {
    newActiveTab = 4;
  } else if (scrolledAmount >= panelPosition['카데나']) {
    newActiveTab = 3;
  } else if (scrolledAmount >= panelPosition['일리움']) {
    newActiveTab = 2;
  } else if (scrolledAmount >= panelPosition['엔젤릭버스터']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 11;
  }

  return newActiveTab;
}

function filedbossPage() {
  return 0;
}

function victoriaIslandPage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['슬리피우드']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 1;
  }

  return newActiveTab;
}
function victoriaIslesPage() {
  return 0;
}

function edlsteinPage() {
  return 0;
}

function elnathPage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['엘나스']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 1;
  }

  return newActiveTab;
}

function ludusLakePage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['루더스 호수']) {
    newActiveTab = 3;
  } else if (scrolledAmount >= panelPosition['루더스 호수 인근']) {
    newActiveTab = 2;
  } else if (scrolledAmount >= panelPosition['엘린숲']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 3;
  }

  return newActiveTab;
}

function aquaRoadPage() {
  return 0;
}

function nihalDesertPage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['마가티아']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 1;
  }

  return newActiveTab;
}

function muLungPage() {
  return 0;
}

function minarForestPage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['용의 숲']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 1;
  }

  return newActiveTab;
}

function templeOfTimePage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['시간의 신전']) {
    newActiveTab = 2;
  } else if (scrolledAmount >= panelPosition['미래의 문']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 2;
  }

  return newActiveTab;
}

function grandisPage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['툴렌시티']) {
    newActiveTab = 8;
  } else if (scrolledAmount >= panelPosition['나린']) {
    newActiveTab = 7;
  } else if (scrolledAmount >= panelPosition['청운']) {
    newActiveTab = 6;
  } else if (scrolledAmount >= panelPosition['새비지 터미널']) {
    newActiveTab = 5;
  } else if (scrolledAmount >= panelPosition['아쉴롬']) {
    newActiveTab = 4;
  } else if (scrolledAmount >= panelPosition['헬리시움']) {
    newActiveTab = 3;
  } else if (scrolledAmount >= panelPosition['베르딜']) {
    newActiveTab = 2;
  } else if (scrolledAmount >= panelPosition['판테온']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 8;
  }

  return newActiveTab;
}

function arcaneRiverPage() {
  return 0;
}

function friendsPage(
  scrolledAmount: number,
  panelPosition: TabPanelPositionStorage
) {
  let newActiveTab;

  if (scrolledAmount >= panelPosition['신관']) {
    newActiveTab = 1;
  } else {
    newActiveTab = 0;
  }

  if (
    Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
    document.body.offsetHeight
  ) {
    newActiveTab = 1;
  }

  return newActiveTab;
}
