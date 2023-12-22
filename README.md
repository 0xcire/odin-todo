# Todo Odin Project

Base todo app as instructed by Odin.

Project can be viewed [here](https://0xcire.github.io/odin-todo/)

#### remarks

Spent some extra time on this after creating the Odin weather app. I knew when I originally made this, and the subsequent weather project that I wasn't exactly utilizing best practices.

Came back to the todo app to refactor, added eslint(airbnb) to catch less glaring errors.

### notes

- rarely when marking todos complete, renderTodos(todos, list) first item will be null which breaks rendering of projects
  - believe it may have something to do with multiple localStorage items, but couldn't reproduce
  - todos = [null, {...todo}]
