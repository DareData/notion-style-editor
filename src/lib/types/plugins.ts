import { MilkdownPlugin } from '@milkdown/ctx';
import { NodeViewConstructor } from '@milkdown/prose/view';
import { $View, $Node } from '@milkdown/utils';

export type Plugin = (MilkdownPlugin | $View<$Node, NodeViewConstructor>)[];
