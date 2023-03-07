import { TextEditor } from './lib';

const data = `# Milkdown React Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, augue vitae rutrum bibendum, lorem tellus vulputate dui, eget tristique mauris dui sit amet ipsum. Ut euismod, ex volutpat consequat gravida, quam dolor dapibus ex, eget aliquet leo magna posuere arcu. Praesent lacus diam, laoreet et nisi sit amet, interdum tristique enim. Morbi sapien tortor, suscipit in consectetur eu, finibus a turpis. Mauris scelerisque nisl quis purus pulvinar laoreet tincidunt ut nisl. Quisque ullamcorper turpis vel elit elementum, sit amet tempus tellus ultrices. Nullam ac lorem diam. Aenean aliquam pellentesque elit id tempor. Nullam diam lacus, vestibulum ac interdum vel, suscipit id lacus. Aliquam eget ante vitae dolor lacinia dignissim a sit amet tellus. Donec nec arcu eget purus molestie vulputate. Pellentesque pulvinar elementum posuere. Maecenas gravida, arcu ac sagittis aliquet, mauris risus sagittis augue, ac tristique turpis nulla id tellus. Nunc scelerisque ultrices odio, sed sodales neque pharetra ut. In faucibus sapien sed massa feugiat, eget pulvinar leo facilisis.

\`\`\`typescript
function main() {
  console.log('Hello milkdown!');
}
\`\`\`

`;

export const App = () => (
  <div>
    <TextEditor onDataChange={() => {}} {...{ data }} />
  </div>
);
