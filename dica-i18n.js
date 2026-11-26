/*
 * dica-i18n.js — 비즈홈 공통 문구 다국어 처리 (파이오니어 카드 공용)
 *
 * WHY: 카드마다 본문은 번역돼 있어도, 모든 카드에 똑같이 들어간 공통 부분
 *      (공유 창, 만두 연결 버튼, 카드 현황 보기 버튼, 알림창)은 한국어로 고정돼
 *      외국어를 고른 방문자에게 한국어가 섞여 보였다. 이 파일 하나만 고치면
 *      모든 카드의 공통 문구가 함께 바뀐다.
 *
 * 사용법: 카드 <head>에 <script src="../dica-i18n.js"></script>
 *   - 알림창 등 스크립트 문구는 dicaT('한국어 원문') 으로 감싼다. (원문이 곧 키)
 *   - 화면의 공통 문구는 언어 버튼을 누를 때 자동으로 바뀐다.
 *   - 표에 없는 문구는 한국어 원문 그대로 나온다(깨지지 않음).
 */
(function () {
  // 카드마다 언어 코드가 달라서(kr/ko, jp/ja, cn/zh, hk) 하나로 모은다
  var CODE = { kr: 'ko', ko: 'ko', en: 'en', jp: 'ja', ja: 'ja', cn: 'zh', zh: 'zh', hk: 'hk', tw: 'hk', de: 'de', vi: 'vi' };

  //            ko(키)                          en / ja / zh(간체) / hk(번체) / de / vi
  var TR = {
    '비즈홈 전달하기': ['Share this Biz Home', 'ビズホームを共有', '分享商务主页', '分享商務主頁', 'Biz Home teilen', 'Chia sẻ Biz Home này'],
    '카카오톡': ['KakaoTalk', 'カカオトーク', 'KakaoTalk', 'KakaoTalk', 'KakaoTalk', 'KakaoTalk'],
    '문자': ['SMS', 'SMS', '短信', '短訊', 'SMS', 'Tin nhắn'],
    '링크 복사': ['Copy link', 'リンクをコピー', '复制链接', '複製連結', 'Link kopieren', 'Sao chép liên kết'],
    'QR 보기': ['Show QR', 'QRを表示', '查看二维码', '查看二維碼', 'QR anzeigen', 'Xem mã QR'],
    '취소': ['Cancel', 'キャンセル', '取消', '取消', 'Abbrechen', 'Hủy'],
    '💬 본인 비즈홈이신가요? 만두 연결하기 (1회)': [
      '💬 Is this your Biz Home? Connect MANDU (one time)',
      '💬 ご本人のビズホームですか？MANDUを連携（1回）',
      '💬 这是您的商务主页吗？连接MANDU（仅一次）',
      '💬 這是您的商務主頁嗎？連接MANDU（僅一次）',
      '💬 Ist das Ihre Biz Home? MANDU verbinden (einmalig)',
      '💬 Đây là Biz Home của bạn? Kết nối MANDU (1 lần)'],
    '✅ 만두 연결 완료 — 이제 이 카드로 DM을 받을 수 있어요': [
      '✅ MANDU connected — you can now receive DMs through this card',
      '✅ MANDU連携完了 — このカードでDMを受け取れます',
      '✅ MANDU已连接 — 现在可以通过此名片接收私信',
      '✅ MANDU已連接 — 現在可以透過此名片接收私訊',
      '✅ MANDU verbunden — Sie können jetzt DMs über diese Karte empfangen',
      '✅ Đã kết nối MANDU — giờ bạn có thể nhận tin nhắn qua thẻ này'],
    '✅ 만두 연결 완료 — 이제 이 비즈홈으로 DM을 받을 수 있어요': [
      '✅ MANDU connected — you can now receive DMs through this Biz Home',
      '✅ MANDU連携完了 — このビズホームでDMを受け取れます',
      '✅ MANDU已连接 — 现在可以通过此商务主页接收私信',
      '✅ MANDU已連接 — 現在可以透過此商務主頁接收私訊',
      '✅ MANDU verbunden — Sie können jetzt DMs über diese Biz Home empfangen',
      '✅ Đã kết nối MANDU — giờ bạn có thể nhận tin nhắn qua Biz Home này'],
    'ℹ️ 이미 연결된 비즈홈이에요': ['ℹ️ This Biz Home is already connected', 'ℹ️ すでに連携済みのビズホームです', 'ℹ️ 此商务主页已被连接', 'ℹ️ 此商務主頁已被連接', 'ℹ️ Diese Biz Home ist bereits verbunden', 'ℹ️ Biz Home này đã được kết nối'],
    '본인 비즈홈이 맞나요?\n구글 로그인하면 이 비즈홈으로 만두 DM을 받을 수 있게 연결돼요.': [
      'Is this your own Biz Home?\nSign in with Google to receive MANDU DMs through it.',
      'ご本人のビズホームですか？\nGoogleでログインすると、このビズホームでMANDUのDMを受け取れるよう連携されます。',
      '这是您本人的商务主页吗？\n使用Google登录后，即可通过此主页接收MANDU私信。',
      '這是您本人的商務主頁嗎？\n使用Google登入後，即可透過此主頁接收MANDU私訊。',
      'Ist das Ihre eigene Biz Home?\nMelden Sie sich mit Google an, um darüber MANDU-DMs zu empfangen.',
      'Đây có phải Biz Home của bạn không?\nĐăng nhập Google để nhận tin nhắn MANDU qua Biz Home này.'],
    '연결 중...': ['Connecting...', '接続中...', '连接中...', '連接中...', 'Verbinden...', 'Đang kết nối...'],
    '연결 실패. 잠시 후 다시 시도해주세요.': ['Connection failed. Please try again shortly.', '接続に失敗しました。しばらくしてから再度お試しください。', '连接失败，请稍后再试。', '連接失敗，請稍後再試。', 'Verbindung fehlgeschlagen. Bitte versuchen Sie es gleich noch einmal.', 'Kết nối thất bại. Vui lòng thử lại sau.'],
    '연결 중 오류가 발생했어요.': ['An error occurred while connecting.', '接続中にエラーが発生しました。', '连接时发生错误。', '連接時發生錯誤。', 'Beim Verbinden ist ein Fehler aufgetreten.', 'Đã xảy ra lỗi khi kết nối.'],
    '링크가 복사되었습니다!': ['Link copied!', 'リンクをコピーしました！', '链接已复制！', '連結已複製！', 'Link kopiert!', 'Đã sao chép liên kết!'],
    '링크가 복사됐습니다!': ['Link copied!', 'リンクをコピーしました！', '链接已复制！', '連結已複製！', 'Link kopiert!', 'Đã sao chép liên kết!'],
    '📊 카드 현황 보기': ['📊 View card stats', '📊 カードの状況を見る', '📊 查看名片统计', '📊 查看名片統計', '📊 Kartenstatistik', '📊 Xem thống kê thẻ'],
    '불러오는 중...': ['Loading...', '読み込み中...', '加载中...', '載入中...', 'Wird geladen...', 'Đang tải...'],
    '조회 {0}회 · 저장 {1}회': ['Views {0} · Saves {1}', '閲覧 {0}回・保存 {1}回', '浏览 {0}次 · 保存 {1}次', '瀏覽 {0}次 · 儲存 {1}次', 'Aufrufe {0} · Gespeichert {1}', 'Lượt xem {0} · Lượt lưu {1}']
  };
  var COL = { en: 0, ja: 1, zh: 2, hk: 3, de: 4, vi: 5 };

  // 지금 눌려 있는 언어 버튼에서 언어를 읽는다 (카드마다 setLang 모양이 달라도 동작)
  function curLang() {
    var b = document.querySelector('[onclick*="setLang"].active');
    var m = b && b.getAttribute('onclick').match(/setLang\(\s*['"](\w+)['"]/);
    return (m && CODE[m[1]]) || 'ko';
  }

  function tr(ko, lang) {
    var row = TR[ko];
    if (!row || lang === 'ko' || COL[lang] === undefined) return ko;
    return row[COL[lang]] || ko;
  }

  // 스크립트 문구용: dicaT('한국어 원문', 값0, 값1 ...)
  window.dicaT = function (ko) {
    var s = tr(ko, curLang()), args = arguments;
    return s.replace(/\{(\d)\}/g, function (_, i) { return args[+i + 1]; });
  };

  // 화면의 공통 문구: 지금 어느 언어로 적혀 있든 원문을 찾아 현재 언어로 바꾼다
  var ANY = {};
  Object.keys(TR).forEach(function (ko) {
    ANY[ko] = ko;
    TR[ko].forEach(function (t) { ANY[t] = ko; });
  });
  var SEL = '.share-title, .share-btn span, .share-cancel, #mandu-activate-btn, #mandu-activate-done, body > div';
  function refresh() {
    var lang = curLang();
    document.querySelectorAll(SEL).forEach(function (el) {
      if (el.children.length) return; // 안쪽에 다른 태그가 있으면 건드리지 않는다
      var ko = ANY[el.textContent.trim()];
      if (ko) el.textContent = tr(ko, lang);
    });
  }
  window.dicaI18nRefresh = refresh;

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[onclick*="setLang"]')) setTimeout(refresh, 0);
  });
  document.addEventListener('DOMContentLoaded', function () { setTimeout(refresh, 0); });
})();
