export const useGfmPlugin = () =>
  [
    gfm,
    tableTooltip,
    tableTooltipCtx,
    (ctx: Ctx) => async () => {
      ctx.set(tableTooltip.key, {
        view: pluginViewFactory({
          component: TableTooltip,
        }),
      });
    },
    $view(footnoteDefinitionSchema.node, () =>
      nodeViewFactory({ component: FootnoteDef })
    ),
    $view(footnoteReferenceSchema.node, () =>
      nodeViewFactory({ component: FootnoteRef })
    ),
    tableSelectorPlugin(widgetViewFactory),
  ].flat();
