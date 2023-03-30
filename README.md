## Overview

This project is a [Markdown](https://www.markdownguide.org/getting-started/) editor library. **Thanks to it, it is possible to use Markdown in a simple and pleasant way**. It is written using [React](https://react.dev/), [styled-components](https://styled-components.com/). [React-hook-form](https://react-hook-form.com/) was used to render forms alogn with [yup](https://github.com/jquense/yup).

**The newest test version should be released there -> [example page](https://daredata.github.io/notion-style-editor/)**

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

## Deploying to Github Pages

If you want to share the current state of the library with external people, you can use Github Pages where a test version is placed for testing by testers.

**To add a new version, you just need to run the following commands:**
1. `yarn build:pages`
2. `git commit -m"<--any_commit_message-->"
3. git push origin <--your_branch-->

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

#### The editor keeps re-rendering

Check, whether `onDataChange` and `data` do not change their reference. When one of them changes, the old editor is "unmounted" and a new one is "mounted". 
https://blog.logrocket.com/understanding-react-exhaustive-deps-linting-warning/ 

#### The bundle size is quite large

Unfortunately after using https://github.com/btd/rollup-plugin-visualizer, I noticed that **both of these plugins are around 4MB**
- https://milkdown.dev/docs/api/plugin-diagram
- https://milkdown.dev/docs/api/plugin-math

In addition, fonts take up quite a lot of space.