const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const navSectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const revealElements = [...document.querySelectorAll(".reveal")];
const featuredProjectsElement = document.getElementById("featured-projects");
const allProjectsGrid = document.getElementById("all-projects-grid");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const searchInput = document.querySelector("[data-search]");
const resultTitle = document.querySelector("[data-result-title]");
const visibleCountElement = document.querySelector("[data-visible-count]");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitLabel = document.querySelector("[data-submit-label]");
const apiStatus = document.getElementById("api-status");
const yearElement = document.getElementById("year");
const languageSwitcher = document.getElementById("language-switcher");
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.querySelector("[data-theme-label]");
const metaDescription = document.querySelector('meta[name="description"]');

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@j_edit-b5";
const YOUTUBE_INVITE_KEY = "muxtorjon-youtube-invite-seen";
const LANGUAGE_KEY = "muxtorjon-language";
const THEME_KEY = "muxtorjon-theme";

const translations = {
  uz: {
    "meta.homeTitle": "Muxtorjon | Portfolio",
    "meta.homeDescription": "Muxtorjon portfolio sayti, sodda HTML, CSS va JavaScript tuzilmasida yaratilgan.",
    "meta.projectsTitle": "Muxtorjon | Loyihalar",
    "meta.projectsDescription": "Muxtorjon loyihalar sahifasi, filter va qidiruv bilan.",
    "nav.home": "Bosh sahifa",
    "nav.about": "Men haqimda",
    "nav.skills": "Ko'nikmalar",
    "nav.projects": "Loyihalar",
    "nav.contact": "Aloqa",
    "nav.portfolio": "Portfolio",
    "nav.browse": "Ko'rish",
    "controls.language": "Til",
    "controls.langUz": "O'zbek",
    "controls.langEn": "English",
    "controls.langRu": "�������",
    "controls.theme": "Tema",
    "controls.dark": "Qorong'i",
    "controls.light": "Yorug'",
    "metrics.projects": "Jami loyihalar",
    "metrics.categories": "Loyiha kategoriyalari",
    "metrics.featured": "Tanlangan loyihalar",
    "filters.all": "Barchasi",
    "filters.web": "Web",
    "filters.python": "Python",
    "filters.java": "Java",
    "filters.telegram": "Telegram",
    "home.heroEyebrow": "Portfolio bosh sahifasi",
    "home.heroTitle": "Portfolio alohida, loyihalar esa o'zining maxsus sahifasida.",
    "home.heroText": "Asosiy sahifa endi sizning tanishtiruv, skill va aloqa qismlaringiz uchun ishlaydi. Barcha loyihalar esa bitta alohida sahifada boshqariladi, qidiriladi va filter qilinadi.",
    "home.heroPrimary": "Loyihalar sahifasini ochish",
    "home.heroSecondary": "Men bilan bog'lanish",
    "home.setupLabel": "Hozirgi tuzilma",
    "home.setupItem1": "Portfolio bitta asosiy sahifada",
    "home.setupItem2": "Loyihalar alohida sahifada",
    "home.setupItem3": "Hammasi bitta CSS va JS fayl bilan ishlaydi",
    "home.aboutEyebrow": "Men haqimda",
    "home.aboutTitle": "Sodda tuzilma, qulay yangilanish va toza navigatsiya.",
    "home.aboutText1": "Bu tuzilma bilan portfolio va loyiha katalogi bir-biriga aralashmaydi. Siz portfolio dizaynini alohida, loyihalar ro'yxatini esa alohida boshqarishingiz mumkin.",
    "home.aboutText2": "Loyiha ma'lumotlari hamon <strong>data/projects.json</strong> ichida saqlanadi, shuning uchun yangi ish qo'shish jarayoni osonligicha qoladi.",
    "home.aboutCard1Title": "Toza portfolio",
    "home.aboutCard1Text": "Asosiy sahifa faqat sizni tanishtiradi.",
    "home.aboutCard2Title": "Alohida loyihalar",
    "home.aboutCard2Text": "Barcha ishlar alohida sahifada ko'rsatiladi.",
    "home.aboutCard3Title": "Oson tahrirlash",
    "home.aboutCard3Text": "Frontend hanuz asosiy 3 faylda boshqariladi.",
    "home.skillsEyebrow": "Ko'nikmalar",
    "home.skillsTitle": "Ko'rsatilayotgan ishlar ortidagi vositalar va kuchli tomonlar.",
    "home.skillHtml": "HTML va semantik tuzilma",
    "home.skillCss": "CSS va responsiv dizayn",
    "home.skillJs": "JavaScript interaktivliklari",
    "home.skillNode": "Node.js backend asoslari",
    "home.skillsCardEyebrow": "Loyihalar sahifasi",
    "home.skillsCardTitle": "Alohida loyihalar sahifasi qanday ishlaydi",
    "home.skillsCardItem1": "Barcha loyihalar <strong>data/projects.json</strong> dan yuklanadi",
    "home.skillsCardItem2": "Filter va qidiruv maxsus loyihalar sahifasida ishlaydi",
    "home.skillsCardItem3": "Portfolio esa shaxsiy brending uchun toza qoladi",
    "home.previewEyebrow": "Loyihalar sahifasi",
    "home.previewTitle": "Loyihalar endi portfolio ichida emas, alohida sahifada turadi.",
    "home.previewText": "Alohida sahifada barcha ishlaringizni filter, qidiruv va kartalar bilan ko'rish mumkin. Portfolio esa toza va ixcham ko'rinishda qoladi.",
    "home.previewPrimary": "Loyihalarga o'tish",
    "home.previewSecondary": "Sayt buyurtma qilish",
    "home.contactEyebrow": "Aloqa",
    "home.contactTitle": "Loyiha tafsilotlarini portfolio sahifasining o'zidan yuboring.",
    "home.contactText": "Agar Node backend ishlayotgan bo'lsa, bu forma xabarlarni saqlaydi. Agar ishlamasa ham sahifa statik frontend sifatida ishlaydi va backend offline ekanini bildiradi.",
    "home.contactGithub": "GitHub",
    "home.contactProjectsPage": "Loyihalar sahifasi",
    "home.contactApiStatus": "API holati",
    "home.formName": "Ism",
    "home.formNamePlaceholder": "Ismingiz va familiyangiz",
    "home.formEmail": "Email",
    "home.formEmailPlaceholder": "you@example.com",
    "home.formProjectType": "Loyiha turi",
    "home.formTypePortfolio": "Portfolio sayti",
    "home.formTypeLanding": "Landing page",
    "home.formTypeBusiness": "Biznes sayti",
    "home.formTypeCustom": "Maxsus loyiha",
    "home.formMessage": "Xabar",
    "home.formMessagePlaceholder": "Sayt haqida, kerakli funksiyalar yoki muddat haqida yozing...",
    "home.formSubmit": "Xabar yuborish",
    "projects.heroEyebrow": "Alohida loyihalar sahifasi",
    "projects.heroTitle": "Barcha loyihalaringiz bitta maxsus sahifada.",
    "projects.heroText": "Bu sahifa faqat loyihalar uchun. Bu yerda featured kartalar, category filterlar va qidiruv bir joyda ishlaydi.",
    "projects.heroPrimary": "Loyihalarni ko'rish",
    "projects.heroSecondary": "Loyiha boshlash",
    "projects.featuredEyebrow": "Tanlangan ishlar",
    "projects.featuredTitle": "Ma'lumotlar manbasidan ajratib ko'rsatilgan loyihalar.",
    "projects.loadingFeatured": "Tanlangan loyihalar yuklanmoqda...",
    "projects.explorerEyebrow": "Loyiha ko'ruvchi",
    "projects.explorerTitle": "Barcha loyihalarni filter va qidiruv orqali ko'ring.",
    "projects.searchLabel": "Loyihalarni qidirish",
    "projects.searchPlaceholder": "Nomi, texnologiyasi yoki status bo'yicha qidiring",
    "projects.filteredEyebrow": "Filtrlangan natijalar",
    "projects.matchingProjects": "mos loyiha",
    "projects.loadingAll": "Loyihalar yuklanmoqda...",
    "projects.backEyebrow": "Portfolio'ga qaytish",
    "projects.backTitle": "Portfolio sahifasi alohida, aloqa esa o'sha yerda qoladi.",
    "projects.backText": "Agar mijoz yoki mehmon siz haqingizda o'qimoqchi bo'lsa, portfolio sahifaga qaytadi. Ishlaringizni ko'rmoqchi bo'lsa, shu maxsus sahifada qoladi.",
    "projects.backPrimary": "Portfolio'ni ochish",
    "projects.backSecondary": "Aloqa bo'limi",
    "projects.footerPage": "Loyihalar sahifasi: projects.html",
    "projects.allProjects": "Barcha loyihalar",
    "projects.resultWord": "loyihalari",
    "footer.files": "Asosiy frontend fayllari: index.html, style.css, main.js",
    "footer.rights": "Barcha huquqlar himoyalangan.",
    "overlay.eyebrow": "Birinchi tashrif",
    "overlay.title": "Bizning YouTube kanalimizga obuna bo'ling",
    "overlay.text": "Yangi darslar, edit videolar va foydali kontentlarni o'tkazib yubormaslik uchun <strong>j_edit-b5</strong> kanaliga obuna bo'ling.",
    "overlay.subscribe": "Obuna bo'lish",
    "overlay.dismiss": "Portfolio'ga kirish",
    "overlay.hint": "Bu oyna faqat birinchi kirganingizda ko'rinadi.",
    "project.noFeatured": "Hozircha tanlangan loyihalar yo'q.",
    "project.noMatch": "Bu filter bo'yicha loyiha topilmadi.",
    "project.dataUnavailable": "Loyiha ma'lumotlari yuklanmadi.",
    "project.listUnavailable": "Loyihalar ro'yxati yuklanmadi.",
    "project.linkDemo": "Demo",
    "project.linkRepo": "Repo",
    "project.linkTutorial": "Darslik",
    "project.linksSoon": "Havolalar tez orada",
    "status.live": "Faol",
    "status.inProgress": "Jarayonda",
    "status.comingSoon": "Tez orada",
    "status.ready": "Tayyor",
    "system.apiOnline": "Backend onlayn - {count} ta loyiha yuklandi",
    "system.staticMode": "Statik rejim - {count} ta loyiha yuklandi",
    "system.dataUnavailable": "Ma'lumot mavjud emas",
    "system.sending": "Xabar yuborilmoqda...",
    "system.sendingButton": "Yuborilmoqda...",
    "system.sendSuccess": "Xabaringiz muvaffaqiyatli yuborildi.",
    "system.backendOffline": "Backend ishlamayapti. Frontend ishlaydi, lekin formani saqlash uchun node server.js kerak.",
    "system.errorRequired": "Ism, email va xabar majburiy.",
    "system.errorEmail": "Iltimos, to'g'ri email kiriting.",
    "system.errorSend": "Xabarni yuborib bo'lmadi."
  },
  en: {
    "meta.homeTitle": "Muxtorjon | Portfolio",
    "meta.homeDescription": "Muxtorjon portfolio website built with a simple HTML, CSS and JavaScript structure.",
    "meta.projectsTitle": "Muxtorjon | Projects",
    "meta.projectsDescription": "Muxtorjon projects page with filtering and search.",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.portfolio": "Portfolio",
    "nav.browse": "Browse",
    "controls.language": "Language",
    "controls.langUz": "O'zbek",
    "controls.langEn": "English",
    "controls.langRu": "�������",
    "controls.theme": "Theme",
    "controls.dark": "Dark",
    "controls.light": "Light",
    "metrics.projects": "Total projects",
    "metrics.categories": "Project categories",
    "metrics.featured": "Featured projects",
    "filters.all": "All",
    "filters.web": "Web",
    "filters.python": "Python",
    "filters.java": "Java",
    "filters.telegram": "Telegram",
    "home.heroEyebrow": "Portfolio home",
    "home.heroTitle": "The portfolio stays separate, and projects live on their own dedicated page.",
    "home.heroText": "The main page now works for your introduction, skills, and contact sections. All projects are managed, searched, and filtered on a separate page.",
    "home.heroPrimary": "Open projects page",
    "home.heroSecondary": "Contact me",
    "home.setupLabel": "Current setup",
    "home.setupItem1": "Portfolio on one main page",
    "home.setupItem2": "Projects on a separate page",
    "home.setupItem3": "Everything runs with one CSS and one JS file",
    "home.aboutEyebrow": "About",
    "home.aboutTitle": "Simple structure, easier updates, and cleaner navigation.",
    "home.aboutText1": "With this structure, the portfolio and the project catalog do not mix together. You can manage the portfolio design and the project list separately.",
    "home.aboutText2": "Project data is still stored inside <strong>data/projects.json</strong>, so adding new work remains easy.",
    "home.aboutCard1Title": "Clean portfolio",
    "home.aboutCard1Text": "The main page focuses on introducing you.",
    "home.aboutCard2Title": "Separate projects",
    "home.aboutCard2Text": "All works are shown on a dedicated page.",
    "home.aboutCard3Title": "Easy editing",
    "home.aboutCard3Text": "The frontend is still managed from the main 3 files.",
    "home.skillsEyebrow": "Skills",
    "home.skillsTitle": "The tools and strengths behind the work you show.",
    "home.skillHtml": "HTML and semantic structure",
    "home.skillCss": "CSS and responsive design",
    "home.skillJs": "JavaScript interactions",
    "home.skillNode": "Node.js backend basics",
    "home.skillsCardEyebrow": "Projects page",
    "home.skillsCardTitle": "How the separate projects page works",
    "home.skillsCardItem1": "All projects load from <strong>data/projects.json</strong>",
    "home.skillsCardItem2": "Filters and search work on the dedicated projects page",
    "home.skillsCardItem3": "The portfolio stays clean for personal branding",
    "home.previewEyebrow": "Projects page",
    "home.previewTitle": "Projects no longer sit inside the portfolio. They have their own page.",
    "home.previewText": "On the dedicated page, all your work can be explored with filters, search, and cards. The portfolio stays clean and compact.",
    "home.previewPrimary": "Go to projects",
    "home.previewSecondary": "Request a website",
    "home.contactEyebrow": "Contact",
    "home.contactTitle": "Send project details directly from the portfolio page.",
    "home.contactText": "If the Node backend is running, this form saves messages. If not, the page still works as a static frontend and shows that the backend is offline.",
    "home.contactGithub": "GitHub",
    "home.contactProjectsPage": "Projects page",
    "home.contactApiStatus": "API status",
    "home.formName": "Name",
    "home.formNamePlaceholder": "Your full name",
    "home.formEmail": "Email",
    "home.formEmailPlaceholder": "you@example.com",
    "home.formProjectType": "Project type",
    "home.formTypePortfolio": "Portfolio website",
    "home.formTypeLanding": "Landing page",
    "home.formTypeBusiness": "Business site",
    "home.formTypeCustom": "Custom project",
    "home.formMessage": "Message",
    "home.formMessagePlaceholder": "Tell me about the site, required features, or deadline...",
    "home.formSubmit": "Send message",
    "projects.heroEyebrow": "Dedicated projects page",
    "projects.heroTitle": "All your projects in one dedicated place.",
    "projects.heroText": "This page is only for projects. Featured cards, category filters, and search all work here together.",
    "projects.heroPrimary": "Browse projects",
    "projects.heroSecondary": "Start a project",
    "projects.featuredEyebrow": "Featured work",
    "projects.featuredTitle": "Highlighted projects pulled from the data source.",
    "projects.loadingFeatured": "Loading featured projects...",
    "projects.explorerEyebrow": "Project explorer",
    "projects.explorerTitle": "Browse all projects with filters and search.",
    "projects.searchLabel": "Search projects",
    "projects.searchPlaceholder": "Search by name, technology, or status",
    "projects.filteredEyebrow": "Filtered results",
    "projects.matchingProjects": "matching projects",
    "projects.loadingAll": "Loading projects...",
    "projects.backEyebrow": "Back to portfolio",
    "projects.backTitle": "The portfolio page stays separate, and contact remains there.",
    "projects.backText": "If a client or visitor wants to read about you, they return to the portfolio page. If they want to see your work, they stay on this dedicated page.",
    "projects.backPrimary": "Open portfolio",
    "projects.backSecondary": "Contact section",
    "projects.footerPage": "Projects page: projects.html",
    "projects.allProjects": "All projects",
    "projects.resultWord": "projects",
    "footer.files": "Main frontend files: index.html, style.css, main.js",
    "footer.rights": "All rights reserved.",
    "overlay.eyebrow": "First visit",
    "overlay.title": "Subscribe to our YouTube channel",
    "overlay.text": "To avoid missing new lessons, edit videos, and useful content, subscribe to the <strong>j_edit-b5</strong> channel.",
    "overlay.subscribe": "Subscribe",
    "overlay.dismiss": "Enter portfolio",
    "overlay.hint": "This screen appears only on your first visit.",
    "project.noFeatured": "No featured projects are available yet.",
    "project.noMatch": "No projects matched this filter yet.",
    "project.dataUnavailable": "Project data could not be loaded.",
    "project.listUnavailable": "Project list could not be loaded.",
    "project.linkDemo": "Demo",
    "project.linkRepo": "Repo",
    "project.linkTutorial": "Tutorial",
    "project.linksSoon": "Links coming soon",
    "status.live": "Live",
    "status.inProgress": "In progress",
    "status.comingSoon": "Coming soon",
    "status.ready": "Ready",
    "system.apiOnline": "Backend online - {count} projects loaded",
    "system.staticMode": "Static mode - {count} projects loaded",
    "system.dataUnavailable": "Data unavailable",
    "system.sending": "Sending message...",
    "system.sendingButton": "Sending...",
    "system.sendSuccess": "Your message was sent successfully.",
    "system.backendOffline": "Backend is not running. Frontend works, but form saving needs node server.js.",
    "system.errorRequired": "Name, email, and message are required.",
    "system.errorEmail": "Please enter a valid email address.",
    "system.errorSend": "Unable to send message."
  },
  ru: {
    "meta.homeTitle": "Muxtorjon | ���������",
    "meta.homeDescription": "����-��������� Muxtorjon, ��������� �� ������� ��������� HTML, CSS � JavaScript.",
    "meta.projectsTitle": "Muxtorjon | �������",
    "meta.projectsDescription": "�������� �������� Muxtorjon � ����������� � �������.",
    "nav.home": "�������",
    "nav.about": "��� ���",
    "nav.skills": "������",
    "nav.projects": "�������",
    "nav.contact": "��������",
    "nav.portfolio": "���������",
    "nav.browse": "��������",
    "controls.language": "����",
    "controls.langUz": "O'zbek",
    "controls.langEn": "English",
    "controls.langRu": "�������",
    "controls.theme": "����",
    "controls.dark": "������",
    "controls.light": "�������",
    "metrics.projects": "����� ��������",
    "metrics.categories": "��������� ��������",
    "metrics.featured": "��������� �������",
    "filters.all": "���",
    "filters.web": "Web",
    "filters.python": "Python",
    "filters.java": "Java",
    "filters.telegram": "Telegram",
    "home.heroEyebrow": "������� �������� ���������",
    "home.heroTitle": "��������� ��������, � ������� ��������� �� ����� ��������� ��������.",
    "home.heroText": "������� �������� ������ �������� ��� ������ �������������, ������� � ���������. ��� ������� �����������, ������ � ����������� �� ��������� ��������.",
    "home.heroPrimary": "������� �������� ��������",
    "home.heroSecondary": "��������� �� ����",
    "home.setupLabel": "������� ���������",
    "home.setupItem1": "��������� �� ����� �������� ��������",
    "home.setupItem2": "������� �� ��������� ��������",
    "home.setupItem3": "��� �������� �� ����� CSS � ����� JS �����",
    "home.aboutEyebrow": "��� ���",
    "home.aboutTitle": "������� ���������, ������ ���������� � ������ ���������.",
    "home.aboutText1": "� ����� ���������� ��������� � ������� �������� �� �����������. �� ������ �������� ��������� �������� ��������� � ������� ��������.",
    "home.aboutText2": "������ �������� ��-�������� �������� � <strong>data/projects.json</strong>, ������� ��������� ����� ������ ��-�������� �����.",
    "home.aboutCard1Title": "������ ���������",
    "home.aboutCard1Text": "������� �������� �������� ���������� � ����.",
    "home.aboutCard2Title": "��������� �������",
    "home.aboutCard2Text": "��� ������ �������� �� ��������� ��������.",
    "home.aboutCard3Title": "������ ��������������",
    "home.aboutCard3Text": "�������� ��-�������� ����������� �� 3 �������� ������.",
    "home.skillsEyebrow": "������",
    "home.skillsTitle": "����������� � ������� �������, ������� �� ������ ��������.",
    "home.skillHtml": "HTML � ������������� ���������",
    "home.skillCss": "CSS � ���������� ������",
    "home.skillJs": "��������������� �� JavaScript",
    "home.skillNode": "������ backend �� Node.js",
    "home.skillsCardEyebrow": "�������� ��������",
    "home.skillsCardTitle": "��� �������� ��������� �������� ��������",
    "home.skillsCardItem1": "��� ������� ����������� �� <strong>data/projects.json</strong>",
    "home.skillsCardItem2": "������� � ����� �������� �� ��������� �������� ��������",
    "home.skillsCardItem3": "��������� �������� ������ ��� ������� ���������",
    "home.previewEyebrow": "�������� ��������",
    "home.previewTitle": "������� ������ �� ��������� ������ ���������, � ��� ���� ��������� ��������.",
    "home.previewText": "�� ��������� �������� ��� ���� ������ ����� ������������� ����� �������, ����� � ��������. ��������� �������� ���������� � ����������.",
    "home.previewPrimary": "������� � ��������",
    "home.previewSecondary": "�������� ����",
    "home.contactEyebrow": "��������",
    "home.contactTitle": "��������� ������ ������� ����� �� �������� ���������.",
    "home.contactText": "���� backend Node �������, ��� ����� �������� ���������. ���� ���, �������� ��� ����� �������� ��� ����������� frontend � ����������, ��� backend ������.",
    "home.contactGithub": "GitHub",
    "home.contactProjectsPage": "�������� ��������",
    "home.contactApiStatus": "������ API",
    "home.formName": "���",
    "home.formNamePlaceholder": "���� ������ ���",
    "home.formEmail": "Email",
    "home.formEmailPlaceholder": "you@example.com",
    "home.formProjectType": "��� �������",
    "home.formTypePortfolio": "����-���������",
    "home.formTypeLanding": "�������",
    "home.formTypeBusiness": "������-����",
    "home.formTypeCustom": "�������������� ������",
    "home.formMessage": "���������",
    "home.formMessagePlaceholder": "���������� � �����, ������ �������� ��� ������...",
    "home.formSubmit": "��������� ���������",
    "projects.heroEyebrow": "��������� �������� ��������",
    "projects.heroTitle": "��� ���� ������� � ����� ����������� �����.",
    "projects.heroText": "��� �������� ������ ��� ��������. ����� ������ �������� ��������� ��������, ������� �� ���������� � �����.",
    "projects.heroPrimary": "���������� �������",
    "projects.heroSecondary": "������ ������",
    "projects.featuredEyebrow": "��������� ������",
    "projects.featuredTitle": "���������� ������� �� ��������� ������.",
    "projects.loadingFeatured": "�������� ��������� ��������...",
    "projects.explorerEyebrow": "������� ��������",
    "projects.explorerTitle": "�������������� ��� ������� � ������� �������� � ������.",
    "projects.searchLabel": "����� ��������",
    "projects.searchPlaceholder": "����� �� ��������, ���������� ��� �������",
    "projects.filteredEyebrow": "��������������� ����������",
    "projects.matchingProjects": "���������� ��������",
    "projects.loadingAll": "�������� ��������...",
    "projects.backEyebrow": "����� � ���������",
    "projects.backTitle": "�������� ��������� �������� ���������, � �������� �������� ���.",
    "projects.backText": "���� ������ ��� ���������� ����� ������ � ���, �� ������������ �� �������� ���������. ���� �� ����� ������� ���� ������, �� �������� �� ���� ����������� ��������.",
    "projects.backPrimary": "������� ���������",
    "projects.backSecondary": "������ ���������",
    "projects.footerPage": "�������� ��������: projects.html",
    "projects.allProjects": "��� �������",
    "projects.resultWord": "�������",
    "footer.files": "�������� frontend �����: index.html, style.css, main.js",
    "footer.rights": "��� ����� ��������.",
    "overlay.eyebrow": "������ �����",
    "overlay.title": "����������� �� ��� YouTube �����",
    "overlay.text": "����� �� ���������� ����� �����, edit-����� � �������� �������, ����������� �� ����� <strong>j_edit-b5</strong>.",
    "overlay.subscribe": "�����������",
    "overlay.dismiss": "����� � ���������",
    "overlay.hint": "���� ����� ������������ ������ ��� ������ ���������.",
    "project.noFeatured": "���� ��� ��������� ��������.",
    "project.noMatch": "�� ����� ������� ������� �� �������.",
    "project.dataUnavailable": "�� ������� ��������� ������ ��������.",
    "project.listUnavailable": "�� ������� ��������� ������ ��������.",
    "project.linkDemo": "����",
    "project.linkRepo": "�����������",
    "project.linkTutorial": "����",
    "project.linksSoon": "������ ����� ��������",
    "status.live": "�������",
    "status.inProgress": "� ��������",
    "status.comingSoon": "�����",
    "status.ready": "������",
    "system.apiOnline": "Backend ������ - ��������� {count} ��������",
    "system.staticMode": "����������� ����� - ��������� {count} ��������",
    "system.dataUnavailable": "������ ����������",
    "system.sending": "��������� ������������...",
    "system.sendingButton": "��������...",
    "system.sendSuccess": "���� ��������� ������� ����������.",
    "system.backendOffline": "Backend �� �������. Frontend ��������, �� ��� ���������� ����� ����� node server.js.",
    "system.errorRequired": "���, email � ��������� �����������.",
    "system.errorEmail": "����������, ������� ���������� email.",
    "system.errorSend": "�� ������� ��������� ���������."
  }
};

const state = {
  activeCategory: "all",
  search: "",
  projects: [],
  language: "uz",
  theme: "dark",
  dataSource: "loading"
};
function translate(key) {
  return translations[state.language]?.[key] || translations.uz[key] || key;
}

function formatText(key, values = {}) {
  return translate(key).replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function getStoredValue(key, fallbackValue) {
  try {
    return localStorage.getItem(key) || fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function saveValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    return;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function categoryLabel(value) {
  return translate(`filters.${value}`) || "Project";
}

function statusLabel(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized === "live") {
    return translate("status.live");
  }

  if (normalized === "in progress") {
    return translate("status.inProgress");
  }

  if (normalized === "coming soon") {
    return translate("status.comingSoon");
  }

  return translate("status.ready");
}

function toggleHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

function updateThemeLabel() {
  if (!themeLabel) {
    return;
  }

  themeLabel.textContent = `${translate("controls.theme")}: ${translate(state.theme === "dark" ? "controls.dark" : "controls.light")}`;
}

function applyTheme(theme) {
  state.theme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = state.theme;
  saveValue(THEME_KEY, state.theme);
  updateThemeLabel();
}

function updateMeta() {
  const page = document.body.dataset.page === "projects" ? "projects" : "home";
  document.documentElement.lang = state.language;
  document.title = translate(`meta.${page}Title`);

  if (metaDescription) {
    metaDescription.setAttribute("content", translate(`meta.${page}Description`));
  }
}

function updateResultTitle() {
  if (!resultTitle) {
    return;
  }

  resultTitle.textContent = state.activeCategory === "all"
    ? translate("projects.allProjects")
    : `${categoryLabel(state.activeCategory)} ${translate("projects.resultWord")}`;
}

function updateApiStatus() {
  if (!apiStatus) {
    return;
  }

  if (state.dataSource === "api") {
    apiStatus.textContent = formatText("system.apiOnline", { count: state.projects.length });
    return;
  }

  if (state.dataSource === "file") {
    apiStatus.textContent = formatText("system.staticMode", { count: state.projects.length });
    return;
  }

  apiStatus.textContent = translate("system.dataUnavailable");
}

function rememberYoutubeInvite() {
  saveValue(YOUTUBE_INVITE_KEY, "true");
}

function hasSeenYoutubeInvite() {
  return getStoredValue(YOUTUBE_INVITE_KEY, "") === "true";
}

function closeYoutubeInvite(overlay, redirectToYoutube) {
  rememberYoutubeInvite();
  document.body.classList.remove("has-overlay");
  overlay.remove();

  if (redirectToYoutube) {
    window.location.href = YOUTUBE_CHANNEL_URL;
  }
}

function showYoutubeInvite(forceRender = false) {
  if (hasSeenYoutubeInvite() && !forceRender) {
    return;
  }

  document.querySelector(".youtube-invite")?.remove();

  if (hasSeenYoutubeInvite() && forceRender) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "youtube-invite";
  overlay.innerHTML = `
    <div class="youtube-invite__backdrop"></div>
    <section class="youtube-invite__dialog" role="dialog" aria-modal="true" aria-labelledby="youtube-invite-title">
      <p class="youtube-invite__eyebrow">${translate("overlay.eyebrow")}</p>
      <h2 id="youtube-invite-title">${translate("overlay.title")}</h2>
      <p class="youtube-invite__text">${translate("overlay.text")}</p>
      <div class="youtube-invite__actions">
        <button class="button button-primary" type="button" data-youtube-subscribe>${translate("overlay.subscribe")}</button>
        <button class="button button-secondary" type="button" data-youtube-dismiss>${translate("overlay.dismiss")}</button>
      </div>
      <p class="youtube-invite__hint">${translate("overlay.hint")}</p>
    </section>
  `;

  overlay.querySelector("[data-youtube-subscribe]")?.addEventListener("click", () => {
    closeYoutubeInvite(overlay, true);
  });

  overlay.querySelector("[data-youtube-dismiss]")?.addEventListener("click", () => {
    closeYoutubeInvite(overlay, false);
  });

  document.body.classList.add("has-overlay");
  document.body.append(overlay);
}

function applyTranslations() {
  if (languageSwitcher) {
    languageSwitcher.value = state.language;
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.innerHTML = translate(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute("placeholder", translate(key));
  });

  updateMeta();
  updateThemeLabel();
  updateResultTitle();
  updateApiStatus();

  if (submitLabel && !formStatus?.textContent) {
    submitLabel.textContent = translate("home.formSubmit");
  }

  if (state.projects.length) {
    renderProjects();
  }

  if (document.querySelector(".youtube-invite")) {
    showYoutubeInvite(true);
  }
}

function closeMenu() {
  siteNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const nextState = !siteNav.classList.contains("is-open");
  siteNav.classList.toggle("is-open", nextState);
  menuToggle.setAttribute("aria-expanded", String(nextState));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

languageSwitcher?.addEventListener("change", (event) => {
  const nextLanguage = event.target.value;
  state.language = translations[nextLanguage] ? nextLanguage : "uz";
  saveValue(LANGUAGE_KEY, state.language);
  applyTranslations();
});

themeToggle?.addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
});

window.addEventListener("scroll", toggleHeaderState);
toggleHeaderState();

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

if (navSectionLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navSectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.1
    }
  );

  [...document.querySelectorAll("main section[id]")].forEach((section) => {
    sectionObserver.observe(section);
  });
}

async function fetchJson(paths) {
  for (const path of paths) {
    try {
      const response = await fetch(path);

      if (response.ok) {
        const data = await response.json();
        return {
          data,
          source: path.includes("api") ? "api" : "file"
        };
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error("Unable to load data.");
}
