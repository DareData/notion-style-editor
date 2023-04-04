- [Overview](#overview)
- [Preparation and starting the application](#preparation-and-starting-the-application)
  * [Installation](#installation)
- [Note about server side rendering](#note-about-server-side-rendering)
- [Deploying to Github Pages](#deploying-to-github-pages)
- [Buling library](#buling-library)
- [Using library](#using-library)
- [Troubleshoots](#troubleshoots)
    + [The editor keeps re-rendering](#the-editor-keeps-re-rendering)
    + [The bundle size is quite large](#the-bundle-size-is-quite-large)


## Overview

This project is a [Markdown](https://www.markdownguide.org/getting-started/) editor library. **Thanks to it, it is possible to use Markdown in a simple and pleasant way**. It is written using [React](https://react.dev/), [styled-components](https://styled-components.com/). [React-hook-form](https://react-hook-form.com/) was used to render forms alogn with [yup](https://github.com/jquense/yup).

**The newest test version should be released there -> [example page](https://daredata.github.io/notion-style-editor/)**

## Instalation

Simply run:
```bash
yarn add altos-text-editor
```

and then import `TextEditor`
```typescript
import { TextEditor } from 'altos-text-editor';

const AltosTextEditor: React.FC = () => {
  const onDataChange = useCallback(() => {}, [])

  return (
    <TextEditor data="" mode="active" onDataChange={onDataChange} />
  )
}
```

## Preparation and starting the application

For consistency and to ensure that each developer uses the same version of [Node.js](https://nodejs.org/en), we used [nvm](https://github.com/nvm-sh/nvm) ([How to install nvm on macos](https://tecadmin.net/install-nvm-macos-with-homebrew/)).

### Installation

1. `cd /your_path`
2. `git clone git@github.com:DareData/notion-style-editor.git`
3. `cd notion-style-editor`
5. `nvm use`
6. `yarn`
7. `yarn prepare`
9. `yarn start`

## Note about server side rendering

**This library cannot be rendered on the server! That's why it's important to render it only on the client side.**

**So basically.. the library will never and should not be rendered on the server.**

How to use it with Next.js?
<ins>It's not the best solution. We shouldn't use lazy loading components in this case, but it's a "now" solution. In the future, this must be changed and a better solution must be found</ins>
- `yarn add altos-text-editor`
- Create a new component
```typescript
import { TextEditor } from 'altos-text-editor';

const AltosTextEditor: React.FC = () => {
  const onDataChange = useCallback(() => {}, [])

  return (
    <TextEditor data="" mode="active" onDataChange={onDataChange} />
  )
}

export default AltosTextEditor;
```

- Import `AltosTextEditor` via [dynamic](https://nextjs.org/docs/advanced-features/dynamic-import) 
```typescript
import dynamic from 'next/dynamic'

const AltosTextEditorDynamic = dynamic(() => 
  import('<--path_to_the_component->'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
)

export default function MyComponent() {
  return (
    <div>
      Hello!
      <AltosTextEditorDynamic />
    </div>
  )
}
```

## Deploying to Github Pages

If you want to share the current state of the library with external people, you can use Github Pages where a test version is placed for testing by testers.

**To add a new version, you just need to run the following commands:**
1. `yarn build:pages`
2. `git commit -m"<--any_commit_message-->"`
3. `git push origin <--your_branch-->`

<ins>Just remember that the changes you upload should be visible on github pages, your changes should be in the same branch on which github pages is currently "listening".</ins> 
**[Here](https://github.com/DareData/notion-style-editor/settings/pages) you can check on which branch github is currently listening for changes.**

## Buling library

If you want to build a library to be used by external applications, you need to run the following commands:
- `yarn build`

Your library has been created in the `dist` folder.

## Using library

Once the library has been created and added, for example, to the [npm](https://www.npmjs.com/), then to use it, you just need to import the editor as well as the styles that are extracted, because [ProseMirror](https://prosemirror.net/) uses its own styles.

**Adding styles ( index.tsx )**
```typescript
import 'milkdown-datedata/style.css'; 

import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <YourComponent />
  </React.StrictMode>
);

```

**Using editor**
```typescript

const myMarkdownData: string = `
  **This is milkdown editor**
`

const YourComponent: React.FC = () => {
  const data: string = myMarkdownData;

  const mode: 'active' | 'preview' = 'active'

  const onDataChange = useCallback((data: string) => {
    console.log('data, when markdown has changed: ', data);
  }, [])

  return (
    <div>
      <h2>This is our editor</h2>
       <TextEditor 
        {...{ mode, onDataChange, data }} 
      />
    </div>
  )
}

```

## Troubleshoots

### The editor keeps re-rendering

Check, whether `onDataChange` and `data` do not change their reference. When one of them changes, the old editor is "unmounted" and a new one is "mounted". 
https://blog.logrocket.com/understanding-react-exhaustive-deps-linting-warning/ 

### The bundle size is quite large

Unfortunately after using https://github.com/btd/rollup-plugin-visualizer, I noticed that **both of these plugins are around 4MB**
- https://milkdown.dev/docs/api/plugin-diagram
- https://milkdown.dev/docs/api/plugin-math

In addition, fonts take up quite a lot of space. 


<ins>Moreover.. the code is not minified yet, so 60% of the size will be reduced. Also remember about compression, which will also reduce the size of the package.</ins>