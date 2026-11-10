<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#2864db">
  <title>Заявка на сетевой доступ — Банк</title>
  <meta name="description" content="Прототип компактной заявки на сетевой доступ для портала SimpleOne. Без реальной интеграции с ITSM.">
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2216%22%20fill%3D%22%232864db%22%2F%3E%3Cpath%20d%3D%22M20%2044V20h10l14%2024V20%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E%0A" type="image/svg+xml">
  <style>
/* Сетевые доступы: обычная одноколоночная форма без карточек. */
:root {
  color-scheme: light;
  --text: #26313d;
  --muted: #65707c;
  --border: #e1e4e8;
  --control-border: #b7bfc8;
  --surface: #fff;
  --subtle: #f5f6f7;
  --blue: #245fc5;
  --blue-hover: #194ca5;
  --green: #226c43;
  --red: #b12d36;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-padding-top: 24px; }
body {
  margin: 0;
  background: var(--surface);
  color: var(--text);
  font: 15px/1.5 "Segoe UI", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-wrap: anywhere;
}
button, input, select, textarea { font: inherit; color: inherit; }
button, summary, .checkbox-label, .type-option, .additional-option { cursor: pointer; }
button, a, input, select, textarea, summary {
  -webkit-tap-highlight-color: transparent;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
}
button { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
a { color: inherit; text-underline-offset: 3px; overflow-wrap: anywhere; }
:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
input:focus-visible, select:focus-visible, textarea:focus-visible { outline-offset: 2px; }
h1, h2, h3, p { margin: 0; }
h1 { font-size: 28px; line-height: 1.25; font-weight: 650; letter-spacing: -.5px; }
h2 { font-size: 18px; line-height: 1.4; font-weight: 600; }
h3 { font-size: 16px; line-height: 1.4; font-weight: 600; }
small { font-size: 14px; }
svg { display: block; flex-shrink: 0; max-width: 100%; }
[hidden], .is-hidden { display: none !important; }

/* Оболочка и заголовок. */
.portal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 64px;
  padding: 12px max(24px, calc((100% - 840px) / 2));
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.brand { display: flex; align-items: center; gap: 10px; min-width: 0; text-decoration: none; font-weight: 600; }
.brand-symbol { width: 32px; height: 32px; color: var(--text); }
.brand-text { font-size: 17px; line-height: 1.3; }
.brand-text > span { display: block; color: var(--muted); font-size: 14px; font-weight: 400; }
.profile { display: flex; align-items: center; gap: 9px; min-width: 0; color: var(--muted); font-size: 14px; }
.profile-avatar { display: grid; place-items: center; flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: var(--subtle); }
.profile-name { min-width: 0; color: var(--text); }
.profile-name > span { display: block; color: var(--muted); font-size: 14px; }
.workspace { width: min(840px, calc(100% - 48px)); min-width: 0; margin: 0 auto; padding: 24px 0 20px; }
.breadcrumbs { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 20px; color: var(--muted); font-size: 14px; }
.page-heading { margin-bottom: 18px; }
.page-subtitle { margin-top: 8px; color: var(--muted); }
.request-toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 14px; margin-bottom: 20px; color: var(--muted); font-size: 14px; }
.request-number { color: var(--text); font-variant-numeric: tabular-nums; }
.status-badge { display: inline-block; padding: 2px 8px; border-radius: 3px; background: var(--subtle); font-size: 14px; }
.status-badge:empty { display: none; }
.status-approved { color: var(--green); }
.status-rejected { color: var(--red); }
.mode-indicator { color: var(--muted); }

/* Компактный выбор действия и строки подключений. */
.request-form, .review-view, .process-view { min-width: 0; }
.action-choice { min-width: 0; margin: 0 0 22px; padding: 0 0 20px; border: 0; border-bottom: 1px solid var(--border); }
.action-choice legend { padding: 0; margin-bottom: 12px; }
.action-options { display: flex; flex-wrap: wrap; gap: 10px 22px; }
.type-option { display: flex; align-items: flex-start; gap: 8px; min-width: 0; }
.type-option > span { min-width: 0; }
.type-radio:checked + span { font-weight: 600; }
input[type="radio"], input[type="checkbox"] { width: 17px; height: 17px; flex: 0 0 17px; margin: 3px 0 0; accent-color: #4d5967; }
.interaction-list { min-width: 0; }
.interaction-row { min-width: 0; padding: 20px 0; border-bottom: 1px solid var(--border); }
.interaction-row:first-child { padding-top: 0; }
.interaction-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px 20px; margin-bottom: 14px; }
.interaction-heading h2 { min-width: 0; }
.row-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 14px; }
.connection-summary { min-width: 0; margin-top: -4px; }
.row-summary-text { color: var(--muted); overflow-wrap: anywhere; }
.row-body { min-width: 0; }
.subsection-title { margin: 20px 0 12px; }
.fields-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 20px; }
.field { min-width: 0; }
.field-label { display: block; color: var(--text); }
.label-text { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; }
.required { color: var(--muted); margin-left: 2px; }
.control {
  display: block;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: 42px;
  padding: 9px 11px;
  border: 1px solid var(--control-border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--text);
  font-size: 15px;
  line-height: 22px;
  font-weight: 400;
}
.control::placeholder { color: #737e89; opacity: 1; }
.control:hover:not(:disabled):not([readonly]) { border-color: #8995a1; }
.control:focus { border-color: var(--blue); }
textarea.control { height: auto; min-height: 92px; resize: vertical; overflow-wrap: anywhere; }
select.control { padding-right: 28px; text-overflow: ellipsis; }
.control[readonly], .control:disabled { background: var(--subtle); color: var(--muted); }
.control:disabled, button:disabled, input:disabled { cursor: not-allowed; }
.field-hint, .field-error { display: block; margin-top: 5px; font-size: 14px; line-height: 1.4; }
.field-hint { color: var(--muted); }
.field-error { color: var(--red); }
.field-error:empty { display: none; }
.has-error .control, .control[aria-invalid="true"] { border-color: var(--red); }
.full-width { grid-column: 1 / -1; }

/* Поиск ограничен своим полем; ответственный — обычная строка. */
.system-block { min-width: 0; padding: 0; border: 0; background: transparent; }
.system-field, .input-wrap { position: relative; min-width: 0; }
.input-wrap { display: block; }
.input-wrap .control { padding-left: 36px; }
.search-icon { position: absolute; left: 12px; top: 21px; transform: translateY(-50%); width: 16px; height: 16px; color: var(--muted); pointer-events: none; }
.search-icon { stroke: currentColor; stroke-width: 1.5; }
.search-icon svg { width: 16px; height: 16px; }
.search-results {
  position: static;
  z-index: 10;
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  margin: 4px 0 0;
  padding: 4px;
  list-style: none;
  border: 1px solid var(--control-border);
  border-radius: 4px;
  background: var(--surface);
}
.search-option { display: block; width: 100%; min-height: 42px; padding: 8px; border: 0; border-radius: 2px; background: transparent; text-align: left; }
.search-option:hover, .search-option[aria-selected="true"], .search-option:focus-visible { background: var(--subtle); }
.search-option:focus-visible { outline-offset: -2px; }
.option-name { display: block; font-weight: 500; }
.option-owner { display: block; margin-top: 2px; color: var(--muted); font-size: 14px; }
.search-empty { padding: 10px 8px; color: var(--muted); font-size: 14px; }
.owner-line { margin-top: 7px; color: var(--muted); font-size: 14px; }
.owner-name { color: var(--text); font-weight: 400; }
.system-mode { display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 10px 0 14px; }
.checkbox-label { display: inline-flex; align-items: flex-start; gap: 8px; min-width: 0; font-size: 14px; }
input.checkbox-control { width: 17px; height: 17px; min-height: 17px; padding: 0; }
.source-system-toggle { display: flex; align-items: flex-start; flex-wrap: wrap; gap: 8px 12px; min-width: 0; margin-top: 16px; }
.source-system-toggle .checkbox-label { flex: 1 1 240px; }
.common-fields { padding-top: 22px; }
.common-fields h2 { margin-bottom: 12px; }
.reason-options { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.reason-chip { min-height: 34px; padding: 5px 10px; border: 1px solid var(--control-border); border-radius: 4px; background: var(--surface); font-size: 14px; }
.reason-chip:hover { background: var(--subtle); }
.reason-chip.is-selected, .reason-chip[aria-pressed="true"] { border-color: #56616d; background: var(--subtle); font-weight: 600; }
.add-interaction { margin-top: 14px; }
.automatic-note { margin-top: 18px; color: var(--muted); font-size: 14px; }

/* Согласующие и менее заметные действия. */
summary { width: fit-content; max-width: 100%; padding: 6px 0; border-radius: 2px; font-size: 14px; }
summary::marker { color: var(--muted); }
.route-details { margin-top: 6px; }
.route-content { padding-top: 8px; }
.route-list, .additional-list, .approval-list, .history-list { list-style: none; margin: 0; padding: 0; }
.route-person { display: flex; align-items: flex-start; gap: 10px; min-width: 0; padding: 8px 0; }
.route-index { flex: 0 0 20px; color: var(--muted); font-size: 14px; font-variant-numeric: tabular-nums; }
.route-info { min-width: 0; }
.route-info strong { display: block; font-size: 14px; font-weight: 500; }
.route-info small { display: block; color: var(--muted); font-size: 14px; }
.role-tag, .auto-tag { display: inline-block; color: var(--muted); font-size: 14px; font-weight: 400; }
.additional-approvers { margin-top: 8px; }
.additional-list { display: grid; gap: 6px; padding-top: 6px; }
.additional-option { display: flex; align-items: flex-start; gap: 8px; min-width: 0; padding: 6px 0; font-size: 14px; }
.additional-option small { display: block; color: var(--muted); }
.button, button.primary, button.secondary, button.danger { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 42px; padding: 9px 15px; border: 1px solid var(--control-border); border-radius: 4px; background: var(--surface); font-weight: 500; text-align: center; text-decoration: none; }
.button.primary, button.primary { border-color: var(--blue); background: var(--blue); color: #fff; }
.button.primary:hover:not(:disabled), button.primary:hover:not(:disabled) { border-color: var(--blue-hover); background: var(--blue-hover); }
.button.secondary:hover:not(:disabled), .button.danger:hover:not(:disabled), button.secondary:hover:not(:disabled), button.danger:hover:not(:disabled) { border-color: #8995a1; background: var(--subtle); }
.button.danger, button.danger { color: var(--text); }
.button.small, button.small { min-height: 34px; padding: 5px 10px; font-size: 14px; }
.text-button, .view-request, .ticket-link { display: inline-flex; align-items: center; min-height: 34px; padding: 5px 0; border: 0; border-radius: 2px; background: transparent; color: var(--text); font-size: 14px; text-decoration: underline; text-underline-offset: 3px; }
.text-button:hover:not(:disabled), .view-request:hover, .ticket-link:hover { color: #111b26; }
button:disabled { opacity: .55; }
.form-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border); }
.form-actions > div { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 12px; min-width: 0; }
.minor-actions { margin-top: 8px; color: var(--muted); }
.minor-actions .text-button { color: var(--muted); }
.save-status { color: var(--muted); font-size: 14px; }
.discard-warning { margin: 14px 0; padding: 12px 0; border-block: 1px solid var(--border); }
.discard-warning p { font-size: 14px; }
.warning-actions { display: flex; flex-wrap: wrap; gap: 8px 12px; margin-top: 8px; }
.notice { margin-bottom: 18px; padding: 10px 0; border-bottom: 1px solid var(--border); color: var(--muted); font-size: 14px; }
.notice-success { color: var(--green); }
.notice-error { color: var(--red); }

/* Проверка и результат: длинные значения не расширяют страницу. */
.review-view h2, .process-card > h2, .ticket-card > h2 { margin-bottom: 14px; }
.summary-grid, .result-meta, .ticket-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 24px; margin: 0; }
.summary-grid dl, .result-meta dl, .ticket-meta dl { min-width: 0; margin: 0; }
.summary-grid + h3 { margin-top: 20px; }
dt { margin: 0 0 3px; color: var(--muted); font-size: 14px; }
dd { min-width: 0; margin: 0; overflow-wrap: anywhere; white-space: pre-wrap; }
dd + dt { margin-top: 14px; }
.summary-table-wrap { max-width: 100%; min-width: 0; margin-top: 20px; }
.summary-table { width: 100%; table-layout: fixed; border-collapse: collapse; text-align: left; font-size: 14px; }
.summary-table th, .summary-table td { padding: 10px 8px; border-bottom: 1px solid var(--border); vertical-align: top; overflow-wrap: anywhere; }
.summary-table th { color: var(--muted); font-weight: 500; }
.summary-table td small { display: block; color: var(--muted); font-size: 14px; }
.review-route { margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--border); }
.review-route > h2, .review-route > h3 { margin-bottom: 8px; }
.process-banner { margin-bottom: 20px; padding: 0 0 18px; border-bottom: 1px solid var(--border); }
.process-banner.success .process-title { color: var(--green); }
.process-banner.danger .process-title { color: var(--red); }
.process-title { margin-bottom: 6px; font-size: 22px; font-weight: 600; line-height: 1.35; }
.process-description { color: var(--muted); }
.view-request { margin-top: 14px; }
.request-details, .process-history { margin-top: 18px; }
.request-details[open] > summary, .process-history[open] > summary { margin-bottom: 12px; }
.process-card, .ticket-card { min-width: 0; margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--border); }
.approval-item { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px 20px; min-width: 0; padding: 12px 0; border-bottom: 1px solid var(--border); }
.approval-identity { flex: 1; min-width: 0; }
.approval-identity strong { display: block; font-weight: 500; }
.approval-identity small { display: block; color: var(--muted); }
.approval-buttons { display: flex; flex-wrap: wrap; gap: 8px; }
select.group-member { display: block; width: 100%; max-width: 320px; height: 42px; margin-top: 8px; padding: 8px; border: 1px solid var(--control-border); border-radius: 4px; background: var(--surface); }
.decision-label { font-size: 14px; }
.decision-approved { color: var(--green); }
.decision-rejected { color: var(--red); }
.history-entry { display: flex; align-items: baseline; gap: 16px; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
.history-entry time { flex-shrink: 0; color: var(--muted); font-variant-numeric: tabular-nums; }
.ticket-link-panel { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px 20px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }
.ticket-link-panel p { margin-top: 4px; color: var(--muted); font-size: 14px; }

/* Демо остаётся компактным раскрывающимся элементом в подвале. */
.demo-tools { margin-top: 28px; padding-top: 12px; border-top: 1px solid var(--border); color: var(--muted); }
.demo-content { padding-top: 10px; }
.demo-content p { margin-bottom: 12px; font-size: 14px; }
.demo-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 16px; }
.demo-button { display: block; min-width: 0; min-height: 42px; padding: 8px 10px; border: 1px solid var(--border); border-radius: 4px; background: var(--surface); text-align: left; font-size: 14px; }
.demo-button:hover:not(:disabled) { background: var(--subtle); }
.demo-button small { display: block; margin-top: 3px; color: var(--muted); font-size: 14px; }
.demo-mode-actions { display: flex; flex-wrap: wrap; gap: 8px 12px; margin-top: 12px; }
.workspace-footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px 20px; margin-top: 20px; color: var(--muted); font-size: 14px; }

/* Финальное уплотнение прежней формы, без смены компоновки. */
.workspace { padding-top: 20px; }
.breadcrumbs { margin-bottom: 14px; }
.request-toolbar { margin-bottom: 14px; }
.action-choice { margin-bottom: 18px; padding-bottom: 16px; }
.fields-grid { row-gap: 14px; }
.subsection-title { margin-top: 16px; }
.common-fields { padding-top: 18px; }
textarea.control { min-height: 72px; }
.form-actions { margin-top: 20px; padding-top: 16px; }
.warning-title { margin-bottom: 4px; font-size: 16px; }
.developer-entry { border: 0; padding: 4px 0; background: transparent; color: var(--muted); font-size: 12px; text-decoration: underline; text-underline-offset: 3px; }
.review-request-meta { margin-top: 12px; }
.review-request-meta + h3 { margin-top: 16px; }

@media (max-width: 640px) {
  .portal-header { align-items: flex-start; gap: 12px; padding: 12px 16px; }
  .brand { flex: 1; }
  .brand-text { font-size: 15px; }
  .profile { max-width: 40%; font-size: 14px; }
  .profile-avatar { display: none; }
  .workspace { width: calc(100% - 32px); padding-top: 20px; }
  h1 { font-size: 25px; }
  .breadcrumbs { margin-bottom: 16px; }
  .action-options, .fields-grid, .summary-grid, .result-meta, .ticket-meta, .demo-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .interaction-heading { align-items: flex-start; flex-direction: column; gap: 4px; }
  .row-actions { gap: 6px 16px; }
  .source-system-toggle { flex-direction: column; align-items: stretch; }
  .source-system-toggle .checkbox-label { flex: none; }
  .control { font-size: 16px; }
  .form-actions, .form-actions > div { align-items: stretch; flex-direction: column; width: 100%; }
  .form-actions .button, .form-actions > button { width: 100%; }
  .approval-item, .history-entry { flex-direction: column; gap: 8px; }
  .approval-buttons { width: 100%; }
  .summary-table, .summary-table tbody, .summary-table tr { display: block; width: 100%; }
  .summary-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .summary-table tr { padding: 10px 0; border-block-end: 1px solid var(--border); }
  .summary-table td { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2px; width: 100%; padding: 5px 0; border: 0; }
  .summary-table td::before { content: attr(data-label); color: var(--muted); font-size: 14px; font-weight: 500; }
  .summary-table td > * { min-width: 0; max-width: 100%; }
  .workspace-footer { flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
}

</style>
</head>
<body>
  <header class="portal-header">
    <a class="brand js-home" href="#" aria-label="Текущая заявка на сетевой доступ"><svg class="brand-symbol" viewBox="0 0 36 36" fill="none" aria-hidden="true"><rect width="36" height="36" rx="8" fill="currentColor"/><path d="M11 24V12h6l8 12V12" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Банк <small>Портал самообслуживания</small></span></a>
    <span class="profile">Алексей Морозов</span>
  </header>
  <main class="workspace">
    <nav class="breadcrumbs" aria-label="Путь к услуге">ИТ-сервисы <span aria-hidden="true">/</span> Сетевые доступы</nav>
    <div class="page-heading"><h1>Заявка на сетевой доступ</h1><p class="page-subtitle">Укажите параметры подключения. Согласующие будут определены автоматически.</p></div>
    <div class="notice js-notice is-hidden" role="status" aria-live="polite"></div>
    <div class="discard-warning is-hidden" role="alert"><h2 class="warning-title"></h2><p class="warning-message"></p><div class="warning-actions"><button class="button secondary confirm-replace" type="button">Подтвердить действие</button><button class="text-button cancel-replace" type="button">Вернуться к заявке</button></div></div>
    <div class="request-toolbar"><span class="request-number"></span><span class="status-badge"></span><span class="mode-indicator is-hidden">Демонстрационный режим</span></div>
    <section class="form-view" aria-label="Заполнение заявки">
      <form class="request-form" novalidate>
        <fieldset class="action-choice"><legend><h2>Что нужно сделать?</h2></legend><div class="action-options">
          <label class="type-option"><input class="type-radio" type="radio" name="request-type" value="internal" checked><span>Открыть доступ внутри Банка</span></label>
          <label class="type-option"><input class="type-radio" type="radio" name="request-type" value="external"><span>Открыть доступ к внешнему ресурсу</span></label>
          <label class="type-option"><input class="type-radio" type="radio" name="request-type" value="revoke"><span>Закрыть существующий доступ</span></label>
        </div></fieldset>
        <div class="interaction-list"></div>
        <p class="field-error rows-error" aria-live="polite"></p>
        <button class="button secondary add-interaction" type="button">+ Добавить ещё подключение</button>
        <div class="common-fields"></div>
        <p class="automatic-note">Согласующие добавятся автоматически.</p>
        <details class="route-details"><summary>Посмотреть согласующих</summary><div class="route-content"></div><details class="additional-approvers"><summary>Добавить согласующего — необязательно</summary><div class="additional-content"></div></details></details>
        <div class="form-actions"><button class="button primary review-request" type="submit">Проверить заявку</button><button class="text-button save-draft" type="button">Сохранить черновик</button></div>
        <details class="minor-actions"><summary>Другие действия</summary><button class="text-button close-draft" type="button">Отменить заявку</button></details>
      </form>
    </section>
    <section class="review-view is-hidden" aria-label="Проверка заявки"></section>
    <section class="process-view is-hidden" aria-label="Результат отправки"></section>
    <section class="ticket-view is-hidden" aria-label="Обращение на исполнение"></section>
    <footer class="workspace-footer">
      <button class="developer-entry" type="button">Для разработчиков</button>
      <details class="demo-tools is-hidden"><summary>Демонстрационные сценарии</summary><div class="demo-content">
        <p>Локальная проверка интерфейса. Примеры не меняют обычную заявку: она восстановится при выходе. Реальные согласования и сетевые настройки не изменяются.</p>
        <div class="demo-grid">
          <button class="demo-button" data-demo="internal" type="button">Внутренний доступ · CMDB</button>
          <button class="demo-button" data-demo="external" type="button">Внешний доступ · вручную</button>
          <button class="demo-button" data-demo="revoke" type="button">Закрытие доступа</button>
          <button class="demo-button" data-demo="multi" type="button">Несколько подключений</button>
          <button class="demo-button" data-demo="errors" type="button">Ошибки обязательных полей</button>
          <button class="demo-button" data-demo="success" type="button">Успешное согласование</button>
          <button class="demo-button" data-demo="rejection" type="button">Отказ и доработка</button>
        </div>
        <div class="demo-mode-actions"><button class="text-button enable-demo" type="button">Включить имитацию согласований</button><button class="text-button exit-demo is-hidden" type="button">Вернуться в обычный режим</button></div>
      </div></details>
      <small class="demo-note is-hidden">Прототип интерфейса. Реальная интеграция с SimpleOne и ITSM не подключена.</small>
    </footer>
  </main>
<script>
'use strict';

/* Демонстрационные справочники. Заменяются источниками платформы при адаптации. */
const DEMO_DATA = {
  profile: { employeeId: 'morozov', name: 'Алексей Морозов', department: 'Управление информационных технологий', managerId: 'volkov' },
  employees: [
    { key: 'volkov', name: 'Волков А.А.', role: 'Руководитель инициатора' },
    { key: 'ivanov', name: 'Иванов И.И.', role: 'Владелец CRM' },
    { key: 'petrov', name: 'Петров П.П.', role: 'Владелец АБС ЦФТ' },
    { key: 'sidorov', name: 'Сидоров С.С.', role: 'Владелец интеграционной платформы' },
    { key: 'smirnov', name: 'Смирнов С.С.', role: 'Владелец корпоративного портала' },
    { key: 'kuznetsov', name: 'Кузнецов К.К.', role: 'Владелец скоринговой системы' },
    { key: 'orlov', name: 'Орлов О.О.', role: 'Владелец Nexus' },
    { key: 'lebedeva', name: 'Лебедева Е.А.', role: 'Владелец ИТ-системы' },
    { key: 'lazo', name: 'Лазо Я.О.', role: 'Участник группы «Сеть»' },
    { key: 'fedorov', name: 'Фёдоров Д.В.', role: 'Участник группы «Сеть»' },
    { key: 'nikitina', name: 'Никитина М.А.', role: 'Участник группы ДИБ' },
    { key: 'vasiliev', name: 'Васильев А.В.', role: 'Участник группы ДИБ' }
  ],
  systems: [
    { key: 'crm', name: 'CRM', ownerId: 'ivanov' },
    { key: 'cft', name: 'АБС ЦФТ', ownerId: 'petrov' },
    { key: 'integration', name: 'Интеграционная платформа', ownerId: 'sidorov' },
    { key: 'portal', name: 'Корпоративный портал', ownerId: 'smirnov' },
    { key: 'scoring', name: 'Скоринговая система', ownerId: 'kuznetsov' },
    { key: 'nexus', name: 'Nexus', ownerId: 'orlov' }
  ],
  groups: [
    { key: 'dib', name: 'ДИБ вопросы по ЭСЗ', members: ['nikitina', 'vasiliev'] },
    { key: 'network', name: 'Сеть', members: ['lazo', 'fedorov'] }
  ],
  reasons: ['Завершён пилот', 'Доступ больше не нужен', 'Система выведена из эксплуатации', 'Другая причина'],
  scenarios: {
    internal: { type: 'internal', justification: 'Для интеграционного тестирования CRM требуется доступ к скоринговой системе.', rows: [{ source: 'EPG-CRM-TEST', destination: '10.20.30.40', port: '443', protocol: 'TCP', pam: 'no', systemId: 'scoring' }] },
    external: { type: 'external', justification: 'В рамках проекта обновления приложения требуется загрузка зависимостей с внешнего репозитория.', rows: [{ source: '10.40.12.0/24', destination: 'repo.example.org', port: '443', protocol: 'TCP', proxy: 'proxy-test.bank.local:8080', manualName: 'Система сборки приложений', manualOwnerId: 'lebedeva' }] },
    revoke: { type: 'revoke', justification: 'В связи с окончанием срока пилота прошу отозвать сетевой доступ CRM к скоринговой системе.', rows: [{ source: 'EPG-CRM-TEST', destination: '10.20.30.40', port: '443', protocol: 'TCP', systemId: 'scoring' }] },
    multi: { type: 'internal', justification: 'Для обмена данными CRM с внутренними системами и публикации артефактов тестового приложения.', rows: [
      { source: 'EPG-CRM-TEST', destination: '10.20.30.40', port: '443', protocol: 'TCP', pam: 'no', systemId: 'scoring', sourceSystemId: 'crm' },
      { source: 'EPG-CRM-TEST', destination: 'nexus-test.bank.local', port: '443, 8080-8082', protocol: 'TCP', pam: 'no', systemId: 'nexus' },
      { source: 'EPG-CRM-TEST', destination: '10.20.30.41', port: '443', protocol: 'TCP', pam: 'no', systemId: 'scoring' }
    ] }
  }
};

const REQUEST_TYPES = {
  internal: 'Открыть доступ внутри Банка',
  external: 'Открыть доступ к внешнему ресурсу',
  revoke: 'Закрыть существующий доступ'
};
const STATUS = { draft: 'Черновик', pending: 'На согласовании', approved: 'Согласован', rejected: 'Не согласован', closed: 'Закрыт' };
const TRANSITIONS = { draft: ['pending', 'closed'], pending: ['draft', 'approved', 'rejected'], rejected: ['draft', 'closed'], approved: ['closed'], closed: [] };
const STORAGE_KEY = 'network-access-prototype-v1';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const employee = (key) => DEMO_DATA.employees.find((item) => item.key === key);
const system = (key) => DEMO_DATA.systems.find((item) => item.key === key);
const employeeName = (key) => employee(key)?.name || 'Не указан';
const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const formatDate = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString('ru-RU') : 'Бессрочно';
const formatTime = (value) => new Date(value).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const clone = (value) => JSON.parse(JSON.stringify(value));
const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
const generateNumber = (prefix) => `${prefix}${today().replaceAll('-', '')}-${uid().replaceAll('-', '').slice(-8).toUpperCase()}`;
let request = null;
let view = 'form';
let savedRequest = null;
let drafts = {};
let activeRowKey = null;
let demoMode = false;
let demoWorkspace = null;
let storageAvailable = true;
let unsavedChanges = false;
let pendingAction = null;
let pointerNavigation = false;
let noticeTimer;

const blankSystem = () => ({ manual: false, systemId: '', query: '', name: '', ownerId: '', manualOwnerId: '' });
const blankRow = () => ({ key: uid(), source: '', destination: '', port: '', protocol: '', customProtocol: '', pam: '', proxy: '', sourceSystemEnabled: false, target: blankSystem(), origin: blankSystem() });
const selectedSystem = (key) => {
  const entry = system(key);
  return entry ? { ...blankSystem(), systemId: entry.key, query: entry.name, ownerId: entry.ownerId } : blankSystem();
};
const systemDetails = (selection) => selection.manual
  ? { name: selection.name.trim(), ownerId: selection.ownerId, manual: true }
  : { name: system(selection.systemId)?.name || '', ownerId: system(selection.systemId)?.ownerId || '', manual: false };
const setSystemMode = (selection, manual) => {
  if (selection.manual === manual) return;
  if (manual) selection.ownerId = selection.manualOwnerId || '';
  else { selection.manualOwnerId = selection.ownerId; selection.ownerId = system(selection.systemId)?.ownerId || ''; }
  selection.manual = manual;
};
const normalizeDraft = (data) => {
  if (data.status === 'draft') {
    data.fields.managerId = DEMO_DATA.profile.managerId;
    delete data.fields.environment;
    delete data.fields.comment;
  }
  return data;
};
const isStoredRequest = (data) => Boolean(data && REQUEST_TYPES[data.type] && STATUS[data.status] && data.fields && Array.isArray(data.rows) && Array.isArray(data.extras) && Array.isArray(data.history) && Array.isArray(data.approvals) && data.rows.every((row) => row.target && row.origin && typeof row.source === 'string' && typeof row.destination === 'string'));
const loadSaved = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!stored || ![1, 2].includes(stored.version)) return;
    if (isStoredRequest(stored.request)) savedRequest = normalizeDraft(stored.request);
    if (stored.version === 2 && stored.drafts) {
      Object.keys(REQUEST_TYPES).forEach((type) => {
        const entry = stored.drafts[type];
        if (isStoredRequest(entry) && entry.status === 'draft' && entry.type === type) drafts[type] = normalizeDraft(entry);
      });
    }
    if (savedRequest?.status === 'draft') drafts[savedRequest.type] = clone(savedRequest);
  } catch { storageAvailable = false; }
};
const persist = () => {
  if (!request) return false;
  if (request.status === 'draft') drafts[request.type] = clone(request);
  else if (drafts[request.type]?.number === request.number) delete drafts[request.type];
  savedRequest = clone(request);
  // Примеры изолированы в памяти и не заменяют обычную заявку в localStorage.
  if (demoWorkspace) return true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, request, drafts }));
    storageAvailable = true; unsavedChanges = false; return true;
  } catch { storageAvailable = false; unsavedChanges = true; return false; }
};
const notify = (text, tone = 'success') => {
  const notice = $('.js-notice');
  notice.textContent = text;
  notice.className = `notice js-notice notice-${tone}`;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.classList.add('is-hidden'), 6500);
};
const addHistory = (text, state = request.status) => request.history.push({ at: new Date().toISOString(), status: state, text });
const transition = (next, text) => {
  if (!TRANSITIONS[request.status]?.includes(next)) throw new Error('Недопустимый переход статуса');
  request.status = next;
  addHistory(text || STATUS[next], next);
};
const hasRowData = (row) => Boolean([row.source, row.destination, row.port, row.protocol, row.pam, row.proxy, row.target.query, row.target.name, row.target.ownerId, row.target.manualOwnerId, row.origin.query, row.origin.name, row.origin.ownerId, row.origin.manualOwnerId].some((value) => String(value || '').trim()) || row.sourceSystemEnabled);
const hasEnteredData = (data) => Boolean(data && (data.fields.justification.trim() || data.fields.endDate || data.fields.periodMode === 'limited' || data.fields.reason || data.extras.length || data.rows.some(hasRowData)));
const requestConfirmation = (message, action, labels = {}) => {
  pendingAction = action;
  $('.warning-title').textContent = labels.title || 'Заменить сохранённые данные?';
  $('.warning-message').textContent = message;
  $('.confirm-replace').textContent = labels.confirm || 'Заменить данные';
  $('.cancel-replace').textContent = labels.cancel || 'Сохранить текущие данные';
  $('.discard-warning').classList.remove('is-hidden');
  $('.cancel-replace').focus();
  $('.discard-warning').scrollIntoView({ behavior: 'auto', block: 'center' });
};
const finishConfirmation = (confirmed) => {
  const action = pendingAction;
  pendingAction = null;
  $('.discard-warning').classList.add('is-hidden');
  if (confirmed) action?.();
};

// id используются только для ARIA-связей, DOM-поиски и обработчики — исключительно по классам.
const fieldToken = (key, scope = 'common') => `f-${request.number}-${scope}-${key}`;
const field = (key, label, options = {}) => {
  const { value = '', required = false, type = 'text', hint = '', placeholder = '', choices = null, extraClass = '', rows = 2, scope = 'common' } = options;
  const token = fieldToken(key, scope);
  const attributes = `class="control" data-key="${escapeHTML(key)}" ${required ? 'required' : ''} aria-describedby="${token}-error${hint ? ` ${token}-hint` : ''}"`;
  let control;
  if (choices) control = `<select ${attributes}>${choices.map((choice) => {
    const item = typeof choice === 'string' ? { value: choice, label: choice } : choice;
    return `<option value="${escapeHTML(item.value)}" ${String(value) === String(item.value) ? 'selected' : ''}>${escapeHTML(item.label)}</option>`;
  }).join('')}</select>`;
  else if (type === 'textarea') control = `<textarea ${attributes} rows="${rows}" maxlength="4000" placeholder="${escapeHTML(placeholder)}">${escapeHTML(value)}</textarea>`;
  else control = `<input ${attributes} type="${type}" value="${escapeHTML(value)}" placeholder="${escapeHTML(placeholder)}" ${type === 'date' ? `min="${today()}"` : 'maxlength="255"'} autocomplete="off">`;
  return `<div class="field field-${key} ${extraClass}"><label class="field-label"><span class="label-text">${escapeHTML(label)}${required ? ' <span class="required" aria-label="обязательно">*</span>' : ''}</span>${control}</label>${hint ? `<span class="field-hint" id="${token}-hint">${escapeHTML(hint)}</span>` : ''}<p class="field-error" id="${token}-error" aria-live="polite"></p></div>`;
};
const employeeChoices = () => [{ value: '', label: 'Выберите сотрудника' }, ...DEMO_DATA.employees.map((item) => ({ value: item.key, label: item.name }))];
const checkbox = (key, label, checked = false) => `<label class="checkbox-label"><input class="control checkbox-control" type="checkbox" data-key="${key}" ${checked ? 'checked' : ''}><span>${escapeHTML(label)}</span></label>`;
const renderCommon = () => {
  const f = request.fields;
  $('.common-fields').innerHTML = `<h2>${request.type === 'revoke' ? 'Причина закрытия доступа' : 'Обоснование'}</h2><div class="fields-grid">
    ${request.type === 'revoke' ? `<div class="reason-options full-width">${DEMO_DATA.reasons.map((reason) => `<button class="reason-chip ${f.reason === reason ? 'is-selected' : ''}" type="button" data-reason="${escapeHTML(reason)}" aria-pressed="${f.reason === reason}">${escapeHTML(reason)}</button>`).join('')}</div>` : ''}
    ${field('justification', request.type === 'revoke' ? 'Почему нужно закрыть доступ' : 'Зачем нужен доступ', { type: 'textarea', value: f.justification, required: true, placeholder: request.type === 'revoke' ? 'Пилот завершён, доступ больше не нужен' : 'Для тестирования интеграции CRM с системой скоринга', extraClass: 'full-width' })}
    ${request.type === 'internal' ? field('endDate', 'До какой даты нужен доступ', { type: 'date', value: f.endDate, hint: 'Пустая дата — бессрочный доступ.' }) : ''}
    ${request.type === 'external' ? field('periodMode', 'Срок доступа', { value: f.periodMode, choices: [{ value: 'unlimited', label: 'Бессрочно' }, { value: 'limited', label: 'До указанной даты' }] }) : ''}
    ${request.type === 'external' && f.periodMode === 'limited' ? `${field('startDate', 'С какой даты', { type: 'date', value: f.startDate, required: true })}${field('endDate', 'До какой даты нужен доступ', { type: 'date', value: f.endDate, required: true })}` : ''}
  </div>`;
};
const ownerLineMarkup = (selection) => {
  const details = systemDetails(selection);
  return details.ownerId ? `Ответственный: <strong class="owner-name">${escapeHTML(employeeName(details.ownerId))}</strong> — ${selection.manual ? 'указан вручную' : 'определён автоматически'}` : selection.manual ? 'Выберите ответственного за систему.' : 'Ответственный определится после выбора системы.';
};
const renderSystemBlock = (row, slot, label) => {
  const selection = row[slot];
  const scope = `${row.key}-${slot}`;
  const token = fieldToken('query', scope);
  return `<div class="system-block" data-slot="${slot}">
    ${selection.manual ? `<div class="fields-grid">${field('name', 'Название ИТ-системы', { value: selection.name, required: true, placeholder: 'Название системы', scope, extraClass: 'full-width' })}${field('ownerId', 'Ответственный за ИТ-систему', { value: selection.ownerId, required: true, choices: employeeChoices(), scope, extraClass: 'full-width' })}</div>` : `<div class="field field-query system-field"><label class="field-label"><span class="label-text">${escapeHTML(label)} <span class="required" aria-label="обязательно">*</span></span><span class="input-wrap"><svg class="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input class="control system-search" data-key="query" type="text" value="${escapeHTML(selection.query)}" placeholder="Начните вводить название: CRM, Nexus…" maxlength="255" autocomplete="off" required role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${token}-list" aria-describedby="${token}-error"></span></label><div class="search-results is-hidden" role="listbox" id="${token}-list" aria-label="ИТ-системы"></div><p class="field-error" id="${token}-error" aria-live="polite"></p></div><p class="owner-line" aria-live="polite">${ownerLineMarkup(selection)}</p>`}
    ${selection.manual ? `<p class="owner-line" aria-live="polite">${ownerLineMarkup(selection)}</p>` : ''}
    <div class="system-mode">${checkbox('manual', 'Не могу найти систему в списке', selection.manual)}</div>
  </div>`;
};
const protocolName = (row) => row.protocol === 'other' ? row.customProtocol.trim() : row.protocol;
const connectionText = (row) => `${row.source || 'Источник не указан'} → ${row.destination || 'Назначение не указано'} · ${protocolName(row) || 'Протокол не указан'} ${row.port || 'Порт не указан'}`;
const rowMarkup = (row, index) => {
  const expanded = row.key === activeRowKey;
  const scope = row.key;
  const bodyToken = fieldToken('body', scope);
  return `<article class="interaction-row" data-row="${escapeHTML(row.key)}"><div class="interaction-heading"><h2>${request.rows.length === 1 ? 'Параметры подключения' : `Подключение ${index + 1}`}</h2><div class="row-actions"><button class="text-button edit-interaction ${expanded ? 'is-hidden' : ''}" type="button" aria-expanded="${expanded}" aria-controls="${bodyToken}">Изменить</button><button class="text-button collapse-interaction ${!expanded ? 'is-hidden' : ''}" type="button" aria-expanded="${expanded}" aria-controls="${bodyToken}">Свернуть</button><button class="text-button delete-interaction" type="button" aria-label="Удалить подключение ${index + 1}">Удалить</button></div></div>
    <div class="connection-summary ${expanded ? 'is-hidden' : ''}"><p class="row-summary-text">${escapeHTML(connectionText(row))}</p><small>${escapeHTML(systemDetails(row.target).name || 'ИТ-система не выбрана')}</small></div>
    <div class="row-body ${expanded ? '' : 'is-hidden'}" id="${bodyToken}"><div class="row-fields fields-grid">
      ${field('source', request.type === 'revoke' ? 'Откуда открыт доступ' : 'Откуда нужен доступ', { value: row.source, required: true, placeholder: '10.10.20.15 или EPG-CRM-TEST', hint: 'IP, EPG, подсеть или доменное имя.', extraClass: 'full-width', scope })}
      ${field('destination', request.type === 'revoke' ? 'Куда открыт доступ' : 'Куда нужен доступ', { value: row.destination, required: true, placeholder: request.type === 'external' ? 'repo.example.org или 203.0.113.10' : '10.20.30.40 или api.bank.local', extraClass: 'full-width', scope })}
      ${field('port', 'Порт', { value: row.port, required: true, placeholder: '443', hint: 'Можно: 443, 8000-8080 или 80, 443.', scope })}
      ${field('protocol', 'Протокол', { value: row.protocol, required: true, choices: [{ value: '', label: 'Выберите' }, 'TCP', 'UDP', { value: 'other', label: 'Другой' }], scope })}
      ${row.protocol === 'other' ? field('customProtocol', 'Название протокола', { value: row.customProtocol, required: true, placeholder: 'SCTP', scope, extraClass: 'full-width' }) : ''}
      ${request.type === 'internal' ? field('pam', 'Доступ через PAM', { value: row.pam, required: true, choices: [{ value: '', label: 'Выберите' }, { value: 'no', label: 'Нет' }, { value: 'yes', label: 'Да' }], hint: 'PAM — сервис защищённого доступа.', scope }) : ''}
      ${request.type === 'external' ? field('proxy', 'Прокси-сервер / промежуточный сервер', { value: row.proxy, required: true, placeholder: 'proxy.bank.local:8080 или «Не требуется»', scope, extraClass: 'full-width' }) : ''}
    </div><h3 class="subsection-title">ИТ-система</h3>
    ${renderSystemBlock(row, 'target', request.type === 'external' ? 'Из какой ИТ-системы нужен доступ' : 'К какой ИТ-системе относится ресурс')}
    ${request.type === 'internal' ? `<div class="source-system-toggle">${checkbox('sourceSystemEnabled', 'Доступ нужен из другой ИТ-системы', row.sourceSystemEnabled)}</div>${row.sourceSystemEnabled ? renderSystemBlock(row, 'origin', 'Из какой ИТ-системы нужен доступ') : ''}` : ''}
    </div></article>`;
};
const renderRows = () => { $('.interaction-list').innerHTML = request.rows.map(rowMarkup).join(''); };
const focusInRow = (rowKey, key, slot = null) => {
  let root = $$('.interaction-row').find((element) => element.dataset.row === rowKey);
  if (!root) return;
  if (slot) root = $$('.system-block', root).find((element) => element.dataset.slot === slot);
  if (!root) return;
  const control = ['manual', 'sourceSystemEnabled'].includes(key) ? $$('.checkbox-control', root).find((element) => element.dataset.key === key) : $(`.field-${key} .control`, root);
  control?.focus({ preventScroll: true });
};
const setActiveRow = (key, focus = true) => {
  finishConfirmation(false);
  activeRowKey = key;
  closeSearches();
  $$('.interaction-row').forEach((root) => {
    const expanded = root.dataset.row === key;
    $('.row-body', root).classList.toggle('is-hidden', !expanded);
    $('.connection-summary', root).classList.toggle('is-hidden', expanded);
    $('.row-summary-text', root).textContent = connectionText(request.rows.find((row) => row.key === root.dataset.row));
    $('.edit-interaction', root).classList.toggle('is-hidden', expanded);
    $('.collapse-interaction', root).classList.toggle('is-hidden', !expanded);
    $('.edit-interaction', root).setAttribute('aria-expanded', String(expanded));
    $('.collapse-interaction', root).setAttribute('aria-expanded', String(expanded));
  });
  if (key && focus) focusInRow(key, 'source');
};
const addInteraction = () => {
  if (request.status !== 'draft') return;
  finishConfirmation(false);
  const row = blankRow(); request.rows.push(row); activeRowKey = row.key;
  $('.rows-error').textContent = ''; renderRows(); renderRoute(); persist(); focusInRow(row.key, 'source');
};
const removeInteraction = (key) => {
  if (request.status !== 'draft') return;
  request.rows = request.rows.filter((row) => row.key !== key);
  if (activeRowKey === key) activeRowKey = request.rows.at(-1)?.key || null;
  renderRows(); renderRoute(); persist();
  if (activeRowKey) focusInRow(activeRowKey, 'source'); else $('.add-interaction').focus();
};

/* Маршрут и порядок участников сохранены: руководитель, владельцы, дополнительные, ДИБ, Сеть. */
const getRoute = () => {
  const route = [];
  const people = new Map();
  const addPerson = (key, reason) => {
    if (!employee(key)) return;
    if (!people.has(key)) {
      const person = { key: `person:${key}`, employeeId: key, name: employeeName(key), kind: 'person', reasons: [] };
      people.set(key, person); route.push(person);
    }
    if (!people.get(key).reasons.includes(reason)) people.get(key).reasons.push(reason);
  };
  addPerson(request.fields.managerId, 'Руководитель инициатора');
  request.rows.forEach((row) => {
    const target = systemDetails(row.target);
    addPerson(target.ownerId, `Ответственный за систему${target.name ? ` · ${target.name}` : ''}`);
    if (request.type === 'internal' && row.sourceSystemEnabled) {
      const origin = systemDetails(row.origin);
      addPerson(origin.ownerId, `Ответственный за систему-источник${origin.name ? ` · ${origin.name}` : ''}`);
    }
  });
  request.extras.forEach((key) => addPerson(key, 'Дополнительный согласующий'));
  DEMO_DATA.groups.forEach((group) => route.push({ key: `group:${group.key}`, groupId: group.key, name: group.name, kind: 'group', reasons: ['Достаточно одного участника группы'], members: group.members }));
  return route;
};
const displayApproverName = (person) => person.groupId === 'dib' ? 'ДИБ' : person.name;
const routeMarkup = (route = getRoute()) => `<ol class="route-list">${route.map((person, index) => `<li class="route-person"><span class="route-index">${index + 1}</span><div class="route-info"><strong>${escapeHTML(displayApproverName(person))}</strong><small>${escapeHTML(person.reasons.join('; '))}</small></div></li>`).join('')}</ol>`;
const renderRoute = () => {
  const resolved = request.rows.length && request.rows.every((row) => employee(systemDetails(row.target).ownerId) && (request.type !== 'internal' || !row.sourceSystemEnabled || employee(systemDetails(row.origin).ownerId)));
  $('.automatic-note').textContent = resolved ? 'Ответственный за систему определён. Остальные согласующие добавятся автоматически.' : 'Согласующие добавятся автоматически после выбора ИТ-системы.';
  $('.route-content').innerHTML = routeMarkup();
  $('.additional-content').innerHTML = `<div class="additional-list">${DEMO_DATA.employees.map((person) => `<label class="additional-option checkbox-label"><input class="additional-checkbox" type="checkbox" data-person="${person.key}" ${request.extras.includes(person.key) ? 'checked' : ''}><span>${escapeHTML(person.name)}</span></label>`).join('')}</div>`;
};
const showView = (next) => {
  finishConfirmation(false);
  view = next;
  ['form', 'review', 'process', 'ticket'].forEach((name) => $(`.${name}-view`).classList.toggle('is-hidden', next !== name));
  $('.request-toolbar').classList.toggle('is-hidden', next !== 'form');
  $('.request-number').textContent = request.number;
  const badge = $('.status-badge');
  badge.textContent = STATUS[request.status];
  badge.className = `status-badge status-${request.status}`;
  $('.mode-indicator').classList.toggle('is-hidden', !demoMode);
  $('.enable-demo').classList.toggle('is-hidden', demoMode);
  $('.exit-demo').classList.toggle('is-hidden', !demoMode);
  $('.demo-tools').classList.toggle('is-hidden', !demoMode);
  $('.demo-note').classList.toggle('is-hidden', !demoMode);
  $('.developer-entry').classList.toggle('is-hidden', demoMode);
  $$('.type-radio').forEach((input) => { input.checked = input.value === request.type; });
};
const openRequest = () => {
  normalizeDraft(request);
  if (request.status === 'draft') {
    if (!request.rows.some((row) => row.key === activeRowKey)) activeRowKey = request.rows[0]?.key || null;
    renderRows(); renderCommon(); renderRoute(); showView('form');
  } else { renderProcess(); showView('process'); }
};
const newRequestModel = (type) => ({ type, number: generateNumber('APRQ'), status: 'draft', createdAt: new Date().toISOString(), fields: { managerId: DEMO_DATA.profile.managerId, justification: '', endDate: '', startDate: today(), periodMode: 'unlimited', reason: '' }, rows: [blankRow()], extras: [], approvals: [], history: [], ticket: null });
const createRequest = (type, scenarioKey = null) => {
  if (!REQUEST_TYPES[type]) return;
  request = newRequestModel(type);
  if (scenarioKey) {
    const example = DEMO_DATA.scenarios[scenarioKey];
    request.fields.justification = example.justification;
    request.fields.reason = type === 'revoke' ? DEMO_DATA.reasons[0] : '';
    request.rows = example.rows.map((data) => {
      const row = { ...blankRow(), source: data.source, destination: data.destination, port: data.port, protocol: data.protocol, pam: data.pam || '', proxy: data.proxy || '' };
      row.target = data.manualName ? { ...blankSystem(), manual: true, name: data.manualName, ownerId: data.manualOwnerId, manualOwnerId: data.manualOwnerId } : selectedSystem(data.systemId);
      if (data.sourceSystemId) { row.sourceSystemEnabled = true; row.origin = selectedSystem(data.sourceSystemId); }
      return row;
    });
  }
  activeRowKey = request.rows[0]?.key || null;
  addHistory('Создан черновик заявки'); persist(); openRequest();
};
const switchType = (type) => {
  if (!REQUEST_TYPES[type] || request.status !== 'draft' || request.type === type) return;
  persist();
  if (drafts[type]) { request = normalizeDraft(clone(drafts[type])); activeRowKey = request.rows[0]?.key || null; openRequest(); persist(); }
  else createRequest(type);
  $$('.type-radio').find((input) => input.value === type)?.focus({ preventScroll: true });
};

const closeSearches = () => {
  $$('.search-results').forEach((list) => list.classList.add('is-hidden'));
  $$('.system-search').forEach((input) => input.setAttribute('aria-expanded', 'false'));
};
const showSearch = (input) => {
  const block = input.closest('.system-block');
  const row = request.rows.find((item) => item.key === input.closest('.interaction-row').dataset.row);
  const search = input.value.trim().toLocaleLowerCase('ru');
  const results = DEMO_DATA.systems.filter((entry) => entry.name.toLocaleLowerCase('ru').includes(search));
  closeSearches();
  const list = $('.search-results', block);
  list.innerHTML = results.length ? results.map((entry) => `<button class="search-option" type="button" role="option" aria-selected="${row[block.dataset.slot].systemId === entry.key}" data-system="${entry.key}"><span class="option-name">${escapeHTML(entry.name)}</span><span class="option-owner">${escapeHTML(employeeName(entry.ownerId))}</span></button>`).join('') : '<div class="search-empty">Системы нет в списке. Отметьте ручной ввод ниже.</div>';
  list.classList.remove('is-hidden'); input.setAttribute('aria-expanded', 'true');
};
const chooseSystem = (button) => {
  finishConfirmation(false);
  const block = button.closest('.system-block');
  const row = request.rows.find((item) => item.key === button.closest('.interaction-row').dataset.row);
  const previous = row[block.dataset.slot];
  row[block.dataset.slot] = { ...selectedSystem(button.dataset.system), name: previous.name, manualOwnerId: previous.manualOwnerId || '' };
  const selection = row[block.dataset.slot];
  const input = $('.system-search', block);
  input.value = selection.query;
  $('.owner-line', block).innerHTML = ownerLineMarkup(selection);
  clearError($('.field-query', block));
  renderRoute(); persist(); input.focus(); closeSearches();
};
const clearError = (container) => {
  if (!container) return;
  container.classList.remove('has-error');
  const error = $('.field-error', container);
  if (error) error.textContent = '';
  $('.control', container)?.removeAttribute('aria-invalid');
};
const markError = (container, message) => {
  if (!container) return;
  container.classList.add('has-error');
  $('.field-error', container).textContent = message;
  $('.control', container)?.setAttribute('aria-invalid', 'true');
};
const updateFromControl = (input, isChange = false) => {
  if (!request || request.status !== 'draft') return;
  const key = input.dataset.key;
  if (!key || ['initiator', 'managerId', 'environment', 'comment'].includes(key)) return;
  if (pendingAction) finishConfirmation(false);
  const rowElement = input.closest('.interaction-row');
  const row = rowElement ? request.rows.find((item) => item.key === rowElement.dataset.row) : null;
  const block = input.closest('.system-block');
  const selection = row && block ? row[block.dataset.slot] : null;
  if (key === 'ownerId' && selection && !selection.manual) return;
  // Change на blur не перестраивает список до клика по результату.
  if (key === 'query' && isChange) return;
  const value = input.type === 'checkbox' ? input.checked : input.value;
  if (selection) {
    if (key === 'manual' && isChange) setSystemMode(selection, value);
    else selection[key] = value;
    if (key === 'query') {
      selection.systemId = ''; selection.ownerId = '';
      $('.owner-line', block).innerHTML = ownerLineMarkup(selection); showSearch(input);
    }
    if (key === 'manual' && isChange) { renderRows(); focusInRow(row.key, value ? 'name' : 'query', block.dataset.slot); }
    if (key === 'ownerId' && selection.manual) {
      selection.manualOwnerId = value;
      $('.owner-line', block).innerHTML = ownerLineMarkup(selection);
    }
  } else if (row) {
    row[key] = value;
    if (isChange && ['protocol', 'sourceSystemEnabled'].includes(key)) {
      renderRows();
      if (key === 'protocol') focusInRow(row.key, value === 'other' ? 'customProtocol' : 'protocol');
      else focusInRow(row.key, value ? (row.origin.manual ? 'name' : 'query') : 'sourceSystemEnabled', value ? 'origin' : null);
    }
  } else {
    request.fields[key] = value;
    if (key === 'periodMode' && isChange) { renderCommon(); $(`.field-${value === 'limited' ? 'startDate' : 'periodMode'} .control`).focus({ preventScroll: true }); }
  }
  clearError(input.closest('.field'));
  if (['query', 'ownerId', 'name', 'manual', 'sourceSystemEnabled'].includes(key)) renderRoute();
  persist();
};

/* Сохранённые проверки формата: порт, диапазон, список; даты без прошлого и обратного периода. */
const isValidPort = (value) => {
  const text = String(value).trim().replace(/[–—]/g, '-');
  if (!text) return false;
  return text.split(',').every((part) => {
    const match = part.trim().match(/^(\d{1,5})(?:\s*-\s*(\d{1,5}))?$/);
    if (!match) return false;
    const start = Number(match[1]); const end = match[2] ? Number(match[2]) : start;
    return start >= 1 && end <= 65535 && start <= end;
  });
};
const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` === value;
};
const validateRequest = () => {
  $$('.field', $('.request-form')).forEach(clearError);
  $('.rows-error').textContent = '';
  const errors = [];
  const addError = (key, message, rowKey = null, slot = null) => errors.push({ key, message, rowKey, slot });
  if (!request.rows.length) addError('rows', 'Добавьте хотя бы одно подключение.');
  request.rows.forEach((row) => {
    if (!row.source.trim()) addError('source', 'Укажите источник подключения.', row.key);
    if (!row.destination.trim()) addError('destination', 'Укажите назначение.', row.key);
    if (!row.port.trim()) addError('port', 'Укажите порт.', row.key);
    else if (!isValidPort(row.port)) addError('port', 'Допустимы порты 1–65535. Пример: 443 или 8000-8080.', row.key);
    if (!['TCP', 'UDP', 'other'].includes(row.protocol)) addError('protocol', 'Выберите протокол.', row.key);
    if (row.protocol === 'other' && !row.customProtocol.trim()) addError('customProtocol', 'Укажите название протокола.', row.key);
    if (request.type === 'internal' && !['yes', 'no'].includes(row.pam)) addError('pam', 'Укажите, нужен ли доступ через PAM.', row.key);
    if (request.type === 'external' && !row.proxy.trim()) addError('proxy', 'Укажите сервер или «Не требуется».', row.key);
    const slots = ['target', ...(request.type === 'internal' && row.sourceSystemEnabled ? ['origin'] : [])];
    slots.forEach((slot) => {
      const selection = row[slot];
      if (selection.manual) {
        if (!selection.name.trim()) addError('name', 'Укажите название ИТ-системы.', row.key, slot);
        if (!employee(selection.ownerId)) addError('ownerId', 'Укажите ответственного за систему.', row.key, slot);
      } else if (!system(selection.systemId)) addError('query', 'Выберите ИТ-систему или укажите её вручную.', row.key, slot);
      else if (!employee(systemDetails(selection).ownerId)) addError('query', 'У системы не указан ответственный. Используйте ручной ввод.', row.key, slot);
    });
  });
  request.fields.managerId = DEMO_DATA.profile.managerId;
  if (!employee(request.fields.managerId)) addError('rows', 'В профиле не указан руководитель. Обратитесь в поддержку.');
  const f = request.fields;
  if (!f.justification.trim()) addError('justification', request.type === 'revoke' ? 'Укажите причину закрытия доступа.' : 'Укажите, зачем нужен доступ.');
  const dateRelevant = request.type === 'internal' || (request.type === 'external' && f.periodMode === 'limited');
  if (dateRelevant && (f.endDate || request.type === 'external') && (!isValidDate(f.endDate) || f.endDate < today())) addError('endDate', 'Укажите дату не раньше сегодняшнего дня.');
  if (request.type === 'external' && f.periodMode === 'limited') {
    if (!isValidDate(f.startDate) || f.startDate < today()) addError('startDate', 'Укажите дату не раньше сегодняшнего дня.');
    if (isValidDate(f.endDate) && isValidDate(f.startDate) && f.endDate < f.startDate) addError('endDate', 'Дата окончания должна быть не раньше начала.');
  }
  if (!errors.length) return true;
  const first = errors[0];
  if (first.rowKey) setActiveRow(first.rowKey, false);
  errors.forEach((item) => {
    if (item.key === 'rows') { $('.rows-error').textContent = item.message; return; }
    let root = item.rowKey ? $$('.interaction-row').find((element) => element.dataset.row === item.rowKey) : $('.common-fields');
    if (item.slot && root) root = $$('.system-block', root).find((element) => element.dataset.slot === item.slot);
    markError($(`.field-${item.key}`, root), item.message);
  });
  if (first.key === 'rows') { $('.add-interaction').focus(); $('.rows-error').scrollIntoView({ behavior: 'auto', block: 'center' }); }
  else {
    let root = first.rowKey ? $$('.interaction-row').find((element) => element.dataset.row === first.rowKey) : $('.common-fields');
    if (first.slot && root) root = $$('.system-block', root).find((element) => element.dataset.slot === first.slot);
    const control = $(`.field-${first.key} .control`, root);
    control?.focus(); control?.closest('.field').scrollIntoView({ behavior: 'auto', block: 'center' });
  }
  return false;
};

const accessPeriod = (data = request) => {
  if (data.type === 'revoke') return 'Закрытие доступа';
  if (data.type === 'external' && data.fields.periodMode === 'limited') return `${formatDate(data.fields.startDate)} — ${formatDate(data.fields.endDate)}`;
  return data.type === 'internal' && data.fields.endDate ? `До ${formatDate(data.fields.endDate)}` : 'Бессрочно';
};
const summaryMarkup = (data = request) => `<div class="summary-grid"><dl><dt>Действие</dt><dd>${escapeHTML(REQUEST_TYPES[data.type])}</dd></dl><dl><dt>Срок</dt><dd>${escapeHTML(accessPeriod(data))}</dd></dl><dl class="full-width"><dt>${data.type === 'revoke' ? 'Причина закрытия' : 'Обоснование'}</dt><dd>${escapeHTML(data.fields.justification || 'Не указано')}</dd></dl></div>
  <p class="review-request-meta field-hint">Заявитель: ${escapeHTML(DEMO_DATA.profile.name)} · ${escapeHTML(data.number)}${data.type === 'revoke' && data.fields.reason ? ` · Причина: ${escapeHTML(data.fields.reason)}` : ''}</p>
  <h3>Подключения</h3><div class="summary-table-wrap"><table class="summary-table"><thead><tr><th>Откуда</th><th>Куда</th><th>Порт</th><th>Протокол</th><th>ИТ-система</th></tr></thead><tbody>${data.rows.map((row) => {
    const target = systemDetails(row.target);
    const origin = systemDetails(row.origin);
    return `<tr><td data-label="Откуда">${escapeHTML(row.source)}${data.type === 'internal' && row.sourceSystemEnabled ? `<small>${escapeHTML(origin.name)} · ${escapeHTML(employeeName(origin.ownerId))}</small>` : ''}</td><td data-label="Куда">${escapeHTML(row.destination)}${data.type === 'external' ? `<small>Прокси: ${escapeHTML(row.proxy)}</small>` : ''}</td><td data-label="Порт">${escapeHTML(row.port)}</td><td data-label="Протокол">${escapeHTML(protocolName(row))}${data.type === 'internal' ? `<small>PAM: ${row.pam === 'yes' ? 'Да' : row.pam === 'no' ? 'Нет' : 'Не указано'}</small>` : ''}</td><td data-label="ИТ-система">${escapeHTML(target.name || 'Не выбрана')}<small>${escapeHTML(employeeName(target.ownerId))}</small></td></tr>`;
  }).join('')}</tbody></table></div>`;
const renderReview = () => {
  $('.review-view').innerHTML = `<h2 tabindex="-1">Проверьте заявку</h2>${summaryMarkup()}<div class="review-route"><h3>Согласующие</h3>${routeMarkup()}</div><div class="form-actions"><button class="button primary submit-request" type="button">Отправить на согласование</button><button class="text-button back-to-edit" type="button">Вернуться к редактированию</button></div>`;
};
const prepareReview = () => {
  if (!request || request.status !== 'draft' || !validateRequest()) return;
  renderReview(); showView('review'); persist();
  $('.review-view h2').focus(); $('.page-heading').scrollIntoView({ behavior: 'auto', block: 'start' });
};
const submitRequest = () => {
  if (!request || request.status !== 'draft' || view !== 'review') return;
  if (!validateRequest()) { showView('form'); return; }
  request.approvals = getRoute().map((item) => ({ ...clone(item), decision: 'pending', actorId: '', at: null }));
  transition('pending', 'Заявка отправлена на согласование');
  persist(); renderProcess(); showView('process');
  $('.process-title').focus(); $('.page-heading').scrollIntoView({ behavior: 'auto', block: 'start' });
};
/* В продуктивном SimpleOne эти действия выполняет платформа транзакционно после согласований. */
const createExecutionTicket = () => {
  if (request.ticket) return;
  const snapshot = clone(request); snapshot.ticket = null;
  request.ticket = {
    number: generateNumber('INC'), createdAt: new Date().toISOString(), group: 'Сеть', contactType: 'СЗ',
    template: request.type === 'revoke' ? 'Демонстрационный шаблон отзыва доступа' : 'TI0000117 · СЗ на открытие/предоставление доступа к ИР (демо)',
    subject: `${request.type === 'revoke' ? 'Отзыв' : 'Предоставление'} доступа по запросу № ${request.number} от ${formatTime(request.createdAt)}`,
    description: `${request.type === 'revoke' ? 'Отзыв' : 'Предоставление'} доступа\n\n${request.fields.justification}\n\nЗапрос: ${request.number}\nПодробности — в данных запроса.`,
    requestSnapshot: snapshot
  };
  addHistory(`Создано обращение ${request.ticket.number}, группа исполнения «Сеть»`, 'approved');
};
const decide = (key, decision, actorId = '') => {
  if (!demoMode || !request || request.status !== 'pending') return;
  const approval = request.approvals.find((item) => item.key === key);
  if (!approval || approval.decision !== 'pending' || !['approved', 'rejected'].includes(decision)) return;
  if (approval.kind === 'group' && !approval.members.includes(actorId)) return;
  approval.decision = decision;
  approval.actorId = approval.kind === 'group' ? actorId : approval.employeeId;
  approval.at = new Date().toISOString();
  addHistory(`${approval.name}: ${decision === 'approved' ? 'согласовано' : 'отказ'}${approval.kind === 'group' ? ` · ${employeeName(approval.actorId)}` : ''}`);
  if (decision === 'rejected') transition('rejected', `Получен отказ: ${approval.name}`);
  else if (request.approvals.every((item) => item.decision === 'approved')) {
    transition('approved', 'Все согласования завершились успешно');
    createExecutionTicket();
    transition('closed', 'Запрос автоматически закрыт после передачи на исполнение');
  }
  persist(); renderProcess(); showView('process');
};
const returnToDraft = () => {
  if (!request || !['pending', 'rejected'].includes(request.status)) return;
  transition('draft', 'Возврат в черновик для доработки. При повторной отправке согласование начнётся заново.');
  request.approvals = []; normalizeDraft(request); activeRowKey = request.rows[0]?.key || null;
  persist(); openRequest(); notify('Можно исправить данные и отправить заявку повторно.');
};
const closeRequest = () => {
  if (!request || !['draft', 'rejected'].includes(request.status)) return;
  transition('closed', 'Запрос закрыт инициатором без создания обращения');
  persist(); renderProcess(); showView('process');
};
const approvalMarkup = (approval) => `<div class="approval-item"><div class="approval-identity"><strong>${escapeHTML(displayApproverName(approval))}</strong><small>${escapeHTML(approval.reasons.join('; '))}</small></div>${approval.decision === 'pending' && request.status === 'pending' ? `<div class="approval-buttons">${approval.kind === 'group' ? `<select class="control group-member" data-approval="${escapeHTML(approval.key)}" aria-label="Участник группы ${escapeHTML(displayApproverName(approval))}">${approval.members.map((key) => `<option value="${key}">${escapeHTML(employeeName(key))}</option>`).join('')}</select>` : ''}<button class="button secondary small decision-button" type="button" data-approval="${escapeHTML(approval.key)}" data-decision="approved">Согласовать</button><button class="text-button decision-button" type="button" data-approval="${escapeHTML(approval.key)}" data-decision="rejected">Отклонить</button></div>` : `<div class="decision-label decision-${approval.decision}">${approval.decision === 'approved' ? 'Согласовано' : approval.decision === 'rejected' ? 'Отказ' : 'Не рассмотрено'}${approval.at ? `<small>${escapeHTML(employeeName(approval.actorId))}</small>` : ''}</div>`}</div>`;
const renderProcess = () => {
  const success = request.status === 'closed' && request.ticket;
  const rejected = request.status === 'rejected';
  const title = success ? 'Заявка передана на исполнение' : rejected ? 'Заявка не согласована' : request.status === 'closed' ? 'Запрос закрыт' : 'Заявка отправлена на согласование';
  const description = success ? 'Обращение направлено команде «Сеть». Это ещё не означает, что доступ настроен.' : rejected ? 'Исправьте заявку и отправьте повторно или закройте запрос.' : request.status === 'closed' ? 'Обращение на исполнение не создавалось.' : 'Дальнейшие действия выполняются по маршруту согласования.';
  $('.process-view').innerHTML = `<div class="process-banner ${success ? 'success' : rejected ? 'danger' : 'info'}"><h2 class="process-title" tabindex="-1">${title}</h2><p class="process-description">${description}</p></div>
    <div class="result-meta summary-grid"><dl><dt>Номер заявки</dt><dd>${escapeHTML(request.number)}</dd></dl><dl><dt>Создана</dt><dd>${formatTime(request.createdAt)}</dd></dl><dl><dt>Статус</dt><dd>${escapeHTML(STATUS[request.status])}</dd></dl></div>
    ${request.ticket ? `<div class="ticket-link-panel"><a class="ticket-link" href="#">Обращение ${escapeHTML(request.ticket.number)}</a><p>Команда исполнения: Сеть</p></div>` : ''}
    <details class="request-details"><summary>Посмотреть заявку</summary>${summaryMarkup()}<h3>Согласующие</h3>${routeMarkup(request.approvals.length ? request.approvals : getRoute())}</details>
    ${demoMode && request.approvals.length ? `<div class="process-card"><h3>Имитация согласований</h3><p class="field-hint">Демонстрационные решения, не реальные действия сотрудников Банка.</p><div class="approval-list">${request.approvals.map(approvalMarkup).join('')}</div></div>` : ''}
    <details class="process-history"><summary>История заявки</summary><ol class="history-list">${request.history.map((entry) => `<li class="history-entry"><time>${formatTime(entry.at)}</time><span>${escapeHTML(entry.text)}</span></li>`).join('')}</ol></details>
    <div class="form-actions">${['pending', 'rejected'].includes(request.status) ? '<button class="button secondary return-draft" type="button">Вернуться к редактированию</button>' : ''}${request.status === 'closed' ? '<button class="button primary new-request" type="button">Новая заявка</button>' : ''}</div>
    ${request.status === 'rejected' ? '<button class="text-button close-rejected" type="button">Отменить заявку</button>' : ''}`;
};
const renderTicket = () => {
  if (!request?.ticket) return;
  const ticket = request.ticket;
  $('.ticket-view').innerHTML = `<button class="text-button back-to-process" type="button">Назад к заявке</button><div class="ticket-card"><h2>Обращение ${escapeHTML(ticket.number)}</h2><div class="ticket-meta summary-grid"><dl><dt>Исполнитель</dt><dd>Команда «Сеть»</dd></dl><dl><dt>Создано</dt><dd>${formatTime(ticket.createdAt)}</dd></dl><dl class="full-width"><dt>Задача</dt><dd>${escapeHTML(ticket.description)}</dd></dl></div>${summaryMarkup(ticket.requestSnapshot)}<h3>Полученные согласования</h3>${routeMarkup(ticket.requestSnapshot.approvals)}<p class="field-hint">Создание обращения не подтверждает фактическое предоставление доступа.</p></div>`;
  showView('ticket');
};
const setDemoMode = (enabled) => {
  demoMode = enabled;
  if (!enabled && demoWorkspace) {
    const workspace = demoWorkspace;
    demoWorkspace = null;
    request = clone(workspace.request); drafts = clone(workspace.drafts); savedRequest = clone(workspace.savedRequest);
    activeRowKey = workspace.activeRowKey;
    openRequest();
    if (workspace.view === 'review' && request.status === 'draft') { renderReview(); showView('review'); }
    else if (workspace.view === 'ticket' && request.ticket) renderTicket();
    $('.demo-tools').open = false;
    return;
  }
  if (view === 'process') renderProcess();
  showView(view);
  if (!enabled) $('.demo-tools').open = false;
};
const runDemo = (key) => {
  if (!demoWorkspace) {
    persist();
    demoWorkspace = { request: clone(request), drafts: clone(drafts), savedRequest: clone(savedRequest), activeRowKey, view };
  }
  setDemoMode(true);
  if (key === 'errors') { createRequest('internal'); validateRequest(); return; }
  if (['success', 'rejection'].includes(key)) {
    createRequest('internal', 'internal'); prepareReview(); submitRequest();
    if (key === 'success') request.approvals.map((item) => ({ key: item.key, actor: item.kind === 'group' ? item.members[0] : '' })).forEach((item) => decide(item.key, 'approved', item.actor));
    else decide(`person:${request.fields.managerId}`, 'rejected');
  } else createRequest(DEMO_DATA.scenarios[key].type, key);
  $('.page-heading').scrollIntoView({ behavior: 'auto', block: 'start' });
};
const chooseReason = (reason) => {
  finishConfirmation(false);
  const templates = { 'Завершён пилот': 'Пилот завершён, доступ больше не нужен.', 'Доступ больше не нужен': 'Доступ утратил актуальность.', 'Система выведена из эксплуатации': 'Система выведена из эксплуатации, доступ нужно закрыть.', 'Другая причина': '' };
  const text = templates[reason] || '';
  const previous = request.fields.reasonTemplate || '';
  request.fields.reason = reason;
  request.fields.justification = previous && request.fields.justification.includes(previous) ? request.fields.justification.replace(previous, text).trim() : `${text}${request.fields.justification ? `\n${request.fields.justification}` : ''}`.trim();
  request.fields.reasonTemplate = text;
  renderCommon(); persist(); $('.field-justification .control').focus();
};

/* События делегируются исключительно по классам. */
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.closest('.confirm-replace')) { finishConfirmation(true); return; }
  if (target.closest('.cancel-replace')) { finishConfirmation(false); return; }
  if (target.closest('.js-home')) { event.preventDefault(); openRequest(); return; }
  if (target.closest('.developer-entry')) { setDemoMode(true); $('.demo-tools').open = true; return; }
  const demo = target.closest('.demo-button');
  if (demo) {
    if (!demoMode) return;
    const key = demo.dataset.demo;
    const type = ['errors', 'success', 'rejection'].includes(key) ? 'internal' : DEMO_DATA.scenarios[key].type;
    const overwritten = request.type === type && request.status === 'draft' ? request : drafts[type];
    if (demoWorkspace && hasEnteredData(overwritten)) requestConfirmation('Этот пример заменит заполненные данные в деморежиме. Обычная заявка не изменится. Продолжить?', () => runDemo(key));
    else runDemo(key);
    return;
  }
  if (target.closest('.enable-demo')) { setDemoMode(true); return; }
  if (target.closest('.exit-demo')) { setDemoMode(false); return; }
  const option = target.closest('.search-option');
  if (option) { chooseSystem(option); return; }
  if (!target.closest('.system-field')) closeSearches();
  const rowElement = target.closest('.interaction-row');
  if (target.closest('.edit-interaction') && request.status === 'draft') { setActiveRow(rowElement.dataset.row); return; }
  if (target.closest('.collapse-interaction') && request.status === 'draft') { setActiveRow(null, false); $('.edit-interaction', rowElement).focus(); return; }
  if (target.closest('.delete-interaction') && request.status === 'draft') {
    const key = rowElement.dataset.row;
    if (hasRowData(request.rows.find((row) => row.key === key))) requestConfirmation('Данные этого подключения будут удалены. Остальные данные заявки сохранятся.', () => removeInteraction(key), { title: 'Удалить подключение?', confirm: 'Удалить подключение', cancel: 'Оставить подключение' });
    else removeInteraction(key);
    return;
  }
  if (target.closest('.add-interaction')) { addInteraction(); return; }
  const reason = target.closest('.reason-chip');
  if (reason && request.status === 'draft') { chooseReason(reason.dataset.reason); return; }
  if (target.closest('.save-draft')) {
    const saved = persist(); notify(demoWorkspace ? 'Пример сохранён в памяти деморежима. При выходе восстановится обычная заявка.' : saved ? 'Черновик сохранён в этом браузере.' : 'Хранилище недоступно. Не закрывайте страницу: изменения пока в памяти.', saved ? 'success' : 'error'); return;
  }
  if (target.closest('.close-draft, .close-rejected')) {
    if (hasEnteredData(request)) requestConfirmation('Заявка будет закрыта без отправки на исполнение. Чтобы продолжить заполнение, оставьте её открытой.', closeRequest, { title: 'Отменить заявку?', confirm: 'Отменить заявку', cancel: 'Продолжить заполнение' });
    else closeRequest();
    return;
  }
  if (target.closest('.back-to-edit') && request.status === 'draft') { showView('form'); return; }
  if (target.closest('.submit-request')) { submitRequest(); return; }
  const decision = target.closest('.decision-button');
  if (decision && demoMode) { decide(decision.dataset.approval, decision.dataset.decision, $('.group-member', decision.closest('.approval-item'))?.value || ''); return; }
  if (target.closest('.return-draft')) { returnToDraft(); return; }
  if (target.closest('.ticket-link')) { event.preventDefault(); renderTicket(); return; }
  if (target.closest('.back-to-process')) { renderProcess(); showView('process'); return; }
  if (target.closest('.new-request')) {
    if (hasEnteredData(drafts.internal)) requestConfirmation('Новая заявка заменит сохранённый внутренний черновик. Продолжить?', () => createRequest('internal'));
    else createRequest('internal');
    return;
  }
});
document.addEventListener('submit', (event) => { if (event.target.matches('.request-form')) { event.preventDefault(); prepareReview(); } });
document.addEventListener('input', (event) => { if (event.target.matches('.control') && !['checkbox', 'select-one'].includes(event.target.type)) updateFromControl(event.target); });
document.addEventListener('change', (event) => {
  const input = event.target;
  if (input.matches('.type-radio')) { switchType(input.value); return; }
  if (input.matches('.additional-checkbox') && request.status === 'draft') {
    finishConfirmation(false);
    request.extras = input.checked ? [...new Set([...request.extras, input.dataset.person])] : request.extras.filter((key) => key !== input.dataset.person);
    persist(); $('.route-content').innerHTML = routeMarkup();
  } else if (input.matches('.control')) updateFromControl(input, true);
});
document.addEventListener('focusin', (event) => { if (event.target.matches('.system-search')) showSearch(event.target); });
document.addEventListener('pointerdown', () => { pointerNavigation = true; }, true);
document.addEventListener('pointerup', () => { setTimeout(() => { pointerNavigation = false; }, 0); }, true);
document.addEventListener('pointercancel', () => { pointerNavigation = false; }, true);
document.addEventListener('focusout', (event) => {
  const block = event.target.closest('.system-field');
  // При клике список закрывает click-handler: нельзя сдвигать цель между pointerdown и click.
  if (block && !pointerNavigation && !block.contains(event.relatedTarget)) closeSearches();
});
document.addEventListener('keydown', (event) => {
  pointerNavigation = false;
  if (event.key === 'Escape') { closeSearches(); return; }
  const input = event.target.closest('.system-search');
  const option = event.target.closest('.search-option');
  if (!input && !option) return;
  const root = event.target.closest('.system-field');
  if (input && event.key === 'ArrowDown') { event.preventDefault(); showSearch(input); $('.search-option', root)?.focus(); }
  else if (option && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
    event.preventDefault(); const options = $$('.search-option', root);
    const index = options.indexOf(option) + (event.key === 'ArrowDown' ? 1 : -1);
    if (index < 0) $('.system-search', root).focus(); else options[Math.min(index, options.length - 1)]?.focus();
  } else if (input && event.key === 'Enter') { event.preventDefault(); const first = $('.search-option', root); if (first && !$('.search-results', root).classList.contains('is-hidden')) chooseSystem(first); }
});
window.addEventListener('beforeunload', (event) => {
  if (unsavedChanges && (hasEnteredData(request) || Object.values(drafts).some(hasEnteredData))) { event.preventDefault(); event.returnValue = ''; }
});
loadSaved();
if (savedRequest) { request = clone(savedRequest); activeRowKey = request.rows[0]?.key || null; openRequest(); }
else createRequest('internal');
if (!storageAvailable) notify('Хранилище браузера недоступно. Не закрывайте страницу с заполненными данными.', 'error');

</script>
</body>
</html>
