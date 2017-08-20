# A Practical Guide to Testing React Apps

Article: [http://acco.io/a-practical-guide-to-testing-react-apps/](http://acco.io/a-practical-guide-to-testing-react-apps/)

- The popular tools (Jest and Enzyme) that we use to test React apps
- “Shallow rendering” a component
- What good React specs look
- What tests not to write
- Jest snapshots
- Jest serializers
- ….and more!

### Contents

- 0.1 First, a little terminology…
- 1 The React testing ecosystem
- - 1.1 A test runner
- - 1.2 An assertion library
- - 1.3 Testing utilities
- 2 Setup
- - 2.1 Creating our app
- - 2.2 The components
- 3 Writing tests
- - 3.1 Smoke tests
- - 3.2 Given props, assert on output
- - 3.3 Setting up context
- - 3.4 With populated items
- - 3.5 “The Art of Specs” with Sun True
- - 3.5.1 A quick note on TDD
- - 3.6 But what about interactivity?
- 4 Simulating user interactions
- - 4.1 Filtering cryptocurrencies
- - - 4.1.1 Our first “user interaction”
- - 4.2 The easier way: Jest Snapshots
- - - 4.2.1 Snapshot strategy
- - - 4.2.2 Snapshot serializers (when you turned #pro)
- - 4.3 More interactivity: Clearing the search field
- - 4.4 Simulating vs setState()
- 5 Putting it all together (so far)