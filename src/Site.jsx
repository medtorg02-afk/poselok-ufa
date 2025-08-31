import { useMemo, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Building2, Hammer, ShieldCheck,
  Home, ChevronRight, CheckCircle2, X, ChevronLeft,
  ChevronRight as CaretRight
} from "lucide-react";

/* ====== БРЕНД ====== */
const BRAND = { orange: "#FF5E17", dark: "#262216", lightBg: "#F5F4EE" };

/* ====== КОНТАКТЫ (без Instagram) ====== */
const CONTACTS = {
  phoneHuman: "+7 (927) 335-43-16",
  phoneLink: "tel:+79273354316",
  email: "",
  whatsapp: "https://wa.me/79273354316",
  telegram: "https://t.me/karpovskiy_federal",
  vk: "https://vk.com/clips/federationigs_ufa",
  ok: "https://ok.ru/profile/910218378194",
  rutube: "https://rutube.ru/channel/66111193/",
  youtube: "https://youtube.com/channel/UCScN0eQ6cxJt6ONAsJFCbpA?si=RWMETkhsaOhY5Fuo",
  max: "https://max.ru/join/iWAHaijePX63hho9aVZOtLQWHmEh5SJafFxAPzS5AvY",
  whatsapp_group: "https://chat.whatsapp.com/BHuELfIxme2J2tut4O2kOF",
};

/* ====== Утилиты ссылок ====== */
const URL_LIKE = /^(https?:\/\/|tel:|mailto:)/i;
const isNonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
const isSafeHref = (href) => isNonEmpty(href) && URL_LIKE.test(href.trim());
const safeHref = (href) => (isSafeHref(href) ? href : undefined);

function LinkButton({ href, className = "", children, style, ...rest }) {
  const safe = safeHref(href);
  if (!safe) return null;
  return <a href={safe} className={className} style={style} {...rest}>{children}</a>;
}

/* ====== ДАННЫЕ ====== */
const HOUSES = [
  {
    id: "H123",
    title: "Дом 123 м² · 1 этаж · 3 спальни",
    area: 123, beds: 3, fixedPrice: 11900000, ready: "III кв. 2025",
    img: "/assets/houses/123/cover.jpg",
    gallery: ["/assets/houses/123/01.jpg","/assets/houses/123/02.jpg","/assets/houses/123/03.jpg"],
    features: ["Кирпич","Монолитная плита","Панорамные окна","Второй свет","Сауна по желанию"],
  },
  {
    id: "H135",
    title: "Дом 135 м² · 1 этаж · 3 спальни",
    area: 135, beds: 3, fixedPrice: 12600000, ready: "IV кв. 2025",
    img: "/assets/houses/135/cover.jpg",
    gallery: ["/assets/houses/135/01.jpg","/assets/houses/135/02.jpg"],
    features: ["Фальцевая кровля","Навес 2 авто","Терраса ~60 м²","Мастер-спальня с С/У и гардеробом"],
  },
  {
    id: "H158",
    title: "Дом 158,3 м² · 1 этаж · 3 спальни + кабинет",
    area: 158.3, beds: 4, fixedPrice: 13400000, ready: "I кв. 2026",
    img: "/assets/houses/158/cover.jpg",
    gallery: ["/assets/houses/158/01.jpg","/assets/houses/158/02.jpg"],
    features: ["Кабинет","Второй свет","Панорамное остекление","Сауна по желанию"],
  },
];

const STATS = [
  { label: "Домов уже построено", value: "15+" },
  { label: "Участников Федерации", value: "30+" },
  { label: "Архитектурный стиль", value: "Единый" },
  { label: "Прозрачность", value: "Аккредитация" },
];

const FEATURES = [
  { title: "Конструкции и материалы", items: [
    "Стены — красный полнотелый кирпич",
    "Фундамент — монолитная плита",
    "Кровля — фальцевая матовая, снегозадержатели, водостоки",
    "Панорамные окна + мансардные окна",
    "Фасад: планкен + штукатурка",
    "Утеплённые отмостки, отсыпка щебнем",
    "Гильзы под коммуникации",
    "Входная дверь — с терморазрывом",
  ]},
];

/* Галерея «О посёлке» — 8 картинок */
const SETTLEMENT = Array.from({ length: 8 }).map((_, i) =>
  `/assets/settlement/${String(i+1).padStart(2,'0')}.jpg`
);

/* ====== ГЛАВНЫЙ КОМПОНЕНТ ====== */
function normHouse(p, folder){ if(!p) return p; return p.startsWith('/') ? p : `/assets/houses/${folder}/${p}` }
export default function Site() {
  const houses = useMemo(() => HOUSES.map(h => ({
    ...h, priceText: h.fixedPrice.toLocaleString("ru-RU") + " ₽",
  })), []);

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, #fff 0%, ${BRAND.lightBg} 100%)`, color: BRAND.dark }}>
      <Header />
      <Hero />
      <StatsBlock />
      <AboutSettlementGallery />
      <HowToGet />
      <FeaturesBlock />
      <Houses items={houses} />
      <HowItWorks />
      <Partners />
      <MediaCTA />
      <FAQBlock />
      <CallToAction />
      <Footer />
      <FloatingWA />
    </div>
  );
}

/* ====== ШАПКА ====== */
function Header() {
  const primaryCtaHref = safeHref(CONTACTS.whatsapp) || safeHref(CONTACTS.telegram);
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-slate-200" style={{ backgroundColor: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 font-bold text-lg" style={{ color: BRAND.dark }}>
          <img
            src="/assets/logos/federation.png"
            alt="Федерация ИЖС Республики Башкортостан — логотип"
            className="h-7 w-auto object-contain"
            onError={(e)=>{ e.currentTarget.style.display='none'; }}
          />
          <span>Первый посёлок Федерации <span className="text-slate-500">| Карповский</span></span>
        </a>
        {primaryCtaHref && (
          <div className="flex items-center gap-2">
            <a href={primaryCtaHref} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm" style={{ backgroundColor: BRAND.orange, color: "#fff" }}>
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
            <a href={CONTACTS.phoneLink} className="hidden md:inline text-sm font-medium" style={{ color: BRAND.dark }}>
              {CONTACTS.phoneHuman}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

/* ====== ХЕРО ====== */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/seo/og.jpg"
          alt="Посёлок Карповский — коттеджный посёлок бизнес-класса в Уфе"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}
          className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ color: BRAND.dark }}>
          Коттеджный посёлок Карповский — Первый посёлок Федерации
        </motion.h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-700">
          Дома бизнес-класса в Уфе: единый архитектурный стиль, газ, охрана, благоустройство.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#houses" className="rounded-2xl px-5 py-3 text-sm md:text-base inline-flex items-center gap-2"
             style={{ backgroundColor: BRAND.orange, color: "#fff" }}>
            <Home className="w-5 h-5" /> Смотреть дома <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ====== СТАТИСТИКА ====== */
function StatsBlock() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-extrabold" style={{ color: BRAND.dark }}>{s.value}</div>
            <div className="text-slate-600 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ====== О ПОСЁЛКЕ — ГАЛЕРЕЯ ====== */
function AboutSettlementGallery() {
  return (
    <Section id="about-settlement" title="О посёлке (галерея)">
      <GalleryGrid images={SETTLEMENT} fallback="/assets/seo/og.jpg" />
    </Section>
  );
}

/* ====== КАК ДОБРАТЬСЯ ====== */
function HowToGet() {
  return (
    <Section id="route" title="Как добраться">
      <div className="flex flex-wrap gap-3">
        <LinkButton className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
                    style={{ color: BRAND.dark }} href="https://go.2gis.com/56L38">Открыть в 2ГИС</LinkButton>
        <LinkButton className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
                    style={{ color: BRAND.dark }} href="https://yandex.ru/maps/-/CLEUBB~o">Открыть Яндекс.Карты</LinkButton>
      </div>
    </Section>
  );
}

/* ====== УНИВЕРСАЛЬНАЯ СЕКЦИЯ ====== */
function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: BRAND.dark }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

/* ====== СТАНДАРТЫ ====== */
function FeaturesBlock() {
  return (
    <Section id="features" title="Стандарты и комплектация">
      <div className="grid md:grid-cols-2 gap-8">
        {FEATURES.map((f, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-4" style={{ color: BRAND.dark }}>{f.title}</h3>
            <ul className="space-y-2 text-slate-700">
              {f.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: BRAND.orange }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="p-6 rounded-2xl text-white" style={{ backgroundColor: BRAND.dark }}>
          <h3 className="font-semibold text-lg mb-4">Аккредитация Федерации</h3>
          <p className="opacity-90">В проект допускаются только проверенные участники: застройщики, поставщики, монтажные команды.</p>
          <a href="#faq" className="inline-block mt-4 underline text-white">Подробнее в FAQ</a>
        </div>
      </div>
    </Section>
  );
}

/* ====== ЛАЙТБОКС / ГАЛЕРЕЯ ====== */
function ImageLightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  if (!images?.length) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <button onClick={onClose} className="absolute top-4 right-4 rounded-full p-2 bg-white/20 hover:bg-white/30 text-white"><X className="w-6 h-6" /></button>
      <button onClick={onPrev} className="absolute left-4 rounded-full p-2 bg-white/20 hover:bg-white/30 text-white"><ChevronLeft className="w-6 h-6" /></button>
      <img src={images[index]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-xl" />
      <button onClick={onNext} className="absolute right-4 rounded-full p-2 bg-white/20 hover:bg-white/30 text-white"><CaretRight className="w-6 h-6" /></button>
    </div>
  );
}

function useLightbox() {
  const [isOpen, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const open = useCallback((imgs, i = 0) => { setImages(imgs || []); setIndex(i); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  return { isOpen, images, index, open, close, prev, next };
}

function GalleryGrid({ images = [], fallback = "/assets/seo/og.jpg" }) {
  const lb = useLightbox();
  const list = (images.length ? images : Array.from({length:8}).map(()=>fallback));
  const onImgError = (e) => {
    if (e.currentTarget?.src && !e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
  };
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {list.map((src, i) => (
          <button key={i} onClick={() => lb.open(list, i)} className="group relative rounded-xl overflow-hidden border">
            <img src={src} alt={`Посёлок Карповский — фото ${i+1}, коттеджный посёлок возле Уфы`} onError={onImgError}
                 className="h-40 w-full object-cover group-hover:scale-105 transition-transform" />
          </button>
        ))}
      </div>
      {lb.isOpen && <ImageLightbox images={lb.images} index={lb.index} onClose={lb.close} onPrev={lb.prev} onNext={lb.next} />}
    </>
  );
}

/* ====== ДОМА (кликабельные картинки, без PDF) ====== */
function Houses({ items }) {
  const lb = useLightbox();
  const openHouse = (h, startIndex = 0) => {
    const imgs = [h.img, ...(h.gallery || [])].filter(Boolean);
    lb.open(imgs, startIndex);
  };

  return (
    <Section id="houses" title="Доступные проекты домов">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((h) => (
          <div key={h.id} id={`house-${h.id}`} className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col">
            <button className="aspect-[16/10] overflow-hidden" onClick={() => openHouse(h, 0)}>
              <img src={h.img} alt={`${h.title} в посёлке Карповский — купить коттедж Уфа`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </button>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg" style={{ color: BRAND.dark }}>{h.title}</h3>
              <p className="text-slate-600 text-sm mt-1">Готовность: {h.ready}</p>
              <div className="mt-4 text-2xl font-bold" style={{ color: BRAND.dark }}>{h.priceText}</div>
              {(h.gallery || []).length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {h.gallery.slice(0,3).map((g, idx) => (
                    <button key={idx} onClick={() => openHouse(h, idx+1)} className="group">
                      <img src={g} alt={`${h.title} фото ${idx+1} — коттедж Карповский`} className="h-20 w-full object-cover rounded-lg border group-hover:opacity-90" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {lb.isOpen && <ImageLightbox images={lb.images} index={lb.index} onClose={lb.close} onPrev={lb.prev} onNext={lb.next} />}
      <p className="text-sm text-slate-500 mt-4">Фото берём из <code>/assets/houses/…</code>. Планировки PDF отключены.</p>
    </Section>
  );
}

/* ====== ПРОЦЕСС ====== */
function HowItWorks() {
  const STEPS = [
    { title: "Инициатива Федерации", text: "Объединяем застройщиков, поставщиков и девелоперов в единый проект.", icon: Building2 },
    { title: "Единые стандарты", text: "Аккредитация участников и требования к качеству.", icon: ShieldCheck },
    { title: "Стройка и контроль", text: "Проектное управление и контроль этапов.", icon: Hammer },
    { title: "Передача домов", text: "Честные условия и прозрачная документация.", icon: Home },
  ];
  return (
    <Section id="process" title="Как мы работаем">
      <div className="grid md:grid-cols-4 gap-6">
        {STEPS.map((s, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <s.icon className="w-8 h-8" style={{ color: BRAND.dark }} />
            <h4 className="font-semibold mt-3" style={{ color: BRAND.dark }}>{s.title}</h4>
            <p className="text-slate-700 text-sm mt-1">{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====== ПАРТНЁРЫ ====== */
function Partners() {
  const fallback = "/assets/seo/og.jpg"; // если логотип 404

  const PARTNERS = [
    {
      name: "Paradom",
      role: "Девелопер проекта",
      site: "https://paradom.ru",
      logo: "/assets/logos/paradom.png",
      desc: "Архитектурная концепция, управление проектом и контроль качества."
    },
    {
      name: "Gigaz",
      role: "Инженерные решения",
      site: "https://gigaz.ru",
      logo: "/assets/logos/gigaz.png",
      desc: "Поставки и монтаж инженерных систем под стандарты поселка."
    },
    {
      name: "Металл Профиль",
      role: "Кровля и фасады",
      site: "https://metallprofil.ru",
      logo: "/assets/logos/metallprofil.png",
      desc: "Фальцевая кровля, фасадные системы и комплектующие."
    },
    {
      name: "Ceresit",
      role: "Строительные смеси",
      site: "https://ceresit.ru",
      logo: "/assets/logos/ceresit.png",
      desc: "Клеевые и фасадные решения для надежной отделки домов."
    },
    {
      name: "ELSTAD",
      role: "Застройщик",
      site: "",
      logo: "/assets/logos/elstad.png",
      desc: "Застройщик домов в посёлке Карповский."
    },
  ];

  const onLogoError = (e) => {
    if (e?.currentTarget && !e.currentTarget.src.endsWith(fallback)) {
      e.currentTarget.src = fallback;
    }
  };

  return (
    <Section id="partners" title="Наши партнёры">
      <div className="grid md:grid-cols-2 gap-6">
        {PARTNERS.map((p, i) => {
          const Card = (
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition">
              <div className="h-16 w-40 flex items-center justify-center rounded-lg bg-slate-100 border">
                <img
                  src={p.logo}
                  alt={`${p.name} — логотип`}
                  className="max-h-14 w-auto object-contain"
                  onError={onLogoError}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold" style={{ color: BRAND.dark }}>{p.name}</div>
                  <span className="text-xs px-2 py-1 rounded-full border bg-white text-slate-600">
                    {p.role}
                  </span>
                </div>
                <div className="text-sm text-slate-700 mt-1">{p.desc}</div>
              </div>
            </div>
          );
          return p.site ? (
            <a key={i} href={p.site} target="_blank" rel="noopener noreferrer" className="no-underline">{Card}</a>
          ) : (
            <div key={i}>{Card}</div>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Логотипы читаются из <code>/assets/logos/</code>: <code>paradom.png</code>, <code>gigaz.png</code>, <code>metallprofil.png</code>, <code>ceresit.png</code>, <code>elstad.png</code>.
      </p>
    </Section>
  );
}


/* ====== FAQ ====== */
function FAQBlock() {
  const FAQ = [
    { q: "Почему ‘Первый посёлок Федерации’?", a: "Это первый масштабный кейс коллективного освоения поселка под эгидой Федерации ИЖС в РБ." },
    { q: "Сколько стоят дома?", a: "Для 123/135/158,3 м² — 11,9/12,6/13,4 млн ₽. Итог зависит от участка и комплектации." },
    { q: "Кто участники проекта?", a: "Аккредитованные Федерацией застройщики, поставщики материалов и девелоперская команда." },
    { q: "Как посмотреть дома?", a: "Запишитесь на экскурсию в WhatsApp или Telegram — подберём день и покажем всё вживую." },
  ];
  return (
    <Section id="faq" title="FAQ">
      <div className="grid md:grid-cols-2 gap-6">
        {FAQ.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h4 className="font-semibold" style={{ color: BRAND.dark }}>{f.q}</h4>
            <p className="text-slate-700 mt-2 text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====== CTA ====== */
function CallToAction() {
  const wa = safeHref(CONTACTS.whatsapp);
  const tg = safeHref(CONTACTS.telegram);
  return (
    <section className="text-white" style={{ backgroundColor: BRAND.dark }}>
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 items-center gap-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl md:text-3xl font-bold">Запишитесь на экскурсию в Карповский</h3>
          <p className="text-white/80 mt-2">Покажем готовые дома и расскажем об условиях покупки.</p>
        </div>
        <div className="flex gap-2 md:justify-end">
          {wa && <a href={wa} className="rounded-xl px-5 py-3 text-sm font-semibold hover:opacity-90" style={{ backgroundColor: "#fff", color: BRAND.dark }}>Написать в WhatsApp</a>}
          {tg && <a href={tg} className="rounded-xl border px-5 py-3 text-sm hover:opacity-90" style={{ borderColor: "rgba(255,255,255,0.4)" }}>Связаться в Telegram</a>}
        </div>
      </div>
    </section>
  );
}

/* ====== ФУТЕР ====== */
function Footer() {
  const phone = isNonEmpty(CONTACTS.phoneHuman) && isNonEmpty(CONTACTS.phoneLink) ? CONTACTS.phoneLink : undefined;
  const email = isNonEmpty(CONTACTS.email) ? `mailto:${CONTACTS.email}` : undefined;
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold" style={{ color: BRAND.dark }}>Первый посёлок Федерации | Карповский</div>
          <p className="text-sm text-slate-600 mt-2">Федерация ИЖС Республики Башкортостан</p>
          <div className="mt-4 flex items-center gap-2 text-slate-700"><MapPin className="w-4 h-4" /> Уфа · Карповский</div>
          {phone && <div className="mt-2 flex items-center gap-2 text-slate-700"><Phone className="w-4 h-4" /> <a href={CONTACTS.phoneLink} className="hover:underline">{CONTACTS.phoneHuman}</a></div>}
          {email && <div className="mt-2 flex items-center gap-2 text-slate-700"><Mail className="w-4 h-4" /> <a href={email} className="hover:underline">{CONTACTS.email}</a></div>}
        </div>
        <div>
          <div className="font-semibold mb-2" style={{ color: BRAND.dark }}>Навигация</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#about-settlement" className="hover:underline text-slate-700">О посёлке</a></li>
            <li><a href="#features" className="hover:underline text-slate-700">Стандарты</a></li>
            <li><a href="#houses" className="hover:underline text-slate-700">Дома</a></li>
            <li><a href="#partners" className="hover:underline text-slate-700">Партнёры</a></li>
            <li><a href="#faq" className="hover:underline text-slate-700">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2" style={{ color: BRAND.dark }}>Мы в соцсетях</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.telegram} style={{ color: BRAND.dark }}>Telegram</LinkButton>
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.whatsapp} style={{ color: BRAND.dark }}>WhatsApp</LinkButton>
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.whatsapp_group} style={{ color: BRAND.dark }}>WA-группа</LinkButton>
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.vk} style={{ color: BRAND.dark }}>VK</LinkButton>
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.ok} style={{ color: BRAND.dark }}>Одноклассники</LinkButton>
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.youtube} style={{ color: BRAND.dark }}>YouTube</LinkButton>
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.rutube} style={{ color: BRAND.dark }}>RuTube</LinkButton>
            <LinkButton className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200" href={CONTACTS.max} style={{ color: BRAND.dark }}>MAX</LinkButton>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} Федерация ИЖС РБ. Все права защищены.</div>
    </footer>
  );
}

/* ====== Плавающая WA ====== */
function FloatingWA() {
  return (
    <a href={CONTACTS.whatsapp} aria-label="Написать в WhatsApp"
      className="fixed right-4 bottom-4 rounded-full shadow-lg p-3 md:p-4"
      style={{ backgroundColor: "#25D366", color: "#fff", zIndex: 50 }}>
      <Phone className="w-5 h-5 md:w-6 md:h-6" />
    </a>
  );
}

/* ====== МЕДИА (YouTube + RuTube) ====== */
function MediaCTA() {
  const YT_UPLOADS_PLAYLIST_ID = 'UUScN0eQ6cxJt6ONAsJFCbpA';
  const RUTUBE_EMBED = 'https://rutube.ru/play/embed/f70ab2478564a7474698e230389c6e48';
  return (
    <Section id="media" title="Медиа">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-3 font-medium">YouTube — загрузки канала</div>
          <div className="px-5 pb-5">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-[315px] md:h-[360px] rounded-xl"
                src={`https://www.youtube.com/embed/videoseries?list=${YT_UPLOADS_PLAYLIST_ID}`}
                title="YouTube playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-3 font-medium">RuTube — видео</div>
          <div className="px-5 pb-5">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-[315px] md:h-[360px] rounded-xl"
                src={RUTUBE_EMBED}
                title="RuTube video"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
