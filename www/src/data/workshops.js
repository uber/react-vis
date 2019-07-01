import {
  preparePresentationData,
  sortByPresentationDate,
} from '../lib/prepare-presentation-data'

export default [
  // {
  //   title: '',
  //   resources: [
  //   ],
  //   tags: [],
  //   deliveries: [
  //     {
  //       event: '',
  //       date: '',
  //       recording: '',
  //     },
  //   ],
  //   description: `
  //   `,
  // },
  {
    title: 'Advanced React Patterns with Hooks',
    resources: ['[repo](https://github.com/react-vis/advanced-react-patterns)'],
    tags: ['react'],
    deliveries: [
      {
        event: '[React.Amsterdam](https://react.amsterdam/workshops)',
        date: '2019-04-10',
      },
    ],
    description: `
      Advanced React Patterns with Hooks is an ADVANCED workshop. Making React
      components that can be used in multiple places is not hard. What is hard
      is when the use cases differ. Without the right patterns, you can find
      yourself with a highly complex component that requires a lot of
      configuration props and way too many if statements.
      
      With this course, you'll not only learn great patterns you can use but
      also the strengths and weaknesses of each, so you know which to reach for
      to provide your components the flexibility and power you need. If you're
      already experienced with React, you'll enjoy the fact that this is all
      using React's latest "Hooks" feature which makes these patterns even
      better and even introduces some new ones.
    `,
  },
  {
    title: 'React Hooks and Suspense',
    resources: [
      '[repo](https://github.com/react-vis/react-hooks-and-suspense-egghead-playlist)',
    ],
    tags: ['react', 'testing'],
    deliveries: [
      {
        event: '[egghead.io](https://kcd.im/egghead) Course',
        date: '2018-10-27',
        recording:
          'https://egghead.io/playlists/react-hooks-and-suspense-650307f2',
      },
    ],
    description: `
      React Suspense has been released in React 16.6.0 and React Hooks is currently in alpha! Let's see
      how we can use these and more features of React together to write simpler React components.
    `,
  },
  {
    title: 'Simplify React Apps with React Hooks',
    resources: ['[repo](https://github.com/react-vis/react-github-profile)'],
    tags: ['react', 'testing'],
    deliveries: [
      {
        event: '[egghead.io](https://kcd.im/egghead) Course',
        date: '2018-12-04',
        recording:
          'https://egghead.io/courses/simplify-react-apps-with-react-hooks',
      },
    ],
    description: `
      With the massive improvements to function components in React via hooks and suspense, you may be interested in seeing how to
      refactor a typical class component to a simpler class component that uses React Hooks features. In this course, we'll take
      [a modern React codebase](https://github.com/react-vis/react-github-profile) that uses classes and refactor the entire thing
      to use function components as much as possible. We'll look at state, side effects, async code, caching, and more!

      Want a primer on hooks and suspense?
      [Watch my React Hooks and Suspense Playlist](https://egghead.io/playlists/react-hooks-and-suspense-650307f2)!
    `,
  },
  {
    title: 'Modern React Workshop: Hooks and Suspense',
    resources: ['[repo](https://github.com/react-vis/modern-react)'],
    tags: ['react'],
    deliveries: [
      {
        event: 'Self-organized PayPal workshop day (Part 2)',
        date: '2018-11-28',
        recording:
          'https://www.youtube.com/watch?v=NKAfuguroRY&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: 'Self-organized PayPal workshop day (Part 1)',
        date: '2018-11-28',
        recording:
          'https://www.youtube.com/watch?v=xcZXS_VEJS0&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
      React has two new upcoming features that will blow your socks off making writing applications much easier.
      In this extremely hands-on workshop, you'll be able to play with these new features and have the skills you
      need to take them to your own applications.
    `,
  },
  {
    title: 'Testing React and Web Applications',
    resources: ['[repo](https://github.com/react-vis/testing-workshop)'],
    tags: ['testing', 'automation', 'jest', 'cypress', 'react'],
    deliveries: [
      {
        event: 'Workshop.me in San Francisco',
        date: '2018-03-27',
      },
      {
        event:
          '[Frontend Masters](https://frontendmasters.com/courses/testing-react/)',
        date: '2018-04-19',
      },
      {
        event: '[React.Amsterdam](https://react.amsterdam/workshops)',
        date: '2019-04-11',
      },
    ],
    description: `
      Developing and deploying production applications with React is one thing, but being confident that you're not
      shipping a hidden bug is something else! Knowing how to configure and use testing tools is critical to your
      success in shipping with confidence, and React's model opens up testing productivity most of us couldn't even
      dream of before.

      I have personally written tens of thousands of tests for production applications and my open source modules.
      Hundreds of developers have improved their testing knowledge from this workshop.

      **Topics**:
      - Learn the fundamentals of what a test is and what role testing frameworks play
      - Configure Jest for a client-side React project
      - Learn what Code Coverage is and how to properly use that metric
      - Write unit tests for JavaScript utilities and React components
      - Learn what snapshot testing is and how to use it effectively
      - Write integration tests for a React application
      - Configure Cypress for a web application
      - Write E2E (end-to-end) tests with Cypress
    `,
  },
  {
    title: 'Testing Practices and Principles',
    resources: [
      '[slides](http://slides.com/react-vis/testing-principles)',
      '[repo](https://github.com/react-vis/testing-workshop)',
    ],
    tags: ['testing', 'automation', 'jest', 'cypress'],
    deliveries: [
      {
        event: '[Assert(JS)](https://www.assertjs.com/training)',
        date: '2018-02-21',
        recording:
          'https://www.youtube.com/watch?v=VQZx1Z3sW0E&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: 'Workshop.me in San Francisco',
        date: '2018-03-26',
      },
      {
        event:
          '[Frontend Masters](https://frontendmasters.com/courses/testing-practices-principles/)',
        date: '2018-04-18',
      },
    ],
    description: `
      The goal of a test is to increase your confidence that the subject of your test is functioning the way it should
      be. Not all tests provide the same level of confidence (some provide very little confidence at all). If you're not
      doing things correctly, you could be wasting your time and giving yourself a false sense of security (even worse
      than having no tests at all).

      I have personally written tens of thousands of tests for production applications and my open source modules.
      Hundreds of developers have improved their testing knowledge from this workshop.

      **Topics**:
      - The fundamentals behind tests and testing frameworks the distinctions of different forms of testing
      - How to write Unit tests
      - How to write Integration tests
      - When and how to mock dependencies
      - How to use test driven development to write new features
      - How to use test driven development to find and fix bugs
      - Core principles of testing to ensure your tests give you the confidence you need
    `,
  },
  {
    title: 'Advanced React Component Patterns',
    resources: [
      '[repo](https://github.com/react-vis/advanced-react-patterns-v2)',
    ],
    tags: ['react'],
    deliveries: [
      {
        event:
          '[egghead.io](https://egghead.io/courses/advanced-react-component-patterns)',
        date: '2017-12-04',
        recording:
          'https://egghead.io/courses/advanced-react-component-patterns',
      },
      {
        event:
          '[Frontend Masters](https://frontendmasters.com/courses/advanced-react-patterns/)',
        date: '2018-04-17',
      },
      {
        event: 'JS@PayPal (internal conference)',
        date: '2018-05-11',
        recording:
          'https://www.youtube.com/playlist?list=PLV5CVI1eNcJgBniABPfk_tMliLrSJNC-T',
      },
      {
        event: 'Workshop.me online',
        date: '2018-06-19',
        endDate: '2018-06-20',
      },
      {
        event: 'Workshop.me in Portland',
        date: '2018-07-11',
      },
    ],
    description: `
      Making React components that can be used in multiple places is not hard. What is hard is when the use cases
      differ. Without the right patterns, you can find yourself with a highly complex component that requires a lot of
      configuration props and way too many if statements. With this course, you'll not only learn great patterns you can
      use, but also the strengths and weaknesses of each so you know which to reach for to provide your components the
      flexibility and power you need.

      I have contributed to and published some of the most successful React components in the React ecosystem. Through
      that experience, I've learned and taught patterns that enhnace flexibilty, usefulness, and simplicity.

      **Topics**:
      - Use the Compound Components Pattern to write React components that implicitly share state while giving rendering
        flexibility to the user
      - Share code and enhance your components with the Higher Order Components Pattern
      - Give full rendering power to users with the Render Props Pattern
      - Improve the render prop API with the Prop Collections and Prop Getters Patterns
      - Provide total logic control with the Controlled Props and State Reducer Patterns
      - Take advantage of React's Context API to share state throughout the application with the Provider Pattern
    `,
  },
  {
    title: `The Beginner's Guide to ReactJS`,
    slug: 'the-beginner-s-guide-to-react-js',
    resources: [
      '[repo](https://github.com/eggheadio-projects/the-beginner-s-guide-to-reactjs)',
    ],
    tags: ['react'],
    deliveries: [
      {
        event:
          '[egghead.io](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)',
        date: '2017-12-04',
        recording: 'https://egghead.io/courses/the-beginner-s-guide-to-reactjs',
      },
      {
        event: 'Workshop.me in Salt Lake City',
        date: '2018-08-14',
      },
      {
        event:
          '[Framework Summit 2018](https://www.frameworksummit.com/workshop/introduction-to-react)',
        date: '2018-10-01',
        recording:
          'https://thinkster.io/tutorials/one-day-introduction-to-react-with-kent-c-dodds',
      },
    ],
    description: `
      This course is for React newbies and those looking to get a better understanding of React fundamentals.
      With a focus on React fundamentals, you'll come out of this course knowing what problems React can solve
      for you and how it goes about solving those problems. You will have a good grasp on what JSX is and how
      it translates to regular JavaScript function calls and objects.

      Each lesson in this course is just a single \`index.html\` file which will help you keep your focus on
      learning React and not distracted by all the tools that make production applications work. The course
      wraps up with a lesson on how to move from these \`index.html\` files to a more production ready development
      environment and even how to deploy your app to a great service like Netlify.

      Enjoy!

      > NOTE: This content is pre-[hooks](https://reactjs.org/hooks), but 80% of it is still super relevant.
    `,
  },
  {
    title: 'Code Transformation and Linting',
    resources: [
      '[slides](http://slides.com/react-vis/asts-workshop)',
      '[repo](https://github.com/react-vis/asts-workshop)',
    ],
    tags: ['babel', 'eslint', 'codemod', 'Abstract Syntax Trees', 'asts'],
    deliveries: [
      {
        event:
          '[Frontend Masters](https://frontendmasters.com/courses/linting-asts/)',
        date: '2017-04-26',
      },
      {
        event: 'Self-organized PayPal practice-run',
        date: '2017-04-19',
        recording:
          'https://www.youtube.com/watch?v=-iA7TAUGn2Y&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
      Have you ever needed to change the API to a widely used function in your JavaScript application?
      Find and replace can really only take you so far. What about the frustration of iterating over and
      over again on pull requests because of simple code mistakes developers keep making? These are only some
      of the problems that you can solve with a basic understanding of Abstract Syntax Trees and the tools
      you can use to inspect and manipulate them.

      Join React Vis and learn invaluable skills you can take back to improve the developer experience
      in your JavaScript applications.
    `,
  },
  {
    title: 'Testing JavaScript Applications',
    resources: [
      '[slides](http://slides.com/react-vis/testing-workshop)',
      '[repo](https://github.com/react-vis/testing-workshop)',
    ],
    tags: ['testing', 'jest', 'cypress'],
    deliveries: [
      {
        event:
          '[Frontend Masters](https://frontendmasters.com/courses/testing-javascript/)',
        date: '2017-04-25',
      },
      {
        event: 'Self-organized PayPal practice-run',
        date: '2017-04-20',
        recording:
          'https://youtu.be/DdqiXcYDv-8?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    description: `
      Building and deploying web applications with confidence is challenging. Verifying that what you're
      deploying to production actually works requires a solid suite of automated tests. Knowing how to
      configure tools and write tests that enhance your development experience is vital to your success.

      In this class, we'll explore the merits and tradeoffs of different forms of testing and get into configuring
      and using specific tools to increase confidence in deploying our applications. Join React Vis and
      learn invaluable skills you can take back to improve your JavaScript applications.
    `,
  },
  {
    title: 'ES6 and Beyond',
    resources: [
      '[slides](http://slides.com/react-vis/es6-workshop#/)',
      '[workshop repo](https://github.com/react-vis/es6-workshop)',
      '[app repo](https://github.com/react-vis/es6-todomvc)',
    ],
    tags: ['ES.next', 'ES6', 'webpack'],
    deliveries: [
      {
        event: 'Self-organized PayPal workshop day (Part 2)',
        date: '2017-03-07',
        recording:
          'https://youtu.be/eOKQDh50ECU?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: 'Self-organized PayPal workshop day (Part 1)',
        date: '2017-01-23',
        recording:
          'https://youtu.be/t3R3R7UyN2Y?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event:
          '[The Strange Loop](http://www.thestrangeloop.com/2016/es6-and-beyond.html)',
        date: '2016-09-15',
        recording: 'https://youtu.be/dnF-wrw0Q_w',
      },
      {
        event: '[Connect.Tech](http://connect.tech/)',
        date: '2016-10-20',
        recording: 'https://youtu.be/nCP6jsN9XPI',
      },
      {
        event: '[The Kansas City Developer Conference](http://www.kcdc.info/)',
        date: '2016-06-22',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2015-08-12',
        recording:
          'https://youtu.be/aeY6ctvsurs?list=PLV5CVI1eNcJi1ZdXFSxR23QUeNVbauL3A',
      },
      {
        event:
          '[SLC JS Learners](http://www.meetup.com/SLC-JS-Learners/events/220770922/)',
        date: '2015-04-21',
        recording: 'https://youtu.be/_Pn32tTtbuQ',
      },
    ],
    description: `
      The ECMAScript standard is now on a yearly release cycle. Keeping up with the latest features can make you more
      productive and your code more expressive and maintainable. In this workshop, we'll learn about the features from
      ES6 to today that you're likely to use and benefit from on a day-to-day basis.

      Kent has been using and teaching the latest features of JavaScript with Babel for years. He represents PayPal on
      the [TC39](https://github.com/tc39). Kent has taught thousands of developers the new and useful features of
      JavaScript.

      **Topics**:
      - Simple ES6 features like let, const, and template literals
      - New object and array operators and syntax like destructuring, rest and spread, and object literal syntax
        enhancements
      - New function syntax and operators like arrow functions and rest/spread
      - Data structures like Map/Set and their weak counterparts
      - How to use Promises effectively
      - How and when to use async/await
      - Really useful new APIs on built-ins like Object, String, Array, and even new syntax for RegExp
      - How and when to use public class fields to avoid issues with "this" bindings
    `,
  },
  {
    title: 'Intro to ReactJS',
    resources: [
      '[repo](https://github.com/react-vis/react-workshop)',
      '[app](https://github.com/react-vis/react-github-profile)',
    ],
    tags: ['react'],
    deliveries: [
      {
        event: 'Internally at PayPal',
        recording: 'https://youtu.be/VZaQfb2y6BI',
        date: '2016-12-13',
      },
      {
        event: 'Internally at PayPal',
        recording: 'https://youtu.be/e-A4qAwr9Tg',
        date: '2016-10-06',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2016-08-10',
      },
    ],
    description: `TODO 😅`,
  },
  {
    title: 'Webpack Deep Dive',
    resources: [
      '[slides](https://slides.com/react-vis/webpack-deep-dive)',
      '[app repo](https://github.com/react-vis/es6-todomvc)',
    ],
    tags: ['webpack'],
    deliveries: [
      {
        event: '[Frontend Masters](http://kcd.im/fem-webpack)',
        date: '2016-08-08',
        recording: 'http://kcd.im/fem-webpack',
      },
      {
        event:
          '[egghead.io](https://egghead.io/courses/using-webpack-for-production-javascript-applications)',
        date: '2016-06-17',
        recording:
          'https://egghead.io/courses/using-webpack-for-production-javascript-applications',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2015-08-12',
        recording:
          'https://youtu.be/a96r7Tjf0Ps?list=PLV5CVI1eNcJi1ZdXFSxR23QUeNVbauL3A',
      },
    ],
    description: `
      Building and deploying complex frontend applications can get complicated quickly. Webpack simplifies this with a
      huge list of features that cater to all kinds of JavaScript apps. In this class, we'll explore these features to
      optimize an application for performance and simplicity. In this workshop, you'll learn:

      - The role of webpack and fundamental concepts like loaders and plugins
      - How to setup a webpack file (and use webpack-validator to save yourself hours of debugging typos)
      - How to setup a unit testing environment for a webpack project
      - How tree-shaking works and how to leverage it for smaller bundles
      - How to maintain sane file sizes with webpack code splitting
      - How to leverage hashing for long term caching
      - How to group vendor/common files with the CommonsChunkPlugin to save bytes in the code that changes regularly
      - The latest features of Webpack 2!
    `,
  },
  {
    title: 'How to Write an Open Source JavaScript Library',
    resources: ['[repo](https://github.com/react-vis/starwars-names)'],
    tags: ['open source'],
    deliveries: [
      {
        event: '[Frontend Masters](http://kcd.im/fem-oss)',
        date: '2016-08-09',
        recording: 'http://kcd.im/fem-oss',
      },
      {
        event: '[egghead.io](http://kcd.im/write-oss)',
        date: '2015-08-24',
        recording: 'http://kcd.im/write-oss',
      },
    ],
    description: `
      Participating in open source has been one of the most rewarding experiences of my career. The feeling of sharing
      something I've created, and hearing that others are using it in their applications is incredible. But writing and
      managing an open source project is challenging. I want to help you get started with open source or improve your
      current projects with some of the things I've learned by publishing and maintaining over 60 npm packages.

      - Learn how to set up a new project locally and on GitHub for development
      - Learn how to configure npm for publishing the project to the npm registry
      - Learn how to transpile the source with babel
      - Learn how to add unit tests and code coverage
      - Learn how to add CI (with Travis CI) to run tests automatically and report coverage stats to codecov.io
      - Learn how to automate releases with semantic-release
      - Learn how to distribute a browser build with webpack
    `,
  },
  {
    title: 'React + AVA = ❤️',
    resources: ['[repo](https://github.com/react-vis/react-ava-workshop)'],
    tags: ['react', 'testing'],
    deliveries: [
      {
        event: 'Internally at PayPal',
        date: '2016-02-16',
        recording: 'https://youtu.be/UmDNx06472I',
      },
      {
        event: 'Hangout with my team',
        date: '2016-04-13',
        recording: 'https://youtu.be/RxLW6-3dk5A',
      },
    ],
    description: `
      **NOTE**: _I no longer recommend using AVA in React Projects_. Instead I recommend using Jest. Incidentally, I
      have a workshop for that too: [react-jest-workshop](https://github.com/react-vis/react-jest-workshop).
    `,
  },
  {
    title: 'How to Contribute to an Open Source Project on GitHub',
    tags: ['open source'],
    deliveries: [
      {
        event:
          '[egghead.io](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)',
        date: '2016-02-18',
        recording:
          'https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github',
      },
    ],
    description: `
      "Feel free to submit a PR!" - words often found in GitHub issues, but met with confusion and fear by many.
      Getting started with contributing open source is not always straightforward and can be tricky. With this series,
      you'll be equipped with the the tools, knowledge, and understanding you need to be productive and contribute to
      the wonderful world of open source projects. Much of this series speaks about GitHub, but most of the concepts
      are generally applicable to contributing to any open source project, regardless of where it's hosted.

      So enjoy the course and start contributing to the projects you use and love today!
    `,
  },
  {
    title: 'Intro to Webpack and Migrating from Require.js to Webpack ',
    resources: [
      '[repo](https://github.com/react-vis/require-to-webpack-todomvc)',
    ],
    tags: ['webpack'],
    deliveries: [
      {
        event: 'JS @ PayPal',
        date: '2015-12-17',
        recording: 'https://youtu.be/NEJyIBwo-ik',
      },
    ],
  },
  {
    title: 'Angular and Webpack for Modular Applications',
    tags: ['angular', 'webpack'],
    deliveries: [
      {
        event:
          '[egghead.io](https://egghead.io/courses/angular-and-webpack-for-modular-applications)',
        date: '2015-09-05',
        recording:
          'https://egghead.io/courses/angular-and-webpack-for-modular-applications',
      },
    ],
    description: `
      How much work would it take for you to move all of your directives and their templates to several different new
      directories? You'd have to update the templateUrl, script tags, etc., etc. With webpack, this can be trivial. For
      example, you don't need to worry about loading your templates in the $templateCache ever again. Webpack will help
      you modularize your css and tests. All of these things and more in this series so you can start using webpack
      with Angular today.
    `,
  },
  {
    title: 'angular-formly',
    resources: [
      '[slides](http://slides.com/react-vis/angular-formly)',
      '[repo](https://github.com/react-vis/angular-formly-convert)',
    ],
    tags: ['angular'],
    deliveries: [
      {
        event: '[ng-conf](https://www.ng-conf.org/)',
        date: '2015-03-04',
      },
    ],
  },
  {
    title: 'AngularJS Authentication with JWT',
    tags: ['angular'],
    deliveries: [
      {
        event:
          '[egghead.io](https://egghead.io/courses/angularjs-authentication-with-jwt)',
        date: '2014-09-22',
        recording:
          'https://egghead.io/courses/angularjs-authentication-with-jwt',
      },
    ],
    description: `
      JSON Web Tokens (JWT) are a more modern approach to authentication. As the web moves to a greater separation
      between the client and server, JWT provides a terrific alternative to traditional cookie based authentication
      models. For more information on JWT visit http://jwt.io/

      In this series, we'll be building a simple application to get random user information from a node server with an
      Angular client. We'll then implement JWT to protect the random user resource on the server and then work through
      the frontend to get JWT authentication working.

      By the end, we'll have an application which has a single username/password combination (for simplicity) and uses
      tokens to authorize the client to see the random user information. You'll be able to login, get random users, and
      logout.
    `,
  },
  {
    title: 'Intro to AngularJS',
    resources: [
      '[slides](http://slides.com/react-vis/intro-to-angularjs)',
      '[workshop](http://react-vis.com/ng-workshop/)',
    ],
    tags: ['angular'],
    deliveries: [
      {
        event: '[JFokus 2015](http://www.jfokus.se/jfokus/)',
        date: '2015-02-06',
      },
      {
        event: '[BYU](https://byu.edu/)',
        date: '2014-01-20',
        recording: 'https://youtu.be/GmVUw_Efi_M',
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
