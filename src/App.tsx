import { TextEditor } from './lib';

const data = `# Milkdown React Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, augue vitae rutrum bibendum, lorem tellus vulputate dui, eget tristique mauris dui sit amet ipsum. Ut euismod, ex volutpat consequat gravida, quam dolor dapibus ex, eget aliquet leo magna posuere arcu. Praesent lacus diam, laoreet et nisi sit amet, interdum tristique enim. Morbi sapien tortor, suscipit in consectetur eu, finibus a turpis. Mauris scelerisque nisl quis purus pulvinar laoreet tincidunt ut nisl. Quisque ullamcorper turpis vel elit elementum, sit amet tempus tellus ultrices. Nullam ac lorem diam. Aenean aliquam pellentesque elit id tempor. Nullam diam lacus, vestibulum ac interdum vel, suscipit id lacus. Aliquam eget ante vitae dolor lacinia dignissim a sit amet tellus. Donec nec arcu eget purus molestie vulputate. Pellentesque pulvinar elementum posuere. Maecenas gravida, arcu ac sagittis aliquet, mauris risus sagittis augue, ac tristique turpis nulla id tellus. Nunc scelerisque ultrices odio, sed sodales neque pharetra ut. In faucibus sapien sed massa feugiat, eget pulvinar leo facilisis.

Aenean elementum convallis iaculis. Aenean in sapien malesuada, hendrerit dui et, volutpat odio. Vivamus id iaculis lorem. Sed lacinia ultrices turpis, et convallis urna. Suspendisse mollis, risus at ullamcorper interdum, turpis risus consectetur purus, vitae lobortis arcu sem ut augue. Proin malesuada tellus sagittis, vehicula purus quis, ornare leo. Phasellus fermentum dui congue pretium feugiat. Aenean iaculis arcu ut finibus interdum.

Suspendisse hendrerit facilisis ultricies. Vestibulum fermentum ex purus, a placerat libero hendrerit molestie. In hac habitasse platea dictumst. Sed quis dolor porta quam maximus dictum at accumsan est. Cras quis ullamcorper neque. Quisque elit massa, lobortis sed felis id, imperdiet aliquam mauris. Integer vel mattis velit. Morbi vel mi tortor. Nulla facilisi. Nunc eu dolor purus. In vel maximus justo. Fusce dolor massa, malesuada a dolor non, cursus feugiat neque. Mauris tristique enim eu urna finibus, at aliquet nisi varius.
`;

export const App = () => (
  <div>
    <TextEditor onDataChange={() => {}} {...{ data }} />
  </div>
);
