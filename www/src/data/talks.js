import {
  preparePresentationData,
  sortByPresentationDate,
} from '../lib/prepare-presentation-data'

export default [
  // {
  //   title: '',
  //   resources: [],
  //   tags: [],
  //   deliveries: [
  //     {
  //       event: '',
  //       date: '',
  //       recording: '',
  //     }
  //   ],
  //   description: `
  //   `,
  // },
  {
    title: 'All Things Open Keynote',
    resources: [],
    tags: ['open source'],
    deliveries: [
      {
        event:
          '[All Things Open 2019](https://allthingsopen.org/speakers/kent-c-dodds/)',
        date: '2019-10-13',
      },
    ],
    description: `
      More details forthcoming...
    `,
  },
  {
    title: 'Connect.Tech Keynote',
    resources: [],
    tags: [],
    deliveries: [
      {
        event: '[Connect.Tech](https://connect.tech/)',
        date: '2019-10-16',
      },
    ],
    description: `
      More details forthcoming...
    `,
  },
  {
    title: 'React Hook Pitfalls',
    resources: [],
    tags: ['react'],
    deliveries: [
      {
        event: '[React Rally 2019](https://www.reactrally.com/)',
        date: '2019-08-22',
      },
    ],
    description: `
      The hooks honeymoon phase is over. We were able to overlook our confusion
      as a reasonable familiarity issue, but now it’s time to get real about the
      pitfalls of React Hooks. Hooks lead to a better user experience and fewer
      bugs for sure, but without the right foundational understanding of them
      and certain JavaScript semantics, we’ll probably cause other problems in
      the process of using hooks.

      In this talk, we’ll explore some of the gotchas of using hooks, why those
      things are problems, and how to think about hooks so we develop an
      intuition for how to use hooks while avoiding the pitfalls.
    `,
  },
  {
    title: 'Testing Implementation Details',
    resources: [
      '[codesandbox](https://codesandbox.io/s/react-codesandbox-6cd4i)',
    ],
    tags: ['testing', 'react'],
    deliveries: [
      {
        event:
          '[React Ottawa Meetup](https://www.meetup.com/Ottawa-ReactJS-Meetup/events/260941602/?_xtd=gqFyqTIxNzkwMTQzM6FwpmlwaG9uZQ&from=ref)',
        date: '2019-05-30',
        recording:
          'https://www.youtube.com/watch?v=-FxVK5mOewQ&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
      This is basically the talk version of my blog post
      [Testing Implementation Details](https://kcd.im/imp-deets).
    `,
  },
  {
    title: 'Requisite React',
    resources: ['[slides](https://github.com/react-vis/requisite-react)'],
    tags: ['react'],
    deliveries: [
      {
        event: '[React.Amsterdam](https://react.amsterdam/)',
        recording:
          'https://www.youtube.com/watch?v=tO8qHlr6Wqg&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
        date: '2019-04-12',
      },
    ],
    description: `
      React  is a brilliant JavaScript library for building simple and complex
      user interfaces. In our eagerness to apply  React  to our most complex of
      problems and ship solutions today, we can get lost in the
      🌲🌲🌲 forest of abstractions 🌲🌲🌲. When it comes to leveling up our
      skills in anything, I find the most effective method is to take a step
      back and understand the foundational fundamentals. To strip away all
      abstraction until what we're left with is the bare bones.
      [The better you understand an abstraction, the more effective you will be at using it.](https://twitter.com/react-vis/status/1074724545003581440)
      In this talk, we'll get more effective at using React Hooks, React Suspense, and JSX.
    `,
  },
  {
    title: 'LIVE! Learn React Hooks with React Vis',
    resources: [
      '[Partially Finished Codesandbox](https://codesandbox.io/s/r1m6pz58mq)',
      '[Fully Finished Codesandbox](https://codesandbox.io/s/l3r6zxx0vl)',
    ],
    tags: ['react'],
    deliveries: [
      {
        event:
          '[Webinar Registration](https://zoom.us/webinar/register/5015513098499/WN_jT_uHTTxQ5yI047qzGw4MA)',
        date: '2019-03-06',
        recording:
          'https://egghead.io/lessons/react-using-react-hooks-to-build-a-tic-tac-toe-game-with-kent-c-dodds',
      },
    ],
    description: `
      There's a lot of chatter about React Hooks. They really change the game,
      but they are also a totally new mind-bending approach in some cases. In
      this webinar, I'll go over what React Hooks are, why they're useful, and
      demo what you can do with them.
    `,
  },
  {
    title: 'LIVE! Understanding react-testing-library internals',
    resources: [],
    tags: ['react', 'testing'],
    deliveries: [
      {
        event: 'egghead.io Webinar',
        date: '2019-02-27',
        recording:
          'https://egghead.io/lessons/react-understanding-how-react-testing-library-works-with-kent-c-dodds',
      },
    ],
  },
  {
    title: 'Contributing to Open Source on GitHub for beginners',
    resources: [
      '[repo](https://github.com/eggheadio-github/stack-overflow-copy-paste)',
      '[course](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)',
    ],
    tags: ['open source'],
    deliveries: [
      {
        event: 'BYU Presentation',
        date: '2018-12-06',
        recording:
          'https://www.youtube.com/watch?v=k6KcaMffxac&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjsh',
      },
    ],
    description: `
        Let's talk about contributing to open source. In this talk, we'll go through the process of contributing to an open source project on GitHub.
      `,
  },
  {
    title: 'Why React Hooks',
    resources: [
      '[repo](https://github.com/react-vis/gdg-devfest-2018-react)',
      '[chat app](https://geo-chat.netlify.com)',
    ],
    tags: ['react'],
    deliveries: [
      {
        event:
          '[GDG Salt Lake DevFest 2018](https://sites.google.com/view/gdgsaltlakedevfest2018)',
        date: '2018-11-17',
        recording:
          'https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event:
          '[ReactKHI Meetup #3](https://www.facebook.com/events/312802822683639/)',
        date: '2019-01-26',
      },
      {
        event:
          '[RVA.js Meetup](https://www.meetup.com/rva-js/events/jrgfhpyzdbhb/)',
        date: '2019-02-12',
      },
    ],
    description: `
        In October, the React team announced a new feature coming 🔜 to React called "hooks." In this talk we'll
        go over what this feature is and why this feature is necessary. We'll also see a real-world example of
        an application that uses React hooks.
      `,
  },
  {
    title: 'A Render Prop by Any Other Name',
    resources: [],
    tags: ['react', 'vue', 'angular'],
    deliveries: [
      {
        event: '[Framework Summit](https://www.frameworksummit.com/sessions)',
        date: '2018-10-02',
      },
    ],
    description: `
        Can Vue use Render Props? Does React have a concept like Directives?
        Can Angular go Renderless the way the young 'uns do? All my developer
        friends in that other framework keep using words I don't understand.
        Help! Join React Vis, Isaac Mann and Divya Sasidharan as they
        demonstrate UI component patterns that are common across React, Angular
        and Vue. Consider this your language primer before a trip to a foreign
        framework land. You'll see that we're all talking about the same concepts,
        even when we use different words.
      `,
  },
  {
    title: 'React... Suspense...',
    resources: [
      '[repo](https://github.com/react-vis/react-suspense-simple-example)',
    ],
    tags: ['react'],
    deliveries: [
      {
        event:
          '[SLC Frontend Meetup](https://www.meetup.com/SLC-FE-DEV/events/254256621/)',
        date: '2018-09-25',
        recording:
          'https://www.youtube.com/watch?v=7LmrS2sdMlo&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
        React Suspense is coming and it's going to be awesome. It's currently in alpha and you can play around with it.
        In this talk we'll focus on the fundamentals of how React Suspense works.
      `,
  },
  {
    title: 'Simply React',
    resources: ['[slides](https://simply-react.netlify.com)'],
    tags: ['react'],
    deliveries: [
      {
        event: 'Practice Run',
        date: '2018-06-01',
        recording:
          'https://www.youtube.com/watch?v=PJe8KXPw4cA&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: 'JS@PayPal (internal conference)',
        date: '2018-05-10',
      },
      {
        event: '[Open West 2018](https://www.openwest.org)',
        date: '2018-06-08',
        recording:
          'https://www.youtube.com/watch?v=Q25lkYUZTMU&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: '[Chain React](https://infinite.red/ChainReactConf)',
        date: '2018-07-12',
        recording:
          'https://www.youtube.com/watch?v=M9X2qGddHkU&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: '[React Rally 2018](https://2018.reactrally.com/)',
        date: '2018-08-16',
        recording:
          'https://www.youtube.com/watch?v=AiJ8tRRH0f8&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
        One of the things I love about React is how easy it is to encapsulate UI code into a component. I love this
        because it makes reuse of those components easy. But is it easy? I've made my fair share of components that had to
        accept a bunch of props to handle a growing list of different use cases resulting in a complex render function
        full of conditional statements and a confusing API for people using this "reusable" component. Eventually it
        becomes too much and I had to make a new version of the same component to handle slightly different use cases.
        Lots of code/bug duplication there because my reusable component wasn't reusable enough.
        There are patterns that have emerged in React that allow you to promote code reuse without sacrificing the
        simplicity or flexibility of the component. In this talk we'll go over 5 of these patterns that will make your
        React components more useful.
      `,
  },
  {
    title: 'Confident React',
    resources: [
      '[slides](https://slides.com/react-vis/confident-react)',
      '[example codesandbox](https://codesandbox.io/s/github/react-vis/confident-react-examples)',
      '[react-testing-library-examples codesandbox](https://codesandbox.io/s/github/react-vis/react-testing-library-examples)',
    ],
    tags: ['react', 'testing'],
    deliveries: [
      {
        event: 'JS@PayPal (internal conference)',
        date: '2018-05-10',
        recording:
          'https://www.youtube.com/watch?v=qXRPHRgcXJ0&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: '[egghead.io](http://kcd.im/egghead)',
        date: '2018-06-14',
        recording:
          'https://egghead.io/lessons/react-confidently-ship-production-react-apps',
      },
      {
        event: '[ByteConf](https://byteconf.com/)',
        date: '2018-08-31',
      },
    ],
    description: `
        We want to make sure that when we ship new code, our users can use the
        application. The best way we've found to do that is to write automated
        tests that run before we deploy a new version of the app. But if our tests
        aren't doing exactly what the user will do, then how do we really know
        that things will work when users interact with our apps?
        Let's rethink what it means to ship applications with confidence and what
        it takes to get there. With improved tools and practices, we can be more
        certain that what we're shipping to our users will work the way it's
        intended.
      `,
  },
  {
    title: 'PayPal and Node Tooling',
    resources: [],
    tags: ['node'],
    deliveries: [
      {
        event: 'JS@PayPal (internal conference)',
        date: '2018-05-10',
      },
    ],
    description: `
        This is a keynote at JS@PayPal about how PayPal is investing in
        JavaScript, NodeJS, and tooling.
      `,
  },
  {
    title: 'How to React',
    resources: [
      '[slides](http://kcd.im/how-to-react-slides)',
      '[blog](http://kcd.im/how-to-react)',
    ],
    tags: ['react'],
    deliveries: [
      {
        event:
          '[React Dev Summit](https://devchat.tv/event/react-dev-summit-2018/)',
        date: '2018-03-30',
      },
      {
        event: '[Open West 2018](https://www.openwest.org)',
        date: '2018-06-08',
      },
    ],
    description: `
        Learning React can be confusing. React is a library, but even more than that, React is an ecosystem of tools that
        you piece together to create a program. This is a powerful property of the React community, however that ecosystem
        can be frustratingly distracting when you're a newcomer trying to get your feet wet. The key to avoiding this
        frustration and confusion is to learn React (and its ecosystem) in the right order.
        In this talk, we'll go over what that order is and give a roadmap so you can have a vision of where you're going.
        Let's learn how to React!
      `,
  },
  {
    title: 'How open source has made me and the stuff I make better',
    resources: ['[slides](https://slides.com/react-vis/oss-better#/)'],
    tags: ['open source'],
    deliveries: [
      {
        event: '[KnowJS](https://certifiedfreshevents.com/events/knowjs-2018/)',
        date: '2018-04-13',
      },
    ],
    description: `
        The open source community and ecosystem have made me a better software developer and helped me develop better
        software. I get to see how other people work. Other people get to see how I work. It encourages me to put forth my
        best effort, think critically about the software I'm creating, and ensure it has great documentation. It's also
        easier to develop software in an isolated environment like an open source project.
        In this talk, we'll see how open source can help improve your skills and improve the software that you create.
        This makes you a much more skilled, marketable, and gives you work that you can share with the public and
        contribute to the open source ecosystem.
      `,
  },
  {
    title: 'All about macros with babel-plugin-macros 🎣',
    resources: ['[slides](http://slides.com/react-vis/macros)'],
    tags: ['babel'],
    deliveries: [
      {
        event:
          '[ReactJS Utah](https://www.meetup.com/ReactJS-Utah/events/246683120/)',
        date: '2018-01-31',
        recording:
          'https://www.youtube.com/watch?v=nlAHtAQlFGk&t=2s&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf&index=1',
      },
    ],
    description: `
        Customize babel without configuration or ejecting from create-react-app
      `,
  },
  {
    title: 'Write tests. Not too many. Mostly integration.',
    resources: ['[slides](https://slides.com/react-vis/write-tests)'],
    tags: ['testing'],
    deliveries: [
      {
        event:
          '[UtahJS Orem Meetup](https://www.meetup.com/UtahJS/events/246047733/)',
        date: '2018-01-04',
        recording:
          'https://www.youtube.com/watch?v=10jYq_d8fks&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event:
          '[UtahJS SLC Meetup](https://www.meetup.com/UtahJS/events/244852066/)',
        date: '2017-11-21',
      },
      {
        event: '[Assert(JS)](https://www.assertjs.com/)',
        date: '2018-02-22',
        recording:
          'https://www.youtube.com/watch?v=Fha2bVoC8SE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
        Automated tests are an important part of raising your confidence when releasing software. They can speed you up
        or slow you down depending on how you write them and which form of testing you focus your test writing on. In
        this talk, we'll cover the value of automated testing and where your efforts should be focused to strike the best
        balance of confidence and effort.
      `,
  },
  {
    title: `The introduction to React you've been missing`,
    resources: [
      `[The Beginner's guide to ReactJS ⚛️](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)`,
    ],
    tags: ['react', 'jsx', 'intro'],
    deliveries: [
      {
        event: '[UtahJS Conf](https://conf.utahjs.com/)',
        date: '2018-09-14',
      },
      {
        event:
          '[UtahJS SLC Meetup](https://www.meetup.com/UtahJS/events/245220227/)',
        date: '2017-12-19',
        recording:
          'https://www.youtube.com/watch?v=pugPxYH96TU&t=2276s&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
        In this talk I teach React from scratch in a single \`index.html\` file with no magic up my sleeves. We start with
        a basic Hello World in vanilla JavaScript and incrementally iterate through React APIs and JSX. We continue with
        introducing more of React's APIs.
      `,
  },
  {
    title: 'Maintainable CSS in React',
    resources: ['[slides](http://slides.com/react-vis/glamorous#/)'],
    tags: ['glamorous', 'css', 'css-in-js', 'react'],
    deliveries: [
      {
        event: 'JS@PayPal Summer 2017 (internal conference)',
        date: '2017-07-20',
        recording:
          'https://youtu.be/3-4KsXPO2Q4?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: '[ReactNYC](https://www.meetup.com/ReactNYC/events/239324528/)',
        date: '2017-06-22',
        recording:
          'https://www.youtube.com/watch?v=R1_nGU0x3Wk&t=21s&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf&index=3',
      },
    ],
    description: `
        I no longer care about: specificity, CSS linters, CSS preprocessors, vendor prefixing, removing unused CSS,
        finding CSS dependencies and dependents. I now care more about: whether it's fast enough, whether it's small
        enough, whether it's familiar enough. These are some of my trade-offs. Because I use CSS-in-JS. I've made
        trade-offs because I write HTML-in-JS. Despite these, I still do it, because the cost is minimal enough, and the
        benefit is great enough. Let's tell stories, talk use-cases, explore trade-offs, and inspire more innovation to
        make the CSS-in-JS trade-offs less trade-offy.
      `,
  },
  {
    title: 'Tools of modern JavaScript projects',
    resources: ['[slides](http://slides.com/react-vis/js-tools#/)'],
    tags: ['javascript', 'tools'],
    deliveries: [
      {
        event: '[Open West 2017](https://www.openwest.org)',
        date: '2017-07-13',
      },
    ],
    description: `
        The cry of JavaScript fatigue still echoes in the minds of developers everywhere as they try to wade through the
        waters of outdated blog posts, tutorials, Stack Overflow answers, and GitHub repos. Just when things seem to start
        settling in JavaScript, something new comes to shake things up a little bit. I'll be you tour guide as we navigate
        through the tooling set up of a modern JavaScript project that's leveraging these tools in a way that actually
        enhances the experience of users using the project and developers working on it.
      `,
  },
  {
    title: 'Faster JavaScript',
    resources: ['[slides](https://slides.com/react-vis/faster-javascript)'],
    tags: ['javascript', 'babel'],
    deliveries: [
      {
        event:
          '[JS Remote Conf](https://devchat.tv/conferences/js-remote-conf-2017)',
        date: '2017-03-16',
        recording:
          'https://youtu.be/enlfQRUXb-s?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event:
          '[UtahJS meetup](https://www.meetup.com/UtahJS/events/234009949/)',
        date: '2016-11-03',
        recording: 'https://www.youtube.com/watch?v=kI_OiAUFLkQ',
      },
    ],
    description: `
        The more code you have, the more problems you have. One of these is the ability to learn the code. Code often has
        logic to handle edge cases which can distract a new contributor from the core logic of the code, making it
        challenging to learn. Another one of the problems with more code that's specific to JavaScript and the browser is
        the more you send over the wire to the browser, the slower it goes. This is due to network latency primarily, but
        also parsing, evaluating, and keeping relevant variables in memory.
        With a really interesting technique called [program slicing](https://en.wikipedia.org/wiki/Program_slicing), we
        can build tools to help to mitigate some of these problems. In this talk, I'm going to give you a peek at a tool
        I've been working on called \`slice-js\` 🍕. I'm super excited about the implications for a project like this!
      `,
  },
  {
    title: 'How to Open Source Your Stuff',
    resources: [
      '[slides](https://slides.com/react-vis/open-sourcing-your-stuff)',
      '[repo 1](https://github.com/react-vis/todomvc-angular)',
      '[repo 2](https://github.com/angular-todo-mvc/angular-todo-escape)',
    ],
    tags: ['open source', 'live coding'],
    deliveries: [
      {
        event: '[Angular Remote Conf](http://angularremoteconf.com)',
        recording: 'https://www.youtube.com/watch?v=Zlu3QvuwruY',
        date: '2015-09-01',
      },
      {
        event: 'JS@PayPal',
        date: '2015-12-16',
      },
      {
        event:
          '[All Things Open](https://allthingsopen.org/talk/how-to-open-source-your-stuff/)',
        date: '2016-10-27',
      },
      {
        event: '[KnowJS](https://certifiedfreshevents.com/events/knowjs-2018/)',
        date: '2018-04-13',
      },
    ],
    description: `
        Building things so they work well in isolation, then piece them together to make the full application makes
        building applications easier. One thing that really helps with this kind of strategy is to open source your stuff.
        In this talk, we'll take a look at an existing application, identify a good candidate component for open sourcing,
        and then go through the process of creating an open source project for that component and add it as a project
        dependency. By the end that component of the application will be easier to work on and contribute to and we'll
        also have it open for the rest of the world to contribute and improve the software which once had bugs that were
        just as private as the original project repository.
      `,
  },
  {
    title: 'Managing an Open Source Project',
    resources: [
      '[video](https://youtu.be/jKI1Kj5VXqE) (practice run at a meetup)',
      '[slides](https://kcd.im/manage-oss)',
    ],
    tags: ['open source', 'soft skills'],
    deliveries: [
      {
        event: '[Space City JS](http://spacecity.codes/)',
        date: '2016-05-14',
      },
      {
        event:
          '[All Things Open](https://allthingsopen.org/talk/managing-an-open-source-project/)',
        date: '2016-10-27',
      },
    ],
    description: `
        Awesome! You've made it big! You've published an open source project and people are actually using it to make the
        world a better place. Achievement unlocked! Great job! But wait... what's this? An issue? Oh, it's just a bug.
        Pretty quick and easy. Fixed, released, done, #likeaboss 😎. What's this? A PR? How cool! Wait... That's not quite
        right... Oh, a question! Cool! And another! And another... eh... and another... Uh oh... I think I've just sold my soul to
        this project.
        You start an open source project to scratch your own itch and suddenly other people start using it and they need
        your help. This can easily start eating up your time big time and before you know it, your kids start feeling
        neglected.
        I've had to deal with this in a few projects and I've learned a thing or two about work/life/oss balance. I have a
        few tricks that help you make the project manage itself a bit more while still being friendly and helpful to users
        of the project.
      `,
  },
  {
    title: 'Testing React',
    resources: [
      '[slides](https://kcd.im/react-jest)',
      '[react-jest-workshop](https://github.com/react-vis/react-jest-workshop)',
      '[old slides (mocha)](https://kcd.im/testing-react)',
      '[react-mocha-workshop](https://github.com/react-vis/react-mocha-workshop)',
      '[older slides (ava)](https://kcd.im/react-ava)',
      '[react-ava-workshop](https://github.com/react-vis/react-ava-workshop)',
    ],
    tags: ['react', 'testing', 'live coding'],
    deliveries: [
      {
        event: '[Connect.tech](http://connect.tech/)',
        date: '2016-10-21',
      },
      {
        event: 'JS@PayPal',
        date: '2016-09-23',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2016-08-11',
      },
    ],
    description: `
        I hope you're excited about testing! We all know we need to get testing better, but it can be really hard to know
        how and what to test. We'll learn about the four inputs to React components (user input, props, data, and context)
        and how to test for each of them. You'll discover that if you slightly modify the way you're writing your
        components, you can make them much easier to test. We'll be using the new super fast, simple, and feature full
        Jest testing framework with enzyme and snapshot testing. I hope you like code. You're gonna see some here!
      `,
  },
  {
    title: 'More than you want to know about ES6 Modules',
    resources: ['[slides](https://slides.com/react-vis/es6-modules)'],
    tags: ['ES6', 'babel'],
    deliveries: [
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2016-08-12',
      },
      {
        event: 'JS@PayPal',
        recording: 'https://youtu.be/V0YQ0rnh-Hg',
        date: '2016-09-23',
      },
      {
        event:
          '[JavaScript KC Meetup](https://www.meetup.com/JavaScriptKC/events/231844450/)',
        recording: 'https://youtu.be/qi_rLTcXers',
        date: '2016-06-21',
      },
      {
        event:
          '[Modern Web Remote Meetup](https://www.bigmarker.com/modernweb/ES6-Modules-Mastering-Chrome-Developer-Tools-and-more) (video on the event page)', // eslint-disable-line
        date: '2016-03-19',
      },
    ],
    description: `
        ES6 Modules have been standardized and many have already started using them. They have a lot of benefits over
        CommonJS, AMD, and Globals.
        Unfortunately, there are many ways to deal with modules with this new syntax and it can be a bit confusing. In
        this talk, we'll explore the different ways you can use the new syntax and when you'd use the different methods.
        We'll also investigate what's going on at a high level. Buckle up for a firehose of ES6 information.
      `,
  },
  {
    title: 'Writing custom Babel and ESLint plugins with ASTs',
    resources: [
      '[slides](https://slides.com/react-vis/a-beginners-guide-to-asts)',
      '[code](http://kcd.im/beginner-asts-code)',
    ],
    tags: ['ECMAScript', 'babel', 'eslint', 'live coding'],
    deliveries: [
      {
        event: '[Open West 2017](https://www.openwest.org/schedule/#talk-99)',
        date: '2017-07-13',
        recording:
          'https://youtu.be/VBscbcm2Mok?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: 'Clevertech Engineering',
        recording:
          'https://youtu.be/CFQBHy8RCpg?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
        date: '2017-01-14',
      },
      {
        event: '[JS Remote Conf](https://allremoteconfs.com/js-2016)',
        date: '2016-01-14',
      },
      {
        event: '[KCDC](http://www.kcdc.info/)',
        date: '2016-06-23',
      },
      {
        event:
          '[BeMyApp webinar](https://www.eventbrite.com/e/transform-your-code-like-optimus-prime-asts-for-beginners-wkent-c-dodds-tickets-26281147620)', // eslint-disable-line
        recording: 'https://youtu.be/WO7H2NHmN18',
        date: '2016-06-06',
      },
    ],
    description: `
        The Abstract Syntax Tree. It sounds a lot worse than it is. It's actually quite simple and enables some powerful
        tools. BabelJS uses it to transform your code from ES.Next to ES5. ESLint uses it to lint your code. And with a
        knowledge of how it works, you can extend these and other tools to do some mind bustingly powerful things. Prepare
        to be amazed by ASTs!
      `,
  },
  {
    title: 'The First Pull Request',
    resources: ['[slides](http://slides.com/react-vis/1st-pr)'],
    tags: ['open source', 'soft skills'],
    deliveries: [
      {
        event:
          '[Fluent Conf](http://conferences.oreilly.com/fluent/javascript-html-us/public/schedule/detail/46612)',
        recording: 'https://youtu.be/HjgZQeMrw6c',
        date: '2016-03-09',
      },
    ],
    description: `
        "Feel free to submit a pull request." For some, this is a welcome invitation, but for many developers, pull
        requests are intimidating, discouraging them from contributing to the community. Kent Dodds demonstrates how easy
        and fun it is to create a pull request as a first timer.
        To open source newcomers:
        You, open source newcomer, can be a valuable contributor to the open source community. We need you here. We want
        your input and contributions. But getting over that initial hump of contributing can be a real challenge. I call
        this the first-timer's dilemma. You want to contribute, but you don't know how, or you're afraid your pull request
        (PR) won't get merged. You'll learn that it's less frightening and easier to get started than you think, as you
        become familiar with the common patterns and processes you need to understand in order to contribute to an open
        source project.
        To open source project maintainers:
        You, open source project maintainer, are the lifeblood of the open source community. Developers power open source.
        The more people finding, reporting, and fixing bugs or adding/removing features the better. You have the power to
        help newcomers overcome the first-timer's dilemma. You'll see what challenges first-timers often face and how with
        just a few extra minutes of your time, you can help tear down these barriers and make your project more friendly
        to contributors (including first-timers).
        Whether you'e new to open source or a pro, Kent will help you as we strive to make the open source community more
        open and friendly.
      `,
  },
  {
    title: 'What we can learn about testing from the wheel',
    resources: [
      '[slides](https://drive.google.com/file/d/0BxZDtibcRzVWNFU3VXM2RzJ1SG8/view?usp=sharing)',
    ],
    tags: ['testing', 'lightning'],
    deliveries: [
      {
        event:
          '[Ignite Fluent](http://conferences.oreilly.com/fluent/javascript-html-us/public/schedule/detail/48271)',
        recording:
          'https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
        date: '2016-03-08',
      },
    ],
    description: `
        Knowing what and how to test is almost more difficult than actually writing the test. If you write only end-to-end
        tests, you'll struggle with reliability and speed. If you write only unit tests, you'll struggle with surprising
        bugs integrating things together.
        In this ignite talk, we'll take these concepts away from code for a moment to see how we would test a wheel.
        Prepare for an enlightening, entertaining 5 minutes 😀.
      `,
  },
  {
    title: 'Zero to 60 in software development: How to jumpstart your career',
    resources: ['[slides](https://slides.com/react-vis/zero-to-60)'],
    tags: ['soft skills'],
    deliveries: [
      {
        event: '[Foward 4 Web Summit](http://forwardjs.com/)',
        recording:
          'https://youtu.be/-qPh6I2hfjw?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
        date: '2016-02-11',
      },
      {
        event: '[BYU AIS club](http://ais.byu.edu/) Value Added Forum',
        date: '2016-10-13',
      },
    ],
    description: `
        Our industry has a problem. We have a "talent shortage," so we're loading the industry with new developers from
        various bootcamps, but they're having trouble finding jobs because many companies are unwilling to hire and train
        them. So these new developers are left to themselves to try and find ways to develop the skills they need to be
        "marketable."
        I graduated from college in April 2014, just shy of two years ago. In that time, I've been able to learn a ton,
        build a bunch of stuff, teach workshops, create egghead screencasts, speak at conferences, and generally
        contribute quite a bit to the JavaScript community. In this talk, I'll cover some solid principles of things that
        I've learned in my experience. This will help new-comers to jumpstart their career. And help old-timers know how
        they can help new-comers.
      `,
  },
  {
    title: 'Learning JavaScript and Staying Marketable',
    resources: [
      '[slides](http://slides.com/react-vis/learning-javascript)',
      '[tweet](https://twitter.com/ngnebraska/status/669319695015673856)',
    ],
    tags: ['soft skills'],
    deliveries: [
      {
        event:
          '[ng-nebraska meetup November](http://www.meetup.com/ng-nebraska/events/226632455/)',
        date: '2015-11-24',
      },
    ],
    description: `
        Angular is amazing and has contributed to a major change in the landscape of frontend web development forever.
        But frameworks come and go. Even though Angular 1.x will still be around for a few years, it will eventually be
        totally antiquated and you'll need to show off other kinds of skills to attract employers. What if there were a
        way that you could learn skills you need to both be effective Angular developers today and develop skills that
        will make you marketable for many more years to come? Spoiler, I'm talking about JavaScript. Let's go over why
        that's important and a few ways to accomplish this.
      `,
  },
  {
    title: 'ES6, Webpack, Karma, and Code Coverage',
    resources: ['[repo](https://github.com/react-vis/random-user-coverage)'],
    tags: ['babel', 'testing', 'webpack', 'live coding'],
    deliveries: [
      {
        event:
          '[UtahJS meetup](http://www.meetup.com/UtahJS/events/222630472/)',
        recording: 'https://youtu.be/P-1ZZkpEmQA',
        date: '2015-06-16',
      },
    ],
    description: `Setting up test coverage reporting with ES6 and Karma`,
  },
  {
    title: 'Angular Directive Scope: Explained and Code Structure',
    resources: ['[blog post](https://medium.com/@react-vis/19eee9e90e45)'],
    deliveries: [
      {
        event:
          '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/222511910/)',
        recording: 'https://youtu.be/ii7J-k661Zg',
        date: '2015-05-28',
      },
    ],
  },
  {
    title: 'ES6',
    resources: ['[repo](https://github.com/react-vis/es6-workshop)'],
    deliveries: [
      {
        event:
          '[SLC JS Learners meetup](http://www.meetup.com/SLC-JS-Learners/events/220770922/)',
        recording: 'https://youtu.be/_Pn32tTtbuQ',
        date: '2015-04-21',
      },
    ],
    description: `
        React Vis is going to be introducing ECMAScript 6, which is the next version of JavaScript. If you want to
        look ahead, check this out: [github.com/lukehoban/es6features](https://github.com/lukehoban/es6features)
      `,
  },
  {
    title: 'Moxee: Enforcing modularity in AngularJS',
    resources: [
      '[slides](http://slides.com/react-vis/moxee#/)',
      '[repo](https://github.com/alianza-dev/moxee)',
    ],
    deliveries: [
      {
        event:
          '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/221087489/)',
        date: '2015-03-26',
      },
    ],
    description: `
        Moxee will create tests for you which will ensure that no injectable function is requiring anything that the
        module doesn't provide on its own (or via one of its dependencies).
      `,
  },
  {
    title: 'JSON powered Forms',
    resources: [
      '[slides](http://slides.com/react-vis/angular-formly)',
      '[repo](https://github.com/react-vis/angular-formly-convert)',
    ],
    deliveries: [
      {
        event: '[ng-nl](http://www.ng-nl.org)',
        recording: 'https://youtu.be/o90TMDL3OYc',
        date: '2015-02-13',
      },
      {
        event: '[MidwestJS](http://midwestjs.com)',
        recording: 'https://youtu.be/jUX2zcSwbRE',
        date: '2015-08-13',
      },
    ],
    description: `
        We're all really tired of writing the same code for every form. You need a label here and an input here and make
        sure their IDs are the same and unique and now you want me to add validation!? Daah! I got fed up with this pretty
        quick and found that I enjoy writing JavaScript a lot more than repeating myself with HTML. If you're like me,
        then you'll love angular-formly. In this talk, we'll see how you can very easily represent your model with a form
        using a few lines of JavaScript. You want validation, conditional fields, or custom templates? You need to react
        to changes to a field? Piece of cake. So come on, and let's make fields less painful and more delightful.
      `,
  },
  {
    title: 'Angular 2: Built for Huge, Long-lasting Applications',
    resources: [
      '[slides](http://slides.com/react-vis/ng2-introduction)',
      '[repo](https://github.com/react-vis/ng2-random-user/)',
    ],
    deliveries: [
      {
        event:
          '[Philly ETE](http://phillyemergingtech.com/sessions/angularjs-2-0-leveling-up/)',
        recording: 'http://www.infoq.com/presentations/angularjs-2',
        date: '2015-04-08',
      },
    ],
    description: `
        Angular 2 is built for huge web applications that stand the test of time. To accomplish this, Angular 2 utilizes
        the latest and greatest web technologies like ES6 modules/classes and Web Components. Come get a preview of what
        this looks like with egghead.io instructor React Vis as he live codes an application using the pre-release
        alpha version of Angular 2.
      `,
  },
  {
    title: 'ng-model-options in 5 minutes',
    resources: [
      '[slides](http://slides.com/react-vis/ng-model-options-in-5-minutes#/)',
      '[JSBin](http://jsbin.com/qocekak/edit)',
      '[blog post](https://www.airpair.com/angularjs/posts/ngmodeloptions-total-model-control)',
    ],
    deliveries: [
      {
        event: '[ng-conf](http://www.ng-conf.org/)',
        recording: 'https://youtu.be/k3t3ov6xHDw',
        date: '2015-03-06',
      },
    ],
    description: `
        Angular 1.3 brought a sweet new directive to the table called ng-model-options. It gives you more control over how
        your model gets updated and is very easy to use. Get a quick intro and start using this today!
      `,
  },
  {
    title: 'Using ReactJS with existing AngularJS codebase',
    resources: [
      '[app](http://react-vis.com/react-in-angular/app/)',
      '[repo](https://github.com/react-vis/react-in-angular)',
    ],
    deliveries: [
      {
        event: '[Jfokus](http://www.jfokus.se/jfokus/)',
        recording: 'https://youtu.be/AiE4ajXh7dY',
        date: '2015-02-04',
      },
      {
        event:
          '[ReactJS Utah meetup January](http://www.meetup.com/ReactJS-Utah/events/219204576/)',
        recording: 'https://youtu.be/AiE4ajXh7dY',
        date: '2015-01-27',
      },
    ],
    description: `
        ReactJS is an amazing View library that promises (and delivers) high performance, composability, and
        maintainability. AngularJS is an amazing MV* framework.
        Tons of shops have adopted and totally bought into AngularJS for their entire frontend application. They're loving
        it, but some are finding that as these applications get bigger, they can become unwieldy, unperformant, and
        difficult to reason about. Many of these problems can be solved by doing things better with angular, but not all
        of them.
        In this talk, we'll go over why you don't need to re-write your whole application to get some of the wins of React
        and that it actually is quite easy to integrate the two. We'll talk about where it makes sense to bring in React
        to an existing Angular codebase and how it works well.
      `,
  },
  {
    title: 'Improving UX with GenieJS',
    resources: [
      '[slides](https://slides.com/react-vis/genie)',
      '[workshop](https://react-vis.github.io/genie/workshop/)',
    ],
    deliveries: [
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        recording: 'https://youtu.be/lqf5mrrf4ZY',
        date: '2014-08-14',
      },
      {
        event:
          '[UtahJS Orem meetup](http://www.meetup.com/UtahJS-Orem-Meetup/events/156148202/)',
        date: '2014-02-06',
      },
    ],
    description: `
        I believe that people are so much more productive when they don't need to use the mouse to click on something.
        One implementation intended to help with this is keyboard shortcuts. Unfortunately, these are limited to the
        number of sensible keys and key combinations and can be difficult for users to discover, remember, and use.
        Normally, only super users will ever use them. The goal of genie is to address the problems with keyboard
        combinations. Genie is a simple library to emulate the same kind of behavior seen in apps like Alfred (for
        macOS: [alfredapp.com](https://alfredapp.com)). Essentially, you register actions associated with keywords. Then
        you can request the genie to perform that action based on the best keyword match for a given keyword. This allows
        a user to type what they want to have happen and select from a list of the best matches for what they typed to
        perform an action. Over time, the genie will learn the actions more associated with specific keywords and those
        will be come first when a list of matching actions is requested. Check it out at
        [github.com/react-vis/genie](https://github.com/react-vis/genie)
      `,
  },
  {
    title: 'Watch your Watchers',
    resources: [
      '[slides](http://slides.com/react-vis/angular-bindonce#/)',
      '[kcd-angular](http://react-vis.com/kcd-angular)',
    ],
    deliveries: [
      {
        event:
          '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/184204692/)',
        recording: 'https://youtu.be/hFOSXVT-Cps?t=1m34s',
        date: '2014-08-12',
      },
    ],
    description: `
        If you're not careful (especially with your ng-repeats) your watch count in your app can grow pretty quick. This
        isn't a problem itself, but its what that does to your digest cycle. Lots of watchers makes your digest cycle take
        longer. In my talk, we'll talk about what Angular 1.3 is doing to help solve this problem, the problem their
        solution presents, a solution to that problem, and what can be done for pre-Angular 1.3 code.
      `,
  },
  {
    title: 'Sharing code between Ionic and Web Angular Apps',
    deliveries: [
      {
        event:
          '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/160366932/)',
        recording: 'https://youtu.be/EmWBbvWJDVY',
        date: '2014-08-08',
      },
    ],
    description: `
        This was an impromptu talk while we were waiting for the actual speakers to come, so I'm not on the schedule.
      `,
  },
  {
    title: 'How to Build a Demo with GitHub Pages',
    resources: ['[slides](http://slides.com/react-vis/gh-pages#/)'],
    deliveries: [
      {
        event:
          '[UtahJS Orem meetup](http://www.meetup.com/UtahJS-Orem-Meetup/events/193499152/)',
        date: '2014-08-07',
      },
    ],
  },
  {
    title: `JWT: Not Your Grandma's Cookies`,
    resources: [
      '[slides](http://slides.com/react-vis/ng-jwt-workshop)',
      '[site](http://react-vis.com/ng-jwt-workshop/frontend/)',
      '[repo](https://github.com/react-vis/ng-jwt-workshop)',
    ],
    deliveries: [
      {
        event:
          '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/173788512/)',
        recording: 'https://youtu.be/vIGZxeQUUFU?t=1m51s',
        date: '2014-06-10',
      },
    ],
    description: `
        Cookies and sessions are the traditional way to keep track of user state on the server, but it can bite you later.
        JSON Web Tokens (JWT) is a stateless way to deal with users. I'll show how to use \`$httpInterceptors\` to make
        this easy as pie. :-)
      `,
  },
  {
    title: 'Intro to AngularJS',
    resources: [
      '[slides](https://slides.com/react-vis/intro-to-angularjs)',
      '[workshop](http://react-vis.com/ng-workshop/)',
    ],
    deliveries: [
      {
        event: 'To my classmates at BYU',
        recording: 'https://youtu.be/GmVUw_Efi_M',
        date: '2014-01-30',
      },
      {
        event: '[UtahJS](http://conf.utahjs.com/schedule-2014)',
        date: '2014-06-06',
      },
      {
        event: '[Jfokus](http://www.jfokus.se/jfokus/)',
        date: '2015-02-03',
      },
    ],
    description: `
        AngularJS is one of the most popular frontend frameworks out there right now. If you haven't tried it yet,
        prepare to be amazed! Here's what we'll cover:
        1. Templates/Expressions - Your View
        2. Module - Your app's namespace
        3. Directives - DOM Interface
        4. Filters - Display utils
        5. Scope - What on earth is this thing!?
        6. Controllers - The View Model
        7. Services - Common utilities
        8. Working with third-party modules
        9. Routing - Single Page App with state in the URL
        10. Firebase & AngularFire - A full web application with no server setup required!
        We'll be following through a repository hosted on GitHub. There's a branch for each concept, so you can play
        around with the code and then catch right back up with the next branch. So come on, and let's learn AngularJS!
      `,
  },
]
  .map(preparePresentationData)
  .sort(sortByPresentationDate)
