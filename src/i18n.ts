import { createI18n } from 'vue-i18n'

export const supportedLocales = ['zh', 'en', 'ja'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

export const localeLabels: Record<SupportedLocale, string> = {
  zh: '中',
  en: 'EN',
  ja: '日',
}

const messages = {
  zh: {
    language: {
      label: '切换语言',
    },
    footer: {
      github: '在 GitHub 找到我',
    },
    connect: {
      title: 'Find me',
      subtitle: '在 GitHub 上，那里是我留下代码最多的地方。',
    },
    nav: {
      home: '回到页面顶部',
      label: '页面导航',
      about: 'About',
      interests: 'Interests',
      connect: 'Connect',
    },
    hero: {
      tagsLabel: '个人标签',
      eyebrow: 'PERSONAL SITE / DEVELOPER WITH TOO MANY TABS OPEN',
      titleLine1: '我写代码，',
      titleLine2: '也给故事留位置。',
      intro: '你好，我是 Mutsuki，一名开发者。严格来说，这个介绍已经比“会写点 code”复杂多了，但也没有复杂到能解释清楚我到底在忙什么。',
      tags: [
        '项目制造者',
        'Galgame 沉浸式玩家',
        '动画与百合作品观察员',
        '情绪和关系的长期研究者',
        '把灵感写成页面的人',
        '偶尔认真，通常随缘',
      ],
      scroll: '向下探索',
    },
    about: {
      label: '/ ABOUT',
      title: 'Who Am I',
      paragraphs: [
        '我是 Mutsuki。至于这个名字是不是唯一的答案——先别急着下结论。人类给自己贴标签的速度很快，真正把自己解释清楚却很慢，所以我决定先从“开发者”这个最方便的答案开始。',
        '我平时做一些有趣的项目。这里的“有趣”可能是一个很认真的交互，也可能是某个半夜突然冒出来、第二天居然真的被我写出来的念头。代码不一定优雅，页面至少要能用；如果还能让人多看两秒，那今天就算炼金成功。',
        'Galgame 是我很难戒掉的一种长期病症。喜欢文字、选择和情绪一起推进的感觉，也喜欢那些不会立刻把答案说完的关系。至于库存和愿望单，属于一种“理论上总有一天会清空，实际上只会继续增长”的生态系统。',
        '轻小说也是我会不断打开的新坑。奇幻、日常、恋爱、冒险，看到感兴趣的设定就很难停下来。读得越多，书单越长；书单越长，越觉得自己应该先把旧的读完。显然，这套逻辑从来没有成功过。',
        '动画是我观察故事的另一扇窗口。我会留意角色怎么行动、怎么沉默、怎么在一集结束之后突然让人开始思考。宏大的设定当然很好，但一个细节、一种节奏，甚至片尾之后还留在脑子里的情绪，通常更让我在意。',
        '至于百合作品，我大概是对角色关系过度敏感的那类人。两个角色从陌生到靠近，中间那些试探、误解和没有说出口的话，足够让我反复回放，然后认真研究半天她们到底有没有意识到自己已经变得不一样了。',
        '我也正在学习日语。目前还处在会认真记下一个词，然后在真正需要的时候把它忘得干干净净的阶段。不过，能读懂喜欢的作品、少依赖一点翻译，已经足够成为继续学下去的理由。',
        '所以，如果一定要总结我，大概就是：一个会写点代码、沉迷虚构故事、对角色关系过度敏感，而且总能给自己找新坑的普通人。听起来很平凡？没关系，我的浏览器标签页会替我反驳。',
      ],
      lastLine: '至于我到底是谁……先往下看。答案可能会变，但新开的标签页不会。',
    },
    cards: {
      label: '兴趣分类',
      make: { index: '01 / MAKE', title: '代码与项目', text: '把脑海里的想法做成真正能打开、能使用、偶尔还能让人会心一笑的东西。' },
      novel: { index: '02 / READ', title: '轻小说与阅读', text: '看到有趣的设定就很难停下来，书单和积读总是一起增长。' },
      anime: { index: '03 / WATCH', title: '动画', text: '留意角色的动作、节奏和那些片尾之后还留在脑子里的情绪。' },
      yuri: { index: '04 / RELATION', title: '百合与关系', text: '关注角色如何靠近、试探，以及没有说出口的微妙变化。' },
    },
  },
  en: {
    language: {
      label: 'Switch language',
    },
    footer: {
      github: 'Find me on GitHub',
    },
    connect: {
      title: 'Find me',
      subtitle: 'Find me on GitHub, where most of my code ends up.',
    },
    nav: {
      home: 'Back to top',
      label: 'Page navigation',
      about: 'About',
      interests: 'Interests',
      connect: 'Connect',
    },
    hero: {
      tagsLabel: 'Personal tags',
      eyebrow: 'PERSONAL SITE / DEVELOPER WITH TOO MANY TABS OPEN',
      titleLine1: 'I write code,',
      titleLine2: 'stories find room.',
      intro: 'Hi, I’m Mutsuki, a developer. Technically, that introduction is already more complicated than “I write some code,” but not complicated enough to explain what I am actually doing most of the time.',
      tags: [
        'Project maker',
        'Galgame immersion specialist',
        'Anime & yuri observer',
        'Long-term student of feelings and relationships',
        'Someone who turns ideas into pages',
        'Occasionally serious, usually improvising',
      ],
      scroll: 'Explore below',
    },
    about: {
      label: '/ ABOUT',
      title: 'Who Am I',
      paragraphs: [
        'I’m Mutsuki. Whether that name is the only answer is something we probably shouldn’t settle too quickly. People are very good at labeling themselves and surprisingly bad at explaining themselves, so I’ll start with the most convenient answer: developer.',
        'I make interesting projects for the web. “Interesting” might mean a carefully considered interaction, or it might mean an idea that appeared at two in the morning and somehow became real the next day. The code does not have to be elegant. It has to work; if it makes someone look twice, the alchemy was successful.',
        'Galgame is a long-term condition I have made no serious attempt to recover from. I like the way text, choices, and emotion move a story forward together, especially when a relationship refuses to explain itself immediately. My backlog is theoretically finite and practically growing forever.',
        'Light novels are another rabbit hole I keep opening. Fantasy, everyday life, romance, adventure—one interesting premise is usually enough to make me add another title to the list. The more I read, the longer the list becomes. This system has never once worked in my favor.',
        'Anime is another window into the stories I pay attention to. I notice how characters move, hesitate, and leave an episode behind with one small feeling still running in the background. Grand settings are great, but a detail or a quiet change in rhythm often stays with me longer.',
        'As for yuri, I am probably the kind of person who gets dangerously invested in character relationships. The tests, misunderstandings, and unsaid words between two people getting closer are enough to make me replay a scene and investigate whether they have realized they are no longer the same.',
        'I’m also learning Japanese. Right now I’m at the stage where I carefully memorize a word, feel proud of it, and then forget it exactly when I need it. Still, being able to read more of the stories I love with a little less help from translation is reason enough to keep going.',
        'So, if I had to summarize myself: someone who writes some code, gets overly invested in fictional relationships, and keeps finding new rabbit holes. Sounds ordinary? That’s fine. My browser tabs will argue on my behalf.',
      ],
      lastLine: 'As for who I really am… keep scrolling. The answer may change, but the new tabs will not stop appearing.',
    },
    cards: {
      label: 'Interests',
      make: { index: '01 / MAKE', title: 'Code & projects', text: 'Turning ideas into things you can open, use, and occasionally smile at.' },
      novel: { index: '02 / READ', title: 'Light novels', text: 'One good premise is enough to add another title to the list I will definitely read someday.' },
      anime: { index: '03 / WATCH', title: 'Anime', text: 'Noticing gestures, pacing, and the feelings that remain after the ending credits.' },
      yuri: { index: '04 / RELATION', title: 'Yuri & relationships', text: 'Watching characters test the distance between them, one quiet moment at a time.' },
    },
  },
  ja: {
    language: {
      label: '言語を切り替える',
    },
    footer: {
      github: 'GitHub で見つけてください',
    },
    connect: {
      title: 'Find me',
      subtitle: 'GitHub で、私がコードを置いている場所で見つけてください。',
    },
    nav: {
      home: 'トップへ戻る',
      label: 'ページナビゲーション',
      about: 'About',
      interests: 'Interests',
      connect: 'Connect',
    },
    hero: {
      tagsLabel: '個人タグ',
      eyebrow: 'PERSONAL SITE / DEVELOPER WITH TOO MANY TABS OPEN',
      titleLine1: 'コードを書いて、',
      titleLine2: '物語に居場所を。',
      intro: 'こんにちは、Mutsukiです。開発者をしています。正直に言えば、「コードを書いています」よりは少し複雑で、でも自分が何をしているのか説明しきれるほど複雑ではありません。',
      tags: [
        'プロジェクトを作る人',
        'Galgame 沼の住人',
        'アニメと百合作品の観察者',
        '感情と関係性の長期研究者',
        'ひらめきをページにする人',
        'たまに真面目、だいたい行き当たりばったり',
      ],
      scroll: '下へ進む',
    },
    about: {
      label: '/ ABOUT',
      title: 'Who Am I',
      paragraphs: [
        'Mutsukiです。この名前が唯一の答えなのかは、まだ急いで決めないでおきましょう。人は自分にラベルを貼るのは得意ですが、自分自身を説明するのは意外と苦手です。だからまずは、一番便利な答えである「開発者」から始めます。',
        '普段は、ちょっと面白いWebプロジェクトを作っています。真面目に考えたインタラクションのこともあれば、深夜に思いついたものが翌日には本当に動いていることもあります。コードは必ずしも美しくなくていい。動けばいいし、もう一度見てもらえたら、その日の錬金術は成功です。',
        'Galgameは、なかなか治す気になれない持病のようなものです。文章と選択肢と感情が一緒に物語を進めていく感覚が好きです。すぐには答えを教えてくれない関係性も好きです。積みゲーは理論上いつか終わりますが、実際には増え続けています。',
        'ライトノベルも、気づけば開いてしまう新しい沼です。ファンタジー、日常、恋愛、冒険。面白そうな設定を一つ見つけるだけで、また本棚に一冊増えます。読めば読むほど積読が増える仕組みですが、今のところ改善の予定はありません。',
        'アニメは、物語を見るためのもう一つの窓です。キャラクターがどう動き、どう黙り、一本の作品が終わったあとにどんな感情を残していくのかを見ています。壮大な設定も好きですが、細部やテンポの小さな変化のほうが長く心に残ることもあります。',
        '百合作品については、キャラクター同士の関係性を気にしすぎるタイプです。知らない二人が近づいていく途中の探り合い、すれ違い、言葉にされない気持ち。それだけで何度も場面を見返し、本人たちは自覚しているのかを真剣に考え始めます。',
        'そして、今は日本語を勉強しています。単語を一つ覚えて、必要な瞬間にきれいさっぱり忘れる段階です。それでも、好きな作品を少しずつ翻訳に頼らず読めるようになることは、勉強を続ける理由として十分だと思っています。',
        'まとめるなら、コードを書き、架空の物語に夢中になり、キャラクター同士の関係を気にしすぎて、いつも新しい沼を見つけてしまう普通の人です。平凡に聞こえますか？大丈夫です。ブラウザのタブが私の代わりに反論してくれます。',
      ],
      lastLine: '結局、私は誰なのか……下へ進んでみてください。答えは変わるかもしれませんが、新しいタブは増え続けます。',
    },
    cards: {
      label: '興味のあること',
      make: { index: '01 / MAKE', title: 'コードとプロジェクト', text: '頭の中のアイデアを、開いて、使えて、たまに笑えるものに変えていきます。' },
      novel: { index: '02 / READ', title: 'ライトノベル', text: '面白そうな設定を見つけるたびに、いつか読む本が一冊ずつ増えていきます。' },
      anime: { index: '03 / WATCH', title: 'アニメ', text: 'キャラクターの動き、テンポ、エンディングのあとに残る感情を見ています。' },
      yuri: { index: '04 / RELATION', title: '百合と関係性', text: 'キャラクターが近づき、探り合い、言葉にしない変化を見つめています。' },
    },
  },
}

export const i18n = createI18n({
  legacy: false,
    locale: 'en',
  fallbackLocale: 'en',
  messages,
})
