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
  max: "https://max.ru/u/f9LHodD0cOJ8Pbl4IMCG_ld1035vmZwKVR3SO4GqVOYKEtLzxnZraIJD8nY",
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
    title: "Дом 123 м² · 2 этажа · 3 варианта планировки",
    area: 123, beds: 3, fixedPrice: 11700000, ready: "Готов к заселению",
    img: "/assets/houses/123/cover.jpg",
    gallery: ["/assets/houses/123/01.jpg","/assets/houses/123/02.jpg","/assets/houses/123/03.jpg"],
    features: [
      "3 варианта планировки на выбор",
      "Терраса 40–46 м² в зависимости от планировки",
      "Мастер-спальня + детские комнаты",
      "Сауна по желанию",
      "Кирпич, монолитная плита, панорамные окна",
    ],
  },
  {
    id: "H142",
    title: "Дом 142 м² · 2 этажа · Мастер-спальня",
    area: 142, beds: 3, fixedPrice: 12400000, ready: "Готов к заселению",
    img: "/assets/houses/142/cover.jpg",
    gallery: ["/assets/houses/142/01.jpg","/assets/houses/142/02.jpg"],
    features: [
      "Мастер-спальня с гардеробом и личной ванной",
      "Просторная терраса",
      "Фальцевая кровля матовая",
      "Кирпич, монолитная плита",
      "Газовое отопление, черновая отделка",
    ],
  },
  {
    id: "H158",
    title: "Дом 158 м² · 1 этаж · Потолки 4,7 м · Второй свет",
    area: 158, beds: 5, fixedPrice: 13100000, ready: "Готов к заселению",
    img: "/assets/houses/158/cover.jpg",
    gallery: ["/assets/houses/158/01.jpg","/assets/houses/158/02.jpg"],
    features: [
      "Потолки 4,7 м — второй свет",
      "5 комнат: кухня-гостиная 43,2 м², 4 спальни",
      "Мастер-спальня 17,8 м² + гардероб 6,5 м² + ванная 4,4 м²",
      "Терраса 60,4 м² + паркинг на 2 авто",
      "Кухня-гостиная с панорамным остеклением",
    ],
  },
];

const STATS = [
  { label: "Домов уже построено", value: "27+" },
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
      <SiteMap />
      <HowItWorks />
      <Partners />
      <MediaCTA />
      <FAQBlock />
      <SeoText />
      <CallToAction />
      <Footer />
      <FloatingWA />
    </div>
  );
}

/* ====== ШАПКА ====== */
function Header() {
  const maxHref = safeHref(CONTACTS.max) || safeHref(CONTACTS.telegram);
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
          <span>Застройщик ELSTAD <span className="text-slate-500">| Карповский</span></span>
        </a>
        {maxHref && (
          <div className="flex items-center gap-2">
            <a href={maxHref} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm" style={{ backgroundColor: BRAND.orange, color: "#fff" }}>
              <Phone className="w-4 h-4" /> MAX
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
          Коттеджный посёлок Карповский — Застройщик ELSTAD
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
      name: "Gigaz",
      role: "Инженерные решения",
      site: "https://gigaz.ru",
      logo: "/assets/logos/gigaz.png",
      desc: "Поставки и монтаж инженерных систем под стандарты поселка."
    },
    {
      name: "СК Профиль",
      role: "Кровля и фасады",
      site: "",
      logo: "/assets/logos/skprofil.png",
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
    </Section>
  );
}


/* ====== FAQ ====== */
function FAQBlock() {
  const FAQ = [
    { q: "Сколько стоят дома в КП Карповский?", a: "Дома площадью 121–123 м² — 11 700 000 ₽, дом 142 м² — 12 400 000 ₽, дом 158 м² — 13 100 000 ₽. Цены актуальны на 2026 год. Доступна бесплатная бронь на 4 дня для фиксации цены. Бронь на месяц — 100 000 ₽, которые идут в счёт оплаты." },
    { q: "Можно ли купить дом в ипотеку?", a: "Да. Аккредитованы во всех крупных банках. Доступна семейная ипотека, IT-ипотека, господдержка, комбо-ипотека, ИЖС-ипотека, вторичка. Ставки от 6% годовых. Также возможна рассрочка." },
    { q: "Из чего построены дома?", a: "Все дома — красный полнотелый кирпич на монолитной плите. Кровля — фальцевая клик-фальц (матовая). Утепление — задувная эковата. Окна панорамные + мансардные. Фасад — декоративный планкен и камешковая штукатурка. Отделка черновая (стены отштукатурены по маякам). Газ, вода, канализация — всё в доме." },
    { q: "Как посмотреть дома вживую?", a: "Записывайтесь на экскурсию через MAX или Telegram. Подберём удобное время, покажем все готовые дома, расскажем об условиях и инфраструктуре посёлка." },
    { q: "Где находится посёлок Карповский?", a: "Адрес: ул. Елизаветы Глинки, 87, Уфа, Республика Башкортостан. До центра Уфы — около 20 минут. Рядом лесной массив, развитая дорожная инфраструктура. Открыть маршрут в 2ГИС или Яндекс.Картах — на сайте есть кнопки." },
    { q: "Что входит в инфраструктуру посёлка?", a: "КПП с въездом по госномеру автомобиля, видеонаблюдение без слепых зон, асфальтированные дороги, тротуары, освещение, парковые зоны. Коммуникации проложены под землёй — «чистое небо». Собственный детский сад. Управляющая компания организует: каток зимой, обработку от клещей, праздники, уборку территории." },
    { q: "Сколько домов и участков в посёлке?", a: "В посёлке 85–89 участков с единым архитектурным стилем. Все дома выполнены в одной концепции. На продажу доступно 7 готовых домов от застройщика ELSTAD." },
    { q: "Есть ли готовые дома или нужно ждать строительства?", a: "Все 7 домов уже построены и готовы к заселению. Никакого ожидания строительства. Можно приехать, посмотреть, выбрать и оформить сделку." },
    { q: "Почему застройщик называется ELSTAD?", a: "ELSTAD — застройщик и девелопер домов в посёлке Карповский. Компания специализируется на строительстве домов бизнес-класса с высокими стандартами материалов и отделки." },
    { q: "Какие планировки доступны?", a: "Три проекта: 121–123 м² (2 этажа, 3 варианта планировки, терраса до 46 м²), 142 м² (2 этажа, мастер-спальня, терраса), 158 м² (1 этаж, 5 комнат, потолки 4,7 м второй свет, терраса 60 м², паркинг на 2 авто). Мастер-спальня во всех домах включает гардероб и личную ванную." },
  ];
  return (
    <Section id="faq" title="Часто задаваемые вопросы о КП Карповский">
      <div className="grid md:grid-cols-2 gap-6">
        {FAQ.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-base" style={{ color: BRAND.dark }}>{f.q}</h3>
            <p className="text-slate-700 mt-2 text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====== SEO-ТЕКСТ ====== */
function SeoText() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200">
      <div className="grid md:grid-cols-2 gap-10 text-slate-700 text-sm leading-relaxed">
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: BRAND.dark }}>Купить дом в Уфе — КП Карповский</h2>
          <p className="mb-3">Коттеджный посёлок Карповский — это клубный жилой комплекс бизнес-класса в Уфе, расположенный по адресу <strong>ул. Елизаветы Глинки, 87</strong>. Застройщик <strong>ELSTAD</strong> предлагает купить готовые кирпичные дома площадью от 121 до 158 м². Это идеальное место для семей, которые ценят приватность, безопасность и комфорт рядом с городом.</p>
          <p className="mb-3">В посёлке Карповский доступны дома трёх планировок: <strong>121–123 м² от 11 700 000 ₽</strong>, <strong>142 м² — 12 400 000 ₽</strong> и <strong>158 м² — 13 100 000 ₽</strong>. Все дома выполнены из красного полнотелого кирпича на монолитной плите. Фальцевая кровля, задувная эковата, панорамные окна — каждый дом строился с расчётом на долговечность и тепло башкортостанской зимы.</p>
          <p>Купить дом в посёлке Карповский можно с <strong>ипотекой от 6%</strong> — аккредитованы во всех крупных банках. Семейная, IT, господдержка, ИЖС — подберём подходящую программу. Возможна рассрочка и бесплатная бронь на 4 дня.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: BRAND.dark }}>Инфраструктура и безопасность посёлка</h2>
          <p className="mb-3">Посёлок Карповский — это <strong>85–89 участков</strong> с единым архитектурным стилем. Въезд по номеру автомобиля через КПП, круглосуточное видеонаблюдение без слепых зон, собственная управляющая компания с полным сервисом.</p>
          <p className="mb-3">Коммуникации проложены под землёй — «чистое небо» без проводов. Асфальтированные дороги, тротуары, парковые зоны, освещение — инфраструктура полностью готова. <strong>Собственный детский сад</strong>, въездная группа с магазинами и коммерцией.</p>
          <p>Посёлок находится в Уфе — до центра города около 20 минут езды. Рядом лесной массив. Если вы ищете <strong>готовый дом в Уфе</strong>, <strong>коттедж с газом</strong> или <strong>дом бизнес-класса</strong> с охраной и развитой инфраструктурой — КП Карповский именно то, что вам нужно. Звоните: <strong>+7 (927) 335-43-16</strong>.</p>
        </div>
      </div>
    </section>
  );
}

/* ====== CTA ====== */
function CallToAction() {
  const mx = safeHref(CONTACTS.max);
  const tg = safeHref(CONTACTS.telegram);
  return (
    <section className="text-white" style={{ backgroundColor: BRAND.dark }}>
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 items-center gap-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl md:text-3xl font-bold">Запишитесь на экскурсию в Карповский</h3>
          <p className="text-white/80 mt-2">Покажем готовые дома и расскажем об условиях покупки.</p>
        </div>
        <div className="flex gap-2 md:justify-end">
          {mx && <a href={mx} className="rounded-xl px-5 py-3 text-sm font-semibold hover:opacity-90" style={{ backgroundColor: "#fff", color: BRAND.dark }}>Написать в MAX</a>}
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
          <div className="font-bold" style={{ color: BRAND.dark }}>Застройщик ELSTAD | Карповский</div>
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
    <a href={CONTACTS.max} aria-label="Написать в MAX"
      className="fixed right-4 bottom-4 rounded-full shadow-lg p-3 md:p-4"
      style={{ backgroundColor: BRAND.orange, color: "#fff", zIndex: 50 }}>
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

/* ====== КАРТА ПОСЁЛКА ====== */
const PLOTS = {
  1:  { status: "empty",     area: null, price: null },
  2:  { status: "available", area: 122,  price: 11700000 },
  3:  { status: "sold",      area: 123,  price: null },
  4:  { status: "available", area: 123,  price: 11700000 },
  5:  { status: "available", area: 123,  price: 11700000 },
  6:  { status: "sold",      area: 123,  price: null },
  7:  { status: "available", area: 123,  price: 11700000 },
  8:  { status: "available", area: 123,  price: 11700000 },
  9:  { status: "sold",      area: 123,  price: null },
  10: { status: "available", area: 123,  price: 11700000 },
  11: { status: "available", area: 123,  price: 11700000 },
  12: { status: "available", area: 158,  price: 19500000, note: "С гаражом" },
  13: { status: "sold",      area: null, price: null },
  14: { status: "sold",      area: 158,  price: null },
  15: { status: "available", area: 158,  price: 13100000 },
  16: { status: "available", area: 142,  price: 12400000, note: "Акция" },
  17: { status: "available", area: 142,  price: 12400000, note: "Акция" },
  18: { status: "other",     area: null, price: null },
  19: { status: "other",     area: null, price: null },
  20: { status: "other",     area: null, price: null },
  21: { status: "other",     area: null, price: null },
  22: { status: "available", area: 123,  price: 13300000 },
  23: { status: "other",     area: null, price: null },
};
const ROW_TOP = [1,2,3,4,5,6,7,8,9,10,11,12];
const ROW_BOT = [23,22,21,20,19,18,17,16,15,14,13];
const PLOT_STATUS_COLORS = {
  available: { bg: "#FF5E17", color: "#fff" },
  sold:      { bg: "#9ca3af", color: "#fff" },
  empty:     { bg: "#fef3c7", color: "#262216" },
  other:     { bg: "#f1f5f9", color: "#94a3b8" },
};

function SiteMap() {
  const [active, setActive] = useState(null);
  const ap = active != null ? PLOTS[active] : null;

  // SVG viewport
  const VW = 900, VH = 400;
  const L = 90, R = 90;                     // левый/правый блок
  const ZW = VW - L - R;                    // ширина зоны участков (720px)
  const ROAD_H = 64;                        // высота дороги сверху
  const ROW1_Y = ROAD_H + 6, ROW_H = 92;   // ряд 1
  const INNER_H = 38;                       // внутренняя дорожка
  const ROW2_Y = ROW1_Y + ROW_H + INNER_H; // ряд 2

  // размеры участков
  const R1W = (ZW - 11 * 3) / 12;          // ~56px
  const R2W = (ZW - 10 * 3) / 11;          // ~61px
  const r1x = (i) => L + i * (R1W + 3);
  const r2x = (i) => L + i * (R2W + 3);

  const fmtP = (p) => (p / 1000000).toFixed(1) + "M ₽";

  return (
    <Section id="site-map" title="Карта посёлка Карповский">
      <p className="text-slate-600 text-sm mb-4">Нажмите на участок, чтобы увидеть информацию о доме.</p>

      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full rounded-2xl" style={{ display: "block" }}>
        {/* зелёный фон */}
        <rect width={VW} height={VH} fill="#4a7a55" rx={12} />

        {/* деревья сверху */}
        <rect x={0} y={0} width={VW} height={22} fill="#3a6645" rx={12} />

        {/* улица */}
        <rect x={0} y={22} width={VW} height={ROAD_H - 22} fill="#5a6470" />
        <text x={VW / 2} y={50} textAnchor="middle" fill="#c8d4e0" fontSize={12} fontWeight="600" letterSpacing="3">УЛ. ЕЛИЗАВЕТЫ ГЛИНКИ</text>

        {/* фон зоны участков */}
        <rect x={L} y={ROW1_Y - 2} width={ZW} height={ROW_H * 2 + INNER_H + 4} fill="#d8ccb8" rx={4} />

        {/* внутренняя дорожка */}
        <rect x={L} y={ROW1_Y + ROW_H} width={ZW} height={INNER_H} fill="#9a9590" />

        {/* === ЛЕВЫЙ БЛОК === */}
        <rect x={0} y={ROAD_H} width={L} height={VH - ROAD_H} fill="#3a6645" />
        {/* Основной въезд */}
        <rect x={4} y={ROAD_H + 4} width={L - 8} height={52} fill="#c0b090" rx={3} />
        <text x={L/2} y={ROAD_H + 22} textAnchor="middle" fill="#3a2c18" fontSize={8.5} fontWeight="700">ОСНОВНОЙ</text>
        <text x={L/2} y={ROAD_H + 33} textAnchor="middle" fill="#3a2c18" fontSize={8.5} fontWeight="700">ВЪЕЗД</text>
        {/* Коммерция */}
        <rect x={4} y={ROAD_H + 62} width={L - 8} height={54} fill="#d4a84a" rx={3} stroke="#b8902a" strokeWidth={1} />
        <text x={L/2} y={ROAD_H + 83} textAnchor="middle" fill="#4a3000" fontSize={8.5} fontWeight="700">КОМ-</text>
        <text x={L/2} y={ROAD_H + 95} textAnchor="middle" fill="#4a3000" fontSize={8.5} fontWeight="700">МЕРЦИЯ</text>
        {/* Компас */}
        <circle cx={L/2} cy={ROW2_Y + ROW_H/2} r={24} fill="none" stroke="#78a070" strokeWidth={1.5} />
        <text x={L/2} y={ROW2_Y + ROW_H/2 - 10} textAnchor="middle" fill="#a8c898" fontSize={10} fontWeight="700">С</text>
        <text x={L/2} y={ROW2_Y + ROW_H/2 + 18} textAnchor="middle" fill="#a8c898" fontSize={10} fontWeight="700">Ю</text>
        <text x={L/2 - 18} y={ROW2_Y + ROW_H/2 + 4} textAnchor="middle" fill="#a8c898" fontSize={10} fontWeight="700">З</text>
        <text x={L/2 + 18} y={ROW2_Y + ROW_H/2 + 4} textAnchor="middle" fill="#a8c898" fontSize={10} fontWeight="700">В</text>

        {/* === ПРАВЫЙ БЛОК === */}
        <rect x={VW - R} y={ROAD_H} width={R} height={VH - ROAD_H} fill="#3a6645" />
        {/* Второй въезд */}
        <rect x={VW - R + 4} y={ROAD_H + 4} width={R - 8} height={42} fill="#c0b090" rx={3} />
        <text x={VW - R/2} y={ROAD_H + 20} textAnchor="middle" fill="#3a2c18" fontSize={8.5} fontWeight="700">ВТОРОЙ</text>
        <text x={VW - R/2} y={ROAD_H + 32} textAnchor="middle" fill="#3a2c18" fontSize={8.5} fontWeight="700">ВЪЕЗД</text>
        {/* Детский сад */}
        <rect x={VW - R + 4} y={ROAD_H + 54} width={R - 8} height={66} fill="#e8dbc0" rx={3} stroke="#c4a878" strokeWidth={1} />
        <text x={VW - R/2} y={ROAD_H + 74} textAnchor="middle" fill="#4a3820" fontSize={8} fontWeight="700">ДЕТ-</text>
        <text x={VW - R/2} y={ROAD_H + 85} textAnchor="middle" fill="#4a3820" fontSize={8} fontWeight="700">СКИЙ</text>
        <text x={VW - R/2} y={ROAD_H + 96} textAnchor="middle" fill="#4a3820" fontSize={8} fontWeight="700">САД</text>

        {/* === РЯД 1 (участки 1-12) === */}
        {ROW_TOP.map((n, i) => {
          const p = PLOTS[n];
          const { bg, color } = PLOT_STATUS_COLORS[p.status];
          const x = r1x(i);
          const isSel = active === n;
          return (
            <g key={n} onClick={() => setActive(active === n ? null : n)} style={{ cursor: "pointer" }}>
              <rect x={x} y={ROW1_Y} width={R1W} height={ROW_H} fill={bg} rx={4}
                stroke={isSel ? "#262216" : "rgba(0,0,0,0.18)"} strokeWidth={isSel ? 2.5 : 1} />
              {isSel && <rect x={x - 2} y={ROW1_Y - 2} width={R1W + 4} height={ROW_H + 4}
                fill="none" stroke="rgba(255,94,23,0.5)" strokeWidth={3} rx={5} />}
              <text x={x + R1W/2} y={ROW1_Y + 25} textAnchor="middle" fill={color} fontSize={16} fontWeight="700">{n}</text>
              {p.area && <text x={x + R1W/2} y={ROW1_Y + 40} textAnchor="middle" fill={color} fontSize={9} opacity={0.9}>{p.area} м²</text>}
              {p.status === "available" && p.price && <text x={x + R1W/2} y={ROW1_Y + 53} textAnchor="middle" fill={color} fontSize={8}>{fmtP(p.price)}</text>}
              {p.note && <text x={x + R1W/2} y={ROW1_Y + 66} textAnchor="middle" fill={color} fontSize={7.5} fontWeight="700">{p.note}</text>}
            </g>
          );
        })}

        {/* === РЯД 2 (участки 23-13) === */}
        {ROW_BOT.map((n, i) => {
          const p = PLOTS[n];
          const { bg, color } = PLOT_STATUS_COLORS[p.status];
          const x = r2x(i);
          const isSel = active === n;
          return (
            <g key={n} onClick={() => setActive(active === n ? null : n)} style={{ cursor: "pointer" }}>
              <rect x={x} y={ROW2_Y} width={R2W} height={ROW_H} fill={bg} rx={4}
                stroke={isSel ? "#262216" : "rgba(0,0,0,0.18)"} strokeWidth={isSel ? 2.5 : 1} />
              {isSel && <rect x={x - 2} y={ROW2_Y - 2} width={R2W + 4} height={ROW_H + 4}
                fill="none" stroke="rgba(255,94,23,0.5)" strokeWidth={3} rx={5} />}
              <text x={x + R2W/2} y={ROW2_Y + 25} textAnchor="middle" fill={color} fontSize={16} fontWeight="700">{n}</text>
              {p.area && <text x={x + R2W/2} y={ROW2_Y + 40} textAnchor="middle" fill={color} fontSize={9} opacity={0.9}>{p.area} м²</text>}
              {p.status === "available" && p.price && <text x={x + R2W/2} y={ROW2_Y + 53} textAnchor="middle" fill={color} fontSize={8}>{fmtP(p.price)}</text>}
              {p.note && <text x={x + R2W/2} y={ROW2_Y + 66} textAnchor="middle" fill={color} fontSize={7.5} fontWeight="700">{p.note}</text>}
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-5 mt-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "#FF5E17" }} /> В продаже</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-400" /> Продан</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300" /> Уточняется</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300" /> Не в продаже</span>
      </div>

      {active != null && ap && (
        <div className="mt-5 rounded-2xl border p-5 relative" style={{
          borderColor: ap.status === "available" ? "#FF5E17" : "#e2e8f0",
          backgroundColor: ap.status === "available" ? "#fff7f3" : "#f8fafc",
        }}>
          <button onClick={() => setActive(null)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
          <div className="font-bold text-base mb-1" style={{ color: "#262216" }}>Участок №{active}</div>
          {ap.status === "available" && (
            <div>
              {ap.area && <div className="text-slate-700 text-sm">Дом {ap.area} м²</div>}
              {ap.note && <div className="text-emerald-600 text-sm font-semibold">{ap.note}</div>}
              {ap.price && <div className="text-xl font-bold mt-1" style={{ color: "#FF5E17" }}>{ap.price.toLocaleString("ru-RU")} ₽</div>}
              <a href={CONTACTS.max} className="mt-3 inline-block rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "#FF5E17", color: "#fff" }}>Написать в MAX</a>
            </div>
          )}
          {ap.status === "sold" && <div className="text-slate-500 text-sm">Участок продан</div>}
          {ap.status === "empty" && <div className="text-slate-500 text-sm">Участок без дома — уточняйте условия: <a href={CONTACTS.max} style={{ color: "#FF5E17" }}>написать в MAX</a></div>}
          {ap.status === "other" && <div className="text-slate-500 text-sm">Участок не в продаже</div>}
        </div>
      )}
    </Section>
  );
}

