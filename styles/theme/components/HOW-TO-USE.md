# HOW TO USE

You can configure the components theme in two different ways, one following the `link.ts` example and other following the `button.ts` example. 

- The first way, following the `link.ts`, you need to import `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";`, using the `defineStyle` to create the base style object and the `defineStyleConfig` to convert this to the properly object structure. In this way you will need to map the component theme to the component itself, like this `Link: linkTheme`, adding this to the export of the `index.ts` file.
- The second way you create a const with the name of the component, like `Button` and define that the type of it is `ComponentStyleConfig`, adding there the configurations that you want to update, exporting this in the `index.ts` in the standard way, like `Button: Button`.