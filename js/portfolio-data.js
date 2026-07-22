/* portfolio-data.js */
'use strict';

const PORTFOLIO_DATA = {

  projects: [
    {
      id: 'various-cases',
      title: 'Web/Mobile - Island Survivor (MVP, Unity)',
      subtitle: 'MVP-концепт, системный дизайн и баланс',
      period: '2025',
      role: 'Системный геймдизайнер / консультант',
      summary: 'Island Survivor — концепт Web/мобильной F2P-игры в жанре idle arcade / action RPG с видом сверху на Unity. Проект построен вокруг экспедиционной петли: игрок выходит с базы, сражается с мобами, собирает ресурсы, возвращается для депозита, запускает производство, улучшает персонажа и оружие, а затем открывает новые острова через ремонт мостов.',
      tags: ['F2P', 'mobile', 'системный дизайн', 'экономика', 'баланс', 'прогрессия', 'левел-дизайн', 'FTUE'],
      link: null,
      responsibilities: [
        'Разработка MVP-концепта и верхнеуровневого дизайн-документа проекта',
        'Проектирование core loop, trip loop и meta loop, а также структуры прогрессии от FTUE до поздних этапов',
        'Проработка систем боя, ресурсов, базы, производства, мостов и ограничений инвентаря',
        'Сборка макро-балансной модели: темп прогрессии, дефицит ресурсов, давление на рюкзаки, поток премиальной валюты и ощущение оружия',
        'Подготовка правил левел-дизайна для островов: обязательные POI, AFK- и риск-споты, ресурсные зоны, минибоссы, боссы, маршруты и тайминги',
        'Проектирование монетизации, аналитических событий и KPI для проверки pacing, retention и рекламных размещений',
        'Непосредственное создание левел-дизайна в движке (меши, шейдеры, размещение объектов и тестирование flow / баланса)'
      ],
      results: [
        'Подготовлен полноценный пакет препродакшн-документации по проекту',
        'Сформирована структура прогрессии и экономики, пригодная для передачи в продакшн и прототипирования',
        'Создан стандарт построения островов для левел-дизайнеров с единым набором правил и чеклистом качества',
        'Заложена аналитическая рамка для оценки resource flow, death rate, Time to Base, Time to Bridge и ad opt-in',
        'Определены F2P-механики convenience-монетизации без жёстких paywall-сценариев',
        'Создан левел-дизайн и заложены тайминги прохождения игровых этапов длительностью до 30 игровых часов'
      ]
    },

    {
      id: 'indie-vertical-slice',
      title: 'Deep Dark PC/Steam, Unity Coop Action',
      subtitle: 'Инди-проект: от концепции до вертикального среза',
      period: '2024 — 2025',
      role: 'Ведущий геймдизайнер / Системный дизайнер',
      summary: 'Deep Dark — инди-проект в жанре survival с исследованием, крафтом, ресурсной прогрессией и процедурной генерацией окружения. Проект доведён до стадии вертикального среза: рабочий core loop, несколько биомов, система ресурсов, базовый интерфейс и первые минуты пользовательского опыта.',
      tags: ['indie', 'Unity', 'survival', 'процедурная генерация', 'крафт', 'прогрессия', 'вертикальный срез', 'FTUE'],
      link: null,
      responsibilities: [
        'Проектирование core loop: исследование, сбор, крафт и улучшение',
        'Разработка системы ресурсов, цепочек разблокировки и базовой экономики прогрессии',
        'Участие в проектировании процедурной генерации уровней и распределения POI',
        'Подготовка дизайн-документации по ключевым системам и раннему пользовательскому опыту',
        'Сопровождение сборки игрового вертикального среза в Unity',
        'Level blockout и компоновка игровых сцен'
      ],
      results: [
        'Собран играбельный вертикальный срез с рабочими ключевыми системами',
        'Реализован базовый игровой цикл: исследование, сбор ресурсов, крафт и улучшение',
        'Собрана система прогрессии с поэтапным открытием ресурсов и механик',
        'Подготовлена документационная база для дальнейшего развития проекта (более 200 рабочих документов по всем системам и фичам)'
      ]
    },

    {
      id: 'mmo-systems',
      title: 'Freelance / Проектная работа',
      subtitle: 'Прототипы, аудиты и прикладные геймдизайнерские задачи',
      period: '2025 — н.в.',
      role: 'Геймдизайнер / Консультант',
      summary: 'Набор небольших и средних проектных задач: маркетинговые и обучающие игры, быстрые прототипы, F2P-мета-слои, аудит FTUE, документации и балансных моделей для внешних команд и заказчиков.',
      tags: ['консалтинг', 'прототипирование', 'Unity', 'Godot', 'web', 'FTUE', 'аудит', 'геймификация', 'документация'],
      link: null,
      responsibilities: [
        'Проектирование быстрых прототипов под конкретные продуктовые и маркетинговые задачи',
        'Подготовка дизайн-документов, балансных таблиц и feature-документов для внешних команд',
        'Аудит FTUE, онбординга и раннего player journey с рекомендациями по снижению оттока',
        'Разработка F2P-мета-слоёв, экономических моделей и систем прогрессии',
        'Работа с веб-прототипами и короткими демо-сценариями под презентации и мероприятия'
      ],
      results: [
        'Собраны быстрые рабочие прототипы под внешние задачи и презентации',
        'Подготовлены документы и балансные модели, пригодные для передачи заказчику или внутренней команде',
        'Проведены аудиты FTUE и раннего пользовательского опыта с конкретными рекомендациями',
        'Сформирован набор прикладных кейсов по консалтингу, прототипированию и раннему системному дизайну'
      ]
    },

    {
      id: 'case-4',
      title: 'Fantasy MMORPG [NDA]',
      subtitle: 'Экономика, туториал и PvP-матчмейкинг',
      period: '2013 — 2015',
      role: 'Геймдизайнер / Экономический дизайнер',
      summary: 'Классическая fantasy MMORPG с крафтом, фармом и PvP. В рамках проекта отвечал за проектирование рынка между игроками, переработку раннего обучения и ребаланс PvP-подбора по силе экипировки.',
      tags: ['MMORPG', 'PC', 'экономика', 'рынок между игроками', 'PvP', 'матчмейкинг', 'FTUE', 'retention', 'баланс'],
      link: null,
      responsibilities: [
        'Проектирование модели рынка между игроками с аукционной логикой и налогом на сделки как основным стоком золота',
        'Сборка математической модели потоков ресурсов и антиинфляционных механизмов',
        'Анализ воронки туториала по когортам и поиск точек раннего оттока',
        'Переработка раннего пользовательского опыта: темп обучения, раскрытие систем и сложность первого боя',
        'Ребаланс PvP-матчмейкинга через брекеты по силе экипировки и защитный период для новичков'
      ],
      results: [
        'Запущен работающий рынок между игроками с 50K+ ежедневных транзакций на стабильной базе проекта',
        'Снижен ранний отток после переработки туториала и улучшен completion rate обучения',
        'Повышена вовлечённость в PvP после более справедливого распределения игроков по брекетам',
        'Экономика проекта стала устойчивее за счёт управляемых стоков и снижения инфляционного давления'
      ]
    },

    {
      id: 'case-5',
      title: 'Action-MMO / Vehicular Combat [NDA]',
      subtitle: 'Монетизация, экономика и player journey',
      period: '2015 — 2018',
      role: 'Старший геймдизайнер / Экономический дизайнер',
      summary: 'Action-MMO с крафтом боевых машин и глубокой рыночной экономикой. Основные задачи: управление инфляцией, повышение конверсии в первую покупку и интеграция монетизации в player journey.',
      tags: ['MMO', 'F2P', 'PC', 'монетизация', 'экономика', 'player journey', 'A/B-тесты', 'ARPDAU', 'LTV'],
      link: null,
      responsibilities: [
        'Работа с макроэкономикой проекта: стоки, скорость обращения валюты, поведение ключевых ресурсов и контроль инфляции',
        'Переработка сценария первой покупки: тайминг показа, состав оффера, ценовой вход и воспринимаемая ценность',
        'Проведение A/B-тестов монетизационных сценариев и оценка влияния на ARPDAU, ARPPU и LTV',
        'Интеграция контекстных офферов в player journey: дефицит ресурсов, новые тиры, возврат в игру, неудачи в PvP',
        'Настройка экономики крупных обновлений так, чтобы новые тиры предметов не ломали полезность старых'
      ],
      results: [
        'Стабилизирована рыночная экономика проекта при 100K+ DAU и управляемом уровне инфляции',
        'Повышена конверсия в первую покупку за счёт нового стартового оффера и корректного момента показа',
        'Рост ARPDAU после встраивания персонализированных офферов в реальные потребности игрока',
        'Улучшен LTV новых когорт за счёт более мягкого входа в платящий сегмент'
      ]
    },

    {
      id: 'case-6',
      title: 'Азиатские MMORPG [NDA]',
      subtitle: 'Retention, монетизация и mid-game плато',
      period: '2018 — 2022',
      role: 'Ведущий геймдизайнер / Системный дизайнер',
      summary: 'Работа на нескольких MMORPG-проектах, азиатский рынок. Основной фокус: ранний player journey, сегментированная монетизация, борьба с оттоком на среднем этапе прогрессии и развитие социальных механик удержания.',
      tags: ['MMORPG', 'F2P', 'mobile', 'PC', 'retention', 'монетизация', 'player journey', 'LiveOps', 'прогрессия', 'сегментация'],
      link: null,
      responsibilities: [
        'Анализ раннего player journey и поиск точек оттока между первыми днями прогрессии',
        'Переработка первых 7 дней опыта: темп раннего контента, яркие моменты, цепочки наград и раннее подключение социальных систем',
        'Сегментация монетизации по стадиям прогрессии и типам игроков: новичок, mid-game, late-game, вернувшийся игрок',
        'Проектирование разовых офферов под ключевые достижения и milestone-моменты прогрессии',
        'Работа с mid-game плато: сезонные ротации контента, социальные механики, breadcrumb-структура и мягкая динамическая сложность'
      ],
      results: [
        'Рост D7 retention после переработки раннего player journey и более ясной структуры первых дней',
        'Увеличение среднего чека за счёт релевантных офферов, встроенных в этап прогрессии игрока',
        'Снижение оттока на mid-game этапе благодаря ротации контента и дополнительным социальным целям',
        'Улучшение удержания платящих игроков за счёт более понятной и честной ценности предложений'
      ]
    }
  ],

assets: [

  // ═══════════════════════════════════════════
  // various-cases / Island Survivor
  // ═══════════════════════════════════════════

  // Images
  { id: 'p2-img-1', projectId: 'various-cases', type: 'images', title: 'Скриншот Геймплея', desc: 'Игрок находится на "базе", выдан квест на улучшение оружия, справа виден ограниченный по времени оффер', thumb: 'assets/portisland1.png', url: 'assets/portisland1.png' },
  { id: 'p2-img-2', projectId: 'various-cases', type: 'images', title: 'Правила левел-дизайна островов', desc: 'Фрагмент документа для левел-дизайнеров.', thumb: 'assets/portislvld1.png', url: 'assets/portislvld1.png' },
  { id: 'p2-img-3', projectId: 'various-cases', type: 'images', title: 'Схема левел-дизайна переданная в продакшн', desc: 'Размечены POI с применяемыми в движке обозначениями.', thumb: 'assets/portislvld.png', url: 'assets/portislvld.png' },
  { id: 'p2-img-4', projectId: 'various-cases', type: 'images', title: 'Итоговый результат сбора в движке (Unity)', desc: 'Созданы меши, шейдер, размещены точки появления ресурсов, противников, harvestables, POI и т.д. Далее проводится тестирование и корректировка баланса и левел-дизайна на основе результатов.', thumb: 'assets/portislvld3.jpg', url: 'assets/portislvld3.jpg' },

  // Docs
  { id: 'p2-doc-1', projectId: 'various-cases', type: 'docs', title: 'Island Survivor — дизайн-документ MVP', desc: 'Полный GDD проекта: core loop, прогрессия, экономика, монетизация и аналитика.', thumb: 'assets/portdd1.png', url: 'https://docs.google.com/document/d/17FeHS-Vmx8KzNHYJenV9im53vE5A-2xo47xj1o6c7Ew/edit?usp=sharing' },
  { id: 'p2-doc-2', projectId: 'various-cases', type: 'docs', title: 'Island Survivor — правила левел-дизайна островов', desc: 'Документ-стандарт для левел-дизайнеров: POI, маршруты, AFK-споты, ресурсные зоны, боссы.', url: 'https://docs.google.com/document/d/1EhAz3-Gslq1Ipmi5YKLjObwh5LqvhwI-ISk8iMVBW4s/edit?usp=sharing' },
  { id: 'p2-doc-3', projectId: 'various-cases', type: 'docs', title: 'Island Survivor — фича-документ: смерть и сохранение лута', desc: 'Подробная проработка одной из ключевых систем проекта.', url: 'https://docs.google.com/document/d/1UHDVMSXguT9kDLIjkPAltG4CwCCo6_wRp5u-aH779g8/edit?usp=sharing' },

  // Sheets
  { id: 'p2-sheet-1', projectId: 'various-cases', type: 'sheets', title: 'Island Survivor — таблица макро-баланса', desc: 'Темп прогрессии, давление на рюкзаки, ресурсный дефицит, поток премиальной валюты и ощущение оружия.', thumb: 'assets/portbal.png', url: 'https://docs.google.com/spreadsheets/d/1-8gMWjEvwuZ9UmwPlMC8FHdpYcU5RM1jQL4GdhUO1-0/edit?usp=sharing' },


  // ═══════════════════════════════════════════
  // indie-vertical-slice / Deep Dark
  // ═══════════════════════════════════════════

  // Images
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Deep Dark', desc: 'Первичный визуальный концепт', thumb: 'assets/portdd2.jpg', url: 'assets/portdd2.jpg' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Визуал вертикального среза', desc: 'Результат работы команды на момент готовности среза', thumb: 'assets/ddslice.jpg', url: 'assets/ddslice.jpg' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Global Core Loop', desc: 'Глобальная игровая петля', thumb: 'assets/coreloop.png', url: 'assets/coreloop.png' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Craft Feature Spec', desc: 'Спецификация по системе крафта', thumb: 'assets/craftfeature.png', url: 'assets/craftfeature.png' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Biomes Feature Spec', desc: 'Спецификация по системе биомов', thumb: 'assets/biomefeature.png', url: 'assets/biomefeature.png' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Anomalies Event Feature Spec', desc: 'Спецификация по системе процедурных ивентов с аномалиями', thumb: 'assets/anomalies.png', url: 'assets/anomalies.png' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Inventory UI blocking', desc: 'Блокинг работы хотбара и инвентаря', thumb: 'assets/controls.jpg', url: 'assets/controls.jpg' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Drill Control UI blocking', desc: 'Блокинг управления движением бура', thumb: 'assets/drillcontrols.png', url: 'assets/drillcontrols.png' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Level Design Spec', desc: 'Спецификация по левел-дизайну мира', thumb: 'assets/leveld.jpg', url: 'assets/leveld.jpg' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Enemy AI spec', desc: 'Спецификация интеллекта противника', thumb: 'assets/aispec.png', url: 'assets/aispec.png' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Interior Blocking', desc: 'Блокинг интерьера', thumb: 'assets/interior.jpg', url: 'assets/interior.jpg' },
  { id: 'p1-img-1', projectId: 'indie-vertical-slice', type: 'images', title: 'Interior Result', desc: 'Результат работы команды над интерьером', thumb: 'assets/interiorfin.png', url: 'assets/interiorfin.png' },
  // Docs
  { id: 'p1-doc-1', projectId: 'indie-vertical-slice', type: 'docs', title: 'Deep Dark — дизайн-документ', desc: 'Архитектура систем, core loop, прогрессия и экономика.', thumb: 'assets/portdd2.jpg', url: 'https://docs.google.com/document/d/1tuYnYBgn_0XKn6XKPoIbXnb5qh1lCGiyNpYdBebd8yA/edit?usp=sharing' },

  // Videos
  { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: 'Video Mockup / Геймплейный мудборд', desc: 'Питчинг идеи: Быстрая демонстрация ключевых фич и атмосферы без затрат на полноценную разработку прототипа..', thumb: 'assets/portdd1.png', url: 'https://youtu.be/Uujr8dVtgCE' },
  { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: 'Питч устройства игрового мира', desc: 'Питчинг идеи: Устройство уровней, ограничения, процедурная генерация и пр.', thumb: 'assets/portisland1.png', url: 'https://youtu.be/qizTr06SGXA' },
  { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: 'Procedural Cave Level Design (local)', desc: 'Одна пещера. Тестирование процедурной генерации (dungen, scatter layers) в движке Unity.', url: 'https://youtu.be/n6Lz13CWtmg' },
  { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: 'Procedural Cave Level Design (global)', desc: 'Группа пещер. Тестирование процедурной генерации (dungen, scatter layers) в движке Unity.', url: 'https://youtu.be/-W12R0rqnQM' },
  { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: 'Interior Concept Blocking ', desc: 'Концепт интерьера холла со станциями крафта', url: 'https://youtu.be/2TiMkLFrvSA' },
  { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: 'Worm Combat Prototyping ', desc: 'Прототип сражения с противником', url: 'https://youtu.be/em_6Gm1TQWw' },
  { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: '3PV spawning animation test ', desc: 'Тестирование анимации возрождения от третьего лица', url: 'https://youtu.be/KiczLO-jhNQ' },
   { id: 'p1-vid-1', projectId: 'indie-vertical-slice', type: 'videos', title: 'FPV spawning animation test ', desc: 'Тестирование анимации возрождения от первого лица', url: 'https://youtu.be/izihVmvvrdY' },
  // Other
  { id: 'p1-other-1', projectId: 'indie-vertical-slice', type: 'other', title: 'Референсы и визуальная подготовка', desc: 'Материалы по визуальному направлению и подготовке окружения.', thumb: 'assets/portislvld2.jpg', url: null },


  // ═══════════════════════════════════════════
  // mmo-systems / Разное / консалтинг
  // ═══════════════════════════════════════════

  // Images
  { id: 'p3-img-1', projectId: 'mmo-systems', type: 'images', title: 'Баланс-таблица', desc: 'Фрагмент для F2P.', thumb: 'assets/portbal.png', url: 'assets/portbal.png' },
  { id: 'p3-img-2', projectId: 'mmo-systems', type: 'images', title: 'Дерево диалогов', desc: 'Ветвления и флаги.', thumb: 'assets/portdd1.png', url: 'assets/portdd1.png' },
  { id: 'p3-img-3', projectId: 'mmo-systems', type: 'images', title: 'Квестовые цепочки', desc: 'Условия и последствия.', thumb: 'assets/portdd2.jpg', url: 'assets/portdd2.jpg' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },
  { id: 'p3-img-4', projectId: 'mmo-systems', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },


  // Docs
  { id: 'p3-doc-2', projectId: 'mmo-systems', type: 'docs', title: 'Маркетинговая игра / автобаттлер', desc: 'Документ по игровому прототипу для внешней презентационной задачи.', thumb: 'assets/portdd1.png', url: 'https://docs.google.com/document/d/1dYlUL_3MdEi0DdIy9tmsDItKH-pLdLVMMMSFcSClCHU/edit?usp=sharing' },
  { id: 'p3-doc-3', projectId: 'mmo-systems', type: 'docs', title: 'Аудит проекта', desc: 'Разбор раннего пользовательского опыта с рекомендациями по снижению оттока.', url: 'https://docs.google.com/document/d/14r-Gfi4MADMNFCGST2NVYu9pUiRCRhmV2iDbxWTHOGw/edit?usp=sharing' },
  { id: 'p3-doc-4', projectId: 'mmo-systems', type: 'docs', title: 'ТЗ - серверная система матчмейкинга', desc: 'Документ проектирования серверной игровой системы, отвечающей за подбор, распределение и телепортацию игроков в разломы с учётом веса игрока, веса инстансов, pity-логики, антиабуза, кластерной архитектуры, интеграций с плагинами и телеметрии.', url: 'https://docs.google.com/document/d/1yitAQe5DrLvsaGn0NdETyFhLwL6n7WP28c1eLlYugzU/edit?usp=sharing' },
  { id: 'p3-doc-5', projectId: 'mmo-systems', type: 'docs', title: 'Vision video / mood video', desc: 'Подготовка видео для теста атмосферы, темпа и общего ощущения проекта.', url: 'https://docs.google.com/spreadsheets/d/1-8gMWjEvwuZ9UmwPlMC8FHdpYcU5RM1jQL4GdhUO1-0/edit?usp=sharing'},


  // Sheets
  { id: 'p3-sheet-1', projectId: 'mmo-systems', type: 'sheets', title: 'Mobile RPG - Narrative Event Matrix', desc: 'Структурированная база данных энкаунтеров (событий), учитывающая параметры персонажа (возраст, пол, статус) и предлагающая ветвление на основе проверок характеристик (Charisma, Intellegence, Will и др.).', thumb: 'assets/portnar.png', url: 'https://docs.google.com/spreadsheets/d/1-8gMWjEvwuZ9UmwPlMC8FHdpYcU5RM1jQL4GdhUO1-0/edit?usp=sharing'},

  // Videos
  { id: 'p3-vid-1', projectId: 'mmo-systems', type: 'videos', title: 'Препродакшн-видео', desc: 'Сборка слайдов, гифок, музыки и таймлайна для теста атмосферы будущего проекта.', thumb: 'assets/portnar.png', url: null },

  // Prototypes
  { id: 'p3-proto-1', projectId: 'mmo-systems', type: 'prototypes', title: 'Веб-прототип', desc: 'Быстрый прототип для презентации или теста гипотез.', thumb: 'assets/portdd2.jpg', url: null },

  // Other
  { id: 'p3-other-1', projectId: 'mmo-systems', type: 'other', title: 'Подборка мелких кейсов', desc: 'Небольшие задачи по консалтингу, прототипированию и проектной документации.', thumb: 'assets/portbal.png', url: null },


  // ═══════════════════════════════════════════
  // case-4 / Fantasy MMORPG
  // ═══════════════════════════════════════════

  // Images
  { id: 'p4-img-1', projectId: 'case-4', type: 'images', title: 'Баланс-таблица', desc: 'Фрагмент экономической модели.', thumb: 'assets/portbal.png', url: 'assets/portbal.png' },
  { id: 'p4-img-2', projectId: 'case-4', type: 'images', title: 'Схема систем', desc: 'Визуальная структура проекта.', thumb: 'assets/portdd1.png', url: 'assets/portdd1.png' },
  { id: 'p4-img-3', projectId: 'case-4', type: 'images', title: 'Квестовые цепочки', desc: 'Условия и последствия.', thumb: 'assets/portdd2.jpg', url: 'assets/portdd2.jpg' },
  { id: 'p4-img-4', projectId: 'case-4', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },

  // Docs
  { id: 'p4-doc-1', projectId: 'case-4', type: 'docs', title: 'Рынок между игроками и экономика', desc: 'Проектирование аукционной системы, стоков и антиинфляционных механизмов.', thumb: 'assets/portdd1.png', url: null },
  { id: 'p4-doc-2', projectId: 'case-4', type: 'docs', title: 'Переработка туториала', desc: 'Анализ воронки обучения и изменения раннего пользовательского опыта.', url: null },
  { id: 'p4-doc-3', projectId: 'case-4', type: 'docs', title: 'PvP-матчмейкинг', desc: 'Разделение игроков по брекетам силы экипировки и защита новичков.', url: null },

  // Sheets
  { id: 'p4-sheet-1', projectId: 'case-4', type: 'sheets', title: 'Экономическая модель', desc: 'Модель потоков золота, ресурсов, крафта и рыночных стоков.', thumb: 'assets/portbal.png', url: null },

  // Videos
  { id: 'p4-vid-1', projectId: 'case-4', type: 'videos', title: 'Обзор экономических систем', desc: 'Видеоразбор рынка и антиинфляционных механизмов. Материал под NDA — доступен на интервью.', thumb: 'assets/portnar.png', url: null },

  // Prototypes
  { id: 'p4-proto-1', projectId: 'case-4', type: 'prototypes', title: 'Симуляция рынка', desc: 'Прототип модели рыночного ценообразования. Материал под NDA — доступен на интервью.', thumb: 'assets/portdd2.jpg', url: null },

  // Other
  { id: 'p4-other-1', projectId: 'case-4', type: 'other', title: 'Материалы под NDA', desc: 'Более детальные документы и метрики доступны для обсуждения на интервью.', thumb: 'assets/portbal.png', url: null },


  // ═══════════════════════════════════════════
  // case-5 / Action-MMO / Vehicular Combat
  // ═══════════════════════════════════════════

  // Images
  { id: 'p5-img-1', projectId: 'case-5', type: 'images', title: 'Баланс-таблица', desc: 'Фрагмент экономической модели.', thumb: 'assets/portbal.png', url: 'assets/portbal.png' },
  { id: 'p5-img-2', projectId: 'case-5', type: 'images', title: 'Схема систем', desc: 'Визуальная структура проекта.', thumb: 'assets/portdd1.png', url: 'assets/portdd1.png' },
  { id: 'p5-img-3', projectId: 'case-5', type: 'images', title: 'Квестовые цепочки', desc: 'Условия и последствия.', thumb: 'assets/portdd2.jpg', url: 'assets/portdd2.jpg' },
  { id: 'p5-img-4', projectId: 'case-5', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },

  // Docs
  { id: 'p5-doc-1', projectId: 'case-5', type: 'docs', title: 'Конверсия в первую покупку', desc: 'Разбор стартового оффера, тайминга показа и A/B-тестирования.', thumb: 'assets/portdd1.png', url: null },
  { id: 'p5-doc-2', projectId: 'case-5', type: 'docs', title: 'Экономика и управляемая инфляция', desc: 'Подход к контролю инфляции и полезности старых предметов при обновлениях.', url: null },
  { id: 'p5-doc-3', projectId: 'case-5', type: 'docs', title: 'Монетизация в player journey', desc: 'Контекстные офферы, связанные с этапом прогрессии и проблемой игрока.', url: null },

  // Sheets
  { id: 'p5-sheet-1', projectId: 'case-5', type: 'sheets', title: 'A/B-тесты и метрики', desc: 'Сводка по ключевым метрикам: конверсия, ARPDAU, LTV.', thumb: 'assets/portbal.png', url: null },

  // Videos
  { id: 'p5-vid-1', projectId: 'case-5', type: 'videos', title: 'Обзор монетизации и player journey', desc: 'Видеоразбор интеграции офферов в прогрессию. Материал под NDA — доступен на интервью.', thumb: 'assets/portnar.png', url: null },

  // Prototypes
  { id: 'p5-proto-1', projectId: 'case-5', type: 'prototypes', title: 'Симуляция экономики', desc: 'Прототип модели инфляции и стоков. Материал под NDA — доступен на интервью.', thumb: 'assets/portdd2.jpg', url: null },

  // Other
  { id: 'p5-other-1', projectId: 'case-5', type: 'other', title: 'Материалы под NDA', desc: 'Подробные данные и дополнительные кейсы доступны на интервью.', thumb: 'assets/portbal.png', url: null },


  // ═══════════════════════════════════════════
  // case-6 / Азиатские MMORPG
  // ═══════════════════════════════════════════

  // Images
  { id: 'p6-img-1', projectId: 'case-6', type: 'images', title: 'Баланс-таблица', desc: 'Фрагмент экономической модели.', thumb: 'assets/portbal.png', url: 'assets/portbal.png' },
  { id: 'p6-img-2', projectId: 'case-6', type: 'images', title: 'Схема систем', desc: 'Визуальная структура проекта.', thumb: 'assets/portdd1.png', url: 'assets/portdd1.png' },
  { id: 'p6-img-3', projectId: 'case-6', type: 'images', title: 'Квестовые цепочки', desc: 'Условия и последствия.', thumb: 'assets/portdd2.jpg', url: 'assets/portdd2.jpg' },
  { id: 'p6-img-4', projectId: 'case-6', type: 'images', title: 'Нарративная схема', desc: 'Арки, ветки, возвраты.', thumb: 'assets/portnar.png', url: 'assets/portnar.png' },

  // Docs
  { id: 'p6-doc-1', projectId: 'case-6', type: 'docs', title: 'Ранний player journey и D7 retention', desc: 'Переработка первых дней прогрессии и раннего удержания.', thumb: 'assets/portdd1.png', url: null },
  { id: 'p6-doc-2', projectId: 'case-6', type: 'docs', title: 'Сегментация офферов и рост среднего чека', desc: 'Монетизация по этапам прогрессии и типам игроков.', url: null },
  { id: 'p6-doc-3', projectId: 'case-6', type: 'docs', title: 'Снижение оттока на mid-game этапе', desc: 'Ротации контента, социальные механики и мягкая динамическая сложность.', url: null },

  // Sheets
  { id: 'p6-sheet-1', projectId: 'case-6', type: 'sheets', title: 'Карты прогрессии и удержания', desc: 'Рабочие схемы player journey, этапов прогрессии и точек просадки.', thumb: 'assets/portbal.png', url: null },

  // Videos
  { id: 'p6-vid-1', projectId: 'case-6', type: 'videos', title: 'Обзор retention-механик', desc: 'Видеоразбор подходов к удержанию и борьбе с mid-game оттоком. Материал под NDA — доступен на интервью.', thumb: 'assets/portnar.png', url: null },

  // Prototypes
  { id: 'p6-proto-1', projectId: 'case-6', type: 'prototypes', title: 'Модель прогрессии', desc: 'Прототип расчёта темпа прогрессии и точек оттока. Материал под NDA — доступен на интервью.', thumb: 'assets/portdd2.jpg', url: null },

  // Other
  { id: 'p6-other-1', projectId: 'case-6', type: 'other', title: 'Материалы под NDA', desc: 'Расширенные материалы и численные детали доступны на интервью.', thumb: 'assets/portbal.png', url: null }
]
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;