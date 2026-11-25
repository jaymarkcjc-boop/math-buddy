## v0.1.1 update
A persistent, clearly labeled Preferred Language bar now appears above navigation. Choose English, Filipino, or Bisaya before or during practice. Language selection is saved locally. Some administrative and integration text remains English.

# Project MATH-BUDDY — v0.1 research prototype
Grade 8 • Integers, fractions and decimals • Mobile-first PWA

## 1. Quick start on your MacBook (no npm, subscriptions, or AI key)
1. Extract the ZIP. In Finder, open the extracted `math-buddy` folder.
2. Open Terminal. Type `cd ` (including the space), drag the `math-buddy` folder into Terminal, and press Return.
3. Run `python3 --version`. If Python is not installed, obtain Python 3 from https://www.python.org/downloads/macos/ or use another approved static web server.
4. Run `python3 -m http.server 8000 --bind 127.0.0.1` from inside the folder. Keep that Terminal window open.
5. Open http://localhost:8000/ in Chrome or Safari. Use code `DEMO01`, not a real learner's name or LRN.
6. Choose operation, number type, level (Adaptive or fixed), and practice or independent check. Start the session. The Teacher tab displays only records stored in this browser. Export Excel to obtain a real `.xlsx` workbook.
7. Stop the server with Control+C when done. Browser data stays in that same browser/origin unless cleared or evicted.

A separate single-file `MATH-BUDDY_Quick_Preview.html` is provided outside the source ZIP for a quick desktop trial. Open it in a normal browser after downloading. Local-file browser storage behavior varies; use the served PWA for reliable testing. The quick preview is not itself an installable PWA and is not a hosted URL.

## 2. Use on Android and iOS
The laptop localhost address is not accessible from another phone. Deploy the extracted app folder to a school-approved static web host with HTTPS (e.g. an approved GitHub Pages or static hosting account). Do not publish real student records or secrets. The app has no server dependency for its core features.

Example GitHub Pages workflow (public code only, if permitted by school):
1. Create a repository in your own account, e.g. math-buddy. Upload the contents of `math-buddy` (index.html must be at repository root). Do not upload research data.
2. In repository Settings → Pages, select Deploy from a branch; select the main branch and / (root), then save. Obtain the actual published HTTPS URL from Pages. The menus and availability depend on your account and organization.
3. Open that published URL in Android Chrome. Use browser menu → Install app or Add to Home screen (wording varies).
4. Open the same published URL in iPhone Safari. Tap Share → Add to Home Screen, then Add. If the option is unavailable, open in Safari instead of an in-app browser.
5. Load the application online once. Wait for the service worker to install. Reopen online once, then try airplane mode and reopen to test offline use. Reconnect for optional online features.
6. Test on actual devices before inviting participants. The app stores data separately on each browser/device. Reinstalling, clearing site storage, private browsing, or OS storage eviction can remove progress. Export regularly.

References: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable ; https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing ; https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 3. What is implemented
- Responsive Messenger-inspired chat UI, selectable English/Filipino/Bisaya learner navigation and tutoring feedback. Some administrative labels and visual captions remain English; have language content validated by teachers.
- Local code-based profiles with saved progress, session resume, profile switching (not identity verification or secure accounts).
- 12 skill families (4 operations × 3 number types), three difficulty levels, randomly generated problems. Exact arithmetic using BigInt rational numbers; accepts equivalent fractions, finite decimals, mixed numbers and integers. Repeating decimals require exact fractions. No expression evaluator or eval.
- Guided practice: 5 items, a hint after an error, second attempt, then verified worked answer. Visual aids include fraction magnitude strips, integer number lines (operand markers) and decimal place-value tables; these are not complete step-by-step visual solutions for every operation. Generic feedback for errors not recognized by the rule engine.
- Adaptive practice: per operation/type, three successive unaided correct completed items at current level raise difficulty one step; two successive non-unaided completed items at that level lower it one step. Level is bounded 1–3. Fixed-level independent checks do not change adaptive levels.
- Independent check: 10 items, one attempt per item, no app hints or answer feedback until finished. Adaptive selection uses fixed level 2 for these checks. These are not validated or proctored research tests.
- Achievements and points: 10 for correct without help at first attempt, 5 for correct after help/retry, 0 for unresolved items. Badges based on completion, accuracy and operation coverage.
- Dashboard and actual Excel export: Learners, Attempts, Sessions and Read me sheets. Each attempt includes timestamp, skill, difficulty, exact expected answer, student response, outcome, error category, whether assistance preceded it, and elapsed wall-clock seconds. Visual/AI assistance counts as help. No answer data leaves the device unless deliberately exported or the optional AI endpoint is used (question text only, no student identifier).
- Offline shell and tutor using a service worker on HTTPS/localhost after initial online load. No external JavaScript or CSS dependencies. Local storage is not guaranteed durable.
- Photo attachment (≤5 MB): local IndexedDB image save, preview, download and delete. Teacher view shows locally saved images only, with manual review. JPEG/PNG recommended; HEIC preview depends on browser support. No remote upload, OCR or automated grading.
- Messenger page shortcut (m.me username/ID), and device share sheet / copy link for sending the published URL. No Messenger conversation bot yet.
- Optional AI explanation hook. Disabled until the teacher configures an HTTPS endpoint; not a bundled AI model. Verified local math engine always evaluates answers.

## 4. Optional AI: backend contract (not included as a live service)
In Settings enter the HTTPS URL of your approved AI proxy, not an API key. The client sends a POST containing only:
```json
{"question":"1/2 + 1/3","language":"en","request":"Give a short hint, do not reveal the final answer."}
```
Return JSON with a string `hint`, e.g. `{"hint":"Look for a common denominator."}`. A cross-origin endpoint must allow your exact PWA origin via CORS and handle OPTIONS. Same-origin is preferable. AI assistance is recorded before the request; errors fall back to local hints. AI explanations are marked unverified and cannot change the answer checker. The prototype has no authenticated proxy and no safe live AI service supplied. Before connecting a model, implement authentication, rate limits, teacher-validated outputs, moderation, logging minimization, HTTPS, and server-side secret storage. Do not send names, LRNs, photos or grades to an AI provider. Restrict any online AI use to the approved research protocol.

## 5. Messenger integration: what remains
In Settings, enter an authorized school Page username or ID. Open Messenger Page launches https://m.me/<username>. Share app link opens the OS share sheet when supported. Choose Messenger manually; no automatic messages are sent. For a real bot inside Messenger, create an approved Page and Meta developer app, configure a public HTTPS webhook with verification and signature validation, obtain permissions and Page token (server-side only), handle incoming messages, use Send API, and complete any applicable Meta review. Implement account linking and consent before syncing data. Follow current Meta platform policies and age eligibility. Official docs: https://developers.facebook.com/docs/messenger-platform/ and https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-pages

## 6. Production backend roadmap (required before student deployment)
1. Choose school-approved database/authentication hosting. Replace local profile codes with individually authenticated learner accounts and teacher accounts. Server authorization: learners read only their own records; authorized teachers access assigned participants. Use randomized codes for research exports.
2. Store attempts, sessions, skills and consent status in protected tables. Assign server-validated IDs and timestamps, validate scores independently server-side, use idempotent sync and offline queues. Separate identity mapping from coded research data. Avoid logging unrelated private conversations.
3. Implement protected photo storage, upload limits, file-type validation and retention/deletion policies. Require access controls and secure URLs. Teacher assessment/manual feedback workflow. No automatic photo grading until separately validated.
4. Build authenticated teacher dashboard with grade/section filters, research exports, audit log, backups and data retention. Do not publish a dashboard with student data. Establish approved procedures for deletion and access requests.
5. Add AI proxy and Messenger webhook only if necessary and approved. Test prompt behavior, incorrect hints, age suitability, privacy, accessibility, poor connections and unsupported devices.
6. Test on Android and iOS, including offline synchronization, independent checks, screen-reader/keyboard accessibility, real-device storage limits and app upgrades. Establish a documented version for the research. Obtain school/ethics approval, consent and assent before using with minors. Provide an equivalent offline remediation option.

## 7. Research implementation notes
Use fictitious data only in this prototype. Local profile switching and Teacher tab are not password-protected. Anyone with access to the browser can see data or change it. Do not use for real student records yet. Treat the in-app score as practice process data, not the main research outcome. Use separately validated parallel pretest/posttest under supervised conditions, and weekly independent mastery tests. The exported records are not tamper-resistant. The random question generator is not a validated item bank; content experts must review questions and hints. Document the deployed app version, adaptations and instructional exposure. The app is a proof of concept, not yet a production intervention.

## 8. File map and tests
- `index.html` — app entry; `style.css` — responsive styles; `app.js` — UI, local storage, photos, optional integrations and export.
- `engine.js` — exact rational engine, generation and common-error detection; `xlsx.js` — dependency-free Excel writer.
- `manifest.webmanifest`, `sw.js`, icons — installation and offline assets.
- `test-engine.cjs` — run `node test-engine.cjs` (Node.js 18+). Tests 3,600 generated questions and parser/arithmetic/error checks.
- `test-smoke.cjs` — run `node test-smoke.cjs` for non-browser UI/data-flow checks and sample XLSX file in your OS temp directory.
- `TEST_CHECKLIST.md` — manual device and research-readiness checks.

Browser end-to-end testing was attempted but blocked by the build environment's browser administrator policy. Native phone installation and physical-device offline behavior are not yet verified. The generated source and offline design need actual browser testing; do not treat a unit test as device certification.
